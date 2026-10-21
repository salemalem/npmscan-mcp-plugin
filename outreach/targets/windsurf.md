# Windsurf (now Devin Desktop)

**Status: 🔜 no submission route; add a README snippet** (analysed 2026-10-17). Cognition renamed Windsurf to Devin Desktop.

- The docs moved to [docs.devin.ai](https://docs.devin.ai/desktop/cascade/mcp), which says: "Cascade does not have an MCP Marketplace or one-click install."
- Only the "Devin Local" agent has a marketplace. Its default source isn't documented, and no submission process is published. Team admins can add custom registries, which "must follow the official MCP registry schema".
- Cascade servers are added by hand in `mcp_config.json`, using `serverUrl` for remote HTTP servers.
- [ ] Add a "Using it with Windsurf / Devin Desktop" README section:
  ```json
  { "mcpServers": { "npmscan": { "serverUrl": "https://npmscan.com/api/mcp" } } }
  ```
- [ ] Later, if a contact turns up: ask Cognition where the Devin Local marketplace sources its servers. If it's the official MCP Registry, we're already covered.
