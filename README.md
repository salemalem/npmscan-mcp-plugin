# NPMScan plugin for Claude Code

A [Claude Code plugin](https://code.claude.com/docs/en/plugins) that gives
Claude read-only npm package and vulnerability lookups, backed by
[npmscan.com](https://npmscan.com)'s free, unauthenticated MCP server.

## What it adds

- **MCP server** (`npmscan`, `https://npmscan.com/api/mcp`) with fifteen
  tools — see [Tools](#tools) below. Every tool result includes an
  `npmscanUrl` linking back to the full write-up on npmscan.com. No API key
  or auth required — same public data as the website. The server is
  stateless and rate-limited to 30 requests/minute per IP.

- **`/npmscan:dependency-audit` skill** — chains `batch_query_vulnerabilities`
  → `get_package`/`get_package_version` → `analyze_transitive_dependencies`
  → the maintainer/provenance/license/remediation/alternative tools into one
  dependency-audit report, instead of leaving that tool sequencing to Claude
  each time. Also handles PR-style before/after diffs via
  `diff_dependencies`. Triggers automatically when you paste a
  `package.json`/lockfile/SBOM or ask to check/audit your dependencies, or
  invoke it directly. See
  [`skills/dependency-audit/SKILL.md`](skills/dependency-audit/SKILL.md).

- **`/npmscan:package-trust-check` skill** — a deep, single-package
  investigation for "is X safe / was X compromised" questions: maintainer
  add/remove history (account-takeover patterns), publish-provenance
  cross-checks, and install-script scanning, in one report. Triggers
  automatically on a trust question about one named package; not for
  auditing a whole dependency list (that's `dependency-audit`). See
  [`skills/package-trust-check/SKILL.md`](skills/package-trust-check/SKILL.md).

## Tools

NPMScan provides fifteen tools:

| Tool | Description |
|---|---|
| `search_packages` | Search the npm registry by name or keywords. Each result includes weekly/monthly download counts, dependent-package counts, and rank among npmscan's own top-100k-by-downloads snapshot, so you can tell an established package from an abandoned or squatted one that merely matches the query text — flags `possibleTyposquatOf` when a low-popularity result's name is one typo away from a top-5,000 package. |
| `get_package` | Latest version, install scripts (`preinstall`/`postinstall`), maintainers, license, recent version history, weekly downloads, GitHub stars, TypeScript support, days since last publish, ecosystem-wide download rank, a 3-month download trend, and an `isLatestVersionVulnerable`/`highestSeverity` verdict (with fixed versions) — plus a rule-based (not model-generated) maintenance/popularity summary and typosquat flag computed from those numbers. |
| `get_package_version` | Metadata for one exact version plus an OSV.dev check scoped to that version — `isVulnerable`/`highestSeverity` as a direct safe/not-safe answer, with each finding's severity, summary, and fixed version. For checking a version pinned in a lockfile. |
| `query_vulnerabilities` | OSV.dev lookup for known vulnerabilities affecting a package, optionally scoped to a version, with `isVulnerable`/`highestSeverity` as a direct verdict and each finding's severity, summary, and fixed version. |
| `batch_query_vulnerabilities` | OSV.dev lookup across a whole dependency inventory at once — pass a flat `packages` list, or paste raw `package.json`/lockfile/CycloneDX JSON/SPDX JSON content via `content` and it parses that for you. Chunks large inventories internally rather than stopping at OSV's own 100-package batch limit, with severity, summary, CVE aliases, and fixed version enriched per finding. |
| `get_latest_advisories` | Latest reviewed GitHub Security Advisories for the npm ecosystem. Filterable by severity, vulnerability category, affected package name, or an exact GHSA/CVE ID lookup. Cursor-paginated. |
| `get_cve` | NIST NVD lookup for one exact CVE ID (authoritative CVSS score/vector, CWEs, references), or a keyword/severity/CWE/date-range search. Enriched with CISA KEV status (actively exploited in the wild?) and FIRST.org EPSS (30-day exploitation probability). Falls back to the raw MITRE CVE record when NVD has no data yet. Not npm-scoped — NVD covers every ecosystem. |
| `analyze_install_script` | Fetches a package's published tarball and statically scans its `preinstall`/`install`/`postinstall`/`prepare` lifecycle scripts — and the files they reference, pulled from the tarball itself — against npmscan's red-flags rubric (`child_process` use, network calls, sensitive-path/env access, obfuscation, untrusted remote binaries, exfil hosts, eval on decoded strings, CI telemetry) plus a typosquat check. Returns a `totalScore` and `riskTier`. A heuristic static scan, not proof of malice — it doesn't execute code or check maintainer history. |
| `analyze_transitive_dependencies` | Recursively resolves 1-15 direct/root packages' dependency graphs to a configurable depth (default 2, max 3) and batch-checks every resolved package against OSV.dev — surfaces vulnerabilities buried several levels deep that a flat `batch_query_vulnerabilities` call would miss, with `vulnerablePaths` naming which direct dependency pulled in each vulnerable transitive package. A total-node budget caps runaway graphs, reported via `truncated`/`truncationNote` rather than silently returning a partial scan as complete. |
| `check_package_provenance` | Checks a version's npm/Sigstore publish provenance against reality: flags a non-GitHub-hosted builder or an attested source repo that doesn't match `package.json`'s own `repository` field; flags a package missing provenance while its npm-scope/maintainer peers consistently have it; and diffs the published tarball's install scripts/dependencies against the source repository at the attested commit — the pattern of a stolen-npm-token publish that bypasses CI. Structural only, not a cryptographic re-verification of the Sigstore bundle. |
| `check_maintainer_changes` | Reconstructs a package's maintainer-add/remove history from the npm packument and flags account-takeover patterns — a new maintainer who published shortly after being added, a sudden full maintainer-list replacement, a long-standing maintainer quietly dropped, or a maintainer change not yet tied to any release. Also cross-checks the declared GitHub repository for transfers/archival. |
| `check_license_compliance` | Given a package list and an optional allow/deny license policy, classifies each declared SPDX license (permissive/weak-copyleft/copyleft/network-copyleft/proprietary/public-domain/unknown), understands simple SPDX expressions (`OR`/`AND`/`WITH`), and reports a compliance verdict per package. With no policy given, applies a default rule flagging only copyleft/network-copyleft/proprietary. Ambiguous expressions are reported as `needsReview`, not silently guessed at. |
| `diff_dependencies` | Compares two raw snapshots of a `package.json`, `package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml` — e.g. before/after a PR — and reports added/removed/version-bumped packages. For every added or bumped package, flags a newly introduced install script (`installScriptIntroduced`, the highest-signal field here) and reports `vulnerabilityDelta` (introduced/fixed/still-vulnerable/still-clean) rather than a bare vulnerable flag. Ideal for a CI gate reviewing a dependency-changing PR. |
| `prioritize_remediation` | Given a batch of already-flagged vulnerability findings, ranks them by what to actually fix first: CISA KEV status (confirmed active exploitation — an automatic top-priority override), FIRST.org EPSS (30-day exploitation probability, the primary ranking signal), and severity (fallback) combine into a `patch-now`/`patch-soon`/`scheduled`/`monitor` tier per finding. Doesn't re-query OSV/NVD itself — only adds KEV/EPSS enrichment and ranks findings you already have. |
| `suggest_alternative` | Suggests better-maintained replacements for a deprecated, vulnerable, abandoned, or suspicious package by combining maintainer-provided deprecation hints with deterministic npm search/category ranking, filtering out typosquats and weak/stale contenders, and returning plain-language `whySuggested` notes — or a `nonPackageAlternatives` entry when a language built-in supersedes the package entirely. |

## Install

### Option 1: add this repo as a marketplace

```
/plugin marketplace add salemalem/npmscan-mcp-plugin
/plugin install npmscan@npmscan
/reload-plugins
```

### Option 2: point Claude Code at a local checkout

```
claude --plugin-dir ./npmscan-mcp-plugin
```

Useful for testing changes before pushing them.

### Option 3: skip the plugin, add the MCP server directly

If you only want the tools (no bundled skills), you don't need this repo at
all:

```
claude mcp add --transport http npmscan https://npmscan.com/api/mcp
```

or in `.mcp.json` / `~/.claude.json`:

```json
{
  "mcpServers": {
    "npmscan": {
      "type": "http",
      "url": "https://npmscan.com/api/mcp"
    }
  }
}
```

(The `"type": "http"` field is required — Claude Code treats an entry with a
`url` but no `type` as misconfigured and skips it.)

## Try it

```
Does lodash have any known vulnerabilities?
Find npm packages for parsing CSV files
Before I install left-pad, tell me about its maintainers and install scripts.
Is chalk 5.3.1 safe? I heard there was a supply-chain incident.
What changed between these two package-lock.json snapshots?
```

Or paste a `package.json` and ask "audit my dependencies for vulnerabilities."

## Repo layout

```
npmscan-mcp-plugin/
├── .claude-plugin/
│   ├── plugin.json        # plugin manifest
│   └── marketplace.json   # lets this repo be added directly as a marketplace
├── .mcp.json               # bundles the npmscan MCP server
└── skills/
    ├── dependency-audit/
    │   ├── SKILL.md
    │   └── references/test-prompts.md
    └── package-trust-check/
        ├── SKILL.md
        └── references/test-prompts.md
```

## Validate and test locally

```bash
claude plugin validate .
claude --plugin-dir .
```

Then in the session, run `/npmscan:dependency-audit` or
`/npmscan:package-trust-check` (or just paste a `package.json`/name a
package and ask) to exercise each skill, and try the prompts in
[`skills/dependency-audit/references/test-prompts.md`](skills/dependency-audit/references/test-prompts.md)
and
[`skills/package-trust-check/references/test-prompts.md`](skills/package-trust-check/references/test-prompts.md).

## Submitting to a marketplace

- **Self-hosted (this repo)**: nothing further to do — anyone can
  `/plugin marketplace add` this repo directly, as shown above.
- **`claude-plugins-community`**: submit via
  [claude.ai/admin-settings/directory/submissions/plugins/new](https://claude.ai/admin-settings/directory/submissions/plugins/new)
  (Team/Enterprise orgs) or
  [platform.claude.com/plugins/submit](https://platform.claude.com/plugins/submit)
  (individual authors). Run `claude plugin validate .` first — the review
  pipeline runs the same check.
- **`claude-plugins-official`**: curated directly by Anthropic; there's no
  application form for it.

See Anthropic's [plugin docs](https://code.claude.com/docs/en/plugins) for
the full development and distribution guide.

## Also available for other AI clients

The same `npmscan` MCP server and equivalent `dependency-audit` /
`package-trust-check` skills are also submitted to OpenAI's ChatGPT Plugins
directory (submission artifacts live in the main
[npmscan](https://npmscan.com) app repo, under `mcp/`). Each pair of skills
is kept in sync by hand; if you change a workflow here, mirror the change
there too.

## License

MIT — see [LICENSE](LICENSE).

Made by [BlockHacks.io](https://npmscan.com) — protecting the open source
ecosystem.
