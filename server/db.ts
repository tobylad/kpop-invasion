import { Database } from 'bun:sqlite';
import { join } from 'path';

const dbPath = process.env.DB_PATH ?? join(import.meta.dir, '../db/dev.db');

export const db = new Database(dbPath, { create: true });

db.run('PRAGMA journal_mode = WAL');
db.run('PRAGMA foreign_keys = ON');

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id         TEXT PRIMARY KEY,
    email      TEXT UNIQUE NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    last_login_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

const gameTables = [
  'bands',
  'members',
  'solo_profiles',
  'releases',
  'album_sales',
  'chart_entries',
  'social_snapshots',
  'venues',
  'schedule_events',
  'incidents',
  'health_records',
  'contracts',
  'endorsements',
  'member_appearances',
  'world_events',
  'inbox_messages',
] as const;

for (const table of gameTables) {
  db.run(`
    CREATE TABLE IF NOT EXISTS ${table} (
      id         TEXT PRIMARY KEY,
      user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      data       TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  db.run(`CREATE INDEX IF NOT EXISTS idx_${table}_user_id ON ${table}(user_id)`);
}

db.run(`
  CREATE TABLE IF NOT EXISTS game_state (
    id         TEXT PRIMARY KEY,
    user_id    TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    data       TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

type Row = { count: number };

export function countRows(table: string): number {
  return (db.query(`SELECT COUNT(*) as count FROM ${table}`).get() as Row).count;
}
