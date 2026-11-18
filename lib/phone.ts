/**
 * Validates a Moroccan mobile/landline number.
 * Accepts 05/06/07 + 8 digits, +212 / 00212 + 9 digits. Spaces, dots and dashes are ignored.
 * Returns a normalized number (e.g. "0612345678" or "+212612345678"), or null if invalid.
 */
export function normalizeMoroccanPhone(input: string): string | null {
  const s = input.replace(/[\s.\-()]/g, "");
  if (/^0[5-7]\d{8}$/.test(s)) return s;
  if (/^\+212[5-7]\d{8}$/.test(s)) return s;
  if (/^00212[5-7]\d{8}$/.test(s)) return `+${s.slice(2)}`;
  return null;
}
