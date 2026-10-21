# Antigravity (Google, the Gemini CLI replacement)

Not started; it needs a decision first.

- **Official marketplace** (`antigravity-plugins-official`): there's no public submission route, only an [interest form](https://forms.gle/2EX5RFYPoJe1UgxR9) linked from the [Marketplace docs](https://antigravity.google/docs/marketplace).
- **Direct install** works without a listing: `agy plugin install https://github.com/<owner>/<repo>`. It needs:
  - a root `plugin.json` holding only `name`, `description` and optionally `$schema`; the docs say no other keys are allowed
  - an `mcp_config.json` using `serverUrl`, not `url` or `httpUrl`
  - `skills/`, which already exists
- **Conflict to resolve first:** Kiro, and the cross-tool "Agent Plugins" format, want a root `plugin.json` that *does* include `version`, `author` and `license`. Both can't share one root file if Antigravity really rejects extra keys. Its schema URL returns 404, so this is untested. Until then, Antigravity users can reach npmscan through `agy plugin import gemini` after installing the Gemini extension.
