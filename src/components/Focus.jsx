import { focusAreas } from "../data/focus.js";
import { Reveal } from "./common/Reveal.jsx";
import { BackToTop } from "./common/BackToTop.jsx";

export function Focus() {
  return (
    <section className="section" id="focus">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Current focus</p>
          <h2 className="section-title">Where my work points right now</h2>
          <p className="section-lead">
            Four threads running in parallel — applied AI systems, molecular design,
            genomic medicine, and the analytics of trust at scale.
          </p>
        </Reveal>

        <div className="focus__grid">
          {focusAreas.map((area, i) => (
            <Reveal
              as="article"
              key={area.id}
              delay={i * 90}
              className="focus__card panel"
              data-accent={area.accent}
            >
              <span className="focus__label label-mono">{area.label}</span>
              <h3 className="focus__title">{area.title}</h3>
              <p className="focus__body">{area.body}</p>
              <ul className="focus__tags">
                {area.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
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
