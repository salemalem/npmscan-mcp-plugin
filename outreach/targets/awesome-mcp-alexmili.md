# AlexMili/Awesome-MCP

154 stars, 59 outside merges in 30 days (2026-10-29). A general MCP server
directory with a `Dev, Code & Git` category and a `Featured` block.

## Route

`github_pr`. Edit `README.md` directly, one table row.

## Requirements (CONTRIBUTING.md)

- Table columns: `Server | Description | Lang | Activity | ⭐`.
- The Server cell carries a ✅ emoji for official/verified servers and a link
  to the repo.
- Description must be "a real, non-promotional description of what it does".
- Lang cell uses a devicon image; use `—` when there is no clear language.
- If nothing fits an existing category, use **Other**. Don't create a new
  category in the PR — open an issue first.

## What to submit

`Dev, Code & Git` is the honest home: npmscan audits npm packages and exposes
an MCP server for coding agents. The hosted endpoint
`https://npmscan.com/api/mcp` answered `initialize` with HTTP 200 on
2026-10-29.

Lang: `typescript` if the plugin repo is the link, otherwise `—`. Activity
column: days since last commit. Keep the description to one plain sentence
about dependency auditing — no pricing, no marketing words.

## Submitted (2026-10-29)

[AlexMili/Awesome-MCP#349](https://github.com/AlexMili/Awesome-MCP/pull/349),
fork `salemalem/awesome-mcp-alexmili`, branch `add-npmscan`.

One row appended at the end of the `Dev, Code & Git` table, and the Contents
count for that category bumped from 22 to 23. The row uses the devicon for
TypeScript, leaves the official-marker emoji off, and keeps the `🟢 0d` / `0`
placeholders that the refresh workflow normalizes.

The repo checks the diff with `scripts/check_entry.py` on `pull_request_target`,
reading the base README. Ran it locally against the upstream README and the PR
diff: `OK  npmscan → Servers › Dev, Code & Git`.
