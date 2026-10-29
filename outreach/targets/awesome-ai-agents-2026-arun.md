# ARUNAGIRINATHAN-K/awesome-ai-agents-2026

352 stars, 42 outside merges in 30 days (2026-10-29). Three ways to submit:
an issue form, a "Submit via GitHub Issue" button, or a manual PR.

## Route

`github_pr` (Option 3, manual pull request). Their own words: "For experienced
contributors, fork the repository, edit `README.md`, run `npm run build:data`,
and submit a standard Pull Request."

The automated issue path also exists (GitHub Actions validates the entry and
opens a PR for maintainer review) — worth having as a fallback if the manual
PR gets no attention.

## Requirements (CONTRIBUTING.md)

- Must pass `awesome-lint` and the link checker: no em-dashes, no duplicate
  links, correct formatting.
- `npm run build:data` regenerates the dataset; commit what it writes.
- No promotional language: no "best", "revolutionary", "game-changing",
  "powerful", "seamlessly", "amazing".
- Start the description with an action verb or noun phrase describing what the
  tool **does**, not what it **is**.
- Five criteria: directly related to AI agents; actively maintained (last
  commit within 6 months, or a live hosted product with recent activity);
  publicly available; not a duplicate; functional.
- Entry format:
  `- [Modus](https://github.com/hypermodeinc/modus) \`🔬\` \`[WebAssembly]\` \`[Serverless]\` - Serverless framework for high-throughput agent workloads with minimal cold starts.`
- A Vercel "Authorization required to deploy" check on fork PRs is normal; the
  GitHub Actions checks are the ones that matter.

## What to submit

`## Agent Tooling and Infrastructure` is the best home. `### MCP (Model
Context Protocol)` under `## Agent Communication Protocols` is the second.
`## Safety Guardrails and Observability` is a weaker option.

Criterion 1 is the gate: "Directly related to AI agents — not a general LLM
tool, not a prompt library, not a generic API wrapper". Frame npmscan as the
npm package auditing tool for AI agents (the MCP server is for agents to call
before installing packages). That is exactly what the five skills do.

Criterion 3 is satisfied by the public MIT plugin repo
`salemalem/npmscan-mcp-plugin` (480 stars, pushed 2026-10-29, and
`https://npmscan.com/api/mcp` is a live hosted endpoint).

Similar hosted MCP tools already merged: PlaceCall, YYLO, Browserbase, Firecrawl,
Zapier, Tavily.

## Notes

A Vercel check on a fork PR looks like a failure but is a known fork policy.
Mention it in the PR body so the reviewer doesn't wait on it.
