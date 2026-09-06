# Test prompts for `ci-pr-gate`

Run these manually with the plugin loaded (`claude --plugin-dir ./npmscan-mcp-plugin`)
before publishing a change to this skill. Every case checks two things: did
the right tool(s) get called, and did the response actually come back as
the `GATE:` contract (not a conversational report) with the correct
verdict.

1. **Clean PASS — a fix, via a snapshot diff.** Paste:
   > before: `{ "dependencies": { "minimist": "1.2.5" } }`
   > after: `{ "dependencies": { "minimist": "1.2.6" } }`
   and ask "Gate this PR — is it safe to merge?"
   `diff_dependencies` should return `changeType: "upgrade"`,
   `vulnerabilityDelta: "fixed"`, `installScriptIntroduced: false`. Expect
   `GATE: PASS`, and the table's reason naming CVE-2021-44906 as fixed by
   the bump to 1.2.6 — not a bare "no issues."

2. **FAIL — severity overrides a low remediation tier (the core policy
   case).** Paste:
   > before: `{ "dependencies": { "minimist": "1.2.6" } }`
   > after: `{ "dependencies": { "minimist": "1.2.5" } }`
   and ask "Gate this dependency change."
   `diff_dependencies` returns `changeType: "downgrade"`,
   `vulnerabilityDelta: "introduced"`, `highestSeverity: "CRITICAL"`
   (CVE-2021-44906). Feeding that into `prioritize_remediation` can return
   a low tier like `"monitor"` if EPSS is low and it isn't KEV-listed — a
   *low* remediation tier despite CRITICAL severity. Expect `GATE: FAIL`
   anyway, with the blocking reason naming the CVE and severity directly
   (not "ranked low priority, passing"). This is the one case that most
   needs to be right: it's the exact scenario the severity-override FAIL
   rule exists for.

3. **FAIL — KEV override, independent of severity string.** Ask the model
   to rank (via `prioritize_remediation`) a finding
   `{ packageName: "log4j-core-fixture", cveId: "CVE-2021-44228", severity:
   "CRITICAL" }` alongside `{ packageName: "is-number", severity: "LOW" }`,
   framed as "these are the vulnerability findings from my dependency
   diff — gate this PR." Expect `tier: "patch-now"` for the KEV-listed
   finding (CISA KEV since 2021-12-10) to produce `GATE: FAIL` with that
   package named as the blocking reason, and `is-number` (a low tier)
   listed separately as, at most, a warning — not folded into the same
   blocking line.

4. **FAIL — install script introduced on a routine-looking bump.** Pick
   any package, call `get_package_version` on two consecutive versions to
   find a pair where the earlier one's `scripts` has no
   preinstall/install/postinstall/prepare key and the later one does, then
   ask "Gate a bump from `<earlier>` to `<later>`." Expect
   `simulate_dependency_upgrade`'s `installScriptIntroduced: true` to
   produce `GATE: FAIL` — even though that tool's own `riskTier` only
   escalates this signal to `"review-recommended"`. The point of this case
   is confirming the skill applies its own stricter, security-specific FAIL
   rule on the raw field rather than deferring to that tool's blended
   breaking-change/security tier.

5. **WARN — a real major bump, otherwise clean.** Ask to gate a bump from
   lodash 3.10.1 to 4.17.21. `simulate_dependency_upgrade` returns
   `semverBump: "major"`, `isBreakingBySemver: true`,
   `riskTier: "breaking-change-likely"`, with a clean OSV check on both
   sides. Expect `GATE: WARN` (not FAIL — nothing here is a security
   finding) with the reason naming the major-version jump, not a vague
   "risky."

6. **WARN — pre-1.0 minor bump flagged breaking by semver convention.**
   Ask to gate chalk 0.4.0 → 0.5.0. Expect `semverBump: "minor"`,
   `isBreakingBySemver: true`, a note explaining the pre-1.0 convention —
   and `GATE: WARN` citing that note, not treating a "minor" bump as
   automatically safe.

7. **WARN — unresolved target, never silently PASS.** Ask to gate lodash
   4.17.21 → `^999.0.0`. `simulate_dependency_upgrade` returns
   `direction: "unresolved"`, `resolvedTargetVersion: null`, a non-null
   `targetVersionNote`, `riskTier: "unknown"`. Expect `GATE: WARN` with
   the row's reason being the resolution note itself — explicitly not
   `GATE: PASS` just because nothing concrete was found wrong.

8. **PASS — cross-format diff, no false positive.** Paste before
   `{ "dependencies": { "lodash": "^4.17.21" } }` (package.json) and after
   a `package-lock.json` pinning lodash at exactly `4.17.21`. Expect
   `diff_dependencies` to return `changed: []` (both sides resolve to the
   same version) and `GATE: PASS` with an empty "all packages checked"
   table or a single "no dependency changes detected" line — not a
   fabricated WARN over a text-level difference that isn't a real version
   change.

9. **Multi-package batch — one batch call, overall verdict is the worst
   single result.** Ask to gate three named bumps in one PR: minimist
   1.2.5→1.2.6 (clean patch fixing a CVE), lodash 3.10.1→4.17.21 (major,
   clean OSV), chalk 0.4.0→0.5.0 (pre-1.0 minor, clean OSV). Expect ONE
   `simulate_dependency_upgrade({ packages: [...] })` batch call (not three
   separate single-item calls), returning `results[]` with one entry per
   package plus a `batchSummary`. Expect one combined table with minimist
   at PASS and the other two at WARN, and an overall `GATE: WARN` — not
   `PASS` (a clean package shouldn't average out a WARN elsewhere) and not
   `FAIL` (nothing here actually triggers a FAIL rule).

10. **Non-triggering — same fixture, no gate/verdict framing.** Paste the
    same before/after from case 1 and ask "What changed between these two
    package.json files?" with no mention of merging, blocking, CI, or a
    gate. Expect `dependency-audit`'s conversational diff flow to answer
    instead — no `GATE:` line, no PASS/WARN/FAIL contract.

11. **Nothing to gate.** Ask "Can you gate my dependency PR?" with nothing
    pasted and no package named. Expect a clarifying question asking for
    the before/after snapshots or the specific bump(s) — no tool call, and
    critically no fabricated `GATE:` line over data that doesn't exist.

To confirm the skill loaded and is namespaced correctly, run `/help` and
check the **Custom commands** tab for `/npmscan:ci-pr-gate`, or just invoke
it directly with that name.
