# Plugin Directory submission — copy/paste reference

Values for the `platform.claude.com/plugins/submit` form
(Plugin Directory, step "Plugin information"). Sourced from
`.claude-plugin/plugin.json` and this repo's README — not guessed.

## Step 2: Plugin information

**Link to plugin**
```
https://github.com/salemalem/npmscan-mcp-plugin
```

**Path within repository** (optional)
Leave blank — the plugin lives at the repo root, not a subdirectory.

**Plugin homepage** (optional)
```
https://npmscan.com/docs/mcp
```

**Plugin name**
```
npmscan
```

**Plugin description**
```
Detect malicious, vulnerable, or typosquatted npm packages from a conversation. Search the npm registry, or compare 2-5 candidates side-by-side before adding a new dependency; inspect maintainers, install scripts, and Sigstore publish provenance before installing; audit a whole package.json/lockfile/SBOM/GitHub repo — including transitive dependencies, license compliance, and before/after PR diffs or npm audit output — against OSV.dev / GitHub Security Advisories / NIST NVD (with CISA KEV and FIRST EPSS enrichment); then get a prioritized remediation ranking, concrete incident-response playbooks, a CI-ready PASS/WARN/FAIL merge gate, safer-alternative suggestions, and a generated CycloneDX/SPDX SBOM — via npmscan.com's free, read-only MCP server.
```

**Example use cases**
```
Example 1: Paste a package.json and ask "audit my dependencies for vulnerabilities" — the dependency-audit skill batch-queries OSV.dev for every dependency (including transitive ones on request), flags risky preinstall/postinstall scripts and deprecated/typosquat-flagged packages separately from known CVEs, and returns one report ranked by what to fix first, with fixed versions and npmscan.com links.
Example 2: Ask "is chalk 5.3.1 safe? I heard there was a supply-chain incident" — the package-trust-check skill runs check_maintainer_changes and check_package_provenance to look for account-takeover and publish-integrity red flags on that one package.
Example 3: Ask "find npm packages for parsing CSV files" — search_packages searches the npm registry by keyword.
Example 4: Ask "before I install left-pad, check its maintainers and install scripts" — get_package returns maintainers, license, preinstall/postinstall scripts, and a maintenanceSummary as risk signals.
Example 5: Ask "is minimist 1.2.5 affected by anything, and what are the latest critical npm advisories?" — get_package_version checks the pinned version, get_latest_advisories returns severity-filtered recent GitHub Security Advisories.
Example 6: Ask "is CVE-2024-3094 actively exploited, and how severe is it?" — get_cve looks up the CVE in NIST NVD and returns its CVSS score alongside CISA KEV (known-exploited) status and FIRST EPSS (exploitation-probability) enrichment.
Example 7: Paste two package-lock.json snapshots and ask "what did this PR change?" — diff_dependencies reports added/removed/bumped packages, flags any newly introduced install script, and reports each package's vulnerability delta.
Example 8: Ask "does anything in my dependencies violate our no-GPL policy?" — check_license_compliance classifies each package's SPDX license against a default or custom allow/deny policy.
Example 9: Ask "should we use axios, got, or node-fetch for our new HTTP client?" — the new-dependency-evaluation skill runs compare_packages to fan out popularity/maintenance/vulnerability/install-script enrichment across all three candidates in parallel and returns a deterministic pick with rationale.
Example 10: Ask "npm install did something weird just now, it looked like it grabbed a file from some random site and ran it — what do we do?" — the incident-response skill maps the vague symptom to the postinstall-binary playbook via get_remediation_playbook and returns concrete containment/rotation steps, not improvised advice.
Example 11: Ask "gate this PR — bump lodash from 3.10.1 to 4.17.21, is it safe to merge?" — the ci-pr-gate skill calls simulate_dependency_upgrade and prioritize_remediation, then applies a fixed policy to return one deterministic GATE: PASS/WARN/FAIL verdict formatted for a CI check or PR-comment bot.
Example 12: Ask "audit https://github.com/expressjs/express for dependency issues" — audit_github_repository fetches the manifest/lockfile from the repo's default branch itself and runs the vulnerability/license/install-script/ownership pipelines in one call, no copy-pasting file contents required.
Example 13: Paste raw `npm audit --json` output and ask "what should I fix first?" — enrich_npm_audit parses the report directly, resolves each GHSA finding to a CVE alias via OSV, and ranks it with the same CISA KEV/FIRST EPSS scoring as prioritize_remediation.
Example 14: Ask "generate a CycloneDX SBOM for these dependencies" — generate_sbom emits a spec-valid SBOM with npmscan's own vulnerability and license findings embedded in the format's native fields.
```

## Step 3: Submission details

**Supported platforms**
Check **Claude Code** only. Only Claude Code has actually been tested
(`--plugin-dir`, `/plugin install`, `claude plugin validate`) — don't check
Claude Cowork unless/until it's been tried there too, since the form asks
you to confirm it works on whatever you select.

**License type** (optional)
```
MIT
```

**Privacy policy URL** (optional)
```
https://npmscan.com/privacy
```

**Contact email**
```
shyngys@blockhacks.io
```

## MCP Registry submission (registry.modelcontextprotocol.io)

`server.json` lives in the **main npmscan repo**, at
`npmscan/mcp/server.json` — not in this plugin repo. Reasoning: the Registry
entry describes the MCP *server itself* (the code at
`src/app/api/mcp/route.ts` in the main repo), independent of any one client's
packaging of it. This plugin repo is Claude-Code-specific (skills,
`plugin.json`, `marketplace.json`); the server's actual source lives in
`npmscan`, so that's where `server.json`'s `repository` field should point
and where the file itself belongs — same folder as the other cross-client
submission artifacts (`chatgpt-app-submission.json`, etc.).

Steps to actually publish (needs the `mcp-publisher` CLI — not yet
installed/run as of this writing):

```bash
# install (macOS/Linux)
curl -L "https://github.com/modelcontextprotocol/registry/releases/latest/download/mcp-publisher_$(uname -s | tr '[:upper:]' '[:lower:]')_$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/').tar.gz" | tar xz mcp-publisher && sudo mv mcp-publisher /usr/local/bin/

# from inside npmscan/mcp/ (or npmscan/, mcp-publisher just needs
# server.json in the working directory)
mcp-publisher login github
mcp-publisher publish
```

Current `server.json` uses GitHub-auth naming (`io.github.salemalem/npmscan`),
which matches the repo owner so `login github` should work as-is. A cleaner
`com.npmscan/...` name is possible instead via **DNS authentication** on
npmscan.com (you already control the domain from the OpenAI verification
challenge) — not set up; see
[modelcontextprotocol.io/registry/authentication](https://modelcontextprotocol.io/registry/authentication)
if you want to switch before first publish (renaming after publishing may not
be simple — check the docs first).

Bump `version` in `npmscan/mcp/server.json` on every republish. It doesn't
need to match this plugin's `plugin.json` version — they're independent
artifacts now (one describes the server, one describes the Claude Code
packaging of it).

## Other directories to check/submit

Not yet done, roughly in order of expected payoff:

- [ ] MCP Registry (above) — feeds many downstream tools automatically
- [ ] [Smithery](https://smithery.ai) — submission mechanics not confirmed
      firsthand (page blocked automated fetch); check their docs directly
- [ ] [Glama](https://glama.ai/mcp) — auto-indexes public GitHub repos, may
      already appear once the repo has some visibility; check for a claim flow
- [ ] [PulseMCP](https://www.pulsemcp.com) — Registry backer, likely
      auto-syncs from it eventually; check if a direct submission is faster
- [ ] [mcp.so](https://mcp.so) — submit via site or
      [GitHub issues](https://github.com/opentools-ai/mcp.so/issues)
- [ ] [`punkpeye/awesome-mcp-servers`](https://github.com/punkpeye/awesome-mcp-servers)
      — one-line PR, low effort/low functional value, mostly discoverability

Skip: PR'ing into `modelcontextprotocol/servers` directly — that repo is for
the MCP org's own reference implementations; their docs point third-party
servers to the Registry instead.

## Other reference

- Validate before submitting: `claude plugin validate .` (passes clean as of
  this writing)
- Full tool list and skill details: see [README.md](README.md)
