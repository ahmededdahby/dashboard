export type Language = "en" | "fr";

type DemoProject = {
  title: string;
  tag: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
};

type ProfessionalProject = {
  title: string;
  company: string;
  role: string;
  label: string;
  description: string;
  techStack: string[];
};

type ExperienceItem = {
  role: string;
  company: string;
  details: string;
};

type PortfolioContent = {
  profile: {
    name: string;
    title: string;
    location: string;
    imagePath: string;
    tagline: string;
  };
  navItems: Array<{ href: string; label: string }>;
  labels: {
    dark: string;
    light: string;
    toggleTheme: string;
    toggleLanguage: string;
    viewProjects: string;
    contact: string;
    liveDemo: string;
    github: string;
    email: string;
    linkedin: string;
    profileImageHint: string;
  };
  heroHighlights: string[];
  sections: {
    demoProjects: {
      eyebrow: string;
      title: string;
      description: string;
    };
    professionalProjects: {
      eyebrow: string;
      title: string;
      description: string;
    };
    services: {
      eyebrow: string;
      title: string;
      description: string;
    };
    experience: {
      eyebrow: string;
      title: string;
      description: string;
    };
    techStack: {
      eyebrow: string;
      title: string;
      description: string;
    };
    education: {
      eyebrow: string;
      title: string;
      description: string;
    };
    contact: {
      eyebrow: string;
      title: string;
      description: string;
    };
  };
  demoProjects: DemoProject[];
  professionalProjects: ProfessionalProject[];
  services: string[];
  experience: ExperienceItem[];
  education: string[];
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
};

export const portfolioContent: Record<Language, PortfolioContent> = {
  en: {
    profile: {
      name: "Ahmed Eddahby",
      title: "React & .NET Developer",
      location: "Morocco",
      imagePath: "/profile.png",
      tagline:
        "I build and fix modern web applications. Specialized in dashboards, admin panels, and debugging existing systems."
    },
    navItems: [
      { href: "#demo-projects", label: "Demo Projects" },
      { href: "#professional-projects", label: "Professional Projects" },
      { href: "#services", label: "Services" },
      { href: "#experience", label: "Experience" },
      { href: "#contact", label: "Contact" }
    ],
    labels: {
      dark: "Dark",
      light: "Light",
      toggleTheme: "Toggle theme",
      toggleLanguage: "Switch language",
      viewProjects: "View Projects",
      contact: "Contact",
      liveDemo: "Live Demo",
      github: "GitHub",
      email: "Email",
      linkedin: "LinkedIn",
      profileImageHint: "Add your image at public/profile.png"
    },
    heroHighlights: [
      "Dashboards and admin panels",
      "Bug fixing and system improvements",
      "Frontend and backend integration"
    ],
    sections: {
      demoProjects: {
        eyebrow: "Demo Projects",
        title: "Interactive work clients can review immediately",
        description:
          "These projects are built to show product quality fast: live demos, clear interfaces, modern frontend work, and practical full-stack execution."
      },
      professionalProjects: {
        eyebrow: "Professional Projects",
        title: "Real-world work delivered for teams and clients",
        description:
          "This section highlights professional experience where the work mattered, even when the final application cannot be shared publicly."
      },
      services: {
        eyebrow: "Services",
        title: "What I can help you with",
        description:
          "I am most useful when a project needs momentum: a dashboard built, an existing app fixed, or a slow workflow improved."
      },
      experience: {
        eyebrow: "Experience",
        title: "Experience that supports delivery, debugging, and product thinking",
        description:
          "A simple overview of the environments where I have built, improved, and maintained applications."
      },
      techStack: {
        eyebrow: "Tech Stack",
        title: "Tools I use to ship modern products",
        description:
          "No percentage bars, just the technologies I actually use to build dashboards, internal tools, APIs, and maintainable web applications."
      },
      education: {
        eyebrow: "Education",
        title: "Academic background",
        description: "A concise education section that supports the portfolio without turning it into a CV page."
      },
      contact: {
        eyebrow: "Contact",
        title: "Need a dashboard, a fix, or a frontend that feels finished?",
        description:
          "I help freelance clients ship useful interfaces, improve existing systems, and solve React and .NET problems without unnecessary complexity."
      }
    },
    demoProjects: [
      {
        title: "Admin Dashboard",
        tag: "Main project",
        description:
          "Built with React, TypeScript, and ASP.NET Core Web API. Dashboard with analytics, charts, metrics, CRUD operations, filtering, search, form handling, validation, and a realistic admin panel UI.",
        techStack: ["React", "TypeScript", "ASP.NET Core", "Web API"],
        liveUrl: "https://dashboard-five-xi-44.vercel.app/",
        githubUrl: "https://github.com/ahmededdahby/dashboard"
      },
      {
        title: "React Bug Fix & Performance Demo",
        tag: "Problem solving",
        description:
          "Before/after demo of fixing real-world issues, including form validation fixes, API loading and error handling improvements, and optimization of unnecessary re-renders.",
        techStack: ["React", "TypeScript", "Vite", "Debugging"],
        liveUrl: "https://dashboard-146d.vercel.app/",
        githubUrl: "https://github.com/your-username/react-bug-fix-demo"
      },
      {
        title: "Game Catalog App",
        tag: "Frontend app",
        description:
          "React frontend app with filtering system, category and platform filters, responsive UI grid, modern dark UI, and API-based data handling.",
        techStack: ["React", "JavaScript", "API", "Responsive UI"],
        liveUrl: "https://gamestore-ivory.vercel.app/",
        githubUrl: "https://github.com/your-username/game-catalog"
      }
    ],
    professionalProjects: [
      {
        title: "Ministry-related Internal Systems",
        company: "Aleksys Solutions",
        role: "Software Engineer",
        label: "Professional Work",
        description:
          "Worked on real applications including systems related to the Ministry of Interior, developed features, collaborated in a team environment, and handled backend/frontend integration.",
        techStack: ["React", ".NET", "APIs"]
      },
      {
        title: "E-learning Application",
        company: "SQLI",
        role: "Developer / Designer",
        label: "Confidential",
        description:
          "Designed architecture and UI, and worked on frontend implementation and system logic for an e-learning application.",
        techStack: ["Frontend", "UI", "Architecture"]
      },
      {
        title: "Freelance Client Projects",
        company: "Independent Clients",
        role: "Freelance Web Developer",
        label: "Professional Work",
        description:
          "Built and delivered client web applications and full-stack solutions using React and .NET.",
        techStack: ["React", ".NET"]
      }
    ],
    services: [
      "Fix bugs in React / .NET applications",
      "Build admin dashboards and internal tools",
      "Improve performance and user experience",
      "Integrate APIs and backend systems",
      "Maintain and improve existing applications"
    ],
    experience: [
      {
        role: "Software Engineer",
        company: "Aleksys Solutions",
        details:
          "Worked on real applications including systems for the Ministry of Interior, developed features, and collaborated within a team with a focus on scalable backend/frontend integration."
      },
      {
        role: "Freelance Web Developer",
        company: "Independent",
        details:
          "Built web applications and client projects and delivered full-stack solutions using React and .NET."
      },
      {
        role: "E-learning Application",
        company: "SQLI",
        details: "Designed architecture and UI, and worked on frontend and system logic."
      },
      {
        role: "Internship",
        company: "Seomaniak",
        details: "Worked on web development tasks."
      }
    ],
    education: ["ENSAO (Engineering School)", "Bachelor's Degree in Journalism (Oujda)"],
    contact: {
      email: "ahdahby@gmail.com",
      linkedin: "https://www.linkedin.com/in/ahmed-ed-dahby/",
      github: "https://github.com/ahmededdahby"
    }
  },
  fr: {
    profile: {
      name: "Ahmed Eddahby",
      title: "Developpeur React & .NET",
      location: "Maroc",
      imagePath: "/profile.png",
      tagline:
        "Je cree et j'amelore des applications web modernes. Specialise dans les dashboards, les panels d'administration et le debogage de systemes existants."
    },
    navItems: [
      { href: "#demo-projects", label: "Projets Demo" },
      { href: "#professional-projects", label: "Projets Pro" },
      { href: "#services", label: "Services" },
      { href: "#experience", label: "Experience" },
      { href: "#contact", label: "Contact" }
    ],
    labels: {
      dark: "Sombre",
      light: "Clair",
      toggleTheme: "Changer de theme",
      toggleLanguage: "Changer de langue",
      viewProjects: "Voir les projets",
      contact: "Contact",
      liveDemo: "Demo live",
      github: "GitHub",
      email: "Email",
      linkedin: "LinkedIn",
      profileImageHint: "Ajoutez votre image dans public/profile.png"
    },
    heroHighlights: [
      "Dashboards et panels d'administration",
      "Correction de bugs et amelioration de systemes",
      "Integration frontend et backend"
    ],
    sections: {
      demoProjects: {
        eyebrow: "Projets Demo",
        title: "Des projets interactifs que les clients peuvent voir tout de suite",
        description:
          "Ces projets montrent rapidement la qualite du produit : demos live, interfaces claires, frontend moderne et execution full-stack concrete."
      },
      professionalProjects: {
        eyebrow: "Projets Professionnels",
        title: "Du travail reel livre pour des equipes et des clients",
        description:
          "Cette section met en avant des experiences professionnelles ou le travail comptait, meme quand l'application finale ne peut pas etre partagee publiquement."
      },
      services: {
        eyebrow: "Services",
        title: "Ce que je peux vous aider a faire",
        description:
          "Je suis le plus utile quand un projet a besoin d'avancer : construire un dashboard, corriger une application existante ou ameliorer un workflow lent."
      },
      experience: {
        eyebrow: "Experience",
        title: "Une experience qui soutient la livraison, le debogage et la vision produit",
        description:
          "Un apercu simple des environnements dans lesquels j'ai construit, ameliore et maintenu des applications."
      },
      techStack: {
        eyebrow: "Stack Technique",
        title: "Les outils que j'utilise pour livrer des produits modernes",
        description:
          "Pas de barres de pourcentage, seulement les technologies que j'utilise reellement pour construire des dashboards, des outils internes, des APIs et des applications web maintenables."
      },
      education: {
        eyebrow: "Formation",
        title: "Parcours academique",
        description: "Une section formation concise qui soutient le portfolio sans le transformer en CV."
      },
      contact: {
        eyebrow: "Contact",
        title: "Besoin d'un dashboard, d'une correction, ou d'un frontend vraiment fini ?",
        description:
          "J'aide les clients freelance a livrer des interfaces utiles, ameliorer des systemes existants et resoudre des problemes React et .NET sans complexite inutile."
      }
    },
    demoProjects: [
      {
        title: "Admin Dashboard",
        tag: "Projet principal",
        description:
          "Construit avec React, TypeScript et ASP.NET Core Web API. Dashboard avec analytics, graphiques, metriques, operations CRUD, filtres, recherche, gestion de formulaires, validation et interface d'administration realiste.",
        techStack: ["React", "TypeScript", "ASP.NET Core", "Web API"],
        liveUrl: "https://your-demo-url.com/admin-dashboard",
        githubUrl: "https://github.com/ahmededdahby/dashboard"
      },
      {
        title: "React Bug Fix & Performance Demo",
        tag: "Resolution de problemes",
        description:
          "Demo avant/apres de corrections sur des problemes reels, avec validation de formulaire, gestion du loading et des erreurs API, et optimisation des rerenders inutiles.",
        techStack: ["React", "TypeScript", "Vite", "Debugging"],
        liveUrl: "https://your-demo-url.com/react-bug-fix-demo",
        githubUrl: "https://github.com/ahmededdahby/dashboard"
      },
      {
        title: "Game Catalog App",
        tag: "Application frontend",
        description:
          "Application React avec systeme de filtres, filtres par categorie et plateforme, grille responsive, interface moderne sombre et gestion de donnees basee sur API.",
        techStack: ["React", "JavaScript", "API", "Responsive UI"],
        liveUrl: "https://your-demo-url.com/game-catalog",
        githubUrl: "https://github.com/your-username/game-catalog"
      }
    ],
    professionalProjects: [
      {
        title: "Systemes internes lies au ministere",
        company: "Aleksys Solutions",
        role: "Software Engineer",
        label: "Travail professionnel",
        description:
          "Travail sur des applications reelles, notamment des systemes lies au Ministere de l'Interieur, developpement de fonctionnalites, travail en equipe et integration backend/frontend.",
        techStack: ["React", ".NET", "APIs"]
      },
      {
        title: "Application e-learning",
        company: "SQLI",
        role: "Developpeur / Designer",
        label: "Confidentiel",
        description:
          "Conception de l'architecture et de l'UI, avec travail sur l'implementation frontend et la logique du systeme pour une application e-learning.",
        techStack: ["Frontend", "UI", "Architecture"]
      },
      {
        title: "Projets clients freelance",
        company: "Clients independants",
        role: "Developpeur Web Freelance",
        label: "Travail professionnel",
        description:
          "Creation et livraison d'applications web client et de solutions full-stack avec React et .NET.",
        techStack: ["React", ".NET"]
      }
    ],
    services: [
      "Corriger des bugs dans des applications React / .NET",
      "Construire des dashboards d'administration et des outils internes",
      "Ameliorer les performances et l'experience utilisateur",
      "Integrer des APIs et des systemes backend",
      "Maintenir et ameliorer des applications existantes"
    ],
    experience: [
      {
        role: "Software Engineer",
        company: "Aleksys Solutions",
        details:
          "Travail sur des applications reelles, y compris des systemes pour le Ministere de l'Interieur, avec developpement de fonctionnalites et collaboration en equipe autour de l'integration backend/frontend."
      },
      {
        role: "Developpeur Web Freelance",
        company: "Independent",
        details:
          "Creation d'applications web et de projets client, avec livraison de solutions full-stack en React et .NET."
      },
      {
        role: "Application e-learning",
        company: "SQLI",
        details: "Conception de l'architecture et de l'UI, avec travail sur le frontend et la logique systeme."
      },
      {
        role: "Stage",
        company: "Seomaniak",
        details: "Participation a des taches de developpement web."
      }
    ],
    education: ["ENSAO (Ecole d'Ingenieurs)", "Licence en Journalisme (Oujda)"],
    contact: {
      email: "ahdahby@gmail.com",
      linkedin: "https://www.linkedin.com/in/ahmed-ed-dahby/",
      github: "https://github.com/ahmededdahby"
    }
  }
};
