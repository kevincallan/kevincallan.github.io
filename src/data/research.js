import { site } from "./site.js";

export const researchItems = [
  {
    type: "MSc dissertation",
    accent: "violet",
    title: "Transcriptomic and Gene Network Target Prioritisation for Virtual Screening of Small-Molecule Modulators in Neurodegeneration",
    venue: "MSc in Genomic Medicine, Trinity College Dublin · 2026",
    detail:
      "Awarded a distinction. I combined gene expression, gene network analysis, and virtual screening to study five proteins linked to neurodegeneration. TBK1 ranked highest in the network analysis, while SIGMAR1 showed the clearest agreement across screening methods.",
    href: site.links.dissertation,
    hrefLabel: "Read the dissertation (PDF)",
    companion: { label: "Explore the interactive study", href: site.links.dissertationApp },
  },
  {
    type: "Talk",
    accent: "mint",
    title: "Better Prompts & Better Evals",
    venue: "AI Tinkerers Dublin · November 2024",
    detail:
      "Practical strategies for prompt design and evaluation, with lessons drawn from content moderation, code generation, and biochemical research. A follow-on demo was recorded at the January 2026 AI Tinkerers Dublin meetup.",
    href: "https://dublin.aitinkerers.org/talks/rsvp_fMcKWUsjZY8",
    hrefLabel: "View the talk",
  },
  {
    type: "Student / research paper",
    accent: "amber",
    title:
      "Building an Artificial Intelligence System to Detect Human Faces in Video & Predict Video Memorability",
    venue: "MSc Computing & Data Analytics, Dublin City University",
    detail:
      "MediaEval media-memorability task over 10,000 short silent videos, testing the hypothesis that the presence of a human face increases memorability. Engineered face-recognition features and Spearman rank correlation against short- and long-term memorability targets.",
    href: "/Kevin Callan Computer Vision Paper.pdf",
    hrefLabel: "Read the paper (PDF)",
  },
  {
    type: "Research artefacts",
    accent: "cyan",
    title: "DataPype technical documentation",
    venue: "DCU Molecular Design Group",
    detail:
      "Documentation and technical artefacts for the target-agnostic virtual screening pipeline. Public summary only; private code where applicable.",
    href: "https://github.com/kevincallan/datapype-ui",
    hrefLabel: "Public benchmark dashboard",
  },
];

// Publicly verifiable references (links that resolve on the open web).
export const verifiedReferences = [
  {
    label: "AI Tinkerers Dublin — \"Better Prompts & Better Evals\" talk",
    href: "https://dublin.aitinkerers.org/talks/rsvp_fMcKWUsjZY8",
  },
  {
    label: "AI Tinkerers Dublin — January 2026 recorded demos",
    href: "https://dublin.aitinkerers.org/",
  },
  {
    label: "Computer Vision paper (MSc research, DCU) — PDF",
    href: "/Kevin Callan Computer Vision Paper.pdf",
  },
];
