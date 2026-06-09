import { useEffect, useState } from "react";
import { consoleMetrics } from "../../data/site.js";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

/**
 * A glassy "research console" card with live-looking metric tiles and a
 * faint sweeping readout bar. Decorative; numbers are illustrative.
 */
export function ResearchConsole() {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => setTick((t) => t + 1), 2200);
    return () => clearInterval(id);
  }, [reduced]);

  const active = reduced ? 0 : tick % consoleMetrics.length;

  return (
    <aside className="console panel" aria-label="Research focus console">
      <header className="console__head">
        <span className="console__dot" aria-hidden="true" />
        <span className="label-mono">research_console</span>
        <span className="console__status">live</span>
      </header>
      <ul className="console__grid">
        {consoleMetrics.map((m, i) => (
          <li
            key={m.label}
            className={`console__tile ${i === active ? "is-active" : ""}`}
            data-accent={m.accent}
          >
            <span className="console__value">{m.value}</span>
            <span className="console__label">{m.label}</span>
          </li>
        ))}
      </ul>
      <div className="console__bar" aria-hidden="true">
        <span style={{ width: `${((active + 1) / consoleMetrics.length) * 100}%` }} />
      </div>
    </aside>
  );
}
