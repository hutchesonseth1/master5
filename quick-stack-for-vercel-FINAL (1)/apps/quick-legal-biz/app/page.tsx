import { Button } from "@repo/ui";

export default function Home() {
  return (
    <main className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Quick Legal Biz</h1>
      <p className="text-gray-700">Monorepo: Next.js + Drizzle + Stripe. You're live.</p>
      <div className="flex gap-3 flex-wrap">
        <a href="/api/health"><Button>Health Check</Button></a>
        <a href="https://vercel.com"><Button variant="ghost">Open Vercel</Button></a>
              <a href="/products"><button className="rounded-2xl px-4 py-2 border">Products</button></a>
        <a href="/account"><button className="rounded-2xl px-4 py-2 border">Account</button></a>
        <a href="/admin/products"><button className="rounded-2xl px-4 py-2 border">Admin</button></a>
      </div>
    </main>
  );
}
