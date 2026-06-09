import { site } from "../data/site.js";
import { Reveal } from "./common/Reveal.jsx";
import { BackToTop } from "./common/BackToTop.jsx";

export function Contact() {
  return (
    <section className="section" id="contact">
      <div className="shell">
        <Reveal className="contact panel">
          <div className="contact__intro">
            <p className="eyebrow">Contact</p>
            <h2 className="contact__title">Let&apos;s build something rigorous</h2>
            <p className="contact__lead">
              Open to collaborations in AI infrastructure, molecular design, genomics,
              trustworthy AI systems, and scientific software.
            </p>
            <ul className="contact__links">
              <li>
                <a href={site.links.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href={site.links.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href={site.links.cvPaper} target="_blank" rel="noreferrer">
                  Computer Vision paper (PDF) ↗
                </a>
              </li>
            </ul>
          </div>

          <form className="contact__form" action={site.formspree} method="POST">
            <label>
              <span>Your email</span>
              <input type="email" name="_replyto" autoComplete="email" required />
            </label>
            <label>
              <span>Your message</span>
              <textarea name="message" rows="5" required />
            </label>
            <button type="submit" className="btn btn--primary">
              Send message
            </button>
          </form>
        </Reveal>

        <BackToTop />
      </div>
    </section>
  );
}
