import { isAuthorized } from "../_guard";
import { db } from "@repo/data";
import { prices } from "@repo/data/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isAuthorized(req)) return new Response("Unauthorized", { status: 401 });
  const form = await req.formData();
  const productId = String(form.get("productId") || "");
  const currency = String(form.get("currency") || "USD").toUpperCase();
  const unitAmountStr = String(form.get("unitAmount") || "0");
  const stripePriceId = String(form.get("stripePriceId") || "");

  const unitAmount = parseInt(unitAmountStr, 10);
  if (!productId || isNaN(unitAmount)) return new Response("Bad request", { status: 400 });

  await db.insert(prices).values({
    productId,
    currency,
    unitAmount,
    stripePriceId: stripePriceId || `auto_${crypto.randomUUID()}`,
    active: true
  });

  return new Response(null, { status: 302, headers: { Location: "/admin/products" } });
}
