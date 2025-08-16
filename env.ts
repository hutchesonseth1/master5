import { z } from "zod";

export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().url(),
  STRIPE_SECRET_KEY: z.string().min(10),
  STRIPE_WEBHOOK_SECRET: z.string().min(10),
  RESEND_API_KEY: z.string().optional()
});

export const clientEnvSchema = z.object({
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(10),
  NEXT_PUBLIC_APP_URL: z.string().url().optional()
});

export function loadServerEnv(env = process.env) {
  return serverEnvSchema.parse(env);
}

export function loadClientEnv(env = process.env) {
  return clientEnvSchema.parse(env);
}
