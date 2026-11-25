/* Project data - edit this file to add, remove or reorder projects.
   One object per project. Fields: slug, title, category, projectType,
   description, services[], images[], imageAlts[], cardImage, summary,
   lines[], seoTitle, seoDescription, url, cta, diagram[] */
window.PROJECTS = [{
      slug: "accessible-search-demo",
      title: "Accessible Search",
      category: "Live demo",
      projectType: "Independent demo",
      description: `A React demo of accessible search patterns using local sample data. It includes a visible label, helper text, loading, empty, and error states, result announcements, and visible keyboard focus.`,
      services: ["React", "Accessible search", "Keyboard interaction"],
      images: ["img/projects/accessible-search-demo.webp?v=1"],
      imageAlts: [
        "Accessible Search demo showing search results and interface states.",
      ],
      cardImage: "img/projects/accessible-search-work-card.webp?v=1",
      summary: "Accessible search patterns using local sample data.",
      lines: [
        "A query comes in.",
        "Local results are filtered.",
        "States are announced.",
      ],
      seoTitle: "Accessible Search Demo",
      seoDescription:
        "A React demo of accessible search patterns using local sample data.",
      url: "https://rony-890.github.io/react-accessible-search-demo/",
      cta: "Open live demo",
      diagram: ["SEARCH", "LOCAL FILTER", "RESULTS"],
    },
    {
      slug: "assist-ding",
      title: "Assist-Ding",
      category: "Open setup PR",
      projectType: "Independent prototype",
      description: `Open PR #2 sets up the React, Vite, TypeScript, and Tailwind project and a landing-page prototype with hero, features, pricing, and footer sections. The pull request is still open.`,
      services: ["React", "Vite", "TypeScript", "Tailwind CSS"],
      images: ["img/projects/assist-ding-spotlight.webp?v=1"],
      imageAlts: [
        "Assist-Ding illustration showing customer questions flowing into a reply.",
      ],
      cardImage: "img/projects/assist-ding-work-card.webp?v=1",
      summary: "Initial setup and landing-page prototype, shown as an open PR.",
      lines: [
        "React and Vite are set up.",
        "Landing page sections take shape.",
        "The pull request remains open.",
      ],
      seoTitle: "Assist-Ding Setup",
      seoDescription:
        "Initial React, Vite, TypeScript, and Tailwind setup for Assist-Ding.",
      url: "https://github.com/rony-890/assist-ding/pull/2",
      cta: "Review open setup PR",
      diagram: ["HERO", "FEATURES", "PRICING"],
    },
    {
      slug: "aeo-toolkit-contribution",
      title: "AEO Toolkit",
      category: "Merged contribution",
      projectType: "Open-source contribution",
      description: `Merged PR #70 extracted AuditInputCard and normalizeUrl into a separate component and added an AuditInputCard test.`,
      services: ["React", "Component extraction", "Testing"],
      images: [
        "img/projects/aeo-toolkit-test.webp?v=1",
        "img/projects/aeo-toolkit-components.webp?v=13",
      ],
      imageAlts: [
        "AuditInputCard contribution with its added test.",
        "A reusable AEO Toolkit interface component.",
      ],
      cardImage: "img/projects/aeo-toolkit-test.webp?v=1",
      summary: "Extracted the audit input component and added a test.",
      lines: [
        "AuditInputCard is extracted.",
        "URLs get normalized.",
        "A component test is added.",
      ],
      seoTitle: "AEO Toolkit Contribution",
      seoDescription:
        "A merged contribution extracting AuditInputCard and normalizeUrl, with a new test.",
      url: "https://github.com/Advance-Labs/aeo-toolkit/pull/70",
      cta: "Review merged PR",
      diagram: ["INPUT CARD", "NORMALIZE URL", "COMPONENT TEST"],
    },
  ];
