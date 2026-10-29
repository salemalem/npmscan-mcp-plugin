# soxoj/awesome-osint-mcp-servers

533 stars, 31 outside merges in 30 days (2026-10-29). OSINT-focused MCP
directory with a `## Threat Intelligence` section.

## Route

`github_pr`. Edit `README.md`, one bullet.

## Requirements (CONTRIBUTING.md)

- **Scope gate:** "This list is for **OSINT** MCP servers: tools that gather or
  enrich intelligence from open sources". Generic DevSecOps or pentest tooling
  with no OSINT angle is excluded; recon-only scanners are fine, exploitation
  frameworks are not.
- Entry format: `- {emoji} [Name](url) — one or two sentence description. MCP: <endpoint if hosted>`
  (em dash, not a hyphen).
- Emoji legend: 📦 Open Source · 🆓 Free / Free tier · 💰 Paid. Use only the
  emoji that actually apply. A project with a public repo is 📦 even if the API
  itself costs money.
- Hosted endpoints are verified: they send a raw `initialize` handshake and
  confirm it responds. `https://npmscan.com/api/mcp` answered with HTTP 200 on
  2026-10-29.
- Tool counts in the PR description must match the code — they grep for
  `registerTool` / tool manifests / `tools/list` output rather than trusting
  the README. State the real tool count.
- Rejected: a growth/marketing plan file committed to the repo, AI-generated PR
  titles stuffed with emojis, vague templated bodies, or descriptions that
  don't match the diff. Write the PR body by hand.

## What to submit

`## Threat Intelligence` is the honest home: npmscan reports on npm packages
that carry malware, phishing or AI-specific payloads — intelligence about the
package ecosystem that an OSINT analyst would use.

The scope gate is the real risk here: a maintainer may read "dependency
scanner" as generic DevSecOps tooling. Lead with the intelligence angle
(malware families, malicious packages, typosquats) rather than with the
CI/CD or dependency-management framing.

Open-source check: link `salemalem/npmscan-mcp-plugin` (MIT, public). Use 📦
and 🆓 only if both are actually true.
