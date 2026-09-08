# Changelog

## 3.0.0

Jumps straight to 3.0.0 (skipping 2.x) to stay clear of a separate 2.0.0
submission of this plugin already in review on the Claude plugin
marketplace — same reasoning the npmscan MCP server's own `mcp/server.json`
used when it jumped to 3.0.0 instead of 2.0.0.

- Adds eight tools, bringing the server to twenty-three total:
  - `get_maintainer_profile` — every package an npm username currently
    maintains via npm's own `maintainer:<username>` search index, plus
    precomputed download/dependent totals.
  - `check_maintainer_blast_radius` — finds every package an npm maintainer
    account touches and flags a tight publish cluster within a short
    window, the compromised-account pattern behind incidents like the 2025
    chalk/debug ("qix") compromise and the 2026 keyv/cacheable ("Shai-Hulud")
    worm.
  - `compare_packages` — given 2-5 candidate packages for the same job,
    fans the same enrichment `get_package` computes out in parallel and
    returns a structured side-by-side plus a deterministic, reasoned pick.
  - `audit_github_repository` — given a GitHub repo URL, fetches its
    manifest/lockfile from the default branch (auto-detecting monorepos)
    and runs the vulnerability/license/install-script/ownership pipelines
    in one call.
  - `get_remediation_playbook` — maps a finding's `rule` value (or a
    plain-language symptom) to a human-authored incident-response playbook
    with concrete steps, severity, real-incident references, and
    prevention tips.
  - `generate_sbom` — generates a spec-valid CycloneDX or SPDX SBOM with
    npmscan's own vulnerability/license findings embedded in each format's
    native fields.
  - `enrich_npm_audit` — ingests raw `npm audit --json` output (npm 7+ or
    legacy npm 6 format) directly and ranks it with the same KEV/EPSS/
    severity scoring as `prioritize_remediation`.
  - `simulate_dependency_upgrade` — classifies a specific version jump as
    safe/low-risk/review-recommended/breaking-change-likely by semver,
    deprecation, install-script, engine, and vulnerability-delta checks;
    accepts either one package or a `packages` batch of up to 100.
- Adds three new skills:
  - `/npmscan:new-dependency-evaluation` — orchestrates `compare_packages`/
    `suggest_alternative`/`search_packages` for a forward-looking "what
    should we add" decision, distinct from auditing what's already
    installed.
  - `/npmscan:incident-response` — turns an existing finding, or a vague
    symptom description, into concrete `get_remediation_playbook` steps.
  - `/npmscan:ci-pr-gate` — turns a dependency change into one
    deterministic PASS/WARN/FAIL verdict formatted for a CI check or
    PR-comment bot, applying a fixed policy on top of `diff_dependencies`/
    `simulate_dependency_upgrade`.
- Updates the `dependency-audit` skill to accept raw `npm audit --json`
  output (via `enrich_npm_audit`) and a bare GitHub repository URL (via
  `audit_github_repository`) as input, and to follow up a flagged
  maintainer-turnover finding with `check_maintainer_blast_radius`.
- Updates the `package-trust-check` skill to cross-reference
  `new-dependency-evaluation` for forward-looking "should we add X"
  questions.
- `query_vulnerabilities`/`batch_query_vulnerabilities` now cross-check
  package names against the npm registry for input that was never
  registry-resolved (a hand-typed list or raw `package.json` — not a real
  lockfile/SBOM), so a typo'd/nonexistent name no longer looks identical to
  a genuinely clean result. `dependency-audit` now reads
  `unresolvedPackages`/`existenceCheckNote` accordingly.
- `get_latest_advisories` gains a `type` param — `"reviewed"` (default,
  CVE-backed) or `"malware"` (known-malicious packages) — and both
  `package-trust-check` and `dependency-audit` now check the malware feed
  for the package(s) in question.

## 1.2.0

- Adds eight tools, bringing the server to fifteen total:
  - `analyze_install_script` — fetches a package's published tarball and
    statically scans its lifecycle scripts (and the files they reference)
    against npmscan's red-flags rubric, returning a `totalScore`/`riskTier`.
  - `analyze_transitive_dependencies` — recursively resolves a
    dependency graph up to 3 levels deep and batch-checks every resolved
    package against OSV.dev, naming which direct dependency pulled in each
    vulnerable transitive package via `vulnerablePaths`.
  - `check_package_provenance` — cross-checks a version's Sigstore publish
    provenance against reality (source-repo match, peer-provenance norms,
    tarball-vs-source diff) to catch the stolen-npm-token publish pattern.
  - `check_maintainer_changes` — reconstructs maintainer add/remove history
    from the npm packument to flag account-takeover patterns, plus GitHub
    repo transfer/archival checks.
  - `check_license_compliance` — classifies declared SPDX licenses against
    a default or custom allow/deny policy, understanding `OR`/`AND`/`WITH`
    expressions.
  - `diff_dependencies` — compares two package.json/lockfile snapshots
    (e.g. before/after a PR) and reports added/removed/bumped packages,
    newly introduced install scripts, and per-package vulnerability deltas.
  - `prioritize_remediation` — ranks a batch of already-flagged
    vulnerabilities into patch-now/patch-soon/scheduled/monitor tiers using
    CISA KEV and FIRST EPSS.
  - `suggest_alternative` — suggests better-maintained replacements for a
    deprecated/vulnerable/abandoned/suspicious package.
- `batch_query_vulnerabilities` now also accepts raw `package.json`/
  lockfile/CycloneDX/SPDX content via a `content` input and chunks large
  inventories internally, instead of requiring a pre-parsed `packages` array
  capped at 100 per call.
- Adds the `/npmscan:package-trust-check` skill — a deep, single-package
  trust investigation (maintainer history, provenance, install scripts) for
  "is X safe / was X compromised" questions, distinct from auditing a whole
  dependency list.
- Updates the `dependency-audit` skill to use the new tools: transitive
  vulnerability coverage, install-script deep-dives, maintainer/provenance
  checks on flagged packages, license-policy checks, PR-diff review, and
  remediation prioritization, plus SBOM (CycloneDX/SPDX) input support.

## 1.1.0

- Adds the `get_cve` tool: look up one exact CVE ID in the NIST NVD, or
  browse/search by keyword, CVSS severity, CWE, or publication-date range.
  Enriches results with CISA KEV (confirmed actively-exploited) status and
  FIRST.org EPSS (30-day exploitation probability), falling back to the raw
  MITRE CVE record when NVD has no record yet.
- `get_package` and `get_package_version` now each check OSV.dev directly
  and return `isLatestVersionVulnerable`/`isVulnerable` plus
  `highestSeverity` as a safe/not-safe verdict, with severity, summary, and
  `fixedVersion` per finding — no separate `query_vulnerabilities` call
  needed just to learn a package you already fetched is vulnerable.
  `query_vulnerabilities` itself got the same `isVulnerable`/
  `highestSeverity` treatment, replacing its previous raw OSV passthrough.
- `get_package`/`get_package_version` results also include
  `maintenanceSummary`, `topPackagesRank`, and `downloadTrend`; the
  `dependency-audit` skill surfaces `maintenanceSummary`/`deprecated` and
  `possibleTyposquatOf` as findings distinct from CVEs, and names each
  vulnerability's `fixedVersion` directly in its recommendations.
- `batch_query_vulnerabilities` findings now come fully detailed (severity,
  summary, fixed version) by default; the skill only re-queries
  `query_vulnerabilities` for packages the batch result's `enrichmentNote`
  flags as ID-only.

## 1.0.0

- Initial release.
- Bundles the `npmscan` remote MCP server (`https://npmscan.com/api/mcp`):
  `search_packages`, `get_package`, `get_package_version`,
  `query_vulnerabilities`, `batch_query_vulnerabilities`,
  `get_latest_advisories`.
- Adds the `dependency-audit` skill, which chains
  `batch_query_vulnerabilities` → `get_package`/`get_package_version` → an
  optional `get_latest_advisories` into one dependency-audit report instead
  of leaving tool sequencing to the model each time.
- Ships its own `marketplace.json` so the repo can be added directly with
  `/plugin marketplace add <owner>/npmscan-mcp-plugin`.
