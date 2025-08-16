import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { loadServerEnv } from "@repo/utils/env";

const env = loadServerEnv();

export const client = postgres(env.DATABASE_URL, { ssl: 'require' as any });
export const db = drizzle(client);
