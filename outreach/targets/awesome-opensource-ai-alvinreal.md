# alvinreal/awesome-opensource-ai

4949 stars, 79 outside merges in 30 days (2026-10-29). Big curated list of
open-source AI projects, sections `1.`–`13.`, with
`## 10. AI Safety, Alignment & Interpretability` and
`## 13. Developer Tools & Integrations`.

## Route

`github_pr`. Edit `README.md`, one bullet.

## Requirements (CONTRIBUTING.md)

- Format: `- [Project Name](https://github.com/owner/repo) - Factual
  one-sentence description. ![GitHub stars](https://img.shields.io/github/stars/owner/repo?style=social)`
- **Open-source license only.** No abandoned repos.
- Plain links for non-GitHub resources (no star badge then).
- "Do not add projects only because they mention AI somewhere in the README."
- "Would someone using this list today benefit from seeing both entries, or
  only the current best representative?" — one entry per project.
- The list is curated, not exhaustive; inclusion is maintainer judgment.

## What to submit

The blocker to check first: `salemalem/npmscan` is **private**, so this list
can only take the plugin repo `salemalem/npmscan-mcp-plugin` (MIT, public,
480 stars, pushed 2026-10-29). That is the open-source artifact, and it is the
MCP plugin plus the five skills — a legitimate open-source AI project.

Section 13 (Developer Tools & Integrations) is the honest home. Section 10
(AI Safety) is also defensible but weaker, since npmscan scans npm packages
rather than models.

Similar hosted tools already merged here: Context7, Firecrawl, Tavily, Exa,
n8n, YYLO. So hosted products are accepted.

## Notes

This list is the strictest on open-source licensing of the ten, and the
maintainer prunes stale entries, so expect a possible "not maintained" follow-up
if the plugin repo goes quiet. Keep the repo release cadence visible.

## Submitted (2026-10-29)

[alvinreal/awesome-opensource-ai#897](https://github.com/alvinreal/awesome-opensource-ai/pull/897),
fork `salemalem/awesome-opensource-ai`, branch `add-npmscan`.

One bullet at the end of `13. Developer Tools & Integrations › CLI Tools & API
Clients`, next to the other MCP servers already listed there (Context7,
DesktopCommander MCP, Mobile MCP, REA). The link is the public MIT plugin repo,
not the private `salemalem/npmscan`.

`python3 tools/validate_awesome.py --skip-remote` reports 0 errors and 0
warnings. With a `GITHUB_TOKEN` the remote pass also passes for this repo; the
10 archived-repo warnings it prints are pre-existing entries.

The PR body uses the checklist that CONTRIBUTING.md asks for — Project, Why it
belongs, Quality signals — and the validator output is quoted in it.
