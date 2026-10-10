import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { requireEnv } from "@/lib/env";
import * as schema from "./schema";

let _db: PostgresJsDatabase<typeof schema> | undefined;

/** Lazily connect so `next build` works without a database. */
export function db() {
  if (!_db) {
    // prepare:false keeps this compatible with transaction-mode poolers (Supabase, Neon).
    const client = postgres(requireEnv("DATABASE_URL"), {
      prepare: false,
      max: Number(process.env.DATABASE_POOL_SIZE ?? 5),
      onnotice: () => {},
    });
    _db = drizzle(client, { schema });
  }
  return _db;
}

export const hasDatabase = () => !!process.env.DATABASE_URL;

export * as t from "./schema";
