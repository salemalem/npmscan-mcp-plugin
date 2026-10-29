# acvnace/awesome-vibe-coding-resources

https://github.com/acvnace/awesome-vibe-coding-resources — screened 2026-10-29 (claude-opus-5.5). Status lives in
`tracker.csv`; this note is a dated snapshot.

## Route

`github_pr`. add a bullet under Security & Pre-Deploy Checks (Plugins and Extensions is the fallback).

## Research

Tier 1. 100 outside merges in 30d, 1 open PR, so merges within a day. Has a dedicated Security & Pre-Deploy Checks section (Tuvio, Ironheights merged 2026-10-28). Hosted MCP products already listed (Kleap, iter0, ArtiGram). Format: - [Name](url) - description. PR title style: Add <Name> to <Section>.

## Before submitting

- Re-read the repo's CONTRIBUTING / README rules; they change.
- Hosted endpoint: `https://npmscan.com/api/mcp`. Open plugin repo: `salemalem/npmscan-mcp-plugin` (MIT).
- Plain description, no pricing or marketing words, and say we maintain npmscan.
- Get the user's go-ahead before opening the PR.

## Submitted (2026-10-29)

PR https://github.com/acvnace/awesome-vibe-coding-resources/pull/248
— title `Add npmscan to Security & Pre-Deploy Checks`.

- Fork `salemalem/awesome-vibe-coding-resources`, branch `add-npmscan`, commit
  `Add npmscan to Security & Pre-Deploy Checks`.
- One line added, appended after `SniffPup` in the `## Security & Pre-Deploy Checks`
  section. No `.github` directory, so no custom PR template to fill in.
- Entry text:
  `- [npmscan](https://github.com/salemalem/npmscan-mcp-plugin) - MIT-licensed plugin and MCP server that audits npm packages for malware and AI-specific payloads before an agent installs them, and reports vulnerabilities, maintainer history, license and transitive dependencies. Remote MCP endpoint: ` + "`https://npmscan.com/api/mcp`"
- PR body states plainly that we maintain npmscan, and lists the public MIT repo
  and the hosted endpoint. No pricing or marketing wording.
- PR state at submission: open, 1 file, +1/-0, mergeable `clean`.
- Follow up 2026-11-12. This repo merges fast (100 outside merges in 30d).
