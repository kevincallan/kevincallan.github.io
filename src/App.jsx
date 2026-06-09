import { Nav } from "./components/Nav.jsx";
import { Hero } from "./components/Hero.jsx";
import { Focus } from "./components/Focus.jsx";
import { CaseStudies } from "./components/CaseStudies.jsx";
import { RepoAtlas } from "./components/RepoAtlas.jsx";
import { Research } from "./components/Research.jsx";
import { Timeline } from "./components/Timeline.jsx";
import { Skills } from "./components/Skills.jsx";
import { Contact } from "./components/Contact.jsx";
import { Footer } from "./components/Footer.jsx";
import "./App.css";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Focus />
        <CaseStudies />
        <RepoAtlas />
        <Research />
        <Timeline />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
