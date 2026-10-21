# Outreach

Getting npmscan listed in AI tools' plugin, extension and connector directories, and tracking each submission until it's live or closed.

| Path | What |
|---|---|
| `README.md` | This file: how we work, lessons, repo prep still to do |
| [`tracker.csv`](tracker.csv) | One row per directory: status, link, next action, follow-up date. **The only status record** |
| [`targets/`](targets/) | One note per directory: how its route works, queue health, what we submitted, copy-paste form text |
| [`scripts/`](scripts/README.md) | `refresh.ts` (the replies check) and `mark.ts` (record a change). How-to lives there |

Rules for this folder:

- **Status goes in `tracker.csv`, through the scripts.** Don't hand-edit it, and don't add dated "replies check" sections, plans, or summaries anywhere. Record what happened with `mark.ts --append-note "..."` and say the rest in chat. Scratch files go in `/tmp/npmscan-outreach/`.
- **`targets/<id>.md` holds what doesn't change often:** research, requirements, exactly what we submitted, form answers. Status lines in those files are dated snapshots; the tracker wins if they disagree.
- **Name your model.** Scripts that write the tracker need `NPMSCAN_AGENT=<model>` (or `--agent`), e.g. `claude-opus-5.5`, `gpt-5.1`, or `human`, and stamp it on every row they change.
- **Commit only when asked**, as `chore(outreach): ...`. Never add AI attribution lines (Co-Authored-By, "Generated with ...") to commits, PRs, issues, emails or posts.

## Before submitting anywhere

Research first and summarize it to the user before you submit:

- **Past successes:** what got merged or listed recently, and how long it took.
- **Rejections:** what got turned down and why (e.g. Copilot: "too niche", "marketing push for an external service").
- **Queue health:** open count, merges in the last month, whether outside contributors ever get in (Factory: never; Docker: one bot merge since September).
- **Process changes:** a retired directory (Goose), a moved one (Windsurf → Devin Desktop), a new catalog replacing an old one (Cline).
- **Gates:** CI validators, manifest paths they actually read, schema checks. Run them locally before opening anything.

Then add the row (`mark.ts --add`), write `targets/<id>.md`, submit, and mark it `submitted` with the date and link.

## Replies check

Run it every couple of days while anything is `submitted`:

1. `node outreach/scripts/refresh.ts`. It updates every GitHub PR/issue and crawled directory, and prints who's waiting on our reply, follow-ups due, and anything odd.
2. Check Gmail for what the script can't see. Search for the routes marked `email`, `form` or `in_app`: replies from perplexity.ai, x.ai (ignore `noreply@x.ai`: those are our own Grok automations), kimi/moonshot and mistral.ai, plus the user's mention-watch emails for listings we didn't submit (add those as `unsolicited` rows).
3. Record anything new with `mark.ts`, reply where we owe one, and tell the user in chat.

## Writing to maintainers and teams

- Pitch developer supply-chain safety, not npmscan.com. Say plainly that we maintain npmscan.
- Fill templates honestly: only tick a box that's true, and say exactly what was tested.
- One follow-up, in the same thread, after about two weeks of silence. Never open duplicate PRs or "any update?" issues.
- Gmail drafts: write them with `htmlBody` and `<a href>` links. Plain-text bare URLs get mangled into `google.com/url?q=` redirects.
- Sending email, submitting a form or opening a PR is public and can't be undone. Get the user's go-ahead for each one.

## Lessons so far (October 2026)

- **Big-brand directories are slow or closed to outsiders.** xAI's median wait is about 12 days, and well-known brands go fastest. Docker's and Factory's queues effectively don't merge new outside entries. Perplexity and Mistral partners are established companies.
- **Gates read specific manifest paths.** Copilot ignored `.claude-plugin/plugin.json` and failed until `.github/plugin/plugin.json` existed. Droid names the marketplace after the repo, so the plugin ID is `npmscan@npmscan-mcp-plugin`.
- **`gh` can't add labels as a non-collaborator.** Issue-form bots that key on labels need the form's marker in the body (Copilot: `<!-- external-plugin-submission -->`).
- **The official MCP Registry covers a lot for free.** Goose, Zed and Docker's CLI read from it. Check that before building a separate submission.
- **The source stays on the personal `salemalem` account**, so the Claude and ChatGPT listings don't have to move.
- **Search in other languages too.** Most Chinese, Russian, Japanese and Korean "awesome" lists are dead or only cover local services, but a few are very active and easy to get into: `sfrangulov/claude-code-handbook-ru` merges remote-MCP entries within hours, and `laolaoshiren/claude-code-skills-zh` checks each PR and then adds the entry in its own commit (a closed PR there isn't a rejection). The Korean `currenjin/site-for-developers` and the Chinese `YSGStudyHards/Awesome-Tools`, `cssmagic/Awesome-AI` and `skyming/awesome-ai-agent` also merged hosted MCP servers within days in October 2026. Write those PRs in the list's language. China also has platform hubs with their own sign-up flows (ModelScope MCP 广场, Baidu's sai.baidu.com/mcp).
- **DeepSeek Harness is a big new ecosystem.** DeepSeek's open-source coding agent (256k stars in two months) has no official plugin registry, but community directories collect GitHub repos tagged `dsh-plugin`, and the largest list has 19.8k stars. Getting in needs a published DSH plugin package first; see `targets/dsh.md`.
- **"Closed source" blocks some security lists.** Scanners-Box and MobinX only take projects whose code is on GitHub; the open plugin repo isn't enough when the server behind it is private.

## Finding new directories

What worked best, in order (October 2026):

1. **awesome.ecosyste.ms index.** Download every page of `https://awesome.ecosyste.ms/api/v1/lists?per_page=100&page=N` (about 107 pages, 10,600 lists) and filter by description and topics with a script. This found most of the useful non-English lists; keyword search found few.
2. **GitHub search through GraphQL**, e.g. `gh api graphql -f query='query($q:String!){search(query:$q,type:REPOSITORY,first:100){nodes{...on Repository{nameWithOwner stargazerCount pushedAt description}}}}' -f q='awesome claude in:name pushed:>2026-08-15 sort:stars'`. The REST search (`gh search repos`) hits GitHub's secondary rate limit after about 20 queries even when spaced out; GraphQL ran 23 queries of 100 results in two minutes. Searching `awesome <topic> in:name` and keeping non-English descriptions works better than translated keywords, which mostly return personal skill collections.
3. **Links inside lists you've found:** their "directories" sections and open PRs point to more (mcpnavi.jp, mcpstore.co and the DeepSeek Harness directories came from there).
4. **Web search in each language** for directory sites ("MCP 导航 提交 收录", "каталог MCP серверов добавить").

Keyword queries that did find things: Chinese `MCP 服务器`, `Claude Code 插件`, `Claude Code 中文`, `开源安全工具`; Russian `MCP серверы`, `awesome mcp ru`, `каталог MCP`; Korean `Claude Code 플러그인`.

**Less common languages** (Hindi, Bengali, Polish, Czech, Hungarian, Romanian, Greek, Hebrew, Persian, Arabic, Georgian, Kazakh, Swahili and others; about 200 queries in October 2026). The query shapes that found real lists were `topic:awesome-list <country or language>`, romanized `awesome <country>`, and `topic:awesome-list "<local phrase for AI>" in:readme`. Expect low yield: almost everything is a "made in <country>" list, a local-services MCP catalog, NLP resources for that language, or learning material. Out of 60 lists checked, three could take npmscan, all of them small. A "made in" list only fits if npmscan's maintainer is from that country. In English searches, `awesome polish` mostly matches the word "polished".

GraphQL and REST search draw on the same per-minute search budget. If another session on the same account is running `gh search`, your searches get throttled too, so use one worker with ~10 s pauses.

For each candidate, check before adding a row:

- **Outside merges in the last 30 days** (by people other than the owner, not bots). If outside PRs get closed while the owner commits a lot, look at the closing comments: some maintainers add the entry in their own commit.
- **Who else got in:** if similar hosted MCP products (PlaceCall, CurlShot) were merged recently, the list takes products like ours.
- **CONTRIBUTING rules:** star thresholds (JackyST0/awesome-agent-skills wants 64), open-source-only rules, disclosure requirements.

Record skipped lists with the reason in `targets/stalled-intl-lists.md` (non-English) or the `stalled-*` rows, so nobody checks them again.

## Repo prep still to do

These unblock the `prep` rows (Cursor, Kiro, Codex list, Antigravity):

- [ ] **Decide the root `plugin.json` first.** Kiro needs it in Agent Plugins format: `$schema` `https://agent-plugins.org/schemas/1.0.0/plugin.schema.json` plus `name`, `version`, `description`, `author`, `keywords`, `license`. Antigravity reads the same file but documents only `name`, `description` and `$schema`. Test both before picking one shape.
- [ ] **Cursor:** `.cursor-plugin/plugin.json` (Cursor's own path, so it doesn't depend on the root-file decision) and a root `mcp.json`. Keep `.mcp.json` for Claude Code.
- [ ] **Codex list:** `.codex-plugin/plugin.json` and a `SECURITY.md` with a disclosure policy.
- [ ] **Kiro:** a privacy-policy link and a support contact in the README.
- [ ] **Zed** and **Windsurf / Devin Desktop:** README snippets (see their target notes).
- [ ] After adding files, check that Claude Code, Kimi, Grok Build, Copilot and Gemini still load.

**Version upkeep.** The version is in four manifests; bump them together on each release, and add any new manifest here:
`.claude-plugin/plugin.json`, `kimi.plugin.json`, `.github/plugin/plugin.json` (Copilot checks it matches the submitted version) and `gemini-extension.json`.
Listings pinned to a commit need their own update PR after a release: xAI (`targets/xai.md`), Copilot's `plugins/external.json`, and Factory if #60 merges.

When something goes live, also move it to "Official listings" in the [root README](../README.md).
