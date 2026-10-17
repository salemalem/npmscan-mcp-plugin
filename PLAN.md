# Listing plan: getting npmscan into more AI tools

Last updated: 2026-10-18. Recheck the queue numbers before relying on them.

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
| GitHub Copilot (awesome-copilot) | ⏳ All automated gates passed, labelled `ready-for-review`; waiting for a maintainer's `/approve` | [awesome-copilot#5142](https://github.com/github/awesome-copilot/issues/5142) |
| Kiro powers | 🔜 Next. Needs a manifest and README additions. | [submit](https://kiro.dev/powers/submit/) |
| awesome-codex-plugins | 🔜 Next. Needs a manifest and `SECURITY.md`. | [repo](https://github.com/hashgraph-online/awesome-codex-plugins) |
| Gemini CLI gallery | ⏳ Shipped 2026-10-18 (`0b29cac`, topic added, GitHub install verified); waiting for the daily crawl | [docs](https://geminicli.com/docs/extensions/releasing/) |
| Antigravity (Google) | 🟡 Interest form only; root `plugin.json` conflict to resolve first | [form](https://forms.gle/2EX5RFYPoJe1UgxR9) |
| Cline (new catalog) | ⏳ PR open 2026-10-17; validator passes | [cline/marketplace#262](https://github.com/cline/marketplace/pull/262) |
| Cline (old MCP Marketplace) | ⏳ Issue open 2026-10-17; slow queue | [cline/mcp-marketplace#3063](https://github.com/cline/mcp-marketplace/issues/3063) |
| Perplexity | ⏳ Email sent to `connectors@perplexity.ai` 2026-10-17; proposal form still to fill | [form](https://pplx.ai/connector-form-submission) |
| Mistral Le Chat | 📧 Business development only | see below |
| Docker MCP Catalog, Factory, Zed, Windsurf | ❌ Skip for now | see below |

## Next steps

### Step 1: add the missing manifests

Each manifest points at the same server (`https://npmscan.com/api/mcp`) and the same `skills/` folder, the way `kimi.plugin.json` already does. Each tool reads its own file, so adding one doesn't affect the others.

Done:
- [x] `.github/plugin/plugin.json`, for GitHub Copilot (`67beba8`).
- [x] `gemini-extension.json` at the root, for Gemini CLI (`0b29cac`).
- [x] GitHub topics: `gemini-cli-extension`, `mcp`, `npm`, `security`, `supply-chain-security`.

Still to do, for Cursor, Kiro and the Codex list:
- [ ] **Decide the root `plugin.json` first.** Kiro needs it in the Agent Plugins format, with `$schema` set to `https://agent-plugins.org/schemas/1.0.0/plugin.schema.json` (the exact URL Copilot's gate asked for) plus `name`, `version`, `description`, `author`, `keywords` and `license`. Antigravity reads the same root file but documents only `name` and `description`; see the Antigravity section. Test both before committing to one shape.
- [ ] **Cursor:** use `.cursor-plugin/plugin.json`, Cursor's own path, so it doesn't depend on that root-file decision. Add a root `mcp.json`; keep `.mcp.json` for Claude Code.
- [ ] `.codex-plugin/plugin.json`, for the Codex list.
- [ ] `SECURITY.md` with a vulnerability disclosure policy, for the Codex list.
- [ ] README additions: a privacy-policy link and a support contact, for Kiro.
- [ ] Check that Claude Code, Kimi, Grok Build, Copilot and Gemini still load correctly with the new files present.
- [ ] When the version changes, bump it in every manifest (see "Version upkeep" below) and tag a new release (for example `v3.2.0`).

### Step 2: submit

- [ ] **Cursor:** submit the repo at [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish).
- [x] **GitHub Copilot:** submitted as [#5142](https://github.com/github/awesome-copilot/issues/5142); all gates pass and it's `ready-for-review`.
- [ ] **Kiro:** submit at [kiro.dev/powers/submit](https://kiro.dev/powers/submit/).
- [ ] **Codex list:** run their scanner, then open a one-line README PR to `hashgraph-online/awesome-codex-plugins`.
- [x] **Gemini CLI:** nothing to submit; shipped and verified (see the Gemini CLI section).
- [x] **Cline:** PR [cline/marketplace#262](https://github.com/cline/marketplace/pull/262) (new catalog) and issue [cline/mcp-marketplace#3063](https://github.com/cline/mcp-marketplace/issues/3063) (old marketplace), both 2026-10-17.
- [x] **Perplexity email:** sent to `connectors@perplexity.ai` on 2026-10-17.
- [ ] **Perplexity form:** fill in the [proposal form](https://pplx.ai/connector-form-submission) (needs a Google sign-in; answers are in the Perplexity section).

### Ongoing

- [ ] Watch [#1506](https://github.com/xai-org/plugin-marketplace/pull/1506) and the xAI form reply. Answer review comments.
- [ ] Watch [#5142](https://github.com/github/awesome-copilot/issues/5142) for a maintainer's `/approve` or `/reject`.
- [ ] Around 2026-10-19/20, search "npmscan" on [geminicli.com/extensions](https://geminicli.com/extensions/).
- [ ] Watch for a reply from `connectors@perplexity.ai`. They reply only if it's a fit and publish no timeline. If there's nothing after about 2 weeks, send one short follow-up in the same thread.
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
- **Fields:** name, description, `owner/repo`, a release tag and/or the full commit SHA, version, license and author.
- **What we submitted:** commit `67beba8` with no tag (`v3.1.2` stays on `a5e482a`), version 3.1.2, author BlockHacks.io. The issue was opened with `gh`, which can't add labels for non-collaborators, so the body starts with `<!-- external-plugin-submission -->` to trigger their bot. Editing the issue re-runs the gates.
- **Lesson from the first run:** the gates look for a manifest only at `plugin.json`, `.plugin/plugin.json` or `.github/plugin/plugin.json`. They ignore `.claude-plugin/plugin.json`, so the first run failed the install and version checks. Adding `.github/plugin/plugin.json` fixed both.
- **Current result:** skills lint, install test and version match all pass. One non-blocking warning remains: the manifest isn't the root Agent Plugins `plugin.json` and has no `$schema`. The root `plugin.json` from Step 1 would clear it.
- **Updating the listing later:** after approval, version bumps go through a PR to `plugins/external.json`, and the bot runs the same gates on it.
- **Odds:** about 63 approved vs 241 rejected, decided within days. Common rejection reasons are "too niche", "too product-specific" and "primarily a marketing push for an external service". Pitch it around developer supply-chain safety, not npmscan.com.

### Kiro powers (Amazon)

- **Route:** the web form. They contact you only if it's a fit. About 100 curated partner powers so far, including Datadog, Neon, Postman and Zapier.
- **Requirements:** a root `plugin.json` (`$schema`, `name`, `version`, `description`, `author`, `keywords`, `license`), plus a privacy-policy link and a support contact in the README. Any MCP server it uses can't be in beta or preview.

### awesome-codex-plugins

- **Route:** a one-line README PR. Their generator mirrors the plugin itself. Recent PRs merged the same day.
- **Requirements:** `.codex-plugin/plugin.json`, `SECURITY.md`, `LICENSE` and a README; a score of at least 80/130 from their scanner (`plugin-scanner`) with no critical or high findings.
- OpenAI's official plugin directory is shared between ChatGPT and Codex, so npmscan may already be in Codex's official directory. Not confirmed.

### Gemini CLI

**Status: ⏳ shipped, waiting for the gallery's daily crawl.** `gemini-extension.json` is on `main` (`0b29cac`) and the `gemini-cli-extension` topic is on the repo. Installing from GitHub works today: 5 skills load and the server shows Connected. As of 2026-10-17 19:30 UTC, minutes after the push, it wasn't in the gallery yet. Expect it within about 24 hours.

Researched and tested on 2026-10-18 with Gemini CLI 0.64.0.

**How listing works:** there's no submission step. The [gallery](https://geminicli.com/extensions/) crawls GitHub daily for public repos that have:
1. the topic `gemini-cli-extension`
2. a `gemini-extension.json` at the repository root

A repo appears "if it passes validation". The checks aren't published, but `gemini extensions validate` is the local equivalent. ([docs](https://geminicli.com/docs/extensions/releasing/))

**Who it reaches:** on 2026-06-18 Google moved free, Google AI Pro and Ultra users from Gemini CLI to **Antigravity CLI** ([announcement](https://github.com/google-gemini/gemini-cli/discussions/27274)). Gemini CLI stays for enterprise (Code Assist Standard/Enterprise, Google Cloud) and paid API-key users, and it's still released weekly. Antigravity users can bring Gemini extensions across with `agy plugin import gemini`. So this listing reaches a smaller audience than before, but it's cheap: one file, one README section and one topic.

**The manifest.** This exact file was tested: `gemini extensions validate` passes, the install loads the `npmscan` MCP server (**Connected** to the live endpoint) and all 5 skills from `skills/`.

```json
{
  "name": "npmscan",
  "version": "3.1.2",
  "description": "Check npm packages for malware, known vulnerabilities, typosquats, maintainer takeovers and risky install scripts before installing; audit package.json, lockfiles, SBOMs and PR dependency changes. Free, read-only, no API key.",
  "mcpServers": {
    "npmscan": {
      "httpUrl": "https://npmscan.com/api/mcp"
    }
  }
}
```

- `httpUrl` is the field for streamable HTTP. `url` would mean SSE, which is wrong for this server ([MCP config docs](https://geminicli.com/docs/tools/mcp-server/)).
- Skills need no config: Gemini loads `skills/<name>/SKILL.md` from the extension root, which is the folder that already exists.
- No `GEMINI.md` is needed; the skills already tell the model when to use npmscan.

**Steps**
- [x] Add `gemini-extension.json` (above) at the repo root.
- [x] Add a "Using it with Gemini CLI" section to README.md with the install command `gemini extensions install https://github.com/salemalem/npmscan-mcp-plugin`, and list it under "Official listings → Pending".
- [x] Commit and push to `main`. No GitHub release is needed: git installs track the default branch, and every push offers users an update.
- [x] Add repo topics: `gh repo edit salemalem/npmscan-mcp-plugin --add-topic gemini-cli-extension`. Discovery topics added at the same time: `mcp`, `npm`, `security`, `supply-chain-security`.
- [x] Verify from GitHub (not a local copy): install with `gemini extensions install https://github.com/salemalem/npmscan-mcp-plugin` into a throwaway `HOME`, then confirm `gemini mcp list` shows **Connected** and all 5 skills are listed.
- [ ] After about 24 hours, search "npmscan" on [geminicli.com/extensions](https://geminicli.com/extensions/). If it's missing after 2–3 days, rerun `gemini extensions validate` on a fresh clone and ask in [gemini-cli Discussions](https://github.com/google-gemini/gemini-cli/discussions).

### Version upkeep

The version number is now in four manifests. Bump them together on each release, and add any new manifest from Step 1 to this list:
- `.claude-plugin/plugin.json` (Claude Code)
- `kimi.plugin.json` (Kimi)
- `.github/plugin/plugin.json` (Copilot; its listing checks this matches the submitted version)
- `gemini-extension.json` (Gemini CLI)

### Antigravity (Google, the Gemini CLI replacement)

Not started; it needs a decision first.

- **Official marketplace** (`antigravity-plugins-official`): there's no public submission route, only an [interest form](https://forms.gle/2EX5RFYPoJe1UgxR9) linked from the [Marketplace docs](https://antigravity.google/docs/marketplace).
- **Direct install** works without a listing: `agy plugin install https://github.com/<owner>/<repo>`. It needs:
  - a root `plugin.json` holding only `name`, `description` and optionally `$schema`; the docs say no other keys are allowed
  - an `mcp_config.json` using `serverUrl`, not `url` or `httpUrl`
  - `skills/`, which already exists
- **Conflict to resolve first:** Kiro, and the cross-tool "Agent Plugins" format, want a root `plugin.json` that *does* include `version`, `author` and `license`. Both can't share one root file if Antigravity really rejects extra keys. Its schema URL returns 404, so this is untested. Until then, Antigravity users can reach npmscan through `agy plugin import gemini` after installing the Gemini extension.

### Cline

**Status: ⏳ submitted to both catalogs on 2026-10-17.** Both are slow; that was expected going in.

There are two separate routes:

1. **New catalog, [`cline/marketplace`](https://github.com/cline/marketplace)** (started June 2026): one folder per entry, `registry/mcps/<id>/entry.json` plus an icon, opened as a PR. It drives `cline mcp install` one-liners.
   - **Ours:** [PR #262](https://github.com/cline/marketplace/pull/262), branch `add-npmscan-mcp` on the fork `salemalem/marketplace`. Tags `security` and `software`, icon is `icon.png` (400×400), `install.args` = `npmscan --transport http https://npmscan.com/api/mcp`, `verified: false` (only Cline sets that).
   - `npm run validate` (`node scripts/generate.mjs --check`) passed: "204 entries".
   - **Queue:** only 8 PRs merged, all by Cline's founder (saoudrizwan); no community PR merged yet; about 234 open. Authors from the old repo have been closing their issues and moving here.
2. **Old MCP Marketplace, [`cline/mcp-marketplace`](https://github.com/cline/mcp-marketplace):** an issue-form submission with the repo URL, a 400×400 PNG and two checkboxes.
   - **Ours:** [issue #3063](https://github.com/cline/mcp-marketplace/issues/3063), logo at `assets/logo-400.png` (raw GitHub URL). It's opened via `gh`, so it lacks the `server-submission` label, which non-collaborators can't set.
   - **Queue:** about 2,700 open issues; recent ones get no maintainer replies. The README says "a couple of days", which isn't what happens in practice.

**What was added to this repo** (`3b9982f`):
- `llms-install.md`, the setup steps Cline's one-click installer reads
- a "Using it with Cline" section in the README
- `assets/logo-400.png`: the light npmscan mark on the dark brand tile (#0A0A0C, the same as `icon.png`). The site's own logos are transparent and would vanish on dark themes.

**Tested:** Cline CLI 3.0.73 `cline mcp install npmscan --transport http https://npmscan.com/api/mcp --yes` gives `status: installed` with transport `streamableHttp`; an MCP `initialize` + `tools/list` returns 23 tools. Not tested: the VS Code extension's agent reading the README. The issue's "tested with README" checkbox is ticked, and the notes say exactly what was tested.

**Config shape:** Cline's docs use top-level `"type": "streamableHttp"` and `"url"`. The CLI itself saves a nested `transport` object, but the README follows the docs.

**Next:**
- [ ] Watch PR #262 and issue #3063. If a maintainer asks for changes on #262, push to the same branch.
- [ ] If neither moves in about a month, ask in Cline's [Discord](https://discord.gg/cline) `#mcp` channel, which the old repo's README names as the help channel.

### Perplexity

**Status: ⏳ email sent, waiting for a reply.** Sent 2026-10-17 19:37 UTC from shyngys@blockhacks.io to `connectors@perplexity.ai`, subject "Connector proposal: NPMScan (npm supply-chain security, remote MCP)". Next: fill in the proposal form with the answers below.

**Proposal form answers:**

| Field | Answer |
|---|---|
| Company name and website | BlockHacks.io / NPMScan, https://npmscan.com |
| Product to connect | NPMScan MCP server, `https://npmscan.com/api/mcp` (streamable HTTP) |
| Connector description | Checks npm packages for malware, known vulnerabilities, typosquats, maintainer takeovers and risky install scripts; audits package.json, lockfiles, SBOMs and GitHub repos. 23 read-only tools, no OAuth or API key. |
| Customer problem | Users ask Perplexity whether a package is compromised, but web search lags behind fresh supply-chain incidents. NPMScan gives a live answer before anything is recommended or installed. |
| Docs links | https://npmscan.com/docs/mcp, https://npmscan.com/privacy, https://github.com/salemalem/npmscan-mcp-plugin |
| Contact | Shyngys Shynbolatov, shyngys@blockhacks.io |

**The official route** is the help article [Submit a Connector Proposal](https://www.perplexity.ai/help-center/en/articles/2026092501-submit-a-connector-proposal), published around 2026-09-25:
- **Proposal form:** [pplx.ai/connector-form-submission](https://pplx.ai/connector-form-submission), a Google Form that needs a Google sign-in. It's for "representatives of a company that would like to explore building a connector", one connector per proposal. It asks for:
  - company name and website
  - the product to connect
  - a short connector description
  - the customer problem or use case
  - links to API, developer or security docs
  - a partnership and technical contact
- **Email:** `connectors@perplexity.ai` (the "Plugins marketplace team"). They suggest emailing first with the company name, a short description and technical doc links.
- **After submitting:** the team contacts you only if it's a potential fit, and there's no guarantee. They judge customer value, technical feasibility, security requirements and product priorities. No timeline is published.
- `api@perplexity.ai` is a different channel: requests for the developer Agent API's small catalog (GitHub, Slack, Drive, Datadog, Linear, Notion). It's not the consumer connector directory.

**What others have experienced:**
- No firsthand reports of the proposal process were found.
- A [forum question](https://community.perplexity.ai/t/how-do-we-submit-our-mcp-server-so-it-shows-up-in-the-connectors-database-officially-not-as-a-custom-connector/6043) from 2026-09-08 asking how to get listed got no answer. The help article appeared about two weeks later.
- 2026 partner launches are established companies with announced partnerships, mostly finance, data and sales tools that Perplexity Computer users would use: [Quartr](https://quartr.com/newsroom/press-release/quartr-is-now-available-in-perplexity-via-mcp), [MT Newswires](https://www.mtnewswires.com/news/mt-newswires-mcp-server-now-available-in-perplexity-computer-bringing-real-time-global-market-news-to-ai-driven-workflows), [Octus](https://octus.com/company/news/octus-credit-intelligence-now-inside-perplexity/), [Apollo.io](https://www.prnewswire.com/news-releases/apolloio-brings-ai-powered-gtm-workflows-to-perplexity-computer-for-growing-businesses-302790469.html), [Similarweb](https://www.similarweb.com/blog/updates/announcements/similarweb-perplexity/) and Rings AI. There's no developer-security connector yet, which is both an opening and a risk: it may not be a product priority.

**Our pitch angle:**
- Perplexity users already ask "is this package compromised?", and web search lags behind fresh incidents.
- No OAuth and nothing to store, so the security review should be easy.
- Already in the Claude, ChatGPT and MCP Registry directories.

**Meanwhile:** users can already add npmscan as a [custom remote connector](https://www.perplexity.ai/help-center/en/articles/13915507-adding-custom-remote-connectors) with the URL `https://npmscan.com/api/mcp`.

### Mistral Le Chat (no public route)

- The curated connectors directory goes through Mistral's business-development team. Admins can still add any remote MCP server by URL.

### Skipped

- **Docker MCP Catalog** ([docker/mcp-registry](https://github.com/docker/mcp-registry)): supports hosted servers (`server.yaml`, `tools.json`, `readme.md`), but about 1,850 PRs are open and only one merged since September.
- **Factory (Droid)** ([factory-plugins](https://github.com/Factory-AI/factory-plugins)): no third-party PR has been merged.
- **Zed:** needs a Rust extension; not worth it for the reach.
- **Windsurf:** no submission process found.
- **`punkpeye/awesome-mcp-servers`:** now for local servers only; hosted servers go in `awesome-remote-mcp-servers`, where npmscan is already listed.
