# Test prompts for `dependency-audit`

Run these manually with the plugin loaded (`claude --plugin-dir ./npmscan-mcp-plugin`)
before publishing a change to this skill. Each case names exact
packages/versions/CVE IDs and the exact fields the response should surface —
not just "did the right tool get called," but "did the specific finding
survive into the final report."

1. **A real, pinned CRITICAL CVE inside a normal audit** — paste:
   > `{ "dependencies": { "minimist": "1.2.5", "is-number": "7.0.0" } }`
   and ask "Audit my dependencies for vulnerabilities."
   `batch_query_vulnerabilities` should return minimist 1.2.5 as vulnerable:
   `GHSA-xvch-5gv4-984h`, alias `CVE-2021-44906`, `severity: "CRITICAL"`,
   `fixedVersion: "1.2.6"`; is-number 7.0.0 clean. Expect the report table
   to name the exact GHSA/CVE ids and say "upgrade to 1.2.6," not a generic
   "upgrade minimist."

2. **Indirect phrasing, same fixture** — same pasted list, ask:
   > "Is it safe to ship with these packages?"
   Expect the identical minimist 1.2.5/CVE-2021-44906 finding to surface
   even without the word "audit" or "vulnerabilities" in the prompt.

3. **Incomplete input** — ask, with nothing pasted:
   > "Can you check my dependencies?"
   Expect a follow-up question asking for `package.json`/lockfile content —
   not a guess, not any tool call.

4. **Non-triggering, single package** — ask:
   > "What does lodash do?"
   Expect this skill NOT to activate; at most one `get_package` call.

5. **Chunking at scale** — paste a dependency list of >100 entries.
   Expect multiple internal `batch_query_vulnerabilities` chunk calls and
   the response to state it chunked the request, not silently drop entries
   past the batch limit.

6. **Deprecation surfaced separately from CVEs** — paste:
   > `{ "dependencies": { "request": "2.88.2" } }`
   and ask "Audit my dependencies for vulnerabilities."
   `get_package({ name: "request" })` returns
   `deprecated: "request has been deprecated, see
   https://github.com/request/request/issues/3142"`,
   `daysSinceLastPublish: 1730`, `maintenanceTier: "stale"`. Expect the
   report to call out the deprecation as its own line item (not folded into
   a CVE row, since request 2.88.2 itself has no CVE in this fixture) and
   name the 1730-day publish gap.

7. **Enrichment truncation** — a dependency list large enough (~100
   packages with many shared transitive vulnerabilities) to cross the
   batch tool's enrichment cap. Expect the response to distinguish
   fully-detailed findings from ID-only ones (per `enrichmentNote`), calling
   `query_vulnerabilities` only on the specific ID-only packages if the user
   asks for full detail on them.

8. **A real, legitimate but nonzero-scoring install script** — paste:
   > `{ "dependencies": { "cypress": "13.13.0" } }`
   and ask "Are any of these packages' install scripts doing something
   risky?"
   `get_package` shows `postinstall: "node index.js --exec install"`, then
   `analyze_install_script({ name: "cypress" })` returns findings
   `lifecycle-present` (5 pts) + `network-call` (15 pts),
   `totalScore: 20`, `riskTier: "low"`. Expect the report to name both
   findings and frame it as an expected binary download, not alarming.

9. **Transitive vulnerability two levels deep** — paste:
   > `{ "dependencies": { "optimist": "0.6.1" } }`
   and ask "Check this for vulnerabilities hiding in transitive
   dependencies too."
   `analyze_transitive_dependencies({ packages: [{ name: "optimist",
   version: "0.6.1" }], maxDepth: 2 })` should return `vulnerablePaths`
   naming `minimist` at CRITICAL severity with `pulledInBy: ["optimist"]`.
   Expect the response to state explicitly that minimist was pulled in
   transitively by optimist, not just "a vulnerable package was found."

10. **Diamond dependency merges cleanly** — paste:
    > `{ "dependencies": { "express": "4.19.2", "body-parser": "1.20.2" } }`
    and ask for a transitive check.
    `analyze_transitive_dependencies` should scan the shared `debug`
    dependency once (not twice) and report 0 vulnerable packages. Expect
    the response not to double-count or double-report `debug`.

11. **A CVE flagged critical → suspicious-ownership follow-up** — paste:
    > `{ "dependencies": { "chalk": "5.3.1" } }`
    and ask "This got flagged as high risk — any sign of a compromised
    maintainer?"
    `check_maintainer_changes({ name: "chalk" })` returns a change entry for
    version 5.3.1, `publishedAt: "2025-09-08T15:20:00.000Z"`,
    `added: ["qix-"]`, finding `new-maintainer-published-quickly`,
    `riskTier: "high"`. Expect this check to run only for the flagged
    package (not the whole inventory) and the response to name the exact
    version/date/maintainer.

12. **License policy sweep with a real copyleft violator** — paste:
    > `{ "dependencies": { "graphviz": "0.0.9", "lightningcss": "1.25.1",
    > "lodash": "4.17.21" } }`
    and ask "Does anything here violate our no-GPL policy?"
    `check_license_compliance` (default policy) should flag `graphviz` as
    `rawLicense: "GPL-3.0-or-later"`, `category: "copyleft"`,
    `isCompliant: false`; `lightningcss` (MPL-2.0, weak-copyleft) and
    `lodash` (MIT, permissive) both compliant. Expect exactly 1 of 3
    packages reported as a violation, named specifically as graphviz.

13. **needsReview, not silently compliant** — paste:
    > `{ "dependencies": { "ckeditor4": "4.22.1" } }`
    with `policy: { allow: ["MIT"] }` and ask if it's license-compliant.
    Expect `category: "mixed"`, `isCompliant: false`, `needsReview: true`
    reported as "needs manual review" — not treated as compliant just
    because the license string didn't parse cleanly.

14. **PR diff: a fix** — paste before `{ "dependencies": { "minimist":
    "1.2.5" } }` / after `{ "dependencies": { "minimist": "1.2.6" } }` and
    ask "What did this bump change?"
    `diff_dependencies` should report `changeType: "upgrade"`,
    `isVulnerable: false`, `vulnerabilityDelta: "fixed"`. Expect the
    response to state the CVE that was fixed by name (CVE-2021-44906), not
    just "no longer vulnerable."

15. **PR diff: a regression introduced by a downgrade** — same two
    snapshots, swapped (before 1.2.6 → after 1.2.5). Expect
    `changeType: "downgrade"`, `isVulnerable: true`,
    `highestSeverity: "CRITICAL"`, `vulnerabilityDelta: "introduced"` — and
    the response to flag this as a regression the PR is introducing, not
    just restate the final version's status.

16. **PR diff: cross-format, no false diff** — before
    `{ "dependencies": { "lodash": "^4.17.21" } }` (package.json) vs. after
    a `package-lock.json` pinning `lodash` at `4.17.21`. Expect
    `changed: []` — the tool resolves both to the same exact version rather
    than reporting a text-level false positive between a range and a pin.

17. **Remediation ranking: a real KEV override** — collect findings
    `[{ packageName: "vulnerable-log4j-wrapper", cveId: "CVE-2021-44228",
    severity: "CRITICAL" }, { packageName: "is-number", severity: "LOW" }]`
    and ask "Which of these should I fix first?"
    `prioritize_remediation` should rank CVE-2021-44228 (Log4Shell, a
    standing CISA KEV entry since 2021-12-10, EPSS ~0.944) as rank 1,
    `tier: "patch-now"`, reason citing confirmed active exploitation
    regardless of EPSS/severity — is-number ranks below it at
    `tier: "monitor"`. Expect the response to lead with the KEV package by
    name, not a plain severity sort.

18. **Remediation ranking: dedup, not double-count** — findings
    `[{ packageName: "pkg-a", cveId: "CVE-2021-44906", severity: "CRITICAL"
    }, { packageName: "pkg-b", cveId: "CVE-2021-44906", severity:
    "CRITICAL" }]`. Expect `uniqueCveCount: 1` reflected in the response —
    the shared CVE looked up once, not treated as two independent risks
    worth double the urgency.

19. **Alternative suggestion, exact replacement names** — paste:
    > `{ "dependencies": { "request-promise": "4.2.6" } }`
    and ask "What should I replace this with?"
    `suggest_alternative({ name: "request-promise" })` returns `got` and
    `axios` with `whySuggested: "Same HTTP-client category, actively
    maintained, no open vulnerabilities."` Expect those two exact package
    names in the response, not an invented or generic suggestion.

20. **A built-in language feature, not a package** — paste:
    > `{ "dependencies": { "left-pad": "1.3.0" } }`
    and ask what to replace it with.
    Expect `nonPackageAlternatives: ["String.prototype.padStart()"]` to
    surface directly — the response should say "you don't need a package
    for this," not pad the answer with unrelated package suggestions.

To confirm the skill loaded and is namespaced correctly, run `/help` and
check the **Custom commands** tab for `/npmscan:dependency-audit`, or just
invoke it directly with that name.
