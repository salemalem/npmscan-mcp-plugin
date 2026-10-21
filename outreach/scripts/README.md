# Outreach scripts

TypeScript CLIs that keep [`../tracker.csv`](../tracker.csv) up to date. Node ≥ 22.18 runs the `.ts` files directly; there's no build step. `npm install` here only adds `tsc` for type checking.

Run them from the **repo root**. `refresh.ts` needs `gh` logged in as the account that submitted (`gh auth status`, currently `salemalem`).

Commands that write the tracker need your model name, recorded in the `agent` column:

```bash
export NPMSCAN_AGENT=claude-opus-5.5   # or gpt-5.1, gemini-2.5-pro, kimi-k2, ... ; "human" for a person
```

| I want to... | Run |
|---|---|
| Do the replies check (GitHub + crawled directories) | `node outreach/scripts/refresh.ts` (`--dry-run` to preview, `--id x` for one row) |
| Record a status change | `node outreach/scripts/mark.ts --id cursor --status submitted --url https://... --submitted-on 2026-10-22` |
| Add a note without losing the old ones | `node outreach/scripts/mark.ts --id perplexity-email --append-note "follow-up sent"` |
| Set when to look again | `node outreach/scripts/mark.ts --id docker --follow-up-on 2026-12-01 --next-action "..."` |
| Add a new directory | `node outreach/scripts/mark.ts --id smithery --add --target "Smithery" --route form [--notes "..."]` |
| Type-check after editing | `cd outreach/scripts && npm run typecheck` |

## Tracker columns

| Column | Meaning |
|---|---|
| `id` | Short kebab-case key; matches `targets/<id>.md` where one exists |
| `route` | `github_pr`, `github_issue`, `form`, `email`, `in_app`, `crawl`, `cli`, `none`, `unsolicited` (listed without us submitting) |
| `status` | `todo`, `prep` (needs repo work or a decision), `drafted` (ready, not sent), `submitted`, `listed`, `covered` (reached via another listing), `no_route`, `skipped`, `closed` |
| `next_action` | What happens next, and who does it if it's the user (`user: ...`) |
| `follow_up_on` | Date to look again; `refresh.ts` lists rows that are due |
| `last_activity` | Latest reply from them (`date login`), or `none`. Set by `refresh.ts` |

Allowed values are checked in [`lib/tracker.ts`](lib/tracker.ts). The scripts take a lock (`tracker.csv.lock`) while they run so two agents can't overwrite each other.

## What `refresh.ts` does

- **GitHub PRs and issues** with status `submitted`: reads state, labels, comments and reviews. Bots and our own account don't count as a reply. A merged PR becomes `listed`, a closed PR becomes `closed`, and an open one where they spoke last gets `next_action: reply on GitHub`. A closed issue is only reported, since that can mean approved or rejected.
- **Crawled directories** in `CRAWL_CHECKS` (Gemini gallery, MCP Registry): marks `listed` once npmscan shows up in the public index. Add a check there when a new crawled directory has one.
- Email, form and in-app replies aren't checked; see the replies check in [`../README.md`](../README.md).
