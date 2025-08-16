import type Stripe from "stripe";
import { stripe } from "./stripe";
import { loadServerEnv } from "@repo/utils/env";
import { db } from "@repo/data";
import { entitlements, users } from "@repo/data/schema";
import { eq } from "drizzle-orm";

const env = loadServerEnv();

export async function handleStripeWebhook(rawBody: string, signature: string | null) {
  if (!signature) {
    return { status: 400, body: { error: "Missing Stripe signature" } };
  }
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(rawBody, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    return { status: 400, body: `Webhook Error: ${err.message}` };
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as any;
      const email = session.customer_details?.email;
      const product = "quick-legal-biz.premium";
      if (email) {
        const [u] = await db.insert(users).values({ email }).onConflictDoNothing().returning();
        const userId = (u?.id) || (await db.select().from(users).where(eq(users.email, email))).at(0)?.id;
        if (userId) {
          await db.insert(entitlements).values({ userId, product, active: true }).onConflictDoNothing();
        }
      }
      break;
    }
    case "payment_intent.succeeded":
      // mark success in your own tables if needed
      break;
    case "payment_intent.payment_failed":
      // mark failure if needed
      break;
    default:
      break;
  }

  return { status: 200, body: { received: true } };
}
