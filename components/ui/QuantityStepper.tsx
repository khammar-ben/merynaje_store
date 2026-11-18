"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import { MAX_QTY } from "@/lib/cart";

export function QuantityStepper({
  value,
  onChange,
  size = "md",
  label,
}: {
  value: number;
  onChange: (n: number) => void;
  size?: "sm" | "md";
  label?: string;
}) {
  const { t } = useI18n();
  const btn = cn(
    "inline-flex items-center justify-center rounded-full transition-colors hover:bg-sand disabled:opacity-30",
    size === "sm" ? "h-9 w-9" : "h-11 w-11",
  );
  return (
    <div
      role="group"
      aria-label={label ?? t("product.quantity")}
      className="inline-flex items-center rounded-full border border-ink/15 bg-ivory"
    >
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label={t("product.decrease")}
      >
        <Minus className="h-4 w-4" strokeWidth={1.6} />
      </button>
      <output aria-live="polite" className={cn("text-center tabular-nums", size === "sm" ? "w-7 text-sm" : "w-9")}>
        {value}
      </output>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY}
        aria-label={t("product.increase")}
      >
        <Plus className="h-4 w-4" strokeWidth={1.6} />
      </button>
    </div>
  );
}
