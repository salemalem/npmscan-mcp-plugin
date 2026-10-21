# Official MCP Registry

Listed as `io.github.salemalem/npmscan`. `node outreach/scripts/refresh.ts` shows the latest published version.

`server.json` lives in the **main npmscan repo**, at
`npmscan/mcp/server.json` — not in this plugin repo. Reasoning: the Registry
entry describes the MCP *server itself* (the code at
`src/app/api/mcp/route.ts` in the main repo), independent of any one client's
packaging of it. This plugin repo is Claude-Code-specific (skills,
`plugin.json`, `marketplace.json`); the server's actual source lives in
`npmscan`, so that's where `server.json`'s `repository` field should point
and where the file itself belongs — same folder as the other cross-client
submission artifacts (`chatgpt-app-submission.json`, etc.).

How to publish a new version (needs the `mcp-publisher` CLI):

```bash
# install (macOS/Linux)
curl -L "https://github.com/modelcontextprotocol/registry/releases/latest/download/mcp-publisher_$(uname -s | tr '[:upper:]' '[:lower:]')_$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/').tar.gz" | tar xz mcp-publisher && sudo mv mcp-publisher /usr/local/bin/

# from inside npmscan/mcp/ (or npmscan/, mcp-publisher just needs
# server.json in the working directory)
mcp-publisher login github
mcp-publisher publish
```

`server.json` uses GitHub-auth naming (`io.github.salemalem/npmscan`),
which matches the repo owner, so `login github` works. A `com.npmscan/...` name
would need DNS authentication on npmscan.com
([docs](https://modelcontextprotocol.io/registry/authentication)); renaming an
already-published server may not be simple, so check the docs first.

Bump `version` in `npmscan/mcp/server.json` on every republish. It doesn't
need to match this plugin's `plugin.json` version — they're independent
artifacts now (one describes the server, one describes the Claude Code
packaging of it).
