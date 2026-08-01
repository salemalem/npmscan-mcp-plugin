# Plugin Directory submission — copy/paste reference

Values for the `platform.claude.com/plugins/submit` form
(Plugin Directory, step "Plugin information"). Sourced from
`.claude-plugin/plugin.json` and this repo's README — not guessed.

## Step 2: Plugin information

**Link to plugin**
```
https://github.com/salemalem/npmscan-mcp-plugin
```

**Path within repository** (optional)
Leave blank — the plugin lives at the repo root, not a subdirectory.

**Plugin homepage** (optional)
```
https://npmscan.com/docs/mcp
```

**Plugin name**
```
npmscan
```

**Plugin description**
```
Detect malicious, vulnerable, or typosquatted npm packages from a conversation. Search the npm registry, inspect maintainers and install scripts before installing, and query OSV.dev / GitHub Security Advisories for one package or a whole package.json at once — via npmscan.com's free, read-only MCP server.
```

**Example use cases**
```
Example 1: Paste a package.json and ask "audit my dependencies for vulnerabilities" — the dependency-audit skill batch-queries OSV.dev for every dependency, flags risky preinstall/postinstall scripts separately from known CVEs, and returns one report with npmscan.com links.
Example 2: Ask "does lodash have any known vulnerabilities?" — query_vulnerabilities looks up OSV.dev for a single package.
Example 3: Ask "find npm packages for parsing CSV files" — search_packages searches the npm registry by keyword.
Example 4: Ask "before I install left-pad, check its maintainers and install scripts" — get_package returns maintainers, license, and preinstall/postinstall scripts as a risk signal.
Example 5: Ask "is minimist 1.2.5 affected by anything, and what are the latest critical npm advisories?" — get_package_version checks the pinned version, get_latest_advisories returns severity-filtered recent GitHub Security Advisories.
```

## Step 3: Submission details

**Supported platforms**
Check **Claude Code** only. Only Claude Code has actually been tested
(`--plugin-dir`, `/plugin install`, `claude plugin validate`) — don't check
Claude Cowork unless/until it's been tried there too, since the form asks
you to confirm it works on whatever you select.

**License type** (optional)
```
MIT
```

**Privacy policy URL** (optional)
```
https://npmscan.com/privacy
```

**Contact email**
```
shyngys@blockhacks.io
```

## MCP Registry submission (registry.modelcontextprotocol.io)

`server.json` lives in the **main npmscan repo**, at
`npmscan/mcp/server.json` — not in this plugin repo. Reasoning: the Registry
entry describes the MCP *server itself* (the code at
`src/app/api/mcp/route.ts` in the main repo), independent of any one client's
packaging of it. This plugin repo is Claude-Code-specific (skills,
`plugin.json`, `marketplace.json`); the server's actual source lives in
`npmscan`, so that's where `server.json`'s `repository` field should point
and where the file itself belongs — same folder as the other cross-client
submission artifacts (`chatgpt-app-submission.json`, etc.).

Steps to actually publish (needs the `mcp-publisher` CLI — not yet
installed/run as of this writing):

```bash
# install (macOS/Linux)
curl -L "https://github.com/modelcontextprotocol/registry/releases/latest/download/mcp-publisher_$(uname -s | tr '[:upper:]' '[:lower:]')_$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/').tar.gz" | tar xz mcp-publisher && sudo mv mcp-publisher /usr/local/bin/

# from inside npmscan/mcp/ (or npmscan/, mcp-publisher just needs
# server.json in the working directory)
mcp-publisher login github
mcp-publisher publish
```

Current `server.json` uses GitHub-auth naming (`io.github.salemalem/npmscan`),
which matches the repo owner so `login github` should work as-is. A cleaner
`com.npmscan/...` name is possible instead via **DNS authentication** on
npmscan.com (you already control the domain from the OpenAI verification
challenge) — not set up; see
[modelcontextprotocol.io/registry/authentication](https://modelcontextprotocol.io/registry/authentication)
if you want to switch before first publish (renaming after publishing may not
be simple — check the docs first).

Bump `version` in `npmscan/mcp/server.json` on every republish. It doesn't
need to match this plugin's `plugin.json` version — they're independent
artifacts now (one describes the server, one describes the Claude Code
packaging of it).

## Other directories to check/submit

Not yet done, roughly in order of expected payoff:

- [ ] MCP Registry (above) — feeds many downstream tools automatically
- [ ] [Smithery](https://smithery.ai) — submission mechanics not confirmed
      firsthand (page blocked automated fetch); check their docs directly
- [ ] [Glama](https://glama.ai/mcp) — auto-indexes public GitHub repos, may
      already appear once the repo has some visibility; check for a claim flow
- [ ] [PulseMCP](https://www.pulsemcp.com) — Registry backer, likely
      auto-syncs from it eventually; check if a direct submission is faster
- [ ] [mcp.so](https://mcp.so) — submit via site or
      [GitHub issues](https://github.com/opentools-ai/mcp.so/issues)
- [ ] [`punkpeye/awesome-mcp-servers`](https://github.com/punkpeye/awesome-mcp-servers)
      — one-line PR, low effort/low functional value, mostly discoverability

Skip: PR'ing into `modelcontextprotocol/servers` directly — that repo is for
the MCP org's own reference implementations; their docs point third-party
servers to the Registry instead.

## Other reference

- Validate before submitting: `claude plugin validate .` (passes clean as of
  this writing)
- Full tool list and skill details: see [README.md](README.md)
