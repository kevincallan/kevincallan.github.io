import { timeline } from "../data/timeline.js";
import { Reveal } from "./common/Reveal.jsx";
import { BackToTop } from "./common/BackToTop.jsx";

export function Timeline() {
  return (
    <section className="section" id="timeline">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Career timeline</p>
          <h2 className="section-title">Reverse-chronological</h2>
          <p className="section-lead">
            From current AI systems and molecular-design research back through Meta-scale
            integrity analytics to quantitative research and earlier foundations.
          </p>
        </Reveal>

        <div className="timeline">
          {timeline.map((era, i) => (
            <Reveal as="div" key={era.period} delay={i * 70} className="timeline__era" data-accent={era.accent}>
              <div className="timeline__period">
                <span className="timeline__dot" aria-hidden="true" />
                <span>{era.period}</span>
              </div>
              <div className="timeline__entries">
                {era.entries.map((entry) => (
                  <div className="timeline__entry panel" key={`${entry.role}-${entry.org}`}>
                    <h3 className="timeline__role">{entry.role}</h3>
                    <p className="timeline__org">{entry.org}</p>
                    <p className="timeline__detail">{entry.detail}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <BackToTop />
      </div>
    </section>
  );
}
