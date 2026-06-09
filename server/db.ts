import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import type { DbSchema } from './types';
import { join } from 'path';

const defaultData: DbSchema = {
  bands: [],
  members: [],
  soloProfiles: [],
  releases: [],
  albumSales: [],
  chartEntries: [],
  socialSnapshots: [],
  venues: [],
  scheduleEvents: [],
  incidents: [],
  healthRecords: [],
  contracts: [],
  endorsements: [],
  memberAppearances: [],
  worldEvents: [],
  inboxMessages: [],
  gameState: null,
};

const dbPath = join(import.meta.dir, '../db/db.json');
const adapter = new JSONFile<DbSchema>(dbPath);
export const db = new Low<DbSchema>(adapter, defaultData);

await db.read();
