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

export default async function AdminProducts() {
  const catalog = await getCatalog();
  return (
    <main className="p-8 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Admin • Products</h1>

      <section className="border rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-2">Create Product</h2>
        <form method="POST" action="/api/admin/products" className="grid gap-2 md:grid-cols-2">
          <input name="name" placeholder="Name" className="border rounded-xl px-3 py-2" required />
          <input name="description" placeholder="Description" className="border rounded-xl px-3 py-2 md:col-span-2" />
          <input name="stripeProductId" placeholder="Stripe Product ID (optional)" className="border rounded-xl px-3 py-2 md:col-span-2" />
          <button className="rounded-2xl px-4 py-2 bg-black text-white md:col-span-2">Create</button>
        </form>
      </section>

      <div className="grid gap-4">
        {catalog.map((p) => (
          <div key={p.id} className="border rounded-2xl p-4">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-600">{p.description || ""}</p>
            <div className="mt-3">
              <h3 className="font-medium">Add Price</h3>
              <form method="POST" action="/api/admin/prices" className="flex gap-2 flex-wrap items-center">
                <input type="hidden" name="productId" value={p.id} />
                <input name="stripePriceId" placeholder="Stripe Price ID (optional)" className="border rounded-xl px-3 py-2" />
                <input name="currency" placeholder="USD" defaultValue="USD" className="border rounded-xl px-3 py-2 w-28" />
                <input name="unitAmount" placeholder="1000 (=$10.00)" className="border rounded-xl px-3 py-2 w-40" />
                <button className="rounded-2xl px-4 py-2 bg-black text-white">Add</button>
              </form>
            </div>

            <div className="mt-4">
              <h3 className="font-medium">Existing Prices</h3>
              <ul className="list-disc pl-6">
                {p.prices.map((pr) => (
                  <li key={pr.id}>{(pr.unitAmount/100).toFixed(2)} {pr.currency} — <code>{pr.stripePriceId}</code></li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
