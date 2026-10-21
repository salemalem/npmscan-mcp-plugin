# Cline

**Status: ⏳ submitted to both catalogs on 2026-10-17.** Both are slow; that was expected going in.

There are two separate routes:

1. **New catalog, [`cline/marketplace`](https://github.com/cline/marketplace)** (started June 2026): one folder per entry, `registry/mcps/<id>/entry.json` plus an icon, opened as a PR. It drives `cline mcp install` one-liners.
   - **Ours:** [PR #262](https://github.com/cline/marketplace/pull/262), branch `add-npmscan-mcp` on the fork `salemalem/marketplace`. Tags `security` and `software`, icon is `icon.png` (400×400), `install.args` = `npmscan --transport http https://npmscan.com/api/mcp`, `verified: false` (only Cline sets that).
   - `npm run validate` (`node scripts/generate.mjs --check`) passed: "204 entries".
   - **Queue:** only 8 PRs merged, all by Cline's founder (saoudrizwan); no community PR merged yet; about 234 open. Authors from the old repo have been closing their issues and moving here.
2. **Old MCP Marketplace, [`cline/mcp-marketplace`](https://github.com/cline/mcp-marketplace):** an issue-form submission with the repo URL, a 400×400 PNG and two checkboxes.
   - **Ours:** [issue #3063](https://github.com/cline/mcp-marketplace/issues/3063), logo at `assets/logo-400.png` (raw GitHub URL). It's opened via `gh`, so it lacks the `server-submission` label, which non-collaborators can't set.
   - **Queue:** about 2,700 open issues; recent ones get no maintainer replies. The README says "a couple of days", which isn't what happens in practice.

**What was added to this repo** (`3b9982f`):
- `llms-install.md`, the setup steps Cline's one-click installer reads
- a "Using it with Cline" section in the README
- `assets/logo-400.png`: the light npmscan mark on the dark brand tile (#0A0A0C, the same as `icon.png`). The site's own logos are transparent and would vanish on dark themes.

**Tested:** Cline CLI 3.0.73 `cline mcp install npmscan --transport http https://npmscan.com/api/mcp --yes` gives `status: installed` with transport `streamableHttp`; an MCP `initialize` + `tools/list` returns 23 tools. Not tested: the VS Code extension's agent reading the README. The issue's "tested with README" checkbox is ticked, and the notes say exactly what was tested.

**Config shape:** Cline's docs use top-level `"type": "streamableHttp"` and `"url"`. The CLI itself saves a nested `transport` object, but the README follows the docs.

**Next:**
- [ ] Watch PR #262 and issue #3063. If a maintainer asks for changes on #262, push to the same branch.
- [ ] If neither moves in about a month, ask in Cline's [Discord](https://discord.gg/cline) `#mcp` channel, which the old repo's README names as the help channel.
