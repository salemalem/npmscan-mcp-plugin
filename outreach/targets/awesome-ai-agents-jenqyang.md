# Jenqyang/Awesome-AI-Agents

1268 stars, 64 outside merges in 30 days (2026-10-29). The most active list
of the ten by merge rate. Sections: `## Applications`, `### Tools`,
`## Frameworks`, `## Platforms/API`.

## Route

`github_pr`. Edit `README.md`, one bullet.

## Requirements (CONTRIBUTING.md)

- Format:
  `- [ProjectName](https://github.com/org/repo) - Neutral one-line description. ![GitHub Repo stars](https://img.shields.io/github/stars/org/repo?style=social)`
- **No pricing in the entry.** "Free tier", "no API key", pricing, credits,
  pay-per-call access and upgrade paths "may be treated as advertising
  signals". Remove them.
- Remove promotional language.

## What to submit

`### Tools` under Applications, or `## Platforms/API`. The plugin repo
`salemalem/npmscan-mcp-plugin` is the link (MIT, public) — do not link the
private `salemalem/npmscan`.

Description: npm package auditing for AI agents over MCP, malware and
AI-payload detection. No mention of plans or pricing.

## Notes

The list already carries a large cluster of AI security tooling — Darkmoon,
Orchard Kit, Agentic Radar, Kontext CLI, Cynative, IronClaw, Enclave. Those
all live in `### Tools`, which is where npmscan belongs.

## Submitted (2026-10-29)

[Jenqyang/Awesome-AI-Agents#692](https://github.com/Jenqyang/Awesome-AI-Agents/pull/692),
fork `salemalem/awesome-ai-agents`, branch `add-npmscan`.

One bullet at the end of `### Tools`, in the same format as the neighbouring
lines: name, link to the public MIT plugin repo, one neutral sentence, and the
`![GitHub Repo stars]` badge.

The PR body fills in the repository's own template at
`.github/pull_request_template.md` — Summary, Type of change, Target section,
Quality checks, Proposed entry line, Evidence — with the boxes that are true
ticked.

This is the strictest list of the five on the "thin wrapper to a hosted
service" rule: it rejects OSS wrappers whose value depends on a proprietary
backend. The PR body answers that directly — the repository ships the five
agent skills as plain `SKILL.md` files plus the Claude Code, Codex, Gemini CLI
and Kimi manifests, so the audit procedure itself is reusable without the
hosted product. The entry line carries no pricing, tier, credit or access
wording.
