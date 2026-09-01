# Changelog

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
