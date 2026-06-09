import { site } from "../data/site.js";
import { LiquidBackground } from "./visuals/LiquidBackground.jsx";

const CTAS = [
  { label: "View selected work", href: "#work", primary: true },
  { label: "Research & publications", href: "#research" },
  { label: "GitHub", href: site.links.github, external: true },
  { label: "LinkedIn", href: site.links.linkedin, external: true },
  { label: "Contact", href: "#contact" },
];

export function Hero() {
  return (
    <section className="hero" id="hero">
      <LiquidBackground />
      <div className="hero__grid shell">
        <div className="hero__copy">
          <p className="eyebrow">Research &amp; engineering portfolio</p>
          <h1 className="hero__name">{site.name}</h1>
          <p className="hero__tagline">{site.tagline}</p>
          <p className="hero__intro">{site.intro}</p>
          <ul className="hero__ctas">
            {CTAS.map((cta) => (
              <li key={cta.label}>
                <a
                  href={cta.href}
                  className={`btn ${cta.primary ? "btn--primary" : "btn--ghost"}`}
                  {...(cta.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {cta.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <a className="hero__scroll" href="#focus" aria-label="Scroll to current focus">
        <span className="label-mono">scroll</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
