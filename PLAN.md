# Listing plan: getting npmscan into more AI tools

Last researched: 2026-10-18. Recheck the queue numbers before relying on them.

## Status at a glance

| Where | Status | Link |
|---|---|---|
| Claude (Anthropic plugin directory) | ✅ Listed | [listing](https://claude.ai/customize/skills/id/aa8fcafe-0bcd-41b6-9e07-6c7ebbb71153%40anthropic-plugin-directory) |
| ChatGPT Apps | ✅ Listed | [listing](https://chatgpt.com/plugins/plugin_asdk_app_6a6a699e6f3481918d5e6034432894f2?q=npm) |
| Official MCP Registry | ✅ Listed as `io.github.salemalem/npmscan` v3.1.2 | [API](https://registry.modelcontextprotocol.io/v0.1/servers?search=npmscan) |
| awesome-remote-mcp-servers | ✅ Listed | [README](https://github.com/punkpeye/awesome-remote-mcp-servers) |
| Glama | ✅ Listed as connector `com.npmscan/npmscan` | [listing](https://glama.ai/mcp/connectors/com.npmscan/npmscan) |
| Goose | ✅ Covered by the official MCP Registry (Goose retired its own directory) | [#11923](https://github.com/aaif-goose/goose/pull/11923) |
| Grok Build (xAI marketplace) | ⏳ PR open, waiting on xAI review | [xai-org/plugin-marketplace#1506](https://github.com/xai-org/plugin-marketplace/pull/1506) |
| Grok / Grok Bot / Cursor (xAI form) | ⏳ Submitted 2026-10-18; xAI replies by email | [form](https://x.ai/bot/marketplace/submit-a-plugin) |
| Kimi official marketplace | ⏳ See [KIMI.md](KIMI.md) | |
| Cursor Marketplace (Cursor's own) | 🔜 Next. Needs a manifest first. | [submit](https://cursor.com/marketplace/publish) |
| GitHub Copilot (awesome-copilot) | 🔜 Next | [repo](https://github.com/github/awesome-copilot) |
| Kiro powers | 🔜 Next. Needs a manifest and README additions. | [submit](https://kiro.dev/powers/submit/) |
| awesome-codex-plugins | 🔜 Next. Needs a manifest and `SECURITY.md`. | [repo](https://github.com/hashgraph-online/awesome-codex-plugins) |
| Gemini CLI gallery | 🔜 Next. Indexed automatically once the manifest and topic exist. | [docs](https://geminicli.com/docs/extensions/releasing/) |
| Cline MCP Marketplace | 🟡 Optional, slow queue | [repo](https://github.com/cline/mcp-marketplace) |
| Perplexity | 📧 Email only | see below |
| Mistral Le Chat | 📧 Business development only | see below |
| Docker MCP Catalog, Factory, Zed, Windsurf | ❌ Skip for now | see below |

## Next steps

### Step 1: one release that adds the missing manifests

Most of the 🔜 targets need files this repo doesn't have yet. Each one points at the same server (`https://npmscan.com/api/mcp`) and the same `skills/` folder, the way `kimi.plugin.json` already does.

- [ ] Root `plugin.json` in the "Agent Plugins" format, with `$schema`, `name`, `version`, `description`, `author`, `keywords` and `license`. Cursor, Kiro and Copilot's newer format read it.
- [ ] Root `mcp.json` with a matching Agent Plugins `$schema`. Cursor and Copilot's newer format read it. Keep `.mcp.json` for Claude Code.
- [ ] `.codex-plugin/plugin.json`, for the Codex list.
- [ ] `gemini-extension.json` at the root, for Gemini CLI.
- [ ] `SECURITY.md` with a vulnerability disclosure policy, for the Codex list.
- [ ] README additions: a privacy-policy link and a support contact, for Kiro.
- [ ] Check that Claude Code, Kimi and Grok Build still load the plugin correctly with the new root files present.
- [ ] Tag a release (for example `v3.2.0`). Copilot needs a tag plus a commit SHA.
- [ ] Add the `gemini-cli-extension` topic to the GitHub repo.

### Step 2: submit

- [ ] **Cursor:** submit the repo at [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish).
- [ ] **GitHub Copilot:** open the external-plugin issue form in `github/awesome-copilot` (not a PR).
- [ ] **Kiro:** submit at [kiro.dev/powers/submit](https://kiro.dev/powers/submit/).
- [ ] **Codex list:** run their scanner, then open a one-line README PR to `hashgraph-online/awesome-codex-plugins`.
- [ ] **Gemini CLI:** nothing to submit; check the [gallery](https://geminicli.com/extensions/) a day after tagging.
- [ ] **Cline (optional):** open an issue with the repo link and a 400×400 PNG logo.
- [ ] **Perplexity:** email `api@perplexity.ai` about a managed connector.

### Ongoing

- [ ] Watch [#1506](https://github.com/xai-org/plugin-marketplace/pull/1506) and the xAI form reply. Answer review comments.
- [ ] Each Grok Build update needs a new PR to `xai-org/plugin-marketplace` that bumps the pinned commit, then runs `python3 scripts/generate-plugin-index.py`, `scripts/validate-catalog.py` and `scripts/generate-plugin-index.py --check`. The index script fetches every plugin in the catalog and takes several minutes.
- [ ] When something is listed, move it to "Official listings" in [README.md](README.md) and update the table above.

## Details per target

### Grok Build (xAI)

- PR [#1506](https://github.com/xai-org/plugin-marketplace/pull/1506): a remote source pinned to `5cbf977` (v3.1.2), category `security`, brand-scoped keywords (`npmscan*`).
- All of xAI's local checks passed. Their "Validate catalog" workflow waits for a maintainer to approve it, because this is a first-time contributor.
- The source stays on the personal `salemalem` account rather than the NPMscan org, so the Claude and ChatGPT listings don't have to move. The PR's reviewer notes explain this.
- **Queue:** about 923 open PRs. Only about 26 third-party plugins have been merged, with a median wait of about 12 days for those. Examples: [Clerk #1483](https://github.com/xai-org/plugin-marketplace/pull/1483) took 4 hours, [Skyvern #1313](https://github.com/xai-org/plugin-marketplace/pull/1313) 5.5 days, [Pi Security #307](https://github.com/xai-org/plugin-marketplace/pull/307) 55 days. Well-known brands get in fastest.
- The xAI form (Grok, Grok Bot and Cursor) is a separate route. One author closed their PR to use it instead ([#1436](https://github.com/xai-org/plugin-marketplace/pull/1436)).

### Cursor Marketplace

- Reviewed by the Cursor team. There's no published timeline, and the forum reports some waits.
- Needs `.cursor-plugin/plugin.json` or a root `plugin.json` (Agent Plugins format), plus a root `mcp.json`, a README and a logo (optional).
- [Docs](https://cursor.com/docs/reference/plugins)

### GitHub Copilot (awesome-copilot)

- This is the default plugin marketplace in Copilot CLI and VS Code.
- **Route:** the external-plugin issue form. Automated checks run first (lint plus an install smoke test), then a maintainer comments `/approve` or `/reject`. Approval opens the PR automatically. Don't edit `plugins/external.json` directly.
- **Fields:** name, description, `owner/repo`, a release tag, the full commit SHA, version, license and author.
- The current layout (`.claude-plugin/plugin.json`, `.mcp.json`, `skills/`) already loads as a legacy Copilot plugin.
- **Odds:** about 63 approved vs 241 rejected, decided within days. Common rejection reasons are "too niche", "too product-specific" and "primarily a marketing push for an external service". Pitch it around developer supply-chain safety, not npmscan.com.

### Kiro powers (Amazon)

- **Route:** the web form. They contact you only if it's a fit. About 100 curated partner powers so far, including Datadog, Neon, Postman and Zapier.
- **Requirements:** a root `plugin.json` (`$schema`, `name`, `version`, `description`, `author`, `keywords`, `license`), plus a privacy-policy link and a support contact in the README. Any MCP server it uses can't be in beta or preview.

### awesome-codex-plugins

- **Route:** a one-line README PR. Their generator mirrors the plugin itself. Recent PRs merged the same day.
- **Requirements:** `.codex-plugin/plugin.json`, `SECURITY.md`, `LICENSE` and a README; a score of at least 80/130 from their scanner (`plugin-scanner`) with no critical or high findings.
- OpenAI's official plugin directory is shared between ChatGPT and Codex, so npmscan may already be in Codex's official directory. Not confirmed.

### Gemini CLI

- No submission. The gallery crawls public repos daily that have a `gemini-extension.json` at the root and the `gemini-cli-extension` topic.

### Cline

- **Route:** a GitHub issue with the repo link, a 400×400 PNG logo and a reason for adding it. Check first that Cline can install the server from the README alone.
- About 2,700 issues are open, so expect a slow queue.

### Perplexity (no public route)

- There's no submission form; a [forum question](https://community.perplexity.ai/t/how-do-we-submit-our-mcp-server-so-it-shows-up-in-the-connectors-database-officially-not-as-a-custom-connector/6043) about it went unanswered.
- Partners such as MT Newswires got in through partnerships. The [Agent API docs](https://docs.perplexity.ai/docs/agent-api/tools/connectors) say to email `api@perplexity.ai` to request a managed connector.
- Meanwhile, users can add npmscan as a [custom remote connector](https://www.perplexity.ai/help-center/en/articles/13915507-adding-custom-remote-connectors).

### Mistral Le Chat (no public route)

- The curated connectors directory goes through Mistral's business-development team. Admins can still add any remote MCP server by URL.

### Skipped

- **Docker MCP Catalog** ([docker/mcp-registry](https://github.com/docker/mcp-registry)): supports hosted servers (`server.yaml`, `tools.json`, `readme.md`), but about 1,850 PRs are open and only one merged since September.
- **Factory (Droid)** ([factory-plugins](https://github.com/Factory-AI/factory-plugins)): no third-party PR has been merged.
- **Zed:** needs a Rust extension; not worth it for the reach.
- **Windsurf:** no submission process found.
- **`punkpeye/awesome-mcp-servers`:** now for local servers only; hosted servers go in `awesome-remote-mcp-servers`, where npmscan is already listed.
