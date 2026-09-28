# Kimi plugin — setup, test results, and marketplace submission

This repo is both a Claude Code plugin and a Kimi plugin. Kimi reads
[`kimi.plugin.json`](kimi.plugin.json); Claude Code reads `.claude-plugin/`
and `.mcp.json`. Both share `skills/`.

Kimi docs:
[plugin manifest reference](https://moonshotai.github.io/kimi-code/en/customization/plugins.html) ·
[create a personal plugin](https://www.kimi.ai/help/plugins-and-skills/create) ·
[publish to the official marketplace](https://www.kimi.ai/help/plugins-and-skills/publish)

## Rules for editing without breaking Claude Code

- Kimi-only settings go **inside `kimi.plugin.json`** (`interface`,
  `skillInstructions`, `systemPrompt`, `commands`, `hooks`, `agents`).
- Don't add root-level `commands/`, `agents/`, or `hooks/` directories for
  Kimi — Claude Code auto-loads those too.
- Keep `version` in `kimi.plugin.json` equal to `.claude-plugin/plugin.json`.
- Skills are shared: refer to MCP tools by bare name
  (`batch_query_vulnerabilities`), never a client-specific prefix, and don't
  name a specific assistant ("Claude", "Kimi") in skill text.
- After any change, run both checks:
  `claude plugin validate .` and the Kimi CLI install below.

## Kimi Code CLI test (2026-09-28)

Kimi Code 2.1.1, installed from GitHub at commit `8915e13`:

| Check | Result |
|---|---|
| `/plugins install https://github.com/salemalem/npmscan-mcp-plugin` | Installed "NPMScan 3.0.0" after the third-party "Trust and install" prompt |
| Manifest used | `kimi.plugin.json (kimi-plugin-root)`, no diagnostics |
| Skills | 5 (`/skills` lists them as `skill:<name>`) |
| MCP (`/mcp`) | `plugin-npmscan:npmscan` connected over http, 23 tools |
| Interface / `skillInstructions` | Shown / present |
| Running a prompt | Not tested — account's plan returned `403 Your current subscription does not have access to Kimi Code` |

Notes:
- When you run `kimi` inside this repo's folder, Kimi Code also picks up
  Claude's `.mcp.json` as a project-level MCP server (after "Trust this
  folder"). Harmless — same server.
- To reinstall after pushing changes: `/plugins` → select NPMScan → `D` to
  remove, then install again (or `R` to reload).

Install the CLI yourself:

```bash
curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash
kimi login --region global
kimi          # then: /plugins install https://github.com/salemalem/npmscan-mcp-plugin
```

## Kimi Work: import, test, submit

The official marketplace submission happens from **Kimi Work** (desktop
app), not the CLI.

### Status (2026-09-28)

Imported into Kimi Work's personal market and iterated to **v3.0.2**:

| Item | Result |
|---|---|
| Import via Plugin Builder | Registered in the personal market from this repo's `kimi.plugin.json` (5 skills + npmscan MCP, http) |
| Icon | `icon.png` — dark rounded tile from the site's dark-mode logo (`/npmscan.icon.darkmode.png`) with a subtle red glow; the raw `npmscan.icon.png` is 1.4 MB and over the 256 KB bundle limit, so the manifest keeps the remote `iconUrl` alongside |
| Localization | `locales/zh-CN.json` — full Simplified-Chinese translation of every localizable key (platform requires zh-CN + en-US coverage) |
| Branding | `brandColor: #ef4444` (npmscan.com's primary action red), `hostKind: hosted` |
| Version | 3.0.2 in both `kimi.plugin.json` and `.claude-plugin/plugin.json` |
| Validation | 0 errors, 0 warnings; registry read-back verified after each registration |
| Changes pushed | `f634955` on `main` |

Remaining before publication: click **Update** on the Personal tab (syncs
the installed copy), then apply via the ✉️ form — step 4 below.

### 1. Install Kimi Work

Download from <https://www.kimi.ai/products/kimi-work> (or kimi.ai →
**Download**), install, and sign in with the same Kimi account.

### 2. Import the plugin

1. Open the **Plugins** page (the marketplace with tabs *Installed /
   Featured / … / Developer Tools*).
2. Click **Custom plugin**. This opens a conversation with the built-in
   **Plugin Builder** skill. (Alternatively, in any conversation type `/`
   and pick Plugin Builder.)
3. Send:
   ```
   Import this plugin: https://github.com/salemalem/npmscan-mcp-plugin
   ```
4. If it asks for an icon, give
   `https://npmscan.com/npmscan.icon.png` (512x512). If it asks for an MCP
   server URL, give `https://npmscan.com/api/mcp`.
5. Check what it reports: it should use `kimi.plugin.json` (not treat
   `.claude-plugin/marketplace.json` as a marketplace index), with 5 skills
   and the npmscan MCP server.

### 3. Install and test

1. Plugins → **Personal** tab → find **NPMScan** → click **+** / **Install**.
2. Start a new conversation and try (full list: "Example use cases" in
   [CLAUDE.md](CLAUDE.md)):
   ```
   Does lodash have any known vulnerabilities?
   Is chalk 5.3.1 safe? I heard there was a supply-chain incident.
   Should we use axios, got, or node-fetch for our new HTTP client?
   Audit https://github.com/expressjs/express for dependency issues.
   Gate this PR — bump lodash from 3.10.1 to 4.17.21, is it safe to merge?
   ```
   Each answer should show npmscan tool calls and npmscan.com links.

### 4. Apply for the official marketplace

1. Plugins → **Personal** → click the **NPMScan** card to open its details
   page.
2. Click the **✉️** (envelope) icon in the top-right corner of the details
   page.
3. In the **User Feedback** form, choose **"Apply for official marketplace
   publication"**.
4. Email:
   ```
   shyngys@blockhacks.io
   ```
5. Submit. The Kimi review team evaluates it on content and test results
   and replies by email if they need anything. No published criteria or
   timeline.

After submitting, update the Kimi row in `npmscan/mcp/LISTINGS.md`.
