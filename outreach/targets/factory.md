# Factory (Droid)

**Status: ✅ self-install tested and documented** (2026-10-17). The README has a "Using it with Factory (Droid)" section.

**Test result** (Droid 0.244.0, throwaway home directory; binary from `@factory/cli-darwin-arm64` installed with `--ignore-scripts`):
- `droid plugin marketplace add salemalem/npmscan-mcp-plugin` reports "Successfully added marketplace: npmscan-mcp-plugin".
- `droid plugin install npmscan@npmscan-mcp-plugin --scope user` reports "Successfully installed npmscan@npmscan-mcp-plugin (962c7dc)".
- Droid's cache holds the 5 skills plus a translated `mcp.json` (`type: http`, `url: https://npmscan.com/api/mcp`), and `droid mcp list` shows `npmscan  http  connected  [user]`.
- **Gotcha:** the marketplace name comes from the **repo name**, not from `.claude-plugin/marketplace.json`'s `name` (`npmscan`). The plugin ID is `npmscan@npmscan-mcp-plugin`; `npmscan@npmscan` fails with "Marketplace not found". The plan's original command was wrong in exactly this way.

- **Official marketplace** ([Factory-AI/factory-plugins](https://github.com/Factory-AI/factory-plugins)): the README says "fork, add under `plugins/`, update marketplace.json, PR". But **no third-party PR has ever merged**: 32 merges, all by Factory staff or bots. 14 outside PRs are open, including Firecrawl and SonarQube, and the [docs](https://docs.factory.com/cli/configuration/plugins) describe no listing process.
- **The useful route:** Droid installs any GitHub marketplace, and it **translates Claude Code layouts** (`.claude-plugin/` becomes `.factory-plugin/`, and `.mcp.json` becomes `mcp.json`). This repo already has `.claude-plugin/marketplace.json` (marketplace name `npmscan`), so this should work today:
  ```bash
  droid plugin marketplace add salemalem/npmscan-mcp-plugin
  droid plugin install npmscan@npmscan-mcp-plugin --scope user
  ```
- [x] Test those two commands with Droid in a throwaway home directory (passed; see "Test result" above).
- [x] Add a "Using it with Factory (Droid)" README section.
- [x] Long-shot PR to the official marketplace: [Factory-AI/factory-plugins#60](https://github.com/Factory-AI/factory-plugins/pull/60), opened 2026-10-17. Odds: zero outside merges so far, out of 32 total.
  - **Format:** one `.factory-plugin/marketplace.json` entry (`source: {source: "url", url: …npmscan-mcp-plugin.git, sha: e83bfb4…}`, category `security`, homepage the docs) plus a README section, matching SonarQube's open PR #58. Fork `salemalem/factory-plugins`, branch `add-npmscan`, commit `f01a19a`.
  - **Tested before opening:** the edited marketplace, added locally to Droid 0.244.0, installs npmscan; `droid mcp list` shows connected; all 5 skills load. A separate test confirmed Droid supports pinned `url` sources.
  - **Note:** the repo's default branch is `master`, not `main`.
  - [ ] Watch #60. If it ever merges, future releases need a PR that bumps the `sha`.
