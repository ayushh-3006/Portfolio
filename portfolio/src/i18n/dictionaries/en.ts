/**
 * English dictionary — the source of truth for every visible string.
 *
 * `hi.ts` is typed as `Dictionary` (derived from this object), so the compiler
 * refuses to build if a translation is missing or the shape drifts. That is the
 * whole reason the copy lives here instead of inside components.
 */

export const en = {
  meta: {
    title: "Ayush Kumar Singh — Full-Stack & AI Developer",
    description:
      "Computer Science student and Full-Stack Developer building modern web applications, backend systems, and AI-powered products.",
    keywords: [
      "full-stack developer",
      "backend developer",
      "AI application development",
      "web application development",
      "GenAI developer",
      "MERN stack developer",
      "React developer",
      "Node.js developer",
    ],
  },

  /**
   * Facts about Ayush that are rendered as prose and therefore need
   * translating. The values themselves (phone, email, links) stay in
   * config/site.ts — those are identical in every language.
   */
  profile: {
    role: "Software Engineer & Product Builder",
    availabilityLabel: "Building. Learning. Shipping.",
    availabilityDetail: "",
    locationLabel: "Based in India",
  },

  nav: {
    links: [
      { label: "Home", href: "#top" },
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Skills", href: "#capabilities" },
      { label: "Why Me", href: "#why" },
      { label: "Contact", href: "#contact" },
    ],
    cta: "Resume",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "Switch language",
  },

  hero: {
    headlineA: "Ayush Kumar Singh",
    headlineB: "I build intelligence, then make it beautiful.",
    lede: "You bring the idea. I turn it into software.",
    ctaPrimary: "View My Work",
    ctaSecondary: "Let's Connect →",
    preferToTalk: "Prefer to talk?",
    pipelineDescription:
      "An illustration of how a project moves from an idea to a live product",
    pipelineQuote: "“We're still tracking every order in a spreadsheet.”",
    pipelineQuoteLabel: "The user says",
    pipelineStages: {
      idea: "Idea",
      architecture: "Architecture",
      interface: "Interface",
      code: "Code",
      ai: "AI",
      data: "Data",
      deploy: "Deploy",
      live: "Live",
    },
    pipelineAi: ["Understands", "Retrieves", "Decides", "Responds"],
    pipelineDeploy: [
      "Build passed",
      "Tests passed",
      "Database migrated",
      "Live",
    ],
    pipelineTiles: ["Today", "Open", "Done"],
  },

  trust: {
    text: "Building full-stack products with modern web technologies and AI — from idea to deployment.",
    categories: [
      "FULL STACK",
      "AI / GENAI",
      "BACKEND",
      "REST APIs",
      "MONGODB",
      "DEVOPS",
    ],
  },

  problems: {
    eyebrow: "Sound familiar?",
    title:
      "Most businesses don't need software. They need a problem to stop happening.",
    lede: "Find the one that sounds like your week. That's the conversation worth having.",
    answerLabel: "The answer",
    items: [
      {
        id: "spreadsheets",
        problem: "Still running the business on spreadsheets?",
        solution: "Custom business software",
        detail:
          "Spreadsheets work until two people need the same file, until someone overwrites a column, until nobody can tell which version is current. At that point the spreadsheet isn't saving you money — it's quietly costing you.",
        outcome:
          "One system. One version of the truth. Access that matches roles.",
      },
      {
        id: "manual",
        problem: "Your team keeps doing the same work by hand?",
        solution: "Automation",
        detail:
          "Copying data between systems, re-typing orders, building the same report every Monday. Work that repeats exactly is work that software should be doing — it doesn't get tired and it doesn't make typos at 6pm.",
        outcome: "Hours back every week, and far fewer mistakes.",
      },
      {
        id: "idea",
        problem: "You have an idea but no way to build it?",
        solution: "End-to-end product development",
        detail:
          "You don't need to assemble a team, learn what a backend is, or find three contractors who don't talk to each other. You need one person who can take it from a conversation to something live.",
        outcome: "Idea to working product, with one person accountable.",
      },
      {
        id: "ai",
        problem: "Your customers expect AI-powered experiences?",
        solution: "AI integration",
        detail:
          "Not AI for the press release. AI doing something specific: answering questions from your own documents, reading forms nobody wants to read, handling the first response so your team handles the hard ones.",
        outcome: "AI that removes work instead of adding a demo.",
      },
      {
        id: "fit",
        problem: "Your software doesn't fit how you actually work?",
        solution: "Software built around your process",
        detail:
          "Every business runs its own way. Off-the-shelf tools ask you to change your process to match their assumptions. Sometimes that's fine. When it isn't, the workarounds become the real cost.",
        outcome: "Software that matches your process, not the other way round.",
      },
      {
        id: "scale",
        problem: "What you built quickly can't handle where you're going?",
        solution: "Rebuild & scale",
        detail:
          "The version that got you started is often the version that starts breaking — slow pages, fragile logic, changes that take a week because everything is tangled together.",
        outcome: "A foundation that holds up as the business grows.",
      },
    ],
  },

  projects: {
    eyebrow: "Projects",
    title: "What I Build",
    lede: "A selection of my recent work. Let me know the details of your projects and I will update this section.",
    items: [
      {
        id: "project-1",
        title: "Resume-Pilot-AI",
        description:
          "AI-powered resume platform with ATS analysis, AI-driven resume insights, personalized improvements, and mock interview tools.",
        tags: ["TypeScript", "Next.js", "Node.js", "MongoDB", "Clerk", "Groq API"],
        image: "/resume-pilot-ai.png",
        liveUrl: "https://resume-pilot-ai-gamma.vercel.app/",
        githubUrl: "https://github.com/ayushh-3006/ResumePilot-AI",
      },
      {
        id: "project-2",
        title: "Cravings",
        description:
          "MERN-based food delivery platform where users can browse restaurants, order food, and manage their profiles, with dedicated dashboards for customers, restaurants, riders, and admins.",
        tags: ["React.js", "JavaScript", "Node.js", "Express.js", "Cloudinary", "JWT"],
        image: "/cravings.png",
        liveUrl: "https://craving-house-amber.vercel.app/",
        githubUrl: "https://github.com/ayushh-3006/Food-Delivery-App",
      },
      {
        id: "project-3",
        title: "TalkX",
        description:
          "A real-time MERN chat application with secure authentication, one-to-one messaging and responsive UI. Currently building.",
        tags: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT"],
        image: null,
        liveUrl: null,
        githubUrl: "https://github.com/ayushh-3006/TalkX",
      },
    ],
  },



  capabilities: {
    eyebrow: "Skills",
    title: "The tools I use to build.",
    lede: "A practical stack I've worked with to build full-stack applications, backend services, and AI-powered products.",
    groups: [
      {
        id: "languages",
        label: "Languages",
        headline: "",
        items: ["Java", "JavaScript", "TypeScript", "SQL"],
      },
      {
        id: "frameworks",
        label: "Frameworks",
        headline: "",
        items: ["React", "Next.js", "Node.js", "Express.js"],
      },
      {
        id: "tools",
        label: "Tools",
        headline: "",
        items: ["Git", "GitHub", "Postman", "OAuth 2.0"],
      },
      {
        id: "databases",
        label: "Databases",
        headline: "",
        items: ["MongoDB", "MySQL"],
      },
      {
        id: "ai",
        label: "AI / ML",
        headline: "",
        items: ["Generative AI", "LLM APIs"],
      },
    ],
  },



  whyMe: {
    eyebrow: "WHY WORK WITH ME",
    title: "One developer.\nBuilt across the stack.",
    lede: "I work across the frontend, backend, databases, and AI to build complete products instead of focusing on just one layer of the stack.",
    kicker: "",
    items: [
      {
        title: "Full-stack perspective",
        body: "I understand how the pieces connect — from the interface and APIs to databases, authentication, and AI integrations.",
      },
      {
        title: "Build with purpose",
        body: "I focus on solving the actual problem first, then choose the technologies and architecture that fit the project.",
      },
      {
        title: "Always learning",
        body: "I continuously improve my backend, DevOps, system design, and AI skills by building and working on real projects.",
      },
    ],
  },



  contact: {
    eyebrow: "Contact",
    title: "Let's Build Something",
    lede: "I'm open to projects, collaborations, and ideas. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
    callLabel: "Call or WhatsApp",
    emailLabel: "Email",
    whatsappCta: "Message me on WhatsApp →",
  },

  /** Labels for the persistent mobile action bar. */
  quickContact: {
    call: "Call",
    whatsapp: "WhatsApp",
    email: "Email",
  },

  finalCta: {
    titleA: "Your next product",
    titleB: "starts with an idea.",
    body: "You already have one. The only thing between it and a working product is a conversation.",
    cta: "Let's Build It",
  },

  footer: {
    tagline:
      "Custom software, web platforms, mobile apps and AI products — built end to end.",
    contactHeading: "Get in touch",
    elsewhereHeading: "Elsewhere",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
};

/**
 * Deliberately not `as const`: literal types here would force every translation
 * to repeat the English strings exactly. Widened types give the shape guarantee
 * (every key present, right kind of value) without constraining the words.
 */
export type Dictionary = typeof en;
