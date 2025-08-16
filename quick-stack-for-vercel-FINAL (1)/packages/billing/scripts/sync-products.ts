import { syncStripeCatalog } from "../src/sync";

syncStripeCatalog().then(() => {
  console.log("Stripe catalog synced.");
  process.exit(0);
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
