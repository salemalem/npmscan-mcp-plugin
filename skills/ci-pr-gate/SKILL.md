---
name: ci-pr-gate
description: Turn a dependency change — a before/after package.json/lockfile snapshot, or one or more named "bump X from A to B" upgrades — into one deterministic PASS/WARN/FAIL verdict formatted for a CI check or PR-comment bot, not a conversational report. Use when the user explicitly wants a mergeable/blocking verdict, a "CI gate," a PR status comment, or asks "should this PR be blocked," "is this safe to merge," "gate this dependency bump." Not for a plain explanation of what changed in a diff (dependency-audit's own snapshot-diff flow already covers that conversationally) and not for a single already-installed package's trust investigation (package-trust-check).
---

# NPMScan CI PR gate

Use this skill only when the user wants a **verdict**, not a report — the
output is meant to be pasted directly into a CI check or a PR comment by a
bot, so it has to resolve to exactly one of PASS / WARN / FAIL every time,
even on partial or ambiguous data. `dependency-audit`'s existing
"Comparing two snapshots" flow already produces a good conversational
explanation of a `diff_dependencies` result for a human reading it in
chat — don't duplicate that here. This skill's only job is applying a fixed,
documented policy on top of the same tool output to produce a scannable
verdict instead, and packaging it for a bot persona: no hedging, no
follow-up questions, no "as an AI" framing, no options to weigh — one
verdict, ranked blocking reasons, done.

If the user wants to investigate whether one already-installed package is
compromised (not a PR's dependency change), use `package-trust-check`. If
they want to know what to actually *do* about a finding, hand off to
`incident-response`.

## Determining input shape

1. **Two full snapshots** (any mix of `package.json`, `package-lock.json`,
   `yarn.lock`, `pnpm-lock.yaml`) pasted as a before/after pair — call
   `diff_dependencies({ before, after })` directly.
2. **One or more named bumps with no full snapshots** — the common
   Renovate/Dependabot PR-title shape ("Bump lodash from 3.10.1 to
   4.17.21," "upgrade minimist to 1.2.6") — for a single named package, call
   `simulate_dependency_upgrade({ packageName, currentVersion,
   targetVersion })` directly. For more than one named package in the same
   PR, use the tool's own batch form instead of calling it once per
   package: `simulate_dependency_upgrade({ packages: [{ packageName,
   currentVersion, targetVersion }, ...] })`, one call for the whole set
   (up to 100 items). The batch result comes back as `results[]` (one entry
   per item, each shaped like the single-item result plus a `fetchError`
   field for a name that couldn't be resolved at all) plus a `batchSummary`
   (`totalRequested`, `fetchFailedCount`, `riskTierCounts`,
   `vulnQueryFailedCount`) — read every entry in `results[]` into the Gate
   policy below, not just the summary counts. Cap it at 100 packages in one
   turn (the tool's own limit); if more were named, run the first 100 and
   say explicitly which were skipped rather than silently dropping them.
3. **Both** (full snapshots plus one or more specific packages the user
   wants a deeper semver/breaking-change read on beyond what a diff
   computes) — run `diff_dependencies` first, then add a
   `simulate_dependency_upgrade` call (single-item or batch, per case 2)
   only for the specifically-named packages. Don't run both tools for the
   same package by default; that's redundant.
4. **Nothing parseable** — ask for the before/after content or the exact
   `name@current→target` bump(s). Don't guess a version that wasn't given.

## Steps

1. Route per the table above and make the tool call(s).
2. Collect every vulnerability finding worth ranking from the results:
   any entry with `vulnerabilityDelta` of `"introduced"` or
   `"still-vulnerable"` (from either tool), taking `id`/severity from its
   `vulnerabilities[]` array (diff) or `targetVulnerabilities[]` (simulate).
   Deduplicate identical `{packageName, cveId}` pairs, then call
   `prioritize_remediation({ findings })` once with all of them — even for
   a single finding, since KEV status isn't visible from the raw severity
   string alone.
3. Apply the [Gate policy](#gate-policy) below to every package checked,
   deterministically. The overall verdict is the worst single-package
   verdict (FAIL beats WARN beats PASS) — one failing package fails the
   whole gate.
4. Produce the [Output contract](#output-contract) below. That is the
   entire response — no preamble, no "let me check that for you," no
   summary paragraph after it.

## Gate policy

Evaluate every rule for every package checked; the highest tier any rule
triggers is that package's verdict.

### FAIL — block the merge

- `installScriptIntroduced === true` on any changed/upgraded package
  (from either tool). This is the same highest-signal field
  `dependency-audit` and `diff_dependencies`'s own description call out —
  a routine-looking bump quietly adding a `postinstall` is the shape of a
  compromised-maintainer attack, and a gate should never let that through
  as a warning.
- Any `vulnerabilityDelta: "introduced"` finding whose `highestSeverity` /
  vulnerability severity is `CRITICAL` or `HIGH` — **regardless of what
  tier `prioritize_remediation` assigns it.** A PR that actively introduces
  a CRITICAL vulnerability shouldn't pass just because that CVE isn't
  trending right now (a low EPSS score, not KEV-listed). So: severity on an
  *introduced* finding is a hard block on its own; `prioritize_remediation`'s
  tier is what decides WARN-level ordering below it, not whether this rule
  fires at all.
- Any finding — introduced or pre-existing — that `prioritize_remediation`
  ranks `tier: "patch-now"` (CISA KEV-listed, confirmed active
  exploitation). This fires even at MEDIUM/LOW severity, same as that tool
  documents: active exploitation overrides severity.

### WARN — pass, but flag for human review

- `vulnerabilityDelta: "still-vulnerable"` (pre-existing, not introduced by
  this change) at any severity — real, but not this PR's fault; don't
  block the PR for it, but don't hide it either.
- An introduced finding at MEDIUM/LOW severity, or any finding ranked
  `tier: "patch-soon"`, `"scheduled"`, or `"monitor"` that didn't already
  trigger a FAIL rule above.
- `riskTier: "breaking-change-likely"` or `isBreakingBySemver: true`
  (simulate only) — not a security issue, but a gate consumer needs to
  know a major/breaking bump is riding in.
- `targetDeprecated` set (simulate only — `diff_dependencies` doesn't
  surface a per-package deprecation flag; that's a known gap in this
  skill's coverage for the snapshot-diff path, not something to work
  around with an extra tool call here).
- `engineChange.tightened === true` (simulate only) — the target version
  now requires a newer Node than the current one supports.
- `targetIsPrerelease === true` (simulate only).
- Any unresolved side: `resolutionNote` set (diff) or
  `currentVersionNote`/`targetVersionNote` set (simulate) — e.g. a
  git/workspace/file specifier, or a target range with no satisfying
  published version. Never treat unresolved as PASS; it means the gate
  couldn't actually check anything for that entry.
- `changeType === "downgrade"` with no vulnerability reintroduced — still
  worth a reviewer's eyes; a PR that quietly lowers a dependency version
  for no stated reason is unusual enough to flag.

### PASS

Every package checked triggered none of the above.

## Output contract

Lead with one machine-parseable line, then a short human-readable body.
Nothing goes above the verdict line.

```
GATE: <PASS|WARN|FAIL>

## Dependency gate — <✅ PASS|⚠️ PASS WITH WARNINGS|❌ FAIL>

Checked N package(s), M flagged.

### Blocking (only when FAIL)
- `pkg@version`: <one-line reason — name the exact CVE/GHSA id if there is
  one> ([npmscanUrl])

### Warnings (omit section if none)
- `pkg@version`: <one-line reason> ([npmscanUrl])

### All packages checked
| Package | Before → After | Verdict | Reason |
|---|---|---|---|
```

- The `GATE:` line's value must match the verdict implied by the rest of
  the response — never let the table show a FAIL-tier row while the top
  line says PASS.
- Every row's "Reason" cites the specific field that triggered it (exact
  CVE/GHSA id and severity, or "installScriptIntroduced", or "major semver
  bump," etc.) — never a bare "flagged," and never fold multiple reasons
  for the same package into a vague summary when the row has more than
  one; list them.
- Keep the table to the packages actually checked — don't restate
  `removed` entries from a `diff_dependencies` result; removing a
  dependency isn't a gate concern.
- A package the tool couldn't resolve still gets its own row with verdict
  WARN and the resolution note as the reason — never drop it from the
  table silently.

## Do not

- Do not derive the verdict from raw severity strings alone once
  `prioritize_remediation` has run — its `tier` (not the bare severity) is
  what decides WARN-vs-FAIL ordering among findings that didn't already
  hit the severity-based FAIL rule above.
- Do not treat a `prioritize_remediation` tier below `patch-now` as
  license to pass an *introduced* CRITICAL/HIGH finding — see the FAIL
  rule above; that tool's tier is a fix-priority ranking across a whole
  backlog, not a merge-admission signal on its own.
- Do not block a PR for a `still-vulnerable` (pre-existing) finding the PR
  didn't introduce — WARN it, don't FAIL it.
- Do not run both `diff_dependencies` and `simulate_dependency_upgrade` on
  the same package in the same request "just in case" — route per the
  input-shape table once.
- Do not call `simulate_dependency_upgrade` once per package when more than
  one named bump is being gated in the same request — use its `packages`
  batch input in one call instead.
- Do not silently cap a >100-package batch of named bumps without saying
  which ones were skipped.
- Do not drop a `fetchError` batch entry from the "all packages checked"
  table — it gets its own row with verdict WARN, same as any other
  unresolved entry.
- Do not add a conversational summary, caveats paragraph, or follow-up
  question after the output contract — the structured verdict is the
  entire deliverable. If something is genuinely too ambiguous to gate
  (falls under "nothing parseable" in the input-shape table), say so
  instead of producing a contract with a guessed verdict — don't emit a
  fabricated PASS/WARN/FAIL over data you don't have.
- Do not imply this skill actually posts the comment, sets a commit
  status, or blocks the merge itself — it only produces the text; whatever
  bot or workflow is consuming this response is responsible for the actual
  enforcement action.
- Do not silently drop an unresolved entry into the PASS bucket — every
  unresolved side is a WARN with the resolution note as its reason, per
  the Gate policy above.

## Tools used

`diff_dependencies`, `simulate_dependency_upgrade`, `prioritize_remediation`
— all provided by the `npmscan` MCP server bundled with this plugin
(`.mcp.json`). See
[references/test-prompts.md](references/test-prompts.md) for prompts to
manually verify this skill after installing or editing it.
