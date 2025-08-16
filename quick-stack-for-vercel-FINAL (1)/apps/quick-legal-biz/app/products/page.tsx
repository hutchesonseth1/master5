import { db } from "@repo/data";
import { products, prices } from "@repo/data/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getCatalog() {
  const prods = await db.select().from(products);
  const rows = await Promise.all(prods.map(async (p) => {
    const ps = await db.select().from(prices).where(eq(prices.productId, p.id));
    return { ...p, prices: ps };
  }));
  return rows;
}

export default async function ProductsPage() {
  const catalog = await getCatalog();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  return (
    <main className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Products</h1>
      <div className="grid gap-4">
        {catalog.map((p) => (
          <div key={p.id} className="border rounded-2xl p-4">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-600">{p.description || ""}</p>
            <div className="mt-3 flex gap-3 flex-wrap">
              {p.prices.map((pr) => (
                <form key={pr.id} action={"/api/checkout"} method="POST">
                  <input type="hidden" name="priceId" value={pr.stripePriceId} />
                  <input type="hidden" name="successUrl" value={`${appUrl}/products?ok=1`} />
                  <input type="hidden" name="cancelUrl" value={`${appUrl}/products?canceled=1`} />
                  <button className="rounded-2xl px-4 py-2 bg-black text-white">
                    Buy {(pr.unitAmount/100).toFixed(2)} {pr.currency}
                  </button>
                </form>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
