import { researchItems, verifiedReferences } from "../data/research.js";
import { Reveal } from "./common/Reveal.jsx";
import { BackToTop } from "./common/BackToTop.jsx";

export function Research() {
  return (
    <section className="section" id="research">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Research, writing &amp; talks</p>
          <h2 className="section-title">Papers &amp; technical writing</h2>
          <p className="section-lead">
            Research artefacts and technical writing, labelled honestly by type. Items not yet
            independently verified are listed separately below.
          </p>
        </Reveal>

        <div className="research__grid">
          {researchItems.map((item, i) => (
            <Reveal
              as="article"
              key={item.title}
              delay={i * 80}
              className="research__card panel"
              data-accent={item.accent}
            >
              <span className="research__type label-mono">{item.type}</span>
              <h3 className="research__title">{item.title}</h3>
              <p className="research__venue">{item.venue}</p>
              <p className="research__detail">{item.detail}</p>
              {item.href && (
                <a className="research__link" href={item.href} target="_blank" rel="noreferrer">
                  {item.hrefLabel} <span aria-hidden="true">↗</span>
                </a>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal className="research__verify panel">
          <h3 className="research__verify-title">Verified references</h3>
          <p className="research__verify-lead">
            Every item here resolves on the open web — no unverified placeholders.
          </p>
          <ul>
            {verifiedReferences.map((ref) => (
              <li key={ref.href}>
                <a href={ref.href} target="_blank" rel="noreferrer">
                  {ref.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <BackToTop />
      </div>
    </section>
  );
}
