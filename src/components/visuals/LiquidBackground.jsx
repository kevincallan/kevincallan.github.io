import { useEffect, useRef } from "react";
import { fitCanvas, runLoop } from "../../lib/canvas.js";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

const BLOB_COLORS = [
  [128, 215, 180], // mint
  [127, 214, 231], // cyan
  [199, 165, 255], // violet
  [239, 189, 104], // amber
];

const FLOAT_LABELS = [
  "DataPype",
  "agents",
  "omics",
  "retrieval",
  "screening",
  "integrity",
  "RDKit",
  "RNA-seq",
];

/**
 * Full-bleed liquid biotech background: soft mesh-gradient blobs drifting and
 * breathing, with a layer of molecular bonds / network edges and floating
 * scientific labels. Falls back to a static gradient under reduced motion.
 */
export function LiquidBackground() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let geo = fitCanvas(canvas, 1.6);
    let { ctx, width, height } = geo;

    const rand = (a, b) => a + Math.random() * (b - a);

    const blobs = BLOB_COLORS.map((color, i) => ({
      color,
      x: rand(0.15, 0.85),
      y: rand(0.1, 0.7),
      r: rand(0.28, 0.46),
      speed: rand(0.05, 0.12),
      phase: (i / BLOB_COLORS.length) * Math.PI * 2,
      ox: rand(0, Math.PI * 2),
      oy: rand(0, Math.PI * 2),
    }));

    // Molecular / network nodes drifting in front of the blobs.
    const NODE_COUNT = 26;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: rand(-0.012, 0.012),
      vy: rand(-0.012, 0.012),
      r: rand(1.4, 3),
    }));

    const labels = FLOAT_LABELS.map((text, i) => ({
      text,
      x: rand(0.08, 0.92),
      y: rand(0.12, 0.88),
      drift: rand(0.01, 0.03),
      phase: i * 1.3,
    }));

    const resize = () => {
      geo = fitCanvas(canvas, 1.6);
      ctx = geo.ctx;
      width = geo.width;
      height = geo.height;
    };
    window.addEventListener("resize", resize);

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      drawBlobs(0);
      drawMolecules(0, true);
    };

    const drawBlobs = (t) => {
      ctx.globalCompositeOperation = "lighter";
      blobs.forEach((b) => {
        const cx = (b.x + Math.cos(t * b.speed + b.ox) * 0.06) * width;
        const cy = (b.y + Math.sin(t * b.speed + b.oy) * 0.06) * height;
        const breathe = 1 + Math.sin(t * 0.5 + b.phase) * 0.08;
        const radius = b.r * Math.min(width, height) * breathe;
        const [r, g, bl] = b.color;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${bl}, 0.22)`);
        grad.addColorStop(0.5, `rgba(${r}, ${g}, ${bl}, 0.08)`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";
    };

    const drawMolecules = (dt, frozen) => {
      const pts = nodes.map((n) => {
        if (!frozen) {
          n.x += n.vx * dt;
          n.y += n.vy * dt;
          if (n.x < 0 || n.x > 1) n.vx *= -1;
          if (n.y < 0 || n.y > 1) n.vy *= -1;
          n.x = Math.max(0, Math.min(1, n.x));
          n.y = Math.max(0, Math.min(1, n.y));
        }
        return { px: n.x * width, py: n.y * height, r: n.r };
      });

      // Bonds between nearby nodes.
      const maxDist = Math.min(width, height) * 0.22;
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i += 1) {
        for (let j = i + 1; j < pts.length; j += 1) {
          const dx = pts[i].px - pts[j].px;
          const dy = pts[i].py - pts[j].py;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.16;
            ctx.strokeStyle = `rgba(128, 215, 180, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(pts[i].px, pts[i].py);
            ctx.lineTo(pts[j].px, pts[j].py);
            ctx.stroke();
          }
        }
      }
      pts.forEach((p) => {
        ctx.fillStyle = "rgba(127, 214, 231, 0.5)";
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawLabels = (t) => {
      ctx.font = "600 11px 'JetBrains Mono', monospace";
      labels.forEach((l) => {
        const y = (l.y + Math.sin(t * l.drift * 8 + l.phase) * 0.01) * height;
        ctx.fillStyle = "rgba(169, 183, 178, 0.22)";
        ctx.fillText(l.text, l.x * width, y);
      });
    };

    if (reduced) {
      drawStatic();
      return () => window.removeEventListener("resize", resize);
    }

    const stop = runLoop(canvas, (t, dt) => {
      ctx.clearRect(0, 0, width, height);
      drawBlobs(t);
      drawMolecules(dt, false);
      drawLabels(t);
    });

    return () => {
      stop();
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="liquid-canvas" aria-hidden="true" />;
}
