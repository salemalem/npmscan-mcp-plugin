# Gemini CLI

**Status: ⏳ shipped, waiting for the gallery's daily crawl.** `gemini-extension.json` is on `main` (`0b29cac`) and the `gemini-cli-extension` topic is on the repo. Installing from GitHub works today: 5 skills load and the server shows Connected. As of 2026-10-17 19:30 UTC, minutes after the push, it wasn't in the gallery yet. Expect it within about 24 hours.

Researched and tested on 2026-10-18 with Gemini CLI 0.64.0.

**How listing works:** there's no submission step. The [gallery](https://geminicli.com/extensions/) crawls GitHub daily for public repos that have:
1. the topic `gemini-cli-extension`
2. a `gemini-extension.json` at the repository root

A repo appears "if it passes validation". The checks aren't published, but `gemini extensions validate` is the local equivalent. ([docs](https://geminicli.com/docs/extensions/releasing/))

**Who it reaches:** on 2026-06-18 Google moved free, Google AI Pro and Ultra users from Gemini CLI to **Antigravity CLI** ([announcement](https://github.com/google-gemini/gemini-cli/discussions/27274)). Gemini CLI stays for enterprise (Code Assist Standard/Enterprise, Google Cloud) and paid API-key users, and it's still released weekly. Antigravity users can bring Gemini extensions across with `agy plugin import gemini`. So this listing reaches a smaller audience than before, but it's cheap: one file, one README section and one topic.

**The manifest.** This exact file was tested: `gemini extensions validate` passes, the install loads the `npmscan` MCP server (**Connected** to the live endpoint) and all 5 skills from `skills/`.

```json
{
  "name": "npmscan",
  "version": "3.1.2",
  "description": "Check npm packages for malware, known vulnerabilities, typosquats, maintainer takeovers and risky install scripts before installing; audit package.json, lockfiles, SBOMs and PR dependency changes. Free, read-only, no API key.",
  "mcpServers": {
    "npmscan": {
      "httpUrl": "https://npmscan.com/api/mcp"
    }
  }
}
```

- `httpUrl` is the field for streamable HTTP. `url` would mean SSE, which is wrong for this server ([MCP config docs](https://geminicli.com/docs/tools/mcp-server/)).
- Skills need no config: Gemini loads `skills/<name>/SKILL.md` from the extension root, which is the folder that already exists.
- No `GEMINI.md` is needed; the skills already tell the model when to use npmscan.

**Steps**
- [x] Add `gemini-extension.json` (above) at the repo root.
- [x] Add a "Using it with Gemini CLI" section to README.md with the install command `gemini extensions install https://github.com/salemalem/npmscan-mcp-plugin`, and list it under "Official listings → Pending".
- [x] Commit and push to `main`. No GitHub release is needed: git installs track the default branch, and every push offers users an update.
- [x] Add repo topics: `gh repo edit salemalem/npmscan-mcp-plugin --add-topic gemini-cli-extension`. Discovery topics added at the same time: `mcp`, `npm`, `security`, `supply-chain-security`.
- [x] Verify from GitHub (not a local copy): install with `gemini extensions install https://github.com/salemalem/npmscan-mcp-plugin` into a throwaway `HOME`, then confirm `gemini mcp list` shows **Connected** and all 5 skills are listed.
- [ ] After about 24 hours, search "npmscan" on [geminicli.com/extensions](https://geminicli.com/extensions/). If it's missing after 2–3 days, rerun `gemini extensions validate` on a fresh clone and ask in [gemini-cli Discussions](https://github.com/google-gemini/gemini-cli/discussions).
