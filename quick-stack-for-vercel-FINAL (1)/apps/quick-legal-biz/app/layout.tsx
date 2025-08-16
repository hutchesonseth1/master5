import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Quick Legal Biz",
  description: "Modular stack with Next.js + Drizzle + Stripe"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
