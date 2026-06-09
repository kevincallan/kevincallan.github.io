import { useEffect, useRef, useState } from "react";

/**
 * Observes an element and reports when it scrolls into view.
 * Once revealed it stays revealed (no re-trigger), which keeps the page calm.
 */
export function useInView(options = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } = options;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
