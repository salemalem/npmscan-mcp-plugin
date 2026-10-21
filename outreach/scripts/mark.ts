#!/usr/bin/env node
/**
 * Records a change in tracker.csv without hand-editing it.
 *
 *   node outreach/scripts/mark.ts --id perplexity-email --status listed --notes "live in the connector directory"
 *   node outreach/scripts/mark.ts --id cursor --status submitted --url https://... --submitted-on 2026-10-22
 *   node outreach/scripts/mark.ts --id smithery --add --target "Smithery" --route form [--status todo] [--notes "..."]
 *
 * --notes replaces the notes field; --append-note adds "YYYY-MM-DD: text" to it.
 * --agent (or NPMSCAN_AGENT) names the model making the change.
 */
import { parseArgs } from 'node:util';
import { resolveAgent, today, Tracker, type Column, type Row } from './lib/tracker.ts';

const { values: args } = parseArgs({
  options: {
    id: { type: 'string' },
    add: { type: 'boolean', default: false },
    target: { type: 'string' },
    route: { type: 'string' },
    status: { type: 'string' },
    url: { type: 'string' },
    'submitted-on': { type: 'string' },
    'next-action': { type: 'string' },
    'follow-up-on': { type: 'string' },
    'last-activity': { type: 'string' },
    notes: { type: 'string' },
    'append-note': { type: 'string' },
    agent: { type: 'string' },
  },
});

if (!args.id) throw new Error('--id is required (the first column of tracker.csv)');

const changes: Partial<Row> = {};
const set = (column: Column, value: string | undefined) => {
  if (value !== undefined) changes[column] = value;
};
set('target', args.target);
set('route', args.route);
set('status', args.status);
set('url', args.url);
set('submitted_on', args['submitted-on']);
set('next_action', args['next-action']);
set('follow_up_on', args['follow-up-on']);
set('last_activity', args['last-activity']);
set('notes', args.notes);

const tracker = new Tracker({ agent: resolveAgent(args.agent) });

if (args.add) {
  if (!args.target || !args.route) throw new Error('--add needs --target and --route');
  const row = tracker.add({ id: args.id, target: args.target, route: args.route, ...changes });
  console.log(`added ${row.id} (${row.status})`);
} else {
  const row = tracker.find(args.id);
  if (!row) throw new Error(`${args.id} is not in the tracker; use --add to add it`);
  if (args['append-note']) {
    const note = `${today()}: ${args['append-note']}`;
    const base = changes.notes ?? row.notes;
    changes.notes = base ? `${base} | ${note}` : note;
  }
  if (Object.keys(changes).length === 0) throw new Error('nothing to change: pass --status, --notes, --url, ...');
  tracker.update(row, changes);
  console.log(`${row.id}: ${row.status}${row.next_action ? `, next: ${row.next_action}` : ''}`);
}
