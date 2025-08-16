import { createCheckoutSession } from "@repo/billing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const form = await req.formData();
  const priceId = String(form.get("priceId") || "");
  const successUrl = String(form.get("successUrl") || "");
  const cancelUrl = String(form.get("cancelUrl") || "");

  if (!priceId || !successUrl || !cancelUrl) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400, headers: { "content-type": "application/json" } });
  }

  const session = await createCheckoutSession({ priceId, successUrl, cancelUrl });
  return Response.redirect(session.url!, 302);
}
