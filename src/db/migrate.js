const { drizzle } = require("drizzle-orm/postgres-js");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
const postgres = require("postgres");

const runMigration = async () => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("Error: DATABASE_URL environment variable is not set.");
    throw new Error("DATABASE_URL is not set");
  }

  const sql = postgres(databaseUrl, { max: 1 });
  const db = drizzle(sql);

  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Successfully ran migration.");
  } catch (error) {
    console.error("Failed to run migration:", error);
    throw error;
  } finally {
    await sql.end(); // Ensure that the SQL client is closed regardless of success or failure
  }
};

runMigration().catch((e) => {
  console.error("Migration encountered an error:", e);
  process.exit(1);
});
