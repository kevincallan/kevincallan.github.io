import { skillClusters } from "../data/skills.js";
import { Reveal } from "./common/Reveal.jsx";
import { BackToTop } from "./common/BackToTop.jsx";

export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Systems map</p>
          <h2 className="section-title">Skills as a connected system</h2>
          <p className="section-lead">
            Not a flat list — clusters that feed each other, from AI engineering and data science
            through scientific computing, genomics, and trust &amp; safety.
          </p>
        </Reveal>

        <div className="skills__grid">
          {skillClusters.map((cluster, i) => (
            <Reveal
              as="article"
              key={cluster.id}
              delay={i * 60}
              className="skills__cluster panel"
              data-accent={cluster.accent}
            >
              <h3 className="skills__cluster-title">
                <span className="skills__node" aria-hidden="true" />
                {cluster.label}
              </h3>
              <ul className="skills__list">
                {cluster.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <BackToTop />
      </div>
    </section>
  );
}
