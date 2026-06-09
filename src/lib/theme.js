const STORAGE_KEY = "kc-theme";

/** Resolve the initial theme: saved choice first, then default to light. */
export function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* ignore unavailable storage */
  }
  return "light";
}

export function applyTheme(theme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore unavailable storage */
  }
}
