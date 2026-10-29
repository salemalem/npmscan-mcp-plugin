# ai-boost/awesome-harness-engineering

4995 stars, 9 outside merges in 30 days (2026-10-29), but 100 open PRs, so
the queue is deep. A curated list about agent *harness* engineering: how to
build the scaffolding around a model.

Sections include `### Tool Design`, `### Skills & MCP`,
`### Verification & CI Integration`, `### Permissions & Authorization`.

## Route

`github_pr`. Fork, edit `README.md`, open a PR.

## Requirements (CONTRIBUTING.md)

Three criteria:

1. **Addresses a specific harness problem** — context delivery, tool design,
   planning artifacts, permissions, memory, verification, sandboxing, or agent
   loop structure.
2. **Is worth someone's time** — not just "exists". Include a 1–2 sentence
   note explaining why.
3. **Is vendor-agnostic by principle** — resources tied to a specific model or
   platform are fine if the *pattern* generalizes.

Explicitly excluded: general AI/ML papers, model capability benchmarks, product
marketing or announcement posts without technical substance, and tutorials on
using a model.

Format: `- [Title](URL) — 1–2 sentence note explaining why it's worth
including.`
Note the **em dash** (—) and the star badge:
`![Stars](https://img.shields.io/github/stars/owner/repo?style=flat-square&label=★&color=yellow)`

## What to submit

`### Verification & CI Integration` is the strongest fit — that section is
about checks that run in a PR pipeline, which is exactly what the
`ci-pr-gate` and `dependency-audit` skills do. `### Skills & MCP` is the
alternative.

Criterion 3 is the one to watch: the note has to explain the *pattern*, not
sell npmscan. Frame it as "a gate that checks npm dependencies for malware and
AI payloads before an agent installs them" and describe the mechanism
(skills + a remote MCP server), not the product.

Criterion 1 is satisfied: verification and permissions are named harness
problems.

## Notes

The existing rows are long, substantive notes that explain the design idea and
say why it generalizes. Match that depth — a one-line entry will look thin
next to them.
