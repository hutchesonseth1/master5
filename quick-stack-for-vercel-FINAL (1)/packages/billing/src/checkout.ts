import { stripe } from "./stripe";

export async function createCheckoutSession(opts: {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}) {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: opts.priceId, quantity: 1 }],
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    customer_email: opts.customerEmail
  });
  return session;
}
