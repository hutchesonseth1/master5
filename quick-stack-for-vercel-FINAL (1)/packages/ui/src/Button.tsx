import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost"
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base = "rounded-2xl px-4 py-2 font-medium shadow-sm focus:outline-none";
  const styles = variant === "primary"
    ? " bg-black text-white hover:opacity-90"
    : " border border-gray-300 hover:bg-gray-50";
  return <button className={base + styles + " " + className} {...props} />;
}
