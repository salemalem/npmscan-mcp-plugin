---
name: dependency-audit
description: Audit a project's npm dependencies for known vulnerabilities and risky install scripts using NPMScan's live npm registry, OSV.dev, and GitHub Advisories data. Use when the user pastes or attaches a package.json/lockfile, lists several dependencies, or asks to check/audit/scan their packages for security issues before installing, upgrading, or shipping.
---

# NPMScan dependency audit

Use this skill when the user wants a security check across multiple npm
packages at once (a `package.json`, a lockfile, or a plain list of
`name@version` pairs) — not for a question about a single package, which you
can answer directly with the `get_package` or `query_vulnerabilities` tools
from the `npmscan` MCP server without needing this workflow.

## Input

Accept dependency name+version pairs from:
- Pasted `package.json` contents (use `dependencies`; only include
  `devDependencies` if the user asks to include dev dependencies — state
  explicitly which set you audited).
- Pasted lockfile contents (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`).
- A plain list the user typed, e.g. "lodash 4.17.15, express 4.17.1".

If the message contains no parseable package list at all, ask the user to
paste their `package.json` or lockfile rather than guessing at what to audit.

## Steps

1. Parse every dependency into `name` and, when available, an exact
   `version`.
2. Call the `batch_query_vulnerabilities` tool once with all parsed packages.
   It accepts up to 100 packages per call — if there are more, split into
   multiple batch calls and tell the user you chunked the request rather than
   silently dropping packages. Each finding already includes severity, a
   summary, CVE aliases, and the fixed version — do not call
   `query_vulnerabilities` again per flagged package just to re-fetch detail
   you already have. The only exception: if the result has an
   `enrichmentNote` (a very large audit crossed the enrichment cap), the
   vulnerabilities it names are ID-only — call `query_vulnerabilities` on
   those *specific* packages if the user needs full detail on them.
3. For every package the batch call flags, follow up with `get_package`
   (or `get_package_version` when an exact version was provided) to check
   maintainers, license, and install scripts (`preinstall`/`postinstall`).
   Treat install scripts as a separate risk signal from known CVEs/GHSAs, not
   something folded into the same score. Also surface what `get_package`
   already computes for you: `deprecated`/`maintenanceSummary` (a deprecated
   or abandoned dependency is a real finding, not just a CVE footnote) and
   `possibleTyposquatOf` (if set, this package's name is one typo away from a
   much more popular one — flag it prominently as a supply-chain risk to
   verify, not as confirmed malice).
4. Only call `get_latest_advisories` if the user separately asks for broader
   npm-ecosystem context — it is not part of the default flow.
5. Produce one summary report: a table of package → flagged issue(s)
   (CVE/GHSA id + severity + fixed version, "risky install script",
   "deprecated/unmaintained", and/or "possible typosquat") → the
   `npmscanUrl` from that tool's result → a one-line recommendation
   (upgrade to the fixed version, patch, replace, or no action needed).

## Output requirements

- Always include the `npmscanUrl` for every flagged package so the user can
  read the full write-up on npmscan.com.
- Keep known-vulnerability, install-script, maintenance/deprecation, and
  typosquat risk visually separate — a package with no CVEs but a
  `postinstall` script (or a `possibleTyposquatOf` flag) is not "clean."
- When a CVE has a `fixedVersion`, name it directly in the recommendation
  ("upgrade to X.Y.Z") rather than a generic "upgrade the package."
- State which set was audited (e.g. "checked 24 production dependencies,
  skipped devDependencies").

## Do not

- Do not guess a version that wasn't provided — call
  `batch_query_vulnerabilities` without a version rather than inventing one.
- Do not fabricate CVE/GHSA ids, severities, or fixed versions beyond what
  the tools returned.
- Do not silently truncate a package list over 100 entries — chunk and say so.
- Do not treat `possibleTyposquatOf` as proof of malice — it's a rule-based
  heuristic (name similarity + low popularity), not a verdict. Report it as
  "worth verifying," matching the tool's own hedged language.
- Do not attempt to install, upgrade, or publish packages yourself; this
  skill only reads data through NPMScan's read-only MCP tools.

## Tools used

`batch_query_vulnerabilities`, `get_package`, `get_package_version`,
`get_latest_advisories` — all provided by the `npmscan` MCP server bundled
with this plugin (`.mcp.json`). See
[references/test-prompts.md](references/test-prompts.md) for prompts to
manually verify this skill after installing or editing it.
