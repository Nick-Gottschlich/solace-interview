import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setupDatabase = () => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("Error: DATABASE_URL environment variable is not set.");
    return {
      select: () => ({
        from: () => [],
      }),
    };
  }

  try {
    const queryClient = postgres(databaseUrl);
    const db = drizzle(queryClient);
    return db;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return {
      select: () => ({
        from: () => [],
      }),
    };
  }
};

// Export the database instance
const dbInstance = setupDatabase();
export default dbInstance;
