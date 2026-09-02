# Changelog

## 1.2.0

- Adds eight tools, bringing the server to fifteen total:
  - `analyze_install_script` — fetches a package's published tarball and
    statically scans its lifecycle scripts (and the files they reference)
    against npmscan's red-flags rubric, returning a `totalScore`/`riskTier`.
  - `analyze_transitive_dependencies` — recursively resolves a
    dependency graph up to 3 levels deep and batch-checks every resolved
    package against OSV.dev, naming which direct dependency pulled in each
    vulnerable transitive package via `vulnerablePaths`.
  - `check_package_provenance` — cross-checks a version's Sigstore publish
    provenance against reality (source-repo match, peer-provenance norms,
    tarball-vs-source diff) to catch the stolen-npm-token publish pattern.
  - `check_maintainer_changes` — reconstructs maintainer add/remove history
    from the npm packument to flag account-takeover patterns, plus GitHub
    repo transfer/archival checks.
  - `check_license_compliance` — classifies declared SPDX licenses against
    a default or custom allow/deny policy, understanding `OR`/`AND`/`WITH`
    expressions.
  - `diff_dependencies` — compares two package.json/lockfile snapshots
    (e.g. before/after a PR) and reports added/removed/bumped packages,
    newly introduced install scripts, and per-package vulnerability deltas.
  - `prioritize_remediation` — ranks a batch of already-flagged
    vulnerabilities into patch-now/patch-soon/scheduled/monitor tiers using
    CISA KEV and FIRST EPSS.
  - `suggest_alternative` — suggests better-maintained replacements for a
    deprecated/vulnerable/abandoned/suspicious package.
- `batch_query_vulnerabilities` now also accepts raw `package.json`/
  lockfile/CycloneDX/SPDX content via a `content` input and chunks large
  inventories internally, instead of requiring a pre-parsed `packages` array
  capped at 100 per call.
- Adds the `/npmscan:package-trust-check` skill — a deep, single-package
  trust investigation (maintainer history, provenance, install scripts) for
  "is X safe / was X compromised" questions, distinct from auditing a whole
  dependency list.
- Updates the `dependency-audit` skill to use the new tools: transitive
  vulnerability coverage, install-script deep-dives, maintainer/provenance
  checks on flagged packages, license-policy checks, PR-diff review, and
  remediation prioritization, plus SBOM (CycloneDX/SPDX) input support.

## 1.1.0

- Adds the `get_cve` tool: look up one exact CVE ID in the NIST NVD, or
  browse/search by keyword, CVSS severity, CWE, or publication-date range.
  Enriches results with CISA KEV (confirmed actively-exploited) status and
  FIRST.org EPSS (30-day exploitation probability), falling back to the raw
  MITRE CVE record when NVD has no record yet.
- `get_package` and `get_package_version` now each check OSV.dev directly
  and return `isLatestVersionVulnerable`/`isVulnerable` plus
  `highestSeverity` as a safe/not-safe verdict, with severity, summary, and
  `fixedVersion` per finding — no separate `query_vulnerabilities` call
  needed just to learn a package you already fetched is vulnerable.
  `query_vulnerabilities` itself got the same `isVulnerable`/
  `highestSeverity` treatment, replacing its previous raw OSV passthrough.
- `get_package`/`get_package_version` results also include
  `maintenanceSummary`, `topPackagesRank`, and `downloadTrend`; the
  `dependency-audit` skill surfaces `maintenanceSummary`/`deprecated` and
  `possibleTyposquatOf` as findings distinct from CVEs, and names each
  vulnerability's `fixedVersion` directly in its recommendations.
- `batch_query_vulnerabilities` findings now come fully detailed (severity,
  summary, fixed version) by default; the skill only re-queries
  `query_vulnerabilities` for packages the batch result's `enrichmentNote`
  flags as ID-only.

## 1.0.0

- Initial release.
- Bundles the `npmscan` remote MCP server (`https://npmscan.com/api/mcp`):
  `search_packages`, `get_package`, `get_package_version`,
  `query_vulnerabilities`, `batch_query_vulnerabilities`,
  `get_latest_advisories`.
- Adds the `dependency-audit` skill, which chains
  `batch_query_vulnerabilities` → `get_package`/`get_package_version` → an
  optional `get_latest_advisories` into one dependency-audit report instead
  of leaving tool sequencing to the model each time.
- Ships its own `marketplace.json` so the repo can be added directly with
  `/plugin marketplace add <owner>/npmscan-mcp-plugin`.
