import { site } from "../data/site.js";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <p className="footer__name">Kevin Callan</p>
        <p className="footer__tag">{site.tagline}</p>
        <ul className="footer__links">
          <li>
            <a href={site.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
        <p className="footer__fine label-mono">© {year} · kevincallan.dev · built with React + Vite</p>
      </div>
    </footer>
  );
}
