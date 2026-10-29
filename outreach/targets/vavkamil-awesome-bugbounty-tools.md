# vavkamil/awesome-bugbounty-tools

6439 stars, 6 outside merges in 30 days (2026-10-29), 1 open PR. Low traffic
but a very large, well-organised security list.

## Route

`github_pr`. Fork, edit `README.md`, open a PR.

## Requirements

- `contributing.md` is a placeholder template with no real rules, so follow the
  existing entries: `- [Name](url) - One or two sentence description.`
- The list is alphabetically sorted inside each section.
- `## Uncategorized` exists at the bottom for entries that do not fit.

## What to submit

`### Vulnerability Scanners` (under Miscellaneous) is the right section, and
there is a direct precedent in it: **retire.js** — "scanner detecting the use
of JavaScript libraries with known vulnerabilities". npmscan is the same
category for npm packages, covering known vulnerabilities plus malware and
AI-specific payloads, reachable by agents over MCP.

`### AI Agents` is the alternative; it already holds shannon, Darkmoon,
PentestGPT, Agentic Bug Bounty Hunter and RedAmon, all agent-driven pentesting
tools, and npmscan as an agent-reachable scanner fits that framing too.

## Notes

The whole list is web-application security: SQLi, XSS, SSRF, CORS, and so on.
npmscan scans the dependency tree rather than a running web app, so say
"npm dependency scanner" explicitly in the description. If a maintainer
objects on scope, `### AI Agents` is the fallback.

Low merge rate means a slow review, not a fast one.
