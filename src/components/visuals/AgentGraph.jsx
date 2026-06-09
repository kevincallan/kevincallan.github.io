const STEPS = [
  { id: "query", label: "Query", x: 12, y: 50 },
  { id: "retrieve", label: "Retrieve", x: 34, y: 24 },
  { id: "reason", label: "Reason", x: 56, y: 64 },
  { id: "evaluate", label: "Evaluate", x: 78, y: 30 },
  { id: "answer", label: "Answer", x: 92, y: 60 },
];

const EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [2, 1],
  [3, 2],
];

/**
 * Agent trace graph: query -> retrieve -> reason -> evaluate -> answer with a
 * travelling signal pulse along the path.
 */
export function AgentGraph() {
  const pt = (i) => STEPS[i];
  return (
    <div className="viz viz--agent" role="img" aria-label="Agent trace from query through retrieve, reason, evaluate, to answer">
      <svg viewBox="0 0 100 90" preserveAspectRatio="none" className="agent__svg">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={pt(a).x}
            y1={pt(a).y}
            x2={pt(b).x}
            y2={pt(b).y}
            className="agent__edge"
          />
        ))}
        <circle r="1.6" className="agent__signal">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto"
            path="M12,50 L34,24 L56,64 L78,30 L92,60" />
        </circle>
        {STEPS.map((s, i) => (
          <g key={s.id} className="agent__node" style={{ animationDelay: `${i * 0.3}s` }}>
            <circle cx={s.x} cy={s.y} r="3.4" />
          </g>
        ))}
      </svg>
      <div className="agent__labels">
        {STEPS.map((s) => (
          <span
            key={s.id}
            className="agent__tag"
            style={{ left: `${s.x}%`, top: `${(s.y / 90) * 100}%` }}
          >
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
