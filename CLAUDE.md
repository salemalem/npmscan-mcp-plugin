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
Detect malicious, vulnerable, or typosquatted npm packages from a conversation. Search the npm registry, inspect maintainers and install scripts before installing, and query OSV.dev / GitHub Security Advisories for one package or a whole package.json at once — via npmscan.com's free, read-only MCP server.
```

**Example use cases**
```
Example 1: Paste a package.json and ask "audit my dependencies for vulnerabilities" — the dependency-audit skill batch-queries OSV.dev for every dependency, flags risky preinstall/postinstall scripts separately from known CVEs, and returns one report with npmscan.com links.
Example 2: Ask "does lodash have any known vulnerabilities?" — query_vulnerabilities looks up OSV.dev for a single package.
Example 3: Ask "find npm packages for parsing CSV files" — search_packages searches the npm registry by keyword.
Example 4: Ask "before I install left-pad, check its maintainers and install scripts" — get_package returns maintainers, license, and preinstall/postinstall scripts as a risk signal.
Example 5: Ask "is minimist 1.2.5 affected by anything, and what are the latest critical npm advisories?" — get_package_version checks the pinned version, get_latest_advisories returns severity-filtered recent GitHub Security Advisories.
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

## Other reference

- Validate before submitting: `claude plugin validate .` (passes clean as of
  this writing)
- Full tool list and skill details: see [README.md](README.md)
