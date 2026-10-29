# ottosulin/awesome-ai-security

1589 stars, 10 outside merges in 30 days (2026-10-29). The most on-topic list
of the ten: it has both `### MCP Security` and
`### Data & Supply Chain Security` sections under a security umbrella.

## Route

`github_pr`. Edit `README.md`, one bullet.

## Requirements

- No CONTRIBUTING.md, so follow the existing bullets:
  `* [Name](https://github.com/owner/repo) - _Short description_`
  — leading `*`, link, hyphen, description in italics.
- The maintainer runs "freshness sweeps" that remove unmaintained tools and
  fix stale links, so entries get re-checked later.

## What to submit

`### Data & Supply Chain Security` is the exact fit — that section currently
holds AIBOM and model-provenance tools, and npmscan audits npm package supply
chain for malware and AI payloads. `### MCP Security` is the second choice.

Open-source check: `salemalem/npmscan` is private, so the link has to be the
plugin repo `salemalem/npmscan-mcp-plugin` (MIT, public). No other entry in
this list is a commercial hosted service, which is the main risk — see
`targets/copilot.md` for how a vendor-hosted service was rejected elsewhere.

## Notes

Merged recently in `MCP Security`: ToolHive, Preloop, Frame, Tracekit,
schemagate — all MCP security tooling, so the maintainer is actively
interested in this category.
