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

/**
 * False while `next build` prerenders: hosts like Railway expose DATABASE_URL to
 * the build, but the database's private network isn't reachable until runtime.
 */
export const hasDatabase = () => !!process.env.DATABASE_URL && process.env.NEXT_PHASE !== "phase-production-build";

export * as t from "./schema";
