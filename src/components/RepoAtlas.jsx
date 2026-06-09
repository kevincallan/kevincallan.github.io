import { useEffect, useMemo, useRef, useState } from "react";
import { categories, projects } from "../data/projects.js";
import { Reveal } from "./common/Reveal.jsx";
import { BackToTop } from "./common/BackToTop.jsx";
import { fitCanvas, runLoop } from "../lib/canvas.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";

const ACCENT_RGB = {
  cyan: [127, 214, 231],
  mint: [128, 215, 180],
  amber: [239, 189, 104],
  violet: [199, 165, 255],
  rose: [240, 143, 147],
  muted: [111, 128, 123],
};

const accentVar = (a) => `var(--${a === "muted" ? "faint" : a})`;

function clusterCenters() {
  // Spread category cluster centres around the canvas (normalised 0..1).
  const centres = {};
  categories.forEach((cat, i) => {
    const angle = (i / categories.length) * Math.PI * 2 - Math.PI / 2;
    centres[cat.id] = {
      x: 0.5 + Math.cos(angle) * 0.32,
      y: 0.5 + Math.sin(angle) * 0.34,
    };
  });
  return centres;
}

function buildNodes() {
  const centres = clusterCenters();
  const counts = {};
  return projects.map((p) => {
    const c = centres[p.category];
    const idx = counts[p.category] || 0;
    counts[p.category] = idx + 1;
    const ring = 0.06 + (idx % 4) * 0.03;
    const a = idx * 2.39996; // golden-angle spread within the cluster
    const cat = categories.find((x) => x.id === p.category);
    return {
      project: p,
      accent: cat ? cat.accent : "muted",
      bx: c.x + Math.cos(a) * ring,
      by: c.y + Math.sin(a) * ring,
      phase: Math.random() * Math.PI * 2,
    };
  });
}

export function RepoAtlas() {
  const reduced = useReducedMotion();
  const canvasRef = useRef(null);
  const [active, setActive] = useState("all");
  const [hover, setHover] = useState(null);

  const nodes = useMemo(() => buildNodes(), []);
  const activeRef = useRef(active);
  activeRef.current = active;

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    let geo = fitCanvas(canvas, 2);
    let { ctx, width, height } = geo;
    const positions = nodes.map((n) => ({ ...n, x: n.bx * width, y: n.by * height }));

    const place = () => {
      positions.forEach((p) => {
        p.x = p.bx * width;
        p.y = p.by * height;
      });
    };

    const resize = () => {
      geo = fitCanvas(canvas, 2);
      ctx = geo.ctx;
      width = geo.width;
      height = geo.height;
      place();
    };
    window.addEventListener("resize", resize);

    let hoverIndex = -1;
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let best = -1;
      let bestD = 18;
      positions.forEach((p, i) => {
        const d = Math.hypot(p.x - mx, p.y - my);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      hoverIndex = best;
      if (best >= 0) {
        // Keep the card inside the panel: clamp x, and flip below the node
        // when it is too close to the top to render above.
        const clampedX = Math.max(140, Math.min(rect.width - 140, mx));
        const below = my < 150;
        setHover({ project: positions[best].project, x: clampedX, y: my, below });
        canvas.style.cursor = "pointer";
      } else {
        setHover(null);
        canvas.style.cursor = "default";
      }
    };
    const onLeave = () => {
      hoverIndex = -1;
      setHover(null);
    };
    const onClick = () => {
      if (hoverIndex >= 0) {
        window.open(positions[hoverIndex].project.url, "_blank", "noreferrer");
      }
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);

    const isOn = (p) => activeRef.current === "all" || p.project.category === activeRef.current;

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);

      // Cluster edges (same category, dimmed when filtered out).
      for (let i = 0; i < positions.length; i += 1) {
        for (let j = i + 1; j < positions.length; j += 1) {
          if (positions[i].project.category !== positions[j].project.category) continue;
          const d = Math.hypot(positions[i].x - positions[j].x, positions[i].y - positions[j].y);
          if (d > Math.min(width, height) * 0.3) continue;
          const on = isOn(positions[i]);
          const [r, g, b] = ACCENT_RGB[positions[i].accent];
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${on ? 0.18 : 0.04})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(positions[i].x, positions[i].y);
          ctx.lineTo(positions[j].x, positions[j].y);
          ctx.stroke();
        }
      }

      positions.forEach((p, i) => {
        const drift = reduced ? 0 : Math.sin(t * 0.6 + p.phase) * 3;
        const x = p.x + drift;
        const y = p.y + (reduced ? 0 : Math.cos(t * 0.5 + p.phase) * 3);
        const on = isOn(p);
        const hovered = i === hoverIndex;
        const [r, g, b] = ACCENT_RGB[p.accent];
        const base = p.project.visibility === "private" ? 0.5 : 0.95;
        const alpha = on ? base : 0.12;
        const radius = (hovered ? 7 : 4) * (on ? 1 : 0.8);

        if (on) {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, radius * 4);
          glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${hovered ? 0.4 : 0.18})`);
          glow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, radius * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        if (p.project.visibility === "private" && on) {
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(x, y, radius + 2.5, 0, Math.PI * 2);
          ctx.stroke();
        }
        positions[i].rx = x;
        positions[i].ry = y;
      });
    };

    const stop = reduced
      ? (draw(0), () => {})
      : runLoop(canvas, (t) => draw(t));
    if (reduced) draw(0);

    return () => {
      if (typeof stop === "function") stop();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, [nodes, reduced]);

  return (
    <section className="section" id="atlas">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Repo atlas</p>
          <h2 className="section-title">A decade of repositories, mapped</h2>
          <p className="section-lead">
            Public and private repositories grouped by domain. Hover a node to preview it;
            private repositories are shown as summaries only. Use the filters or browse the
            cards below.
          </p>
        </Reveal>

        <Reveal className="atlas__filters" role="group" aria-label="Filter repositories by domain">
          <button
            type="button"
            className={`atlas__pill ${active === "all" ? "is-active" : ""}`}
            onClick={() => setActive("all")}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`atlas__pill ${active === cat.id ? "is-active" : ""}`}
              style={{ "--accent": accentVar(cat.accent) }}
              onClick={() => setActive(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </Reveal>

        <Reveal className="atlas__canvas-wrap panel">
          <canvas ref={canvasRef} className="atlas__canvas" aria-hidden="true" />
          {hover && (
            <div
              className={`atlas__tooltip ${hover.below ? "atlas__tooltip--below" : ""}`}
              style={{ left: hover.x, top: hover.y }}
              role="status"
            >
              <strong>{hover.project.name}</strong>
              <span>{hover.project.summary}</span>
              <em>{hover.project.visibility === "private" ? "private — summary only" : "public"}</em>
            </div>
          )}
          <p className="atlas__hint label-mono">interactive · hover or tap a card</p>
        </Reveal>

        <div className="atlas__grid">
          {filtered.map((p) => {
            const cat = categories.find((c) => c.id === p.category);
            return (
              <Reveal
                as="a"
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="atlas__card panel"
                data-accent={cat ? cat.accent : "muted"}
              >
                <div className="atlas__card-top">
                  <span className="atlas__card-name">{p.name}</span>
                  <span className={`atlas__vis atlas__vis--${p.visibility}`}>{p.visibility}</span>
                </div>
                <p className="atlas__card-summary">{p.summary}</p>
                <p className="atlas__card-why">{p.why}</p>
                {p.visibility === "private" && (
                  <p className="atlas__card-private">private repo — public summary only</p>
                )}
                <ul className="atlas__card-tags">
                  {p.stack.map((s) => (
                    <li key={s} className="tag">
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <BackToTop />
      </div>
    </section>
  );
}
