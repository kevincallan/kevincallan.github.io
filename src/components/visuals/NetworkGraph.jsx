// Two suspicious clusters plus scattered benign nodes — an illustrative
// coordinated-manipulation graph. Positions are fixed and decorative.
const NODES = [
  { id: 0, x: 24, y: 30, cluster: "a" },
  { id: 1, x: 32, y: 22, cluster: "a" },
  { id: 2, x: 18, y: 42, cluster: "a" },
  { id: 3, x: 34, y: 44, cluster: "a" },
  { id: 4, x: 26, y: 52, cluster: "a" },
  { id: 5, x: 70, y: 64, cluster: "b" },
  { id: 6, x: 78, y: 54, cluster: "b" },
  { id: 7, x: 64, y: 54, cluster: "b" },
  { id: 8, x: 74, y: 74, cluster: "b" },
  { id: 9, x: 50, y: 18, cluster: "none" },
  { id: 10, x: 88, y: 28, cluster: "none" },
  { id: 11, x: 52, y: 80, cluster: "none" },
  { id: 12, x: 14, y: 70, cluster: "none" },
];

const EDGES = [
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [0, 3],
  [5, 6], [5, 7], [6, 8], [7, 8], [5, 8],
];

const accentFor = (c) => (c === "a" ? "var(--rose)" : c === "b" ? "var(--amber)" : "var(--faint)");

/**
 * Network graph highlighting two coordinated clusters against benign nodes.
 */
export function NetworkGraph() {
  return (
    <div className="viz viz--network" role="img" aria-label="Network graph with two highlighted coordinated clusters">
      <svg viewBox="0 0 100 90" preserveAspectRatio="xMidYMid meet">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            className="network__edge"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
        {NODES.map((n) => (
          <circle
            key={n.id}
            cx={n.x}
            cy={n.y}
            r={n.cluster === "none" ? 1.8 : 2.8}
            fill={accentFor(n.cluster)}
            className={`network__node ${n.cluster !== "none" ? "is-flagged" : ""}`}
            style={{ animationDelay: `${n.id * 0.12}s` }}
          />
        ))}
      </svg>
      <div className="network__legend">
        <span><i style={{ background: "var(--rose)" }} /> cluster A</span>
        <span><i style={{ background: "var(--amber)" }} /> cluster B</span>
        <span><i style={{ background: "var(--faint)" }} /> benign</span>
      </div>
    </div>
  );
}
