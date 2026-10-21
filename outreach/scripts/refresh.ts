#!/usr/bin/env node
/**
 * The "replies check": pulls live state into tracker.csv for every submission
 * we can check from here, and lists the ones where someone is waiting on us.
 *
 *   node outreach/scripts/refresh.ts [--id cline-marketplace] [--dry-run]
 *
 * - GitHub PRs and issues: state, labels, and the latest comment or review
 *   from a person other than us (bots don't count). A merged PR becomes
 *   `listed`, a PR closed without merging becomes `closed`. A closed issue is
 *   only reported, since closing can mean approved or rejected.
 * - Crawled directories with a public index (see CRAWL_CHECKS): `listed` once
 *   npmscan shows up.
 *
 * Email and form replies can't be checked from here; see outreach/README.md.
 * Only rows whose state changed get this run's agent.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { parseArgs } from 'node:util';
import { resolveAgent, Tracker, type Row } from './lib/tracker.ts';

const { values: args } = parseArgs({
  options: {
    id: { type: 'string' },
    'dry-run': { type: 'boolean', default: false },
    agent: { type: 'string' },
  },
});

const exec = promisify(execFile);
async function gh(...ghArgs: string[]): Promise<string> {
  const { stdout } = await exec('gh', ghArgs, { encoding: 'utf-8', timeout: 120_000, maxBuffer: 32 * 1024 * 1024 });
  return stdout.trim();
}

/** Directories that list npmscan by crawling, with a way to see whether they have. */
const CRAWL_CHECKS: Record<string, () => Promise<string | null>> = {
  async gemini() {
    const res = await fetch('https://geminicli.com/extensions.json');
    if (!res.ok) throw new Error(`extensions.json: HTTP ${res.status}`);
    const text = await res.text();
    return /npmscan/i.test(text) ? 'found in geminicli.com/extensions.json' : null;
  },
  async 'mcp-registry'() {
    const res = await fetch('https://registry.modelcontextprotocol.io/v0.1/servers?search=npmscan');
    if (!res.ok) throw new Error(`registry: HTTP ${res.status}`);
    type Entry = { server?: { name?: string; version?: string }; _meta?: Record<string, { isLatest?: boolean }> };
    const body = (await res.json()) as { servers?: Entry[] };
    const ours = (body.servers ?? []).filter((s) => s.server?.name === 'io.github.salemalem/npmscan');
    const latest = ours.find((s) => s._meta?.['io.modelcontextprotocol.registry/official']?.isLatest) ?? ours.at(-1);
    return latest ? `registry has ${latest.server!.name} v${latest.server!.version}` : null;
  },
};

interface Activity { login: string; type: string; at: string }
interface GitHubState { kind: 'pull' | 'issues'; state: string; merged: boolean; labels: string[]; activity: Activity[] }

async function fetchGitHub(url: string): Promise<GitHubState> {
  const m = url.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)\/(pull|issues)\/(\d+)/);
  if (!m) throw new Error(`not a GitHub PR or issue URL: ${url}`);
  const [, repo, kind, n] = m;
  const who = '{login: .user.login, type: .user.type, at: (.submitted_at // .created_at)}';
  const lines = (s: string) => s.split('\n').filter(Boolean).map((l) => JSON.parse(l) as Activity);
  const [issue, comments, reviews, inline] = await Promise.all([
    gh('api', `repos/${repo}/issues/${n}`, '--jq',
      '{state, merged: (.pull_request.merged_at != null), labels: [.labels[].name]}'),
    gh('api', '--paginate', `repos/${repo}/issues/${n}/comments`, '--jq', `.[] | ${who}`),
    kind === 'pull' ? gh('api', '--paginate', `repos/${repo}/pulls/${n}/reviews`, '--jq', `.[] | ${who}`) : '',
    kind === 'pull' ? gh('api', '--paginate', `repos/${repo}/pulls/${n}/comments`, '--jq', `.[] | ${who}`) : '',
  ]);
  return {
    kind: kind as GitHubState['kind'],
    ...JSON.parse(issue),
    activity: [...lines(comments), ...lines(reviews), ...lines(inline)],
  };
}

const isBot = (a: Activity) => a.type === 'Bot' || a.login.endsWith('[bot]');

const tracker = new Tracker({ readOnly: args['dry-run'], agent: args['dry-run'] ? '' : resolveAgent(args.agent) });
const me = (await gh('api', 'user', '--jq', '.login')).toLowerCase();

const rows = tracker.rows.filter((r) => (args.id ? r.id === args.id : true));
const owed: string[] = [];
const attention: string[] = [];

for (const row of rows) {
  let changes: Partial<Row> = {};
  try {
    if (/^https:\/\/github\.com\/.+\/(pull|issues)\/\d+/.test(row.url) && row.status === 'submitted') {
      const s = await fetchGitHub(row.url);
      const people = s.activity.filter((a) => !isBot(a)).sort((a, b) => a.at.localeCompare(b.at));
      const theirs = people.filter((a) => a.login.toLowerCase() !== me);
      const latest = theirs.at(-1);
      changes.last_activity = latest ? `${latest.at.slice(0, 10)} ${latest.login}` : 'none';
      const labels = s.labels.length ? ` [${s.labels.join(', ')}]` : '';
      console.log(`${row.id}: ${s.merged ? 'merged' : s.state}${labels}, last reply from them: ${changes.last_activity}`);

      if (s.merged) changes = { ...changes, status: 'listed', next_action: 'add to README "Official listings"' };
      else if (s.state === 'closed' && s.kind === 'pull') changes = { ...changes, status: 'closed', next_action: 'read why it was closed; record it in notes' };
      else if (s.state === 'closed') attention.push(`${row.id}: issue closed; check whether it was approved or rejected (${row.url})`);
      else if (people.at(-1) && people.at(-1)!.login.toLowerCase() !== me) {
        changes.next_action = 'reply on GitHub';
        owed.push(`${row.id}: ${latest!.login} on ${latest!.at.slice(0, 10)} (${row.url})`);
      }
    } else if (CRAWL_CHECKS[row.id] && row.status !== 'skipped') {
      const found = await CRAWL_CHECKS[row.id]();
      console.log(`${row.id}: ${found ?? 'not listed yet'}`);
      if (found && row.status !== 'listed') changes = { status: 'listed', last_activity: found };
      if (!found && row.status === 'listed') attention.push(`${row.id}: was listed, now missing from its index`);
    } else continue;
  } catch (err) {
    attention.push(`${row.id}: check failed: ${(err as Error).message}`);
    continue;
  }

  const changed = Object.entries(changes).some(([k, v]) => row[k as keyof Row] !== v);
  if (!args['dry-run']) tracker.update(row, changes, { stamp: changed });
}

const due = tracker.rows.filter((r) => r.follow_up_on && r.follow_up_on <= new Date().toISOString().slice(0, 10));
console.log('\nWaiting on our reply:', owed.length ? '' : 'none');
owed.forEach((l) => console.log(`  ${l}`));
console.log('Follow-ups due:', due.length ? '' : 'none');
due.forEach((r) => console.log(`  ${r.id}: ${r.next_action || '(no next_action)'} (due ${r.follow_up_on})`));
if (attention.length) {
  console.log('Needs a look:');
  attention.forEach((l) => console.log(`  ${l}`));
}
console.log('\nNot checked here: email replies (Gmail) and in-app/form replies. See outreach/README.md.');
if (args['dry-run']) console.log('(dry run: tracker not written)');
