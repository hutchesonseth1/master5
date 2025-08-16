export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ ok: true, env: process.env.NODE_ENV || "unknown", ts: new Date().toISOString() });
}
