# Test prompts for `dependency-audit`

Run these manually with the plugin loaded (`claude --plugin-dir ./npmscan-mcp-plugin`)
before publishing a change to this skill. Check both *activation* (did the
right prompts trigger the skill) and *output quality* (did it follow the
steps in `SKILL.md`).

1. **Direct** — paste a small `package.json` and ask:
   > "Audit my dependencies for vulnerabilities."
   Expect: `batch_query_vulnerabilities` call, follow-up `get_package`/
   `get_package_version` calls on anything flagged, one summary table with
   `npmscanUrl` links.

2. **Indirect** — same pasted dependency list, phrased differently:
   > "Is it safe to ship with these packages?"
   Expect: same workflow triggers even without the word "audit" or
   "vulnerabilities."

3. **Incomplete** — no list attached:
   > "Can you check my dependencies?"
   Expect: a follow-up question asking for `package.json`/lockfile
   contents — not a guess, not a call to any tool.

4. **Non-triggering** — a single-package question:
   > "What does lodash do?"
   Expect: this skill should NOT activate; Claude answers directly (at most
   a single `get_package` call), not the multi-step audit flow.

5. **Edge case** — a dependency list with more than 100 entries:
   Expect: multiple `batch_query_vulnerabilities` calls (chunked), and the
   response says it chunked the request rather than silently dropping
   packages past the 100 limit.

To confirm the skill loaded and is namespaced correctly, run `/help` and
check the **Custom commands** tab for `/npmscan:dependency-audit`, or just
invoke it directly with that name.
