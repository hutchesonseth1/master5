export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default function AccountPage() {
  async function openPortal(formData: FormData) {
    "use server";
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}/api/portal`, { method: "POST" });
    if (res.ok) {
      const { url } = await res.json();
      return { redirect: url as string };
    }
    return { error: "Failed to open portal" };
  }

  return (
    <main className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Account</h1>
      <p className="text-gray-700">Manage your billing in Stripe Customer Portal.</p>
      <form action={openPortal}>
        <button className="rounded-2xl px-4 py-2 bg-black text-white">Open Billing Portal</button>
      </form>
    </main>
  );
}
