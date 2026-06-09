/**
 * Resizes a canvas to its CSS box using a capped device pixel ratio.
 * Capping DPR keeps fill-rate sane on retina/4K displays.
 * Returns the logical (CSS) width/height the drawing code should use.
 */
export function fitCanvas(canvas, maxDpr = 2) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height, dpr };
}

/**
 * Runs an animation loop that automatically pauses when the tab is hidden
 * or the canvas scrolls fully out of view, and cleans itself up.
 * `draw(t, dt)` receives elapsed seconds and frame delta in seconds.
 */
export function runLoop(canvas, draw, { paused = false } = {}) {
  let raf = 0;
  let last = performance.now();
  let start = last;
  let visible = true;
  let stopped = paused;

  const frame = (now) => {
    if (stopped || !visible) {
      raf = requestAnimationFrame(frame);
      last = now;
      return;
    }
    const dt = Math.min((now - last) / 1000, 0.05);
    const t = (now - start) / 1000;
    last = now;
    draw(t, dt);
    raf = requestAnimationFrame(frame);
  };

  const onVisibility = () => {
    visible = !document.hidden;
    last = performance.now();
  };

  let io;
  if (typeof IntersectionObserver !== "undefined") {
    io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && !document.hidden;
        last = performance.now();
      },
      { threshold: 0 }
    );
    io.observe(canvas);
  }

  document.addEventListener("visibilitychange", onVisibility);
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    document.removeEventListener("visibilitychange", onVisibility);
    if (io) io.disconnect();
  };
}
