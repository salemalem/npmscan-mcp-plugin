# 0xWelt/Awesome-Vibe-Coding

https://github.com/0xWelt/Awesome-Vibe-Coding — screened 2026-10-29 (claude-opus-5.5). Status lives in
`tracker.csv`; this note is a dated snapshot.

## Route

`github_pr`. add an entry under contents/harness-extensions (MCP Servers); README is generated from contents/.

## Research

Tier 1. 96 outside merges in 30d. Entries live as files under contents/<category>/, not in README. Recent merges: Carbon Forge to Harness Extensions > MCP Servers, Vibe-Coding Security Checklist. Read the Adding a Tool section first. PR title style: feat(contents): add <Name> to <Category>.

## Before submitting

- Re-read the repo's CONTRIBUTING / README rules; they change.
- Hosted endpoint: `https://npmscan.com/api/mcp`. Open plugin repo: `salemalem/npmscan-mcp-plugin` (MIT).
- Plain description, no pricing or marketing words, and say we maintain npmscan.
- Get the user's go-ahead before opening the PR.

## Submitted (2026-10-29)

PR https://github.com/0xWelt/Awesome-Vibe-Coding/pull/420
— title `feat(contents): add npmscan to Harness Extensions > MCP Servers`.

- Fork `salemalem/Awesome-Vibe-Coding`, branch `add-npmscan`, commit
  `feat(contents): add npmscan to Harness Extensions > MCP Servers`.
- Repo rule: the README is generated from `contents/`, so the PR adds one new
  file `contents/harness-extensions/mcp-servers/npmscan.md` and touches nothing
  else. Front matter uses the required `name` / `link` keys.
- Entry body mentions the malware and AI-payload audit, the vulnerability,
  maintainer, license and transitive-dependency reporting, the read-only remote
  endpoint, and MIT. No pricing or marketing wording.
- CI note: the `Test` workflow is `action_required` on fork PRs — GitHub needs a
  maintainer to approve the run. The workflow body is only
  `echo "Test passed"`, so it cannot fail on the content.
- PR state at submission: open, 1 file, +6/-0.
- Follow up 2026-11-12. If nothing moves after a few days, ask the maintainer
  to approve the workflow run.
