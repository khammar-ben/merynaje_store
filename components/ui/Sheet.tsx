"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

type Side = "start" | "end" | "top" | "center";

const panelBase: Record<Side, string> = {
  end: "inset-y-0 end-0 h-full w-full max-w-md",
  start: "inset-y-0 start-0 h-full w-[88%] max-w-sm",
  top: "inset-x-0 top-0 max-h-[90svh] w-full",
  center: "inset-x-4 top-1/2 mx-auto max-h-[85svh] max-w-2xl -translate-y-1/2 rounded-2xl",
};

const panelHidden: Record<Side, string> = {
  end: "ltr:translate-x-full rtl:-translate-x-full",
  start: "ltr:-translate-x-full rtl:translate-x-full",
  top: "-translate-y-full",
  center: "opacity-0 scale-[0.97]",
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible overlay panel (drawer or modal): focus is moved inside and trapped,
 * Escape and backdrop click close it, page scroll is locked while open.
 * Content is only rendered once the sheet has been opened (lighter pages).
 */
export function Sheet({
  open,
  onClose,
  side = "end",
  title,
  hideTitle = false,
  children,
  className,
  bodyClassName,
}: {
  open: boolean;
  onClose: () => void;
  side?: Side;
  title: string;
  hideTitle?: boolean;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  const { t } = useI18n();
  const panelRef = useRef<HTMLDivElement>(null);
  // Mount on first open, then keep mounted so closing can animate.
  const [mounted, setMounted] = useState(open);
  if (open && !mounted) setMounted(true);
  // `shown` lags `open` by two frames so the closed state is painted before the enter transition.
  const [shown, setShown] = useState(false);
  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setShown(open));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [open]);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    if (scrollbar) html.style.paddingInlineEnd = `${scrollbar}px`;

    const focusTimer = window.setTimeout(() => {
      const target =
        panel?.querySelector<HTMLElement>("[data-autofocus]") ?? panel?.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus({ preventScroll: true });
    }, 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null,
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      html.style.overflow = "";
      html.style.paddingInlineEnd = "";
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [open]);

  if (!mounted) return null;

  return (
    <div
      className={cn("fixed inset-0 z-50", shown ? "visible" : "invisible")}
      style={{ transition: `visibility 0s linear ${shown ? "0s" : "300ms"}` }}
      inert={!open}
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink/45 backdrop-blur-[2px] transition-opacity duration-300",
          shown ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "absolute flex flex-col overflow-hidden bg-cream shadow-2xl transition-[translate,scale,opacity] duration-300 ease-(--ease-soft)",
          panelBase[side],
          !shown && panelHidden[side],
          className,
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-4 px-5 pt-4",
            hideTitle ? "absolute end-0 top-0 z-10 px-3 pt-3" : "border-b border-gold/25 pb-3",
          )}
        >
          {!hideTitle && <h2 className="font-serif text-2xl">{title}</h2>}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/80 text-ink transition-colors hover:bg-sand"
            aria-label={t("common.close")}
          >
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </div>
        <div className={cn("min-h-0 flex-1 overflow-y-auto overscroll-contain", bodyClassName)}>{children}</div>
      </div>
    </div>
  );
}
