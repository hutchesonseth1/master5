import { handleStripeWebhook } from "@repo/billing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text(); // raw body for Stripe signature verification
  const result = await handleStripeWebhook(rawBody, signature);
  return new Response(
    typeof result.body === "string" ? result.body : JSON.stringify(result.body),
    { status: result.status, headers: { "content-type": "application/json" } }
  );
}
