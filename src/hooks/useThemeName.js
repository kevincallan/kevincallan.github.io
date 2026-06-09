import { useEffect, useState } from "react";

const read = () =>
  (typeof document !== "undefined" &&
    document.documentElement.getAttribute("data-theme")) ||
  "light";

/** Reactively tracks the document's data-theme attribute (light | dark). */
export function useThemeName() {
  const [theme, setTheme] = useState(read);

  useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() => setTheme(read()));
    observer.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}
