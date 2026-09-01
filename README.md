# NPMScan plugin for Claude Code

A [Claude Code plugin](https://code.claude.com/docs/en/plugins) that gives
Claude read-only npm package and vulnerability lookups, backed by
[npmscan.com](https://npmscan.com)'s free, unauthenticated MCP server.

## What it adds

- **MCP server** (`npmscan`, `https://npmscan.com/api/mcp`) with seven
  tools — see [Tools](#tools) below. Every tool result includes an
  `npmscanUrl` linking back to the full write-up on npmscan.com. No API key
  or auth required — same public data as the website. The server is
  stateless and rate-limited to 30 requests/minute per IP.

- **`/npmscan:dependency-audit` skill** — chains
  `batch_query_vulnerabilities` → `get_package`/`get_package_version` → an
  optional `get_latest_advisories` into one dependency-audit report, instead
  of leaving that tool sequencing to Claude each time. Triggers automatically
  when you paste a `package.json`/lockfile or ask to check/audit your
  dependencies, or invoke it directly. See
  [`skills/dependency-audit/SKILL.md`](skills/dependency-audit/SKILL.md).

## Tools

NPMScan provides seven tools:

### `search_packages`

Search the npm registry by package name or keywords.

### `get_package`

Inspect the latest version of an npm package, including maintainers,
license, install scripts such as `preinstall` and `postinstall`, recent
version history, GitHub stars, TypeScript support, and deterministic
`popularityTier`/`maintenanceTier` labels with a plain-language
`maintenanceSummary`. Flags `possibleTyposquatOf` when a low-popularity
package's name is one typo away from a top-5,000 package. Also checks the
latest version against OSV.dev — `isLatestVersionVulnerable`/
`highestSeverity` give a direct safe/not-safe verdict, with severity,
summary, and `fixedVersion` per finding.

### `get_package_version`

Retrieve metadata for an exact package version — useful when reviewing
dependencies pinned in a lockfile — and check that exact version against
OSV.dev for known vulnerabilities, returning `isVulnerable`/
`highestSeverity` as a direct verdict plus severity, summary, and
`fixedVersion` per finding.

### `query_vulnerabilities`

Check a package for known vulnerabilities using OSV.dev, optionally scoped
to one exact version. Returns `isVulnerable`/`highestSeverity` as a direct
verdict, plus each finding's severity, summary, CVE aliases, and
`fixedVersion` — not a raw advisory dump.

### `batch_query_vulnerabilities`

Check up to 100 npm packages for known vulnerabilities in a single request.
Useful for auditing dependencies from a `package.json` or lockfile.

### `get_latest_advisories`

Query the latest reviewed GitHub Security Advisories affecting the npm
ecosystem, with filters for severity, vulnerability category, package, GHSA
ID, and CVE ID.

### `get_cve`

Look up one exact CVE ID in the NIST NVD, or browse/search NVD by keyword,
CVSS severity, CWE, or publication-date range. Results are enriched with
CISA KEV status (confirmed actively-exploited-in-the-wild) and FIRST.org
EPSS (30-day exploitation probability) — falls back to the raw MITRE CVE
record when NVD has no record yet. Unlike the other tools, NVD isn't
npm-scoped, so pass a package name via `keywordSearch` to narrow results.

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

If you only want the tools (no bundled skill), you don't need this repo at
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
    └── dependency-audit/
        ├── SKILL.md
        └── references/test-prompts.md
```

## Validate and test locally

```bash
claude plugin validate .
claude --plugin-dir .
```

Then in the session, run `/npmscan:dependency-audit` (or paste a
`package.json` and ask for an audit) to exercise the skill, and try the
prompts in
[`skills/dependency-audit/references/test-prompts.md`](skills/dependency-audit/references/test-prompts.md).

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

The same `npmscan` MCP server and an equivalent `dependency-audit` skill are
also submitted to OpenAI's ChatGPT Plugins directory (submission artifacts
live in the main [npmscan](https://npmscan.com) app repo, under `mcp/`). The
two skills are kept in sync by hand; if you change the audit workflow here,
mirror the change there too.

## License

MIT — see [LICENSE](LICENSE).

Made by [BlockHacks.io](https://npmscan.com) — protecting the open source
ecosystem.
