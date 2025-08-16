import { resend } from "./client";
import { WelcomeEmail, ReceiptEmail } from "./templates";

export async function sendWelcomeEmail(to: string, name?: string) {
  if (!resend) return;
  await resend.emails.send({
    from: "Quick Legal Biz <noreply@your-domain.com>",
    to,
    subject: "Welcome to Quick Legal Biz",
    react: WelcomeEmail({ name })
  });
}

export async function sendReceiptEmail(to: string, amount: number, currency?: string) {
  if (!resend) return;
  await resend.emails.send({
    from: "Quick Legal Biz <billing@your-domain.com>",
    to,
    subject: "Your receipt",
    react: ReceiptEmail({ amount, currency })
  });
}
