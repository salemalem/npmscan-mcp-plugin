# Test prompts for `package-trust-check`

Run these manually with the plugin loaded (`claude --plugin-dir ./npmscan-mcp-plugin`)
before publishing a change to this skill. Each case names an exact
package/version and the exact fields the response should surface — not just
"did a tool get called," but "did the right version and finding survive
into the answer."

1. **The chalk/debug "qix" compromise, pinned to the exact version** — ask:
   > "Is chalk 5.3.1 safe? I heard there was a supply-chain incident."
   `check_maintainer_changes({ name: "chalk" })` should return a change
   entry for **version 5.3.1**, `publishedAt: "2025-09-08T15:20:00.000Z"`,
   `added: ["qix-"]`. Expect the response to name that exact version and
   date, quote the `new-maintainer-published-quickly` finding (a maintainer
   added shortly before this publish, on a package with years of prior
   stable history), and report `riskTier: "high"` — not a vague "chalk had
   some issue once."

2. **event-stream, asked about the actual malicious 2018 version** — ask:
   > "Was event-stream 3.3.6 compromised? Is it still a risk today?"
   `check_maintainer_changes({ name: "event-stream" })` returns
   `changes: []` with `note: "No maintainer changes within the lookback
   window"` (`riskTier: "none"`) — the real 2018 flatmap-stream incident
   predates the tool's lookback window. Expect the response to explicitly
   distinguish "yes, 3.3.6 was the historically compromised version" (this
   is public record) from "the tool's live maintainer-history check comes
   back clean today because that event is outside the lookback window" —
   not silence on the historical fact, and not a false "still flagged."

3. **Non-triggering, purely factual** — ask:
   > "What does the lodash package do?"
   Expect this skill NOT to activate — at most one `get_package` call, no
   `check_maintainer_changes`/`check_package_provenance`/
   `analyze_install_script` calls.

4. **Non-triggering, multi-package** — paste a `package.json` containing
   `{ "minimist": "1.2.5", "is-number": "7.0.0" }` and ask:
   > "Audit these dependencies for vulnerabilities."
   Expect `dependency-audit` to activate instead of this skill — no
   per-package `check_maintainer_changes`/`check_package_provenance` calls
   across the list, just `batch_query_vulnerabilities` flagging minimist
   1.2.5 (GHSA-xvch-5gv4-984h, CRITICAL, fixed in 1.2.6).

5. **jade → pug: a real transfer, not a takeover** — ask:
   > "jade's GitHub repo now points somewhere else. Was it hijacked?"
   `check_maintainer_changes({ name: "jade" })` returns
   `declaredRepository: "https://github.com/jadejs/jade"`,
   `currentFullName: "pugjs/pug"`, `transferred: true`, finding
   `repository-transferred` (10 points, `riskTier: "low"`). Expect the
   response to name both the old and new repo explicitly and state this is
   a documented rebrand/transfer (jade → pug), not evidence of a hostile
   takeover — while still suggesting the user confirm the new owner
   independently, matching the tool's own hedge.

6. **@npmcli/arborist: a real, specific peer-provenance anomaly** — ask:
   > "Does @npmcli/arborist look legit? Check its publish provenance."
   `check_package_provenance({ name: "@npmcli/arborist" })` returns
   `provenance.hasProvenance: false` while
   `peers: { orgKind: "scope", orgIdentifier: "@npmcli", peersChecked: 12,
   peersWithProvenance: 10, peerProvenanceRate: 0.83 }`, finding
   `peer-provenance-anomaly` (15 points, `riskTier: "low"`). Expect the
   response to cite the exact numbers (10 of 12 / 83% of @npmcli-scoped
   siblings publish with provenance, this one doesn't) rather than a vague
   "provenance is missing" — missing provenance alone isn't the finding,
   the peer-norm mismatch is.

7. **lodash: missing provenance with no anomaly** — ask:
   > "lodash shows no npm provenance badge. Is that suspicious?"
   `check_package_provenance({ name: "lodash" })` returns
   `provenance.hasProvenance: false`,
   `peers: { orgKind: "maintainer", peersChecked: 4, peersWithProvenance: 0,
   peerProvenanceRate: 0 }`, `findings: []`, `riskTier: "none"`. Expect the
   response to explain lodash predates provenance and so do its
   maintainer's other packages — no anomaly — rather than flagging the
   missing badge on its own.

8. **semver 7.6.3: a clean, well-formed provenance result** — ask:
   > "Check semver 7.6.3's publish provenance."
   `check_package_provenance({ name: "semver", version: "7.6.3" })` returns
   `sourceRepository`/`declaredRepository` both
   `https://github.com/npm/node-semver`, `repositoryMatchesBuild: true`,
   `sourceDiff: { addedInstallScripts: [], addedDependencies: [] }`,
   `findings: []`, `totalScore: 0`. Expect a plain "matches, zero findings"
   verdict, not hedged language reserved for an actual anomaly.

9. **cypress: a real, legitimate but nonzero-scoring postinstall** — ask:
   > "Is cypress's install process doing anything risky?"
   `get_package({ name: "cypress" })` shows
   `postinstall: "node index.js --exec install"`, then
   `analyze_install_script({ name: "cypress" })` returns findings
   `lifecycle-present` (5 pts) + `network-call` (15 pts),
   `totalScore: 20`, `riskTier: "low"`. Expect the response to name both
   findings (it downloads a platform binary from a CDN during install) and
   explicitly say nonzero here reflects a real, expected download — not
   malicious behavior — matching the tool's own framing.

10. **node-sass: deprecated, with a named replacement offered** — ask:
    > "Can I still trust node-sass?"
    `get_package({ name: "node-sass" })` shows
    `deprecated: "node-sass is deprecated. Please use dart-sass instead."`
    Expect the response to report the deprecation, then offer
    `suggest_alternative({ name: "node-sass", reason: "deprecated" })`,
    which returns `sass` and `sass-embedded` with `whySuggested: "Named
    directly in node-sass's own deprecation notice; actively maintained."`
    — the exact replacement names should appear in the answer, not a
    generic "consider migrating away."

11. **An empty malware-feed check is not read as full clearance** — ask:
    > "Is lodash safe to use?"
    `get_latest_advisories({ type: "malware", affects: "lodash" })` should
    come back with no matching advisories (lodash has never been flagged as
    known malware). Expect the response to still run the rest of the
    checks (maintainer changes, provenance, install script) rather than
    stopping at "not in the malware feed, so it's safe" — an empty result
    from that one feed is not, on its own, a full clean bill of health.

12. **A long-standing maintainer quietly dropped, not a full turnover** —
    ask:
    > "A package's maintainer list dropped someone who had been publishing
    > releases for over a year, while the remaining maintainers stayed the
    > same and kept publishing normally. Is that on its own something to
    > worry about?"
    Expect the model to describe this as the `maintainer-removed-recently`
    finding — a lower-severity signal than a full turnover (the underlying
    rule scores it well below the high/critical tier a full replacement
    gets) — and to recommend the same verification posture as other
    maintainer-change findings, not silence and not alarm-level either.
    **Note:** this is a synthetic-fixture-only pattern (no live package in
    the repo's own tests exhibits it) — treat this as testing the skill's
    grasp of the rule's meaning and relative severity, not a live tool-call
    verification.

13. **A full maintainer-list replacement, contrasted against chalk's
    single addition** — ask:
    > "How would you tell the difference between chalk's situation (one
    > new maintainer added) and a case where every single maintainer on a
    > package was replaced at once?"
    Expect the response to correctly describe `full-maintainer-turnover`
    as the more severe finding — it stacks with `maintainer-added-recently`
    to a `critical` tier when the replacement team also publishes the next
    release themselves — not treat "a maintainer changed" as a single
    undifferentiated risk level regardless of how much of the list turned
    over. **Note:** same synthetic-fixture caveat as case 12 — no live
    package in the repo's tests exhibits a full turnover.

14. **Pending maintainer change vs. dormant package — the two ends of the
    "access changed, nothing shipped" case** — ask two variants of "a
    maintainer was just added to a package's npm listing, but no release
    has shipped with them yet — how urgent is that?": once assuming the
    package released something recently (expect this framed as urgent —
    access already changed, and there's no version yet to warn users off
    of, so the risk is live right now) and once assuming the package
    hasn't shipped in years (expect the response to note this falls
    outside the tool's lookback window given the package's dormancy, and
    to describe it as a much lower-urgency case rather than applying the
    same urgency framing regardless of activity). **Note:**
    synthetic-fixture-only, same caveat as cases 12-13.

To confirm the skill loaded and is namespaced correctly, run `/help` and
check the **Custom commands** tab for `/npmscan:package-trust-check`, or
just invoke it directly with that name.
