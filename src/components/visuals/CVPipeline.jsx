import { useEffect, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion.js";

const FEATURES = ["HoG", "LBP", "SIFT", "C3D", "Fc7", "captions"];

/**
 * Computer-vision memorability visual: video frames with face-detection
 * boxes flowing into feature vectors and a predicted memorability meter.
 */
export function CVPipeline() {
  const reduced = useReducedMotion();
  const [score, setScore] = useState(reduced ? 74 : 30);

  useEffect(() => {
    if (reduced) return undefined;
    const targets = [74, 58, 81, 66];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % targets.length;
      setScore(targets[i]);
    }, 2400);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="viz viz--cv" role="img" aria-label="Video frames with face detection feeding feature vectors and a memorability score meter">
      <div className="cv__frames">
        {[0, 1, 2].map((f) => (
          <div className="cv__frame" key={f} style={{ animationDelay: `${f * 0.4}s` }}>
            <span className="cv__face" style={{ left: `${20 + f * 12}%`, top: `${28 + f * 8}%` }} />
            <span className="cv__scan" />
          </div>
        ))}
      </div>

      <div className="cv__features">
        {FEATURES.map((feat, i) => (
          <span key={feat} className="cv__feature" style={{ animationDelay: `${i * 0.12}s` }}>
            {feat}
          </span>
        ))}
      </div>

      <div className="cv__meter">
        <span className="label-mono">memorability</span>
        <div className="cv__gauge">
          <div className="cv__gauge-fill" style={{ width: `${score}%` }} />
        </div>
        <span className="cv__value">{score}</span>
      </div>
    </div>
  );
}
