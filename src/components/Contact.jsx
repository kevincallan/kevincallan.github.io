import { useState } from "react";
import { site } from "../data/site.js";
import { Reveal } from "./common/Reveal.jsx";
import { BackToTop } from "./common/BackToTop.jsx";

export function Contact() {
  // "idle" | "sending" | "success" | "error"
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(site.formspree, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section" id="contact">
      <div className="shell">
        <Reveal className="contact panel">
          <div className="contact__intro">
            <p className="eyebrow">Contact</p>
            <h2 className="contact__title">Let&apos;s build</h2>
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

          {status === "success" ? (
            <div className="contact__sent" role="status">
              <span className="contact__sent-mark" aria-hidden="true">
                ✓
              </span>
              <h3>Message sent</h3>
              <p>Thanks for reaching out — I&apos;ll get back to you soon.</p>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setStatus("idle")}
              >
                Send another
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <label>
                <span>Your email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label>
                <span>Your message</span>
                <textarea name="message" rows="5" required />
              </label>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              {status === "error" && (
                <p className="contact__error" role="alert">
                  Something went wrong — please email{" "}
                  <a href={`mailto:${site.email}`}>{site.email}</a> instead.
                </p>
              )}
            </form>
          )}
        </Reveal>

        <BackToTop />
      </div>
    </section>
  );
}
