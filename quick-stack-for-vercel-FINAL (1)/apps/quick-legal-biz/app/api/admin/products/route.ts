import { isAuthorized } from "../_guard";
import { db } from "@repo/data";
import { products } from "@repo/data/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isAuthorized(req)) return new Response("Unauthorized", { status: 401 });
  const form = await req.formData();
  const name = String(form.get("name") || "");
  const description = String(form.get("description") || "");
  const stripeProductId = String(form.get("stripeProductId") || "");

  if (!name) return new Response("Missing name", { status: 400 });

  await db.insert(products).values({
    name,
    description: description || null as any,
    stripeProductId: stripeProductId || `auto_${crypto.randomUUID()}`,
    active: true
  });

  return new Response(null, { status: 302, headers: { Location: "/admin/products" } });
}
