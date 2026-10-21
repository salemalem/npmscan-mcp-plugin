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
