// localStorage can throw (private mode, blocked storage): every access is guarded.

export function readStorage<T>(key: string, fallback: T, area: "local" | "session" = "local"): T {
  try {
    const store = area === "local" ? window.localStorage : window.sessionStorage;
    const raw = store.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key: string, value: unknown, area: "local" | "session" = "local") {
  try {
    const store = area === "local" ? window.localStorage : window.sessionStorage;
    store.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable: the site keeps working, nothing is persisted.
  }
}
