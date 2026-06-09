import { caseStudies } from "../data/caseStudies.js";
import { Reveal } from "./common/Reveal.jsx";
import { BackToTop } from "./common/BackToTop.jsx";
import { PipelineDiagram } from "./visuals/PipelineDiagram.jsx";
import { AgentGraph } from "./visuals/AgentGraph.jsx";
import { GenomeTrack } from "./visuals/GenomeTrack.jsx";
import { NetworkGraph } from "./visuals/NetworkGraph.jsx";
import { CVPipeline } from "./visuals/CVPipeline.jsx";

const VISUALS = {
  pipeline: PipelineDiagram,
  agent: AgentGraph,
  genome: GenomeTrack,
  network: NetworkGraph,
  vision: CVPipeline,
};

function CaseStudy({ study, index }) {
  const Visual = VISUALS[study.visual];
  const flip = index % 2 === 1;

  return (
    <Reveal
      as="article"
      className={`case ${flip ? "case--flip" : ""} ${study.flagship ? "case--flagship" : ""}`}
      data-accent={study.accent}
    >
      <div className="case__body">
        <div className="case__meta">
          <span className="label-mono">{study.kicker}</span>
          {study.flagship && <span className="case__star">Flagship</span>}
        </div>
        <h3 className="case__title">{study.title}</h3>
        <p className="case__subtitle">{study.subtitle}</p>
        <p className="case__affiliation">{study.affiliation}</p>
        <p className="case__summary">{study.summary}</p>

        <ul className="case__points">
          {study.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>

        <div className="case__metrics">
          {study.metrics.map((m) => (
            <div className="case__badge" key={m.label}>
              <span className="case__badge-value">{m.value}</span>
              <span className="case__badge-label">{m.label}</span>
            </div>
          ))}
        </div>

        {study.disclaimer && <p className="case__disclaimer">{study.disclaimer}</p>}
        {study.note && <p className="case__note">{study.note}</p>}

        {study.links.length > 0 && (
          <ul className="case__links">
            {study.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
                {!link.public && <span className="case__private">private repo — public summary only</span>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="case__visual">
        <div className="case__visual-frame panel">{Visual && <Visual />}</div>
      </div>
    </Reveal>
  );
}

export function CaseStudies() {
  return (
    <section className="section" id="work">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Selected work</p>
          <h2 className="section-title">Featured case studies</h2>
          <p className="section-lead">
            Five strands of work, newest first — from a flagship virtual-screening
            pipeline to an early computer-vision research artefact.
          </p>
        </Reveal>

        <div className="case__list">
          {caseStudies.map((study, i) => (
            <CaseStudy study={study} index={i} key={study.id} />
          ))}
        </div>

        <BackToTop />
      </div>
    </section>
  );
}
