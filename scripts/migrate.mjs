// Applies the SQL migrations in drizzle/ using only runtime dependencies,
// so it works on hosts that prune devDependencies (drizzle-kit) after the build.
// Railway runs it before `npm start` (railway.json), so every boot is migrated; it is a no-op when up to date.
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const client = postgres(url, { max: 1, onnotice: () => {} });
try {
  await migrate(drizzle(client), { migrationsFolder: "drizzle" });
  console.log("Migrations applied.");
} finally {
  await client.end();
}
