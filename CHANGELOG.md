# Changelog

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
