# Listing plan: getting npmscan into more AI tools

Last updated: 2026-10-21. Recheck the queue numbers before relying on them.

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
| Gemini CLI gallery | ⏳ Shipped 2026-10-18 (`0b29cac`, topic added, GitHub install verified); waiting for the crawl (gallery data stale since 2026-10-15 as of 10-19) | [docs](https://geminicli.com/docs/extensions/releasing/) |
| Antigravity (Google) | 🟡 Interest form only; root `plugin.json` conflict to resolve first | [form](https://forms.gle/2EX5RFYPoJe1UgxR9) |
| Cline (new catalog) | ⏳ PR open 2026-10-17; validator passes | [cline/marketplace#262](https://github.com/cline/marketplace/pull/262) |
| Cline (old MCP Marketplace) | ⏳ Issue open 2026-10-17; slow queue | [cline/mcp-marketplace#3063](https://github.com/cline/mcp-marketplace/issues/3063) |
| Perplexity | ⏳ Email sent to `connectors@perplexity.ai` 2026-10-17; proposal form still to fill | [form](https://pplx.ai/connector-form-submission) |
| Mistral Le Chat | 📝 Long-shot pitch drafted 2026-10-18; not sent yet (partner form; no public email) | [section](#mistral-le-chat-no-public-route) |
| Docker MCP Catalog | ⏳ PR open 2026-10-17 as a long shot (queue stalled) | [docker/mcp-registry#5808](https://github.com/docker/mcp-registry/pull/5808) |
| Factory (Droid) | ✅ Self-install works (README); ⏳ long-shot PR to the official marketplace | [Factory-AI/factory-plugins#60](https://github.com/Factory-AI/factory-plugins/pull/60) |
| Zed | ✅ Nothing to submit: Zed is moving to the official MCP Registry; add a README snippet | [section](#zed) |
| Windsurf (now Devin Desktop) | 🔜 No submission route; add a README snippet | [section](#windsurf-now-devin-desktop) |

## Replies check (2026-10-21)

Nothing new since 2026-10-19. No submission has had any activity since we opened it on 2026-10-17:

- **xAI PR #1506, Copilot #5142, Cline #262 / #3063, Docker #5808, Factory #60:** each was last updated 2026-10-17, with no new comments, reviews or label changes. Copilot is still `ready-for-review`.
- **Email:** no reply from xAI (form), Perplexity (thread still 1 message) or Mistral (not sent yet).
- **Gemini gallery:** still not listed. `extensions.json` is still frozen at 2026-10-15 (2,198 entries), so the crawl itself is stalled; it's not about us. If it's still frozen around 2026-10-26, check gemini-cli issues for a gallery outage.
- **New footprint we didn't submit:** Glama's connector page was re-tested on about 2026-10-19; SaaSHub has status and alternatives pages; Capterra lists npmscan. These come from the user's Grok mention-watch email of 2026-10-20.

## Replies check (2026-10-19)

No reviewer has replied anywhere yet. Every submission is still open with no maintainer comments or reviews:

- **xAI PR #1506:** open; no reviews; Socket and Semgrep pass, and "Validate catalog" still needs approval. **x.ai form:** no email from xAI. The `noreply@x.ai` emails in the inbox are our own Grok automations, not marketplace replies.
- **Copilot #5142:** still `ready-for-review`; no maintainer `/approve` or `/reject` yet.
- **Gemini gallery:** not listed yet. The gallery's data file (`geminicli.com/extensions.json`, 2,198 entries) hasn't been refreshed since 2026-10-15, so it hasn't crawled since we shipped. Check again in a few days.
- **Perplexity:** no reply in the email thread (sent 2026-10-17). Follow up around 2026-10-31.
- **Mistral:** the draft is unsent and the partner form isn't submitted yet (the user's action).
- **Cline PR #262 and issue #3063, Docker PR #5808, Factory PR #60:** open, no comments or reviews.
- **Side note:** mcprush.com listed the server as "NPMScan MCP" on 2026-10-17, and the claim from @salemalem was approved the same day.

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
- No partnerships email is published. The only routes are the "Partner with Mistral" form at https://mistral.ai/partners (name, work email, role, a 1,000-character goals field; "we'll be in touch if we think there's a good fit") and the general form at https://mistral.ai/contact. press@mistral.ai is for press only.
- 2026-10-18: Gmail draft written (subject "Connector proposal: NPMScan for Le Chat", recipient blank), plus an 818-character version for the partner form. Odds are low: the directory's integration partners are big SaaS brands.
- Recipient: the draft's To field is blank on purpose. contact@mistral.ai is unconfirmed (one search result says the legal notice lists it, but the page itself doesn't show it), so it's at most an optional second channel. **Next step for the user:** submit the partner form with the form text; optionally put contact@mistral.ai in the draft and send it.

### Docker MCP Catalog

**Status: ⏳ PR open as a long shot:** [docker/mcp-registry#5808](https://github.com/docker/mcp-registry/pull/5808), opened 2026-10-17. The analysis below said to park it; we submitted anyway for the extra footprint, knowing the queue is stalled.

**What we submitted:** `servers/npmscan/` on fork `salemalem/mcp-registry`, branch `add-npmscan`, commit `235ac6a`:
- `server.yaml`: `type: remote`, category `security` (as Semgrep uses), title `NPMScan`, `transport_type: streamable-http`, url `https://npmscan.com/api/mcp`, no OAuth; the icon is `assets/logo-400.png` via raw GitHub (400×400; the limit is 512)
- `tools.json`: `[]`
- `readme.md`: the docs link

**Checks:** `npx prettier --check` passes. The `cmd/validate` rules were checked by hand (no Go installed here): the name matches the folder; the title has no "MCP" or "Server" and is capitalized; the transport is allowed; the icon is under 512px. The PR body uses their template, with the Docker-image items marked "not applicable" for a remote server.

- **Route:** a PR to [docker/mcp-registry](https://github.com/docker/mcp-registry) adding `servers/npmscan/` with three files:
  - `server.yaml` (`type: remote`, `remote.transport_type: streamable-http`, `remote.url: https://npmscan.com/api/mcp`, no `oauth`)
  - `tools.json` (`[]` for remote servers)
  - `readme.md` (a docs link)

  `task remote-wizard` generates them. It would take about 20 minutes.
- **Queue health:**
  - 1,855 open PRs.
  - Since 2026-09-01, only **one** PR merged, a bot updating an existing entry's commit pin.
  - Of the 10 human-authored merges since May, all updated *existing* vendors' entries (CircleCI, Temporal, Okta, Arm); none of the last 60 merged PRs adds a new server.
- **What submitters say:**
  - "[MCP server pending review for ever](https://github.com/docker/mcp-registry/issues/178)" (2025)
  - "[When can we expect our PR to be merged?](https://github.com/docker/mcp-registry/issues/323)" (2025)
  - InterSystems opened a [follow-up issue](https://github.com/docker/mcp-registry/issues/5704) on 2026-10-14 about its stuck PR, so even big vendors wait.
- **Covered indirectly:** Docker's CLI can build a catalog from the official MCP Registry (registry.modelcontextprotocol.io), where npmscan is listed.
- **Original decision:** park it. Overridden 2026-10-17: submit anyway, since a cheap PR beats an empty slot.
- [ ] Watch #5808. CI and Docker's review may need a maintainer to start them, because this is a first-time contributor. Answer any review comments on the same branch.
- [ ] If there's still no movement after a few months, leave it open; don't open duplicates or "any update?" issues, which the backlog is already full of.

### Factory (Droid)

**Status: ✅ self-install tested and documented** (2026-10-17). The README has a "Using it with Factory (Droid)" section.

**Test result** (Droid 0.244.0, throwaway home directory; binary from `@factory/cli-darwin-arm64` installed with `--ignore-scripts`):
- `droid plugin marketplace add salemalem/npmscan-mcp-plugin` reports "Successfully added marketplace: npmscan-mcp-plugin".
- `droid plugin install npmscan@npmscan-mcp-plugin --scope user` reports "Successfully installed npmscan@npmscan-mcp-plugin (962c7dc)".
- Droid's cache holds the 5 skills plus a translated `mcp.json` (`type: http`, `url: https://npmscan.com/api/mcp`), and `droid mcp list` shows `npmscan  http  connected  [user]`.
- **Gotcha:** the marketplace name comes from the **repo name**, not from `.claude-plugin/marketplace.json`'s `name` (`npmscan`). The plugin ID is `npmscan@npmscan-mcp-plugin`; `npmscan@npmscan` fails with "Marketplace not found". The plan's original command was wrong in exactly this way.

- **Official marketplace** ([Factory-AI/factory-plugins](https://github.com/Factory-AI/factory-plugins)): the README says "fork, add under `plugins/`, update marketplace.json, PR". But **no third-party PR has ever merged**: 32 merges, all by Factory staff or bots. 14 outside PRs are open, including Firecrawl and SonarQube, and the [docs](https://docs.factory.com/cli/configuration/plugins) describe no listing process.
- **The useful route:** Droid installs any GitHub marketplace, and it **translates Claude Code layouts** (`.claude-plugin/` becomes `.factory-plugin/`, and `.mcp.json` becomes `mcp.json`). This repo already has `.claude-plugin/marketplace.json` (marketplace name `npmscan`), so this should work today:
  ```bash
  droid plugin marketplace add salemalem/npmscan-mcp-plugin
  droid plugin install npmscan@npmscan-mcp-plugin --scope user
  ```
- [x] Test those two commands with Droid in a throwaway home directory (passed; see "Test result" above).
- [x] Add a "Using it with Factory (Droid)" README section.
- [x] Long-shot PR to the official marketplace: [Factory-AI/factory-plugins#60](https://github.com/Factory-AI/factory-plugins/pull/60), opened 2026-10-17. Odds: zero outside merges so far, out of 32 total.
  - **Format:** one `.factory-plugin/marketplace.json` entry (`source: {source: "url", url: …npmscan-mcp-plugin.git, sha: e83bfb4…}`, category `security`, homepage the docs) plus a README section, matching SonarQube's open PR #58. Fork `salemalem/factory-plugins`, branch `add-npmscan`, commit `f01a19a`.
  - **Tested before opening:** the edited marketplace, added locally to Droid 0.244.0, installs npmscan; `droid mcp list` shows connected; all 5 skills load. A separate test confirmed Droid supports pinned `url` sources.
  - **Note:** the repo's default branch is `master`, not `main`.
  - [ ] Watch #60. If it ever merges, future releases need a PR that bumps the `sha`.

### Zed

**Status: ✅ nothing to submit; add a README snippet** (analysed 2026-10-17).

- Zed connects to remote servers natively: Settings → AI → MCP Servers → Add Remote Server, or `context_servers` with a `url` ([docs](https://zed.dev/docs/ai/mcp)). No extension is needed.
- Zed's MCP *extensions* only support servers shipped as binaries or npm packages, not hosted ones. Zed says it **plans to deprecate MCP extensions in favor of the official MCP Registry** ([docs](https://zed.dev/docs/extensions/mcp-extensions)), and npmscan is already there.
- [ ] Add a "Using it with Zed" README section:
  ```json
  { "context_servers": { "npmscan": { "url": "https://npmscan.com/api/mcp" } } }
  ```

### Windsurf (now Devin Desktop)

**Status: 🔜 no submission route; add a README snippet** (analysed 2026-10-17). Cognition renamed Windsurf to Devin Desktop.

- The docs moved to [docs.devin.ai](https://docs.devin.ai/desktop/cascade/mcp), which says: "Cascade does not have an MCP Marketplace or one-click install."
- Only the "Devin Local" agent has a marketplace. Its default source isn't documented, and no submission process is published. Team admins can add custom registries, which "must follow the official MCP registry schema".
- Cascade servers are added by hand in `mcp_config.json`, using `serverUrl` for remote HTTP servers.
- [ ] Add a "Using it with Windsurf / Devin Desktop" README section:
  ```json
  { "mcpServers": { "npmscan": { "serverUrl": "https://npmscan.com/api/mcp" } } }
  ```
- [ ] Later, if a contact turns up: ask Cognition where the Devin Local marketplace sources its servers. If it's the official MCP Registry, we're already covered.

### awesome-mcp-servers (punkpeye)

**Status: ✅ nothing to do.** The list is now for local servers only. Hosted servers go in `awesome-remote-mcp-servers`, where npmscan is already listed.
