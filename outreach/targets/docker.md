# Docker MCP Catalog

**Status: ⏳ PR open as a long shot:** [docker/mcp-registry#5808](https://github.com/docker/mcp-registry/pull/5808), opened 2026-10-17. The analysis below said to park it; we submitted anyway for the extra footprint, knowing the queue is stalled.

**What we submitted:** `servers/npmscan/` on fork `salemalem/mcp-registry`, branch `add-npmscan`, commit `235ac6a`:
- `server.yaml`: `type: remote`, category `security` (as Semgrep uses), title `NPMScan`, `transport_type: streamable-http`, url `https://npmscan.com/api/mcp`, no OAuth; the icon is `assets/logo-400.png` via raw GitHub (400×400; the limit is 512)
- `tools.json`: `[]`
- `readme.md`: the docs link

**Checks:** `npx prettier --check` passes. The `cmd/validate` rules were checked by hand (no Go installed here): the name matches the folder; the title has no "MCP" or "Server" and is capitalized; the transport is allowed; the icon is under 512px. The PR body uses their template, with the Docker-image items marked "not applicable" for a remote server.

- **Route:** a PR to [docker/mcp-registry](https://github.com/docker/mcp-registry) adding `servers/npmscan/` with three files:
  - `server.yaml` (`type: remote`, `remote.transport_type: streamable-http`, `remote.url: https://npmscan.com/api/mcp`, no `oauth`)
  - `tools.json` (`[]` for remote servers)
  - `readme.md` (a docs link)

  `task remote-wizard` generates them. It would take about 20 minutes.
- **Queue health:**
  - 1,855 open PRs.
  - Since 2026-09-01, only **one** PR merged, a bot updating an existing entry's commit pin.
  - Of the 10 human-authored merges since May, all updated *existing* vendors' entries (CircleCI, Temporal, Okta, Arm); none of the last 60 merged PRs adds a new server.
- **What submitters say:**
  - "[MCP server pending review for ever](https://github.com/docker/mcp-registry/issues/178)" (2025)
  - "[When can we expect our PR to be merged?](https://github.com/docker/mcp-registry/issues/323)" (2025)
  - InterSystems opened a [follow-up issue](https://github.com/docker/mcp-registry/issues/5704) on 2026-10-14 about its stuck PR, so even big vendors wait.
- **Covered indirectly:** Docker's CLI can build a catalog from the official MCP Registry (registry.modelcontextprotocol.io), where npmscan is listed.
- **Original decision:** park it. Overridden 2026-10-17: submit anyway, since a cheap PR beats an empty slot.
- [ ] Watch #5808. CI and Docker's review may need a maintainer to start them, because this is a first-time contributor. Answer any review comments on the same branch.
- [ ] If there's still no movement after a few months, leave it open; don't open duplicates or "any update?" issues, which the backlog is already full of.
