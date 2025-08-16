import { stripe } from "./stripe";
import { db } from "@repo/data";
import { products, prices } from "@repo/data/schema";
import { eq } from "drizzle-orm";

export async function syncStripeCatalog() {
  const prodList = await stripe.products.list({ limit: 100, expand: ["data.default_price"] });
  for (const p of prodList.data) {
    // Upsert product
    const name = p.name || "Untitled";
    await db.insert(products).values({
      stripeProductId: p.id,
      name,
      description: (p.description || null) as any,
      active: p.active ?? true
    }).onConflictDoUpdate({
      target: products.stripeProductId,
      set: { name, description: (p.description || null) as any, active: p.active ?? true }
    });

    // Prices for this product
    const priceList = await stripe.prices.list({ product: p.id, limit: 100 });
    for (const pr of priceList.data) {
      await db.insert(prices).values({
        stripePriceId: pr.id,
        productId: (await db.select({ id: products.id }).from(products).where(eq(products.stripeProductId, p.id))).at(0)?.id!,
        currency: pr.currency.toUpperCase(),
        unitAmount: pr.unit_amount ?? 0,
        active: pr.active ?? true
      }).onConflictDoUpdate({
        target: prices.stripePriceId,
        set: { currency: pr.currency.toUpperCase(), unitAmount: pr.unit_amount ?? 0, active: pr.active ?? true }
      });
    }
  }
}
