---
name: package-trust-check
description: Investigate whether one specific npm package is trustworthy — maintainer/ownership takeover signals, publish-provenance mismatches, and risky install scripts. Use when the user asks if a single named package is safe, compromised, hijacked, suspicious, or "can I trust this" — not for auditing a full package.json/lockfile (see dependency-audit) and not for a plain factual question like "what does X do."
---

# NPMScan package trust check

Use this skill when the user names **one specific package** (optionally a
version) and asks a trust question about it — "is X safe to use," "was X
compromised," "should I be worried about X," "check X's maintainers." This
is a deep, single-package investigation: it runs checks `dependency-audit`
deliberately skips for every package in a batch because they're too
expensive to run at scale.

If the user instead pastes a `package.json`/lockfile/dependency list or asks
to audit multiple packages, use the `dependency-audit` skill instead — don't
run this skill's checks across a whole inventory. If the question is purely
factual with no trust/safety angle ("what does lodash do," "what's the
latest version of express"), just answer directly with `get_package` — don't
invoke the full investigation for that. If the user is instead choosing
between candidates for something not yet installed ("should we add X," "X
vs Y for this job"), that's a forward-looking pick, not a trust
investigation — use the `new-dependency-evaluation` skill.

## Steps

1. Baseline with `get_package` (or `get_package_version` if the user gave an
   exact version). Pull `deprecated`, `maintenanceSummary`,
   `possibleTyposquatOf`, `isLatestVersionVulnerable`/`highestSeverity`,
   `downloadTrend`, and days-since-last-publish. This alone answers a good
   chunk of "should I trust this" and grounds the deeper checks that follow —
   don't skip straight to the maintainer/provenance tools without it.
2. Call `get_latest_advisories({ type: "malware", affects: name })` — a
   cheap, direct check of whether this exact package has ever been flagged
   in GitHub's known-malicious-packages feed (e.g. OpenSSF's
   malicious-packages list), independent of the CVE-backed advisories
   `query_vulnerabilities`/`batch_query_vulnerabilities` already cover. A
   hit here is the single most severe possible finding — almost none of
   these advisories carry a CVE or a meaningful CWE beyond "embedded
   malicious code," so don't expect one, and don't skip reporting a hit
   just because it lacks the fields a CVE-backed finding would have. An
   empty result means nothing was found in this feed specifically — it is
   not, on its own, a full clean bill of health; still run the rest of the
   checks below.
3. Call `check_maintainer_changes({ name })`. It reconstructs maintainer
   add/remove history from the npm packument and flags:
   - a maintainer added recently who then published shortly after (the
     account-takeover pattern behind the Sept 2025 chalk/debug "qix"
     compromise and ua-parser-js),
   - a full sudden replacement of the maintainer list,
   - a long-standing maintainer quietly dropped,
   - a maintainer-list change on npm not yet tied to any release — flag this
     as the *more* urgent case, since access changed hands but nothing has
     shipped with it yet, so there's no version to warn the user off of.
   Also reports GitHub repository transfer/archival — a transfer isn't
   automatically hostile (e.g. jade → pug was a documented rename), say so
   rather than treating every transfer as a red flag.
4. Call `check_package_provenance({ name, version })`. Three checks in one
   call: does the Sigstore build attestation's source repo/commit match
   `package.json`'s declared repository; is this version missing provenance
   while its npm-scope or maintainer peers consistently publish with it (a
   real anomaly, not just "no provenance" — plenty of legitimate packages
   predate the feature entirely, which this tool already accounts for via
   the peer baseline); and does the tarball's actual install scripts/
   dependencies match what's committed at the attested source commit — a
   script or dependency on npm that was never committed in source is the
   stolen-npm-token publish pattern. This is structural verification, not a
   cryptographic re-check of the Sigstore bundle — say so if the user asks
   how deep it goes.
5. If `get_package`/`get_package_version` in step 1 showed
   `hasLifecycleScripts`/a `preinstall`/`postinstall`/`prepare` entry, follow
   up with `analyze_install_script({ name, version })`. It fetches the published
   tarball and statically scans the script — and the files it references —
   against npmscan's red-flags rubric (child_process, network calls,
   `.ssh`/`.aws`/`.npmrc`/`*TOKEN`/`*KEY` access, obfuscation, remote
   binaries off untrusted hosts, exfil endpoints, eval-on-decoded-content),
   returning a `totalScore`/`riskTier`. A nonzero score isn't automatically
   malicious — a legitimate binary download (e.g. `cypress`) scores nonzero
   too — so report the actual `findings`, not just the score.
6. If the combined picture ends up genuinely concerning (a maintainer-
   takeover pattern, a provenance mismatch, a `possibleTyposquatOf` hit, or a
   critical install-script finding), offer — don't force —
   `suggest_alternative({ name, reason })` with `reason` set to whichever of
   `"vulnerable"`/`"abandoned"`/`"typosquat"`/`"general"` best fits, so the
   user has a next step instead of just a warning.
7. Produce one findings report, most-concerning signal first:
   - State the verdict per check plainly (e.g. "no maintainer-change red
     flags in the lookback window," not silence-as-clean).
   - Every finding from `check_maintainer_changes`/`check_package_provenance`
     is a hedged signal meant to prompt verification, not proof — say
     "worth verifying independently," matching the tools' own language,
     especially for anything below their `high`/`critical` tiers.
   - Include the `npmscanUrl` so the user can read the full write-up.
   - If nothing turned up anything but a low/none `riskTier` and no maintainer
     or provenance findings, say so plainly — this skill exists to give
     confident "looks clean" answers as often as it flags real risk.

## Do not

- Do not run this skill's checks across every package in a list — that's
  `dependency-audit`'s job, and `check_maintainer_changes`/
  `check_package_provenance` are deliberately reserved there for
  already-flagged packages only, not a full inventory.
- Do not treat a missing `provenance` field, a repository transfer, or a
  single maintainer addition as confirmed compromise on its own — report
  what the tool actually flagged (or didn't) and let the `riskTier`/points
  speak, don't editorialize past it.
- Do not skip `get_package` and jump straight to the deep checks — the
  baseline (deprecated, popularity/maintenance tiers, typosquat) is cheap
  and often already answers the question.
- Do not invent a replacement package name yourself — let
  `suggest_alternative` return its own `whySuggested`/`nonPackageAlternatives`
  rather than guessing.
- Do not silently skip `analyze_install_script` when lifecycle scripts exist
  just because `check_maintainer_changes`/`check_package_provenance` came
  back clean — a legitimate maintainer can still ship a genuinely risky
  script, and vice versa; report all applicable signals, not just whichever
  ran first.
- Do not attempt to install, upgrade, or publish packages yourself; this
  skill only reads data through NPMScan's read-only MCP tools.
- Do not treat an empty `get_latest_advisories({ type: "malware" })` result
  as a full clearance — it only rules out this one known-malicious-packages
  feed; still run the maintainer/provenance/install-script checks that
  follow. Conversely, do not soften a real hit from it into a hedged
  "worth verifying" the way a `check_maintainer_changes`/
  `check_package_provenance` finding is — a match in this feed is itself a
  confirmed report of malicious code, not a heuristic signal.

## Tools used

`get_package`, `get_package_version`, `get_latest_advisories`,
`check_maintainer_changes`, `check_package_provenance`,
`analyze_install_script`, `suggest_alternative` — all provided by the
`npmscan` MCP server bundled with this plugin (`.mcp.json`). See
[references/test-prompts.md](references/test-prompts.md) for prompts to
manually verify this skill after installing or editing it.
