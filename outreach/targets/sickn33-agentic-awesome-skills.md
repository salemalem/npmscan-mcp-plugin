# sickn33/agentic-awesome-skills

48717 stars, 40 outside merges in 30 days (2026-10-29). The biggest reach of
the ten by a wide margin. It is not a link list: it indexes **actual skill
bundles**, so a PR ships skill files.

## Route

`github_pr`. Copy the skills into the fork and open a PR against `main`.

## Why we qualify

The plugin repo already ships five skills:

```
skills/ci-pr-gate
skills/dependency-audit
skills/incident-response
skills/new-dependency-evaluation
skills/package-trust-check
```

`package-trust-check` and `dependency-audit` are the natural submission: they
are exactly the "check a package before you install or upgrade it" work this
list indexes.

## Requirements (CONTRIBUTING.md)

- One skill per PR unless the skills are a single bundle. Small corrections
  can go straight to a PR; an issue is not required.
- Copy `docs/contributors/skill-template.md` to `skills/<skill-id>/SKILL.md` and
  replace every placeholder.
- Keep the contribution **source-only** and confined to `skills/<skill-id>/`.
- Original work uses `source: self` and `source_type: self`. External imports
  must declare `source_repo`, `source_type`, `license` and `license_source`.
- Include a nonempty bounded root `LICENSE` in the bundle and keep upstream
  licence notices.
- **Non-executable** `SKILL.md` files plus reference/resource/asset files are
  accepted by the normal fork intake. Scripts, executables, symlinks and
  workflow changes need a maintainer review path — describe the bundle in a
  Discussions Ideas post first.
- Do not edit generated catalogs, plugin mirrors or contributor lists.
- New skills need the concrete task, the gap against existing skills, and one
  usable example in the PR description.

## Gates to run locally

```bash
npm ci --ignore-scripts
python3 -m venv .venv && .venv/bin/python -m pip install -r tools/requirements.txt
export ANTIGRAVITY_PYTHON="$PWD/.venv/bin/python"

npm run validate
npm run validate:references
npm run security:docs

git add skills/<skill-id>/
git commit -m "feat: add <skill-id> for a concrete task"
git fetch upstream main
npm run pr:preflight -- --contributor --base upstream/main --head HEAD
```

The full preflight needs a clean checkout of the committed head. `npm run
pr:preflight -- --no-run` only classifies the change and is not a passing
run.

## Notes

There is already an `ai-sre-incident-response` skill in the list, so incident
response as a category is taken — prefer `package-trust-check` over
`incident-response`. The list holds 1000 skills and runs nightly link
checks, so a stale description gets caught.
