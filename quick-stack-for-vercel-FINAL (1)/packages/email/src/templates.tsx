import * as React from "react";

export function WelcomeEmail({ name = "there" }: { name?: string }) {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      <h1>Welcome, {name}!</h1>
      <p>You now have access to Quick Legal Biz.</p>
    </div>
  );
}

export function ReceiptEmail({ amount, currency = "USD" }: { amount: number; currency?: string }) {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      <h2>Payment received</h2>
      <p>
        Amount: {(amount/100).toFixed(2)} {currency}
      </p>
    </div>
  );
}
