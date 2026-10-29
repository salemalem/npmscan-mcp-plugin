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

## Submitted (2026-10-29)

PR https://github.com/soxoj/awesome-osint-mcp-servers/pull/129
— title `Add npmscan to Threat Intelligence`.

- Fork `salemalem/awesome-osint-mcp-servers`, branch `add-npmscan`, commit
  `Add npmscan to Threat Intelligence`. One line added at the end of the
  `## Threat Intelligence` section.
- Entry text:
  `- 📦🆓 [npmscan](https://github.com/salemalem/npmscan-mcp-plugin) — Malware intelligence for the npm ecosystem: flags packages npm removed for malicious code, scans install scripts for exfiltration and obfuscation, cross-checks publish provenance, and maps a compromised npm account to every package it still controls. 23 read-only tools. MCP: https://npmscan.com/api/mcp`
- Scope gate handled as planned: the description leads with malicious-package
  intelligence (malware in the registry, install-script red flags, publish
  provenance, compromised maintainer accounts) rather than dependency scanning,
  and the PR body frames it as recon on the npm ecosystem as an attack surface.
- Format verified against the repo's own rule: em dash after the link, 303
  characters after the em dash (limit 400, median in the list 225), `MCP:`
  endpoint present, no tracking parameters in the URL.
- Emoji fact-checked: 📦 because the plugin repo is public MIT, 🆓 because the
  hosted endpoint is free and unauthenticated (no API key, 30 req/min per IP).
  No 💰 — nothing is paid.
- Evidence in the PR body, as the maintainer expects it: the raw `initialize`
  handshake answered HTTP 200 with `serverInfo {name: "npmscan", version:
  "3.1.3"}`; `tools/list` returns 23 tools, all 23 named; every OSV finding
  carries an `isMalware` flag; `get_latest_advisories` reads GitHub's
  malicious-package advisories and OpenSSF's malicious-packages feed; the
  plugin repo is public MIT. Maintainer disclosure included.
- PR state at submission: open, 1 file, +1/-0, mergeable `clean`.
- Follow up 2026-11-12.
