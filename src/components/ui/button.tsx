import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "quiet" | "gold" | "danger";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary: "bg-[var(--forest-950)] text-white hover:bg-[var(--forest-800)]",
  secondary:
    "border border-[var(--forest-950)] text-[var(--forest-950)] hover:bg-[var(--forest-950)] hover:text-white",
  quiet: "text-[var(--forest-800)] hover:bg-[var(--line)]",
  gold: "bg-[var(--gold-500)] text-[var(--forest-950)] hover:bg-[var(--gold-300)]",
  danger: "bg-[var(--danger)] text-white hover:bg-[#812d26]",
};

const sizes = {
  sm: "min-h-9 px-3 py-2 text-xs",
  md: "min-h-11 px-5 py-3 text-sm",
  lg: "min-h-13 px-7 py-4 text-base",
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-sm)] font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
