import { Pool } from 'pg';

const requiredEnv = (name: string) => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const dbPoolByRef = new Map<string, Pool>();

const buildDatabaseUrlFromRef = (ref: string) => {
  const base = requiredEnv('DATABASE_BASE');
  const password = requiredEnv('DATABASE_PASSWORD');
  const host = requiredEnv('DATABASE_HOST');
  const colon = process.env.DOS_PUNTOS?.trim() || ':';
  return `${base}${ref}${colon}${password}${host}`;
};

let localDatabaseUrl: string | undefined;
try {
  const secrets = require('./secrets.local') as { LOCAL_DATABASE_URL?: string };
  localDatabaseUrl = secrets.LOCAL_DATABASE_URL?.trim();
} catch {
  localDatabaseUrl = undefined;
}

const databaseUrl = process.env.DATABASE_URL?.trim() || localDatabaseUrl;

export const db = new Pool(
  databaseUrl
    ? {
        connectionString: databaseUrl,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: requiredEnv('DB_HOST'),
        port: Number(requiredEnv('DB_PORT')),
        database: requiredEnv('DB_NAME'),
        user: requiredEnv('DB_USER'),
        password: requiredEnv('DB_PASSWORD'),
        ssl: { rejectUnauthorized: false },
      }
);

export const getDb = (ref?: string) => {
  if (!ref) return db;

  const normalized = ref.trim();
  const cached = dbPoolByRef.get(normalized);
  if (cached) return cached;

  const connectionString = buildDatabaseUrlFromRef(normalized);
  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  dbPoolByRef.set(normalized, pool);
  return pool;
};
