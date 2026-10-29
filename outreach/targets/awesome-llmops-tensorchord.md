# tensorchord/Awesome-LLMOps

5967 stars, 80 outside merges in 30 days (2026-10-29). Large LLMOps list with
a `Security` section (`### Frameworks for LLM security`).

## Route

`github_pr`. Edit `README.md`, add a row to the table under
`### Frameworks for LLM security`.

## Requirements

- No CONTRIBUTING.md, but the table shape is strict:
  `| Project | Details | Repository |`
- The Repository cell uses
  `![GitHub Badge](https://img.shields.io/github/stars/owner/repo.svg?style=flat-square)`.
- The Details cell is one to two sentences on a single line.
- The table is sorted; append near related entries rather than at the top.

## What to submit

npmscan as an LLM supply-chain scanner: it checks npm packages for malware and
AI-specific payloads before an agent installs or recommends them. The plugin
repo `salemalem/npmscan-mcp-plugin` is public and MIT; the hosted MCP endpoint
is `https://npmscan.com/api/mcp`.

Note the copy-paste style of the existing rows in this table — plain factual
sentences, no adjectives. Match that.

**Watch out:** the list is "Awesome LLMOps", so the entry has to read as
production AI infrastructure, not a general security tool. Frame it as the
dependency-audit step for AI agents and LLMOps pipelines.

## Submitted (2026-10-29)

[tensorchord/Awesome-LLMOps#1070](https://github.com/tensorchord/Awesome-LLMOps/pull/1070),
fork `salemalem/awesome-llmops`, branch `add-npmscan`.

One row in `### Frameworks for LLM security`, alphabetically between EmbedGuard
and Plexiglass. The star badge was written by hand as
`![GitHub Badge](https://img.shields.io/github/stars/salemalem/npmscan-mcp-plugin.svg?style=flat-square)`
because `scripts/generate-star-badges.py` only matches `- [` list lines and
ignores table rows — the same thing PR #962 noted.

Ran the repo's own scripts: `generate-star-badges.py` and
`github-markdown-toc` both left the README unchanged apart from the new row.
The PR body follows the shape of the recent merged PRs (what was added, where,
license, activity, disclosure).
