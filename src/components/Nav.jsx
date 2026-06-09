import { useEffect, useState } from "react";
import { navItems, site } from "../data/site.js";
import { applyTheme, getInitialTheme } from "../lib/theme.js";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
  };

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav__inner shell">
        <a href="#main" className="nav__brand" onClick={close}>
          <span className="nav__mark" aria-hidden="true" />
          Kevin Callan
        </a>

        <nav id="nav-menu" className={`nav__menu ${open ? "is-open" : ""}`} aria-label="Primary">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="nav__cta"
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            onClick={close}
          >
            GitHub
          </a>
        </nav>

        <div className="nav__controls">
          <button
            type="button"
            className="nav__theme"
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            <span className="visually-hidden">
              {theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            </span>
            <span aria-hidden="true">{theme === "light" ? "◐" : "◑"}</span>
          </button>

          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="visually-hidden">Toggle menu</span>
            <span className={`nav__burger ${open ? "is-open" : ""}`} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
