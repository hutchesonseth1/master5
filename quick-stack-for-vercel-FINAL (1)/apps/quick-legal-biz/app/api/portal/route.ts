import { stripe } from "@repo/billing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  // In a real app, use the logged-in user's Stripe customer ID.
  // For demo, create an ephemeral session without a customer to show the portal landing.
  // Better: store/retrieve customerId from your users table.
  const returnUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/account";
  const session = await stripe.billingPortal.sessions.create({
    // customer: 'cus_xxx', // TODO: derive from auth/session
    return_url: returnUrl
  });
  return new Response(JSON.stringify({ url: session.url }), { status: 200, headers: { "content-type": "application/json" } });
}
