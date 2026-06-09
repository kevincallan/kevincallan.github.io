const STAGES = [
  { id: "input", label: "Input", accent: "var(--cyan)" },
  { id: "prep", label: "Ligand prep", accent: "var(--cyan)" },
  { id: "dock", label: "Docking", accent: "var(--mint)" },
  { id: "shape", label: "Shape", accent: "var(--mint)" },
  { id: "pharm", label: "Pharmacophore", accent: "var(--violet)" },
  { id: "consensus", label: "Consensus", accent: "var(--amber)" },
  { id: "shortlist", label: "Shortlist", accent: "var(--rose)" },
];

const COMPOUNDS = [
  { id: "CMP-014", score: 96, accent: "var(--mint)" },
  { id: "CMP-227", score: 91, accent: "var(--cyan)" },
  { id: "CMP-008", score: 84, accent: "var(--cyan)" },
  { id: "CMP-193", score: 77, accent: "var(--violet)" },
  { id: "CMP-051", score: 68, accent: "var(--amber)" },
];

/**
 * Animated virtual-screening pipeline: stages connected by a flowing line,
 * plus a ranked-compounds waterfall. SVG + CSS only.
 */
export function PipelineDiagram() {
  return (
    <div className="viz viz--pipeline" role="img" aria-label="Virtual screening pipeline from input to shortlist, with a ranked compounds table">
      <div className="pipeline__flow">
        {STAGES.map((stage, i) => (
          <div className="pipeline__stage" key={stage.id} style={{ "--accent": stage.accent }}>
            <span className="pipeline__node" style={{ animationDelay: `${i * 0.18}s` }}>
              <span className="pipeline__pulse" />
            </span>
            <span className="pipeline__label">{stage.label}</span>
            {i < STAGES.length - 1 && <span className="pipeline__edge" aria-hidden="true" />}
          </div>
        ))}
      </div>

      <div className="pipeline__waterfall">
        <span className="label-mono">ranked compounds</span>
        <ul>
          {COMPOUNDS.map((c, i) => (
            <li key={c.id} style={{ "--accent": c.accent }}>
              <span className="pipeline__cid">{c.id}</span>
              <span className="pipeline__track">
                <span
                  className="pipeline__fill"
                  style={{ width: `${c.score}%`, animationDelay: `${i * 0.12}s` }}
                />
              </span>
              <span className="pipeline__score">{c.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
