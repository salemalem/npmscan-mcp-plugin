# awesome-codex-plugins

- **Route:** a one-line README PR. Their generator mirrors the plugin itself. Recent PRs merged the same day.
- **Requirements:** `.codex-plugin/plugin.json`, `SECURITY.md`, `LICENSE` and a README; a score of at least 80 from their scanner (`plugin-scanner`).
- OpenAI's official plugin directory is shared between ChatGPT and Codex, so npmscan may already be in Codex's official directory. Not confirmed.
- TRAE's marketplace appears to pull its community plugins from this list (17 of 18 checked matched). See [trae.md](trae.md).

## Research (2026-10-26)

- **Gates:** `Validate Plugin PR` (`scripts/validate-plugin-pr.py`) needs `name`, `version`, `description`, `repository`, `license`, and `interface.displayName`, `shortDescription` and `composerIcon` (an existing SVG/PNG/JPG/WebP/ICO file of at most 50 KB). `check-alphabetical.py` sorts entries by lower-cased display name. A centralized scan must reach 80.
- **Rejections and stalls:** missing or empty `composerIcon` (#563, #544); centralized score under 80 (#531 at 73-75, #487 at 79); nested plugin directory the central scan skipped (#554). #470 passed locally, then the central run (with the Cisco skill scanner) found 35 high findings; maintainers merged once the score cleared 80, saying severities are advisory.
- **Our repo** (commit `423199f`): `composerIcon` `./icon.png` (25 KB), `logo`, two screenshots, `.agents/plugins/marketplace.json`. `plugin-scanner==3.57.0`: 100/100 without Cisco; 97/100 with `plugin-scanner[cisco]`, which reports 2 high findings in `skills/dependency-audit/references/test-prompts.md` (case 35 is a deliberately hostile package.json containing "ignore previous instructions", and the file uses a Cyrillic "о" in `lоdash` on purpose). `.plugin-scanner.toml` disables `KIMI_INTERFACE_INVALID` ([hol-guard#6032](https://github.com/hashgraph-online/hol-guard/issues/6032)).
- **Placement:** Tools & Integrations, between "NotFair Plugin" and "Nullcost".

## What we submit

README line:

```
- [NPMScan](https://github.com/salemalem/npmscan-mcp-plugin) - Check npm packages for malware, known vulnerabilities, typosquats and maintainer takeovers before installing, via npmscan.com's free, read-only MCP server (23 tools, no API key).
```

PR title: `Add NPMScan to Tools & Integrations`

PR body:

```
Adds [NPMScan](https://github.com/salemalem/npmscan-mcp-plugin) to Tools & Integrations (between NotFair Plugin and Nullcost). I maintain npmscan.

It checks npm packages for malware, known vulnerabilities, typosquats and maintainer takeovers before you install them. The plugin is five skills plus npmscan.com's hosted, read-only MCP server (23 tools, no API key or account). It's also listed in Anthropic's Claude directory and as a ChatGPT app.

Install: `codex plugin marketplace add salemalem/npmscan-mcp-plugin`, then `codex plugin add npmscan@npmscan` (tested with codex-cli 0.164.0).

Local scan with plugin-scanner 3.57.0 (hash checked against CONTRIBUTING):
- Without the Cisco extra: 100/100, no findings.
- With `plugin-scanner[cisco]`: 97/100, 0 critical, 2 high. Both are in `skills/dependency-audit/references/test-prompts.md`, the skill's manual test cases:
  - `PROMPT_INJECTION_IGNORE_INSTRUCTIONS` (line 400): test case 35 is a deliberately hostile package.json whose description says "ignore previous instructions". The test checks that the skill ignores it and warns the user.
  - `UNICODE_OBFUSCATED_INSTRUCTION`: the same file spells `lоdash` with a Cyrillic "о" on purpose to test typosquat detection, and it uses em dashes.

`.plugin-scanner.toml` disables one Kimi rule that misreads `kimi.plugin.json`, reported in hashgraph-online/hol-guard#6032. It doesn't affect the Codex manifest.

Checklist: `.codex-plugin/plugin.json` with `composerIcon` (PNG, 25 KB), `SECURITY.md`, MIT `LICENSE`, README, no secrets, no local MCP commands (remote HTTP only), no GitHub Actions.
```
