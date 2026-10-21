# Grok Build (xAI)

- PR [#1506](https://github.com/xai-org/plugin-marketplace/pull/1506): a remote source pinned to `5cbf977` (v3.1.2), category `security`, brand-scoped keywords (`npmscan*`).
- All of xAI's local checks passed. Their "Validate catalog" workflow waits for a maintainer to approve it, because this is a first-time contributor.
- The source stays on the personal `salemalem` account rather than the NPMscan org, so the Claude and ChatGPT listings don't have to move. The PR's reviewer notes explain this.
- **Queue:** about 923 open PRs. Only about 26 third-party plugins have been merged, with a median wait of about 12 days for those. Examples: [Clerk #1483](https://github.com/xai-org/plugin-marketplace/pull/1483) took 4 hours, [Skyvern #1313](https://github.com/xai-org/plugin-marketplace/pull/1313) 5.5 days, [Pi Security #307](https://github.com/xai-org/plugin-marketplace/pull/307) 55 days. Well-known brands get in fastest.
- The xAI form (Grok, Grok Bot and Cursor) is a separate route. One author closed their PR to use it instead ([#1436](https://github.com/xai-org/plugin-marketplace/pull/1436)).

## x.ai form (submitted 2026-10-18)

Submitted in addition to PR #1506, which stays open. The success page said "Thanks for submitting your plugin! We'll review it and follow up by email." There's no reference number; the reply goes to shyngys@blockhacks.io.

- Name: Shyngys Shynbolatov; work email: shyngys@blockhacks.io
- Organization: NPMScan; handle `npmscan`; website npmscan.com
- Logo: https://raw.githubusercontent.com/salemalem/npmscan-mcp-plugin/main/icon.png (256×256 dark tile)
- Listed on: Grok (coming soon), Grok Bot, Cursor (all three)
- Source: https://github.com/salemalem/npmscan-mcp-plugin
- Description and testing instructions cap at 600 characters each. The description was the 532-character version ending "Already listed in the Claude and ChatGPT directories." The testing instructions (545 characters) said no credentials are needed and gave the MCP URL, the repo, and 4 prompts: event-stream@3.3.6, a lodash/axios audit, the crossenv typosquat, and axios vs got vs ky.

## Updating the listing

Each Grok Build update needs a new PR to `xai-org/plugin-marketplace` that bumps the pinned commit, then runs `python3 scripts/generate-plugin-index.py`, `scripts/validate-catalog.py` and `scripts/generate-plugin-index.py --check`. The index script fetches every plugin in the catalog and takes several minutes, so run it in the background.
