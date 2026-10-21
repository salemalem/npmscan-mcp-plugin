import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const TRACKER_PATH = join(import.meta.dirname, '..', '..', 'tracker.csv');

export const COLUMNS = [
  'id', 'target', 'route', 'status', 'url', 'submitted_on', 'next_action', 'follow_up_on',
  'last_activity', 'notes', 'last_checked', 'agent',
] as const;

export type Column = (typeof COLUMNS)[number];
export type Row = Record<Column, string>;

/** Where a directory listing stands. */
export const STATUSES = [
  'todo',       // not started; nothing blocks it
  'prep',       // needs repo changes or a decision before submitting
  'drafted',    // text is ready, not sent yet (usually the user's action)
  'submitted',  // sent; waiting on them
  'listed',     // live in the directory
  'covered',    // reached through another listing; nothing to submit
  'no_route',   // no submission process exists
  'skipped',    // decided not to submit (notes say why)
  'closed',     // they closed or rejected it (notes say why)
] as const;

/** How we submitted. */
export const ROUTES = ['github_pr', 'github_issue', 'form', 'email', 'in_app', 'crawl', 'cli', 'none', 'unsolicited'] as const;

const GENERIC_AGENTS = new Set(['ai', 'agent', 'llm', 'bot', 'assistant', 'model', 'unknown', 'me']);

/** The model (or "human") making a change; from --agent or NPMSCAN_AGENT. */
export function resolveAgent(flag: string | undefined): string {
  const agent = (flag ?? process.env.NPMSCAN_AGENT ?? '').trim().toLowerCase();
  const example = 'e.g. --agent claude-opus-5.5, gpt-5.1, gemini-2.5-pro, kimi-k2, or human';
  if (!agent) throw new Error(`Say which model you are: pass --agent or set NPMSCAN_AGENT (${example})`);
  if (!/^[a-z][a-z0-9.+-]{1,40}$/.test(agent) || GENERIC_AGENTS.has(agent)) {
    throw new Error(`--agent '${agent}' is not a model name (${example})`);
  }
  return agent;
}

const DATE = /^(\d{4}-\d{2}-\d{2})?$/;

function validate(row: Row, where: string): void {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(row.id)) throw new Error(`${where}: id '${row.id}' must be lowercase-kebab`);
  if (!(STATUSES as readonly string[]).includes(row.status)) {
    throw new Error(`${where}: unknown status '${row.status}' (one of ${STATUSES.join(', ')})`);
  }
  if (!(ROUTES as readonly string[]).includes(row.route)) {
    throw new Error(`${where}: unknown route '${row.route}' (one of ${ROUTES.join(', ')})`);
  }
  for (const c of ['submitted_on', 'follow_up_on', 'last_checked'] as const) {
    if (!DATE.test(row[c])) throw new Error(`${where}: ${c} '${row[c]}' must be YYYY-MM-DD or empty`);
  }
}

/** RFC 4180 parser: handles quoted fields containing commas, quotes and newlines. */
function parseCsv(text: string): string[][] {
  const records: string[][] = [];
  let record: string[] = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { record.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      record.push(field);
      records.push(record);
      record = [];
      field = '';
    } else field += c;
  }
  if (field || record.length) { record.push(field); records.push(record); }
  return records.filter((r) => r.some((f) => f !== ''));
}

const escape = (v: string) => (/[",\n\r]/.test(v) ? `"${v.replaceAll('"', '""')}"` : v);

export const today = () => new Date().toISOString().slice(0, 10);

export class Tracker {
  readonly rows: Row[];
  private readonly readOnly: boolean;
  private readonly agent: string;

  /** Takes a lock unless readOnly, so two runs can't overwrite each other's rows. */
  constructor({ readOnly = false, agent = '' } = {}) {
    this.readOnly = readOnly;
    this.agent = agent;
    const [header, ...records] = parseCsv(readFileSync(TRACKER_PATH, 'utf-8'));
    if (header?.join(',') !== COLUMNS.join(',')) {
      throw new Error(`Unexpected tracker header: ${header?.join(',')}`);
    }
    // Refuse to load malformed rows: saving would silently drop or shift fields.
    const bad = records.findIndex((r) => r.length !== COLUMNS.length);
    if (bad !== -1) throw new Error(`tracker.csv row ${bad + 2} has ${records[bad].length} fields, expected ${COLUMNS.length}`);
    this.rows = records.map((r) => Object.fromEntries(COLUMNS.map((c, i) => [c, r[i]])) as Row);
    this.rows.forEach((r, i) => validate(r, `tracker.csv row ${i + 2} (${r.id})`));
    if (!readOnly) lock();
  }

  find(id: string): Row | undefined {
    return this.rows.find((r) => r.id === id);
  }

  update(row: Row, changes: Partial<Row>, { stamp = true } = {}): void {
    if (this.readOnly) throw new Error('Tracker was opened read-only');
    validate({ ...row, ...changes }, row.id);
    Object.assign(row, changes, { last_checked: today() }, stamp ? { agent: this.requireAgent() } : {});
    this.save();
  }

  add(values: Partial<Row> & Pick<Row, 'id' | 'target' | 'route'>): Row {
    if (this.readOnly) throw new Error('Tracker was opened read-only');
    if (this.find(values.id)) throw new Error(`${values.id} is already in the tracker`);
    const row = { ...Object.fromEntries(COLUMNS.map((c) => [c, ''])), status: 'todo', ...values } as Row;
    row.last_checked = today();
    row.agent = this.requireAgent();
    validate(row, row.id);
    this.rows.push(row);
    this.save();
    return row;
  }

  save(): void {
    const lines = [COLUMNS.join(','), ...this.rows.map((r) => COLUMNS.map((c) => escape(r[c])).join(','))];
    writeFileSync(TRACKER_PATH, lines.join('\n') + '\n');
  }

  private requireAgent(): string {
    if (!this.agent) throw new Error('Tracker opened without an agent');
    return this.agent;
  }
}

function lock(): void {
  const lockPath = `${TRACKER_PATH}.lock`;
  try {
    writeFileSync(lockPath, String(process.pid), { flag: 'wx' });
  } catch {
    throw new Error(`${lockPath} exists: another script is running. Delete it if that run crashed.`);
  }
  const release = () => rmSync(lockPath, { force: true });
  process.on('exit', release);
  for (const sig of ['SIGINT', 'SIGTERM'] as const) process.on(sig, () => { release(); process.exit(130); });
}
