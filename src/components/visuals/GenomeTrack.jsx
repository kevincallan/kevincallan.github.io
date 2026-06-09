const ACCENTS = ["var(--violet)", "var(--cyan)", "var(--mint)", "var(--amber)"];

// Deterministic pseudo-random read layout so the track looks like a pileup.
function reads(rows = 5, perRow = 9) {
  const out = [];
  for (let r = 0; r < rows; r += 1) {
    for (let i = 0; i < perRow; i += 1) {
      const seed = (r * 13 + i * 7) % 17;
      out.push({
        row: r,
        left: (i / perRow) * 100 + (seed % 4),
        width: 7 + (seed % 5),
        delay: ((r * perRow + i) % 12) * 0.12,
        accent: ACCENTS[(r + i) % ACCENTS.length],
      });
    }
  }
  return out;
}

const PILEUP = reads();
const EXPRESSION = [78, 42, 91, 60, 33, 70, 88, 50, 64, 96, 28, 55];

/**
 * Genomics visual: a read-pileup track over a genome axis plus an
 * expression-intensity strip suggesting an omics-to-target map.
 */
export function GenomeTrack() {
  return (
    <div className="viz viz--genome" role="img" aria-label="Genome read pileup track and expression intensity strip">
      <div className="genome__axis" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
      <div className="genome__pileup">
        {PILEUP.map((read, i) => (
          <span
            key={i}
            className="genome__read"
            style={{
              top: `${read.row * 18}%`,
              left: `${read.left}%`,
              width: `${read.width}%`,
              background: read.accent,
              animationDelay: `${read.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="genome__expression">
        <span className="label-mono">expression</span>
        <div className="genome__heat">
          {EXPRESSION.map((v, i) => (
            <span
              key={i}
              style={{ opacity: 0.25 + (v / 100) * 0.7, animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
