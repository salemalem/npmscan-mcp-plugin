# NPMScan plugin for Claude Code

A [Claude Code plugin](https://code.claude.com/docs/en/plugins) that gives
Claude read-only npm package and vulnerability lookups, backed by
[npmscan.com](https://npmscan.com)'s free, unauthenticated MCP server.

## What it adds

- **MCP server** (`npmscan`, `https://npmscan.com/api/mcp`) with six tools —
  see [Tools](#tools) below. Every tool result includes an `npmscanUrl`
  linking back to the full write-up on npmscan.com. No API key or auth
  required — same public data as the website. The server is stateless and
  rate-limited to 30 requests/minute per IP.

- **`/npmscan:dependency-audit` skill** — chains
  `batch_query_vulnerabilities` → `get_package`/`get_package_version` → an
  optional `get_latest_advisories` into one dependency-audit report, instead
  of leaving that tool sequencing to Claude each time. Triggers automatically
  when you paste a `package.json`/lockfile or ask to check/audit your
  dependencies, or invoke it directly. See
  [`skills/dependency-audit/SKILL.md`](skills/dependency-audit/SKILL.md).

## Tools

NPMScan provides six tools:

### `search_packages`

Search the npm registry by package name or keywords.

### `get_package`

Inspect the latest version of an npm package, including maintainers,
license, install scripts such as `preinstall` and `postinstall`, and recent
version history.

### `get_package_version`

Retrieve metadata for an exact package version. Useful when reviewing
dependencies pinned in a lockfile.

### `query_vulnerabilities`

Check a package for known vulnerabilities using OSV.dev, optionally for a
specific version.

### `batch_query_vulnerabilities`

Check up to 100 npm packages for known vulnerabilities in a single request.
Useful for auditing dependencies from a `package.json` or lockfile.

### `get_latest_advisories`

Query the latest reviewed GitHub Security Advisories affecting the npm
ecosystem, with filters for severity, vulnerability category, package, GHSA
ID, and CVE ID.

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
