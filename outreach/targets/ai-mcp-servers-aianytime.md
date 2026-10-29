# AIAnytime/Awesome-MCP-Servers

81 stars, 99 outside merges in 30 days (2026-10-29). The list is generated from
one JSON file per server, so entries never collide and a nightly job can
handshake every hosted server.

## Route

`github_pr`. One server per PR: add `servers/<server-name>.json`, regenerate the
README, run the linter.

```bash
python3 scripts/build.py --readme
python3 scripts/lint.py
```

## Requirements (CONTRIBUTING.md)

- `category` must be one of: `developer-tools`, `search`, `knowledge-memory`,
  `media`, `security`, `finance`, `marketing`, `cloud-data`,
  `commerce-travel`, `productivity`. For npmscan use `security`.
- `transport`: `http` for a hosted remote server. npmscan is hosted.
- `endpoint`: the `https://` URL a client connects to. **This is checked every
  night** — the job sends an MCP `initialize` and confirms it responds.
- `description`: one sentence, two at most, on a single line. Markdown links and
  `` `code` `` are fine.
- No tracking parameters (`?utm_source=…` gets stripped).
- No emoji inside entries; the category heading carries one.
- "Someone who isn't you can reach it": the repo is public, or the hosted
  endpoint responds, or the package installs.

## What to submit

`https://npmscan.com/api/mcp` answered a raw `initialize` handshake with
HTTP 200 on 2026-10-29 (serverInfo `npmscan` v3.1.3), so the nightly check will
pass. The plugin repo `salemalem/npmscan-mcp-plugin` is public and MIT.

Category `security`. Description: one sentence naming what it checks and the
endpoint. Do not mention pricing.

## Notes

Hosted MCP peers already merged: PlaceCall, CurlShot, Iris, Skycloak, Darkmoon.
The list takes commercial hosted servers, so a paid service is not a problem
here.

## Submitted (2026-10-29)

[AIAnytime/Awesome-MCP-Servers#385](https://github.com/AIAnytime/Awesome-MCP-Servers/pull/385),
fork `salemalem/awesome-mcp-servers-aianytime`, branch `add-npmscan`.

Two commits on purpose:

1. `a2dc626` repairs `servers/lava.json`, which upstream merged truncated in
   PR #367 (an unterminated string ending in `· Regi`). It broke
   `scripts/lint.py` and the nightly site job on `main`, so the linter failed
   on every branch. The repair only closes the string and the object.
2. `0d8b370` adds `servers/npmscan.json` and the regenerated README.

The JSON entry: category `security`, transport `http`, endpoint
`https://npmscan.com/api/mcp`, registry `io.github.salemalem/npmscan`. The
README was rebuilt with `python3 scripts/build.py --readme` (295 servers) and
`scripts/lint.py` reported `OK — 295 servers, all well-formed.`
