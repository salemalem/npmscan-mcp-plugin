# raphabot/awesome-cybersecurity-agentic-ai

https://github.com/raphabot/awesome-cybersecurity-agentic-ai — screened 2026-10-29 (claude-opus-5.5). Status lives in
`tracker.csv`; this note is a dated snapshot.

## Route

`github_pr`. add a bullet under MCP Servers, alphabetical (CI checks the order).

## Research

Tier 1, best topical fit of the batch. 10 outside merges in 30d. MCP Servers section already merged malware-intel peers: ScanMalware MCP (2026-10-15), isMalicious MCP (2026-10-02), rugsnare. Remote servers accepted (aribot-mcp). Format: - [name](url) - description.

## Before submitting

- Re-read the repo's CONTRIBUTING / README rules; they change.
- Hosted endpoint: `https://npmscan.com/api/mcp`. Open plugin repo: `salemalem/npmscan-mcp-plugin` (MIT).
- Plain description, no pricing or marketing words, and say we maintain npmscan.
- Get the user's go-ahead before opening the PR.

## Submitted (2026-10-29)

PR https://github.com/raphabot/awesome-cybersecurity-agentic-ai/pull/100
— title `Add salemalem/npmscan-mcp-plugin to MCP Servers`.

- Fork `salemalem/awesome-cybersecurity-agentic-ai`, branch `add-npmscan`, commit
  `Add salemalem/npmscan-mcp-plugin to MCP Servers`.
- Inserted alphabetically in the `MCP Servers` section, between
  `PortSwigger/mcp-server` and `san-techie21/astracipher`.
- Ran `scripts/check-alphabetical-order.sh` locally against the pushed branch:
  MCP Servers 26, Research 10, Tools 51, Frameworks 10, Datasets 6,
  Learning Resources/Podcast 5, Communities 2 — all sections in alphabetical
  order, exit 0.
- The root `PULL_REQUEST_TEMPLATE.md` was filled in: entry details, the
  rationale against the existing ScanMalware / isMalicious peers, MIT license,
  five plain `SKILL.md` workflows, 23 read-only tools, the HTTP 200 endpoint
  check, every checklist box ticked, and the maintainer disclosure.
- CI note: the `Check Alphabetical Order` workflow is `action_required` on fork
  PRs — GitHub needs a maintainer to approve the run. The same script passes
  locally.
- PR state at submission: open, 1 file, +1/-0.
- Follow up 2026-11-12.
