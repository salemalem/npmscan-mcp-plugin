# GitHub Copilot (awesome-copilot)

- This is the default plugin marketplace in Copilot CLI and VS Code.
- **Route:** the external-plugin issue form. Automated checks run first (lint plus an install smoke test), then a maintainer comments `/approve` or `/reject`. Approval opens the PR automatically. Don't edit `plugins/external.json` directly.
- **Fields:** name, description, `owner/repo`, a release tag and/or the full commit SHA, version, license and author.
- **What we submitted:** commit `67beba8` with no tag (`v3.1.2` stays on `a5e482a`), version 3.1.2, author BlockHacks.io. The issue was opened with `gh`, which can't add labels for non-collaborators, so the body starts with `<!-- external-plugin-submission -->` to trigger their bot. Editing the issue re-runs the gates.
- **Lesson from the first run:** the gates look for a manifest only at `plugin.json`, `.plugin/plugin.json` or `.github/plugin/plugin.json`. They ignore `.claude-plugin/plugin.json`, so the first run failed the install and version checks. Adding `.github/plugin/plugin.json` fixed both.
- **Current result:** skills lint, install test and version match all pass. One non-blocking warning remains: the manifest isn't the root Agent Plugins `plugin.json` and has no `$schema`. The root `plugin.json` from Step 1 would clear it.
- **Updating the listing later:** after approval, version bumps go through a PR to `plugins/external.json`, and the bot runs the same gates on it.
- **Odds:** about 63 approved vs 241 rejected, decided within days. Common rejection reasons are "too niche", "too product-specific" and "primarily a marketing push for an external service". Pitch it around developer supply-chain safety, not npmscan.com.
