import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(req, res) {
  const defaultMigrationOptions = {
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (req.method === "GET") {
    const migrations = await migrationRunner(defaultMigrationOptions);
    return res.status(200).json(migrations);
  }
  if (req.method === "POST") {
    const migrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });
    return res.status(200).json(migrations);
  }

  return res.status(405);
}
