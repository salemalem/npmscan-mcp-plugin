# Installing the NPMScan MCP server

NPMScan is a hosted, remote MCP server. There is nothing to clone, build or
run locally, and it needs no API key, account or environment variables.

- Endpoint: `https://npmscan.com/api/mcp`
- Transport: Streamable HTTP
- Auth: none (all 23 tools are read-only lookups of public npm and advisory data)

## Cline

Run:

```bash
cline mcp install npmscan --transport http https://npmscan.com/api/mcp --yes
```

Or add this to `cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "npmscan": {
      "type": "streamableHttp",
      "url": "https://npmscan.com/api/mcp"
    }
  }
}
```

## Check that it works

Ask: "Is the npm package event-stream@3.3.6 safe?" The answer should come from
the `get_package_version` tool and flag the malicious flatmap-stream
compromise.

More setup options for other clients: https://npmscan.com/mcp
