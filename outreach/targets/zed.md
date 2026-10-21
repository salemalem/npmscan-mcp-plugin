# Zed

**Status: ✅ nothing to submit; add a README snippet** (analysed 2026-10-17).

- Zed connects to remote servers natively: Settings → AI → MCP Servers → Add Remote Server, or `context_servers` with a `url` ([docs](https://zed.dev/docs/ai/mcp)). No extension is needed.
- Zed's MCP *extensions* only support servers shipped as binaries or npm packages, not hosted ones. Zed says it **plans to deprecate MCP extensions in favor of the official MCP Registry** ([docs](https://zed.dev/docs/extensions/mcp-extensions)), and npmscan is already there.
- [ ] Add a "Using it with Zed" README section:
  ```json
  { "context_servers": { "npmscan": { "url": "https://npmscan.com/api/mcp" } } }
  ```
