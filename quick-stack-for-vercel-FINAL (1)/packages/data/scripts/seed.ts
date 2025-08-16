import { db } from "../src/db";
import { users, entitlements } from "../src/schema";

async function main() {
  const [u] = await db.insert(users).values({
    email: "owner@example.com",
    name: "Owner"
  }).returning();

  if (u) {
    await db.insert(entitlements).values({
      userId: u.id,
      product: "quick-legal-biz.premium",
      active: true
    });
  }

  console.log("Seed complete");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
