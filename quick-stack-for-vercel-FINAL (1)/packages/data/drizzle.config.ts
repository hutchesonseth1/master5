import type { Config } from "drizzle-kit";
import * as path from "path";

export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || ""
  }
} satisfies Config;
