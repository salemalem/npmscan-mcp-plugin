# DeepSeek Harness (DSH) plugin directories

Researched 2026-10-21. Status lives in `tracker.csv` (row `dsh-plugin`).

## What DSH is

[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) (`dsh`) is DeepSeek's open-source coding agent: about 256k stars, created 2026-08-13, still a developer preview with breaking changes. Everything in it is a plugin, built on Cordis. Run it with `npx @deepseek-ai/dsh web`.

- **MCP:** built in through `@deepseek-ai/dsh-mcp-client`, one entry per server, stdio or Streamable HTTP ([docs/subsystems/mcp.md](https://github.com/deepseek-ai/deepseek-harness/blob/main/docs/subsystems/mcp.md)). So a user can already point it at `https://npmscan.com/api/mcp` by hand. Prompt templates and elicitation aren't supported. For OAuth servers there's the community `dsh-oauth-mcp-client` plugin.
- **Plugins:** npm packages (or git repos) whose `package.json` declares `dsh.bundle`. Install with `dsh plugin add <pkg>`.
- **Skills:** plugins can ship SKILL.md skills; `dsh-superpowers` wraps obra/superpowers that way, and `dsh-skillport` imports Claude/Codex/Gemini skills.
- **Discovery:** there's no official registry. The README says to add the GitHub topic [`dsh-plugin`](https://github.com/topics/dsh-plugin) to the plugin repo. A built-in "Custom plugin markets" feature (experimental) reads any JSON index URL ([plugin-market.md](https://github.com/deepseek-ai/deepseek-harness/blob/main/docs/user/guide/plugin-market.md)).

## Directories (all Chinese-first, most fill themselves)

| Directory | How entries get in | Size (2026-10-21) |
|---|---|---|
| [awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) | PRs, one plugin each; the biggest DSH list by far | 19.8k stars, 8,400+ PRs, 26 outside merges in the last 30 days |
| [imsai-sh/awesome-deepseek-harness-plugins](https://github.com/imsai-sh/awesome-deepseek-harness-plugins) → deepseek1024.com + in-app "1024 Store" | Auto-collects repos with the `dsh-plugin` topic; PRs also accepted (static validation) | 13,833 plugins, 306 stars |
| [bruc3van/awesome-dsh-plugin](https://github.com/bruc3van/awesome-dsh-plugin) | Daily crawl of the topic, each repo re-checked (tag-squatters dropped); PRs too | 439 stars, 8 outside merges in 30 days |
| [awesome-deepseekharness/awesome-deepseek-harness](https://github.com/awesome-deepseekharness/awesome-deepseek-harness) | Community-curated plugins, tools, skills; PRs | 13 outside merges in 30 days |
| [whyihaveyou/dsh-suite](https://github.com/whyihaveyou/dsh-suite) → in-app Store tab | Hourly refresh from the topic, daily install test | 2,088 plugins |
| [AdamPlatin123/dsh-plugin-radar](https://github.com/AdamPlatin123/dsh-plugin-radar) | Crawls candidates; community form in PLUGINS.md | 9,122 records, 1,481 stars |
| [NoWint/Oh-My-DSH](https://github.com/NoWint/Oh-My-DSH) | Topic + keyword search, hourly | curated subset |
| [kejixiaoliang/awesome-dsh-plugins](https://github.com/kejixiaoliang/awesome-dsh-plugins) | Hand-curated categories (has MCP and Skills sections); PRs | 353 plugins |
| [libukai/awesome-deepseek-harness](https://github.com/libukai/awesome-deepseek-harness) | Hand-picked guide ("few but good"); issues welcome | 312 stars |

## What it would take

1. Publish a DSH bundle to npm (working name `dsh-plugin-npmscan`): an MCP client entry for `https://npmscan.com/api/mcp` plus our 5 skills.
2. Test it in `npx @deepseek-ai/dsh web` (developer preview, so pin the DSH version it was tested on in `engines.dsh`).
3. Add the `dsh-plugin` topic to the repo that holds it. The auto-collectors should pick it up within hours to a day.
4. Then PR the two hand-curated lists (MCP or Skills section), in Chinese or bilingual.

Version upkeep: this would add another manifest to bump on each release (see the root README of `outreach/`).
