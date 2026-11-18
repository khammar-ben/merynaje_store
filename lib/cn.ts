/** Joins class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** True when the classes already set a position (so `relative` must not be added). */
export function hasPosition(className?: string) {
  return /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className ?? "");
}
