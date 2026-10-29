# VoltAgent/official-mcp-servers

https://github.com/VoltAgent/official-mcp-servers — screened 2026-10-29 (claude-opus-5.5). Status lives in
`tracker.csv`; this note is a dated snapshot.

## Route

`github_pr`. add an entry in the right category; description 10 words or fewer; PR title Add server: npmscan.

## Research

Tier 1. 43 outside merges in 30d, 2 open. Only official servers backed by the product's own company, which npmscan is. Hosted MCP peers merged recently (PlaceCall, UI Verify, CallMeMCP). Keep the description at 10 words max.

## Before submitting

- Re-read the repo's CONTRIBUTING / README rules; they change.
- Hosted endpoint: `https://npmscan.com/api/mcp`. Open plugin repo: `salemalem/npmscan-mcp-plugin` (MIT).
- Plain description, no pricing or marketing words, and say we maintain npmscan.
- Get the user's go-ahead before opening the PR.

## Submitted (2026-10-29)

PR https://github.com/VoltAgent/official-mcp-servers/pull/65
— title `Add server: npmscan`.

- Fork `salemalem/official-mcp-servers`, branch `add-npmscan`, commit
  `Add server: npmscan`.
- Placed at the end of the `Emerging and Independent` section. npmscan could
  also read as `Security and Code Quality`, but CONTRIBUTING asks small
  independent products to go under Emerging and Independent, and the PR body
  offers to move it.
- Description is 9 words, against the repo's 10-word cap:
  `- **[npmscan](https://github.com/salemalem/npmscan-mcp-plugin)** - Audit npm packages for malware before agents install them`
- The PR body carries the evidence CONTRIBUTING.md asks for: public MIT repo,
  active maintenance, latest tag `v3.1.2`, server version `3.1.3`, repo
  creation date 2026-08-01, 481 stars, the Anthropic Claude plugin directory
  and ChatGPT app listings, and the HTTP 200 `initialize` handshake. It states
  that the maintainer maintains npmscan.
- PR state at submission: open, 1 file, +1/-0, mergeable `clean`.
- Follow up 2026-11-12.
