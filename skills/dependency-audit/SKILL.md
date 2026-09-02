---
name: dependency-audit
description: Audit a project's npm dependencies for known vulnerabilities and risky install scripts before installing, upgrading, or shipping. Use when the user pastes or attaches a package.json/lockfile, lists dependencies, or asks to check/audit/scan their packages for security issues — including comparing two snapshots (a PR diff) or checking license compliance.
---

# NPMScan dependency audit

Use this skill when the user wants a security check across multiple npm
packages at once (a `package.json`, a lockfile, or a plain list of
`name@version` pairs) — not for a question about a single package. A plain
factual single-package question ("what does X do") you can answer directly
with `get_package` or `query_vulnerabilities`; a single-package *trust*
question ("is X safe," "was X compromised/hijacked") should use the
`package-trust-check` skill instead, which runs the deeper
maintainer-history and publish-provenance checks this skill deliberately
reserves for already-flagged packages only.

## Input

Accept dependency name+version pairs from:
- Pasted `package.json` contents (use `dependencies`; only include
  `devDependencies` if the user asks to include dev dependencies — say
  explicitly which set you audited).
- Pasted lockfile contents (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`).
- Pasted CycloneDX JSON or SPDX JSON SBOM contents.
- A plain list the user typed, e.g. "lodash 4.17.15, express 4.17.1".

If the user instead pastes **two** snapshots and asks what changed (a PR,
before/after, "did this upgrade introduce anything") — see
[Comparing two snapshots](#comparing-two-snapshots-pr-review) below instead
of the single-inventory flow.

If the message contains no parseable package list at all, ask the user to
paste their `package.json` or lockfile rather than guessing at what to audit.

## Steps

1. Prefer passing the raw pasted inventory straight to
   `batch_query_vulnerabilities` via its `content` input when the user gave a
   `package.json`, lockfile, CycloneDX JSON, or SPDX JSON document. Only
   manually build a `packages` array when the user gave a plain dependency
   list instead.
2. For raw `package.json` content, set `includeDevDependencies: true` only if
   the user explicitly asked to include dev dependencies; otherwise the tool
   defaults to production-ish dependencies only. Be explicit in the answer
   about what set you audited. For `yarn.lock`, note that the file itself
   cannot distinguish production from dev dependencies, so the tool will scan
   every resolved package and emit a warning about that.
3. Call `batch_query_vulnerabilities` once with the parsed/raw input. The tool
   now chunks large inventories internally — do not re-chunk the request in
   the skill layer unless Claude's own request-size limit forces it. Each
   finding already includes severity, a summary, CVE aliases, and the fixed
   version — do not call `query_vulnerabilities` again per flagged package
   just to re-fetch detail you already have. The only exception: if the
   result has an `enrichmentNote` (a very large audit crossed the enrichment
   cap), the vulnerabilities it names are ID-only — call
   `query_vulnerabilities` on those *specific* packages if the user needs
   full detail on them.
4. For every package the batch call flags, follow up with `get_package`
   (or `get_package_version` when an exact version was provided) to check
   maintainers, license, and install scripts (`preinstall`/`postinstall`).
   Treat install scripts as a separate risk signal from known CVEs, not
   something to fold into the same score. If the user wants to know what a
   flagged install script actually *does* rather than just that one exists,
   follow up with `analyze_install_script` — it fetches the published
   tarball and statically scans the script and the files it references
   against npmscan's red-flags rubric, returning a `totalScore`/`riskTier`.
   Also surface what `get_package` already computes for you:
   `deprecated`/`maintenanceSummary` (a deprecated or abandoned dependency
   is a real finding, not just a CVE footnote) and `possibleTyposquatOf`
   (if set, this package's name is one typo away from a much more popular
   one — flag it prominently as a supply-chain risk to verify, not as
   confirmed malice).
5. If the user wants coverage beyond the direct dependencies you were given
   (asks about "transitive"/"indirect" risk, or the inventory is small — up
   to 15 root packages), call `analyze_transitive_dependencies` instead of, or
   in addition to, step 3. It walks each root's own dependency tree (default
   depth 2, capped at 3) and returns `vulnerablePaths` naming which direct
   dependency actually pulled in each vulnerable transitive package —
   `batch_query_vulnerabilities` alone only ever checks the exact packages
   listed. It has no `content` shortcut, so build the `packages` array by
   hand from the parsed inventory.
6. For a package that's flagged as critical/high severity, deprecated, a
   possible typosquat, or that the user specifically calls suspicious, add
   the two ownership/supply-chain checks — don't run these for every clean
   package in a large audit, they're expensive and only useful signal on
   elevated-risk packages:
   - `check_maintainer_changes` — reconstructs maintainer-add/remove history
     from the npm packument and flags account-takeover patterns (a new
     maintainer who published shortly after being added, a sudden full
     maintainer-list replacement, a long-standing maintainer quietly
     dropped) plus GitHub repo transfers/archival.
   - `check_package_provenance` — checks npm's Sigstore publish provenance
     against reality: does the attested source repo/commit match
     `package.json`'s declared repository, is this package missing
     provenance while its npm-scope/maintainer peers consistently have it,
     and does the tarball's install scripts/dependencies match what's
     actually committed at the attested source commit (a mismatch here is
     the stolen-npm-token publish pattern). Structural only, not a
     cryptographic re-verification.
7. Only call `get_latest_advisories` if the user separately asks for broader
   npm-ecosystem context — it is not part of the default flow.
8. If the user asks about license policy/compliance (or pastes an
   allow/deny list), call `check_license_compliance` with the same parsed
   package list. With no `policy` given it applies the default enterprise
   rule (copyleft/network-copyleft/proprietary = violation); pass
   `policy: { allow, deny }` when the user states their own rule. Report
   `needsReview` licenses (unrecognized/mixed SPDX expressions) separately
   from confirmed violations — don't silently treat "unknown" as compliant.
9. Once you have the full set of flagged CVE/GHSA findings (from step 3
   and/or 5), and there is more than a couple of them, call
   `prioritize_remediation` with one `{packageName, cveId, severity,
   currentVersion, fixedVersion}` entry per finding to get a patch-now /
   patch-soon / scheduled / monitor tier per finding (CISA KEV status
   overrides everything else; EPSS exploitation probability is the primary
   ranking signal otherwise; severity is the fallback). Lead the summary
   report with this ranking instead of a flat severity list — it answers
   "what do I fix first," which is usually what the user actually needs from
   an audit with more than a few findings.
10. For any package that ends up flagged as deprecated, vulnerable at its
    latest version, abandoned/stale, or a confirmed typosquat, offer (don't
    force) a replacement: `suggest_alternative` combines the maintainer's own
    deprecation hints with category-matched search results and returns
    plain-language `whySuggested` notes per candidate, or a
    `nonPackageAlternatives` entry when a language built-in supersedes the
    package entirely. Call it when the user asks what to use instead, or
    proactively name it as available in the summary rather than always
    running it unasked for every flagged package.
11. Produce one summary report: a table of package → flagged issue(s) (CVE/
    GHSA id + severity + fixed version, "risky install script", "deprecated/
    unmaintained", "possible typosquat", "maintainer/provenance anomaly",
    and/or "license violation") → the `npmscanUrl` from that tool's result →
    a one-line recommendation (upgrade to the fixed version, patch, replace,
    or no action needed). If `prioritize_remediation` ran, order the table by
    its tier/rank instead of by package name.

## Comparing two snapshots (PR review)

When the user gives a **before** and **after** snapshot (any mix of
`package.json`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`) and asks
what changed, call `diff_dependencies({ before, after })` directly — this
replaces the batch-query flow above, it doesn't precede it.

- Lead with `installScriptIntroduced` findings — a routine-looking version
  bump that quietly adds a postinstall script is the shape of a
  compromised-maintainer supply-chain attack, and is the single highest-
  signal field this tool returns.
- Report `vulnerabilityDelta` per changed package (introduced / fixed /
  still-vulnerable / still-clean), not just a final isVulnerable flag — the
  direction of the change is the point of a diff.
- Note the detected `beforeFormat`/`afterFormat` and any `comparisonNote`
  when the two snapshots are different formats (e.g. a range in
  `package.json` resolved against a pinned lockfile version).
- yarn.lock has no direct/transitive distinction, so a diff against a
  yarn.lock covers every resolved package in the file, not just direct
  dependencies — say so if relevant to what changed.

## Output requirements

- Always include the `npmscanUrl` for every flagged package so the user can
  read the full write-up on npmscan.com.
- Keep known-vulnerability, install-script, maintenance/deprecation,
  typosquat, maintainer/provenance, and license risk visually separate — a
  package with no CVEs but a `postinstall` script (or a `possibleTyposquatOf`
  flag) is not "clean."
- When a CVE has a `fixedVersion`, name it directly in the recommendation
  ("upgrade to X.Y.Z") rather than a generic "upgrade the package."
- State which set was audited (e.g. "checked 24 production dependencies,
  skipped devDependencies").
- If the input was an SBOM, state that non-npm entries (if any) were skipped
  and surface the tool's warning/ignored-count metadata when relevant.

## Do not

- Do not guess a version that wasn't provided — call `batch_query_vulnerabilities`
  without a version rather than inventing one.
- Do not fabricate CVE/GHSA ids, severities, or fixed versions beyond what
  the tools returned.
- Do not silently drop non-npm SBOM entries — say they were skipped because
  npmscan's vulnerability pipeline is npm-only.
- Do not treat `possibleTyposquatOf` as proof of malice — it's a rule-based
  heuristic (name similarity + low popularity), not a verdict. Report it as
  "worth verifying," matching the tool's own hedged language.
- Do not run `check_maintainer_changes`/`check_package_provenance` across an
  entire large inventory by default — reserve them for flagged/suspicious
  packages or an explicit request, they're per-package deep checks, not a
  batch scan.
- Do not treat a missing `provenance` or a repository transfer as confirmed
  compromise on its own — both tools return hedged findings meant to prompt
  verification, not a verdict.
- Do not invent a replacement package name — `suggest_alternative` already
  distinguishes maintainer-named replacements from category-matched guesses
  and reports `nonPackageAlternatives` when no package is the right answer;
  don't override that with your own guess.
- Do not attempt to install, upgrade, or publish packages yourself; this
  skill only reads data through NPMScan's read-only MCP tools.

## Tools used

`batch_query_vulnerabilities`, `get_package`, `get_package_version`,
`analyze_install_script`, `analyze_transitive_dependencies`,
`check_maintainer_changes`, `check_package_provenance`,
`check_license_compliance`, `diff_dependencies`, `prioritize_remediation`,
`suggest_alternative`, `get_latest_advisories` — all provided by the
`npmscan` MCP server bundled with this plugin (`.mcp.json`). See
[references/test-prompts.md](references/test-prompts.md) for prompts to
manually verify this skill after installing or editing it.
