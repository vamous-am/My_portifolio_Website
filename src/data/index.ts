/** All portfolio content. No raw strings may be hardcoded inside section components — import from here. */

import type {
  BioData,
  Competency,
  TechCategory,
  Project,
  TimelineEntry,
  EducationData,
  Certificate,
  CoreCompetencyTag,
} from "@/types";

// ── Bio ───────────────────────────────────────────────────────────────────────

export const BIO: BioData = {
  name: "Amanuel Musa",
  paragraphs: [
    "I'm an Electrical & Computer Engineering student at Addis Ababa Institute of Technology (AAiT), building production-grade web software and embedded systems side by side. My ECE background isn't a detour from software — it's a competitive advantage. Studying digital logic, microprocessors, and signal flow gives me a low-level mental model that most web developers never develop: I think in data pipelines, system boundaries, and fault tolerance before I write a single line of application code.",
    "On the software side I've shipped full-stack products using React, Next.js, Node.js, and PostgreSQL, including a restaurant management platform (SaporiVivi) with a JWT-to-httpOnly cookie migration, an optimised image pipeline, and a normalised relational schema. On the hardware side I prototype IoT devices with ESP32, write firmware in C/C++, and use MATLAB and Proteus for simulation and circuit validation.",
    "I care about the seam between layers — where a hardware interrupt becomes an API event, where a database schema decision ripples into UI latency, where a deployment pipeline determines product reliability. That end-to-end perspective is what I bring to every project I work on.",
  ],
};

/** 4-block qualitative scale: 4=Advanced, 3=Intermediate, 2=Intermediate/Learning, 1=Learning. */
export const COMPETENCIES: Competency[] = [
  {
    label:      "Frontend Experience",
    levelLabel: "Intermediate",
    filled:     3,
    total:      4,
  },
  {
    label:      "Backend Experience",
    levelLabel: "Advanced",
    filled:     4,
    total:      4,
  },
  {
    label:      "Embedded Systems & Cloud",
    levelLabel: "Intermediate / Learning",
    filled:     2,
    total:      4,
  },
];

/** 6 tech categories. `icon` is a Lucide icon name resolved via the Expertise component's icon map. */
export const TECH_CATEGORIES: TechCategory[] = [
  {
    category: "Frontend Development",
    icon: "Layers",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    category: "Backend Development",
    icon: "Code2",
    items: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "REST APIs" },
    ],
  },
  {
    category: "Databases & Storage",
    icon: "FolderOpen",
    items: [
      { name: "PostgreSQL" },
      { name: "MySQL"},
      { name: "MongoDB" },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: "Wrench",
    items: [
      { name: "Docker" },
      { name: "Git" },
      { name: "Vercel" },
      { name: "GitHub Actions" },
    ],
  },
  {
    category: "Embedded Systems & Electronics",
    icon: "Briefcase",
    items: [
      { name: "ESP32" },
      { name: "Arduino" },
      { name: "C / C++" },
      { name: "KiCad" },
      { name: "MQTT" },
    ],
  },
  {
    category: "Engineering Tools",
    icon: "Home",
    items: [
      { name: "LOGISM" },
      { name: "CISCO"},
      { name :"ALTIUM"},
      { name: "MATLAB" },
      { name: "Proteus" },
      { name: "VS Code" },
    ],
  },
];

/** Featured project (`featured: true`) spans both grid columns. Placeholders fill remaining slots symmetrically. */
export const PROJECT_ITEMS: Project[] = [
  {
    id:          "saporivivi",
    title:       "SaporiVivi",
    featured:    true,
    description:
      "Problem: Coordinating real-time multi-vendor orders required a schema that could track order state across multiple vendors simultaneously without race conditions or orphaned records. " +
      "Solution: Built a full-stack restaurant management platform with React, Node.js, Express, and a custom Sequelize-managed relational schema. Secured all sessions with JWT stored inside HttpOnly cookies to eliminate XSS attack surface, and built a Cloudinary image pipeline for vendor menu assets with automatic format optimisation. " +
      "Result: Production-grade deployment with a clean security posture, sub-200 ms API response times on the critical order-status endpoint, and a normalised schema that supports adding new vendors without schema migrations.",
    techStack:   ["React", "Node.js", "Express", "Sequelize", "PostgreSQL", "JWT", "Cloudinary", "REST API"],
    imageUrl:    "/images/projects/saporivivi.png",
    imageAlt:
      "SaporiVivi restaurant management dashboard showing the multi-vendor order tracking interface with a sidebar of active orders and a central status timeline.",
    githubUrl:   "https://github.com/vamous-am/vamous-food-delivery-db-system",
    liveUrl: undefined,
  },
  {
    id:          "crm",
    title:       "Mini CRM — Client & Lead Management",
    isPlaceholder: false,
    description:
      "A TypeScript monorepo CRM with a React/Vite frontend, Node/Express backend, and shared Zod validation schemas. " +
      "Implements JWT auth in HttpOnly cookies, MongoDB Atlas persistence, and React Query polling with rate limiting via rate-limiter-flexible. " +
      "Resolved a typescript-eslint 8.x / TypeScript 7 incompatibility by adopting Microsoft's interim @typescript/typescript6 package.",
    techStack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "JWT", "Zod", "React Query"],
    imageUrl:    "/images/projects/coming_soon.jpg",
    imageAlt:    "Mini CRM dashboard showing lead pipeline and client management interface",
    githubUrl:   "https://github.com/vamous-am/Client_Lead_Managment_system",
  },
  {
    id:          "habeshan-rems",
    title:       "Habeshan REMS — Remote Employee Management",
    isPlaceholder: false,
    description:
      "Offline-first multi-tenant workforce platform built at the INSA software development bootcamp. " +
      "Owned the Auth, Users, Organizations, Teams & Admin slice end-to-end on a 4-developer team (Go/Fiber, PostgreSQL/GORM, React/TypeScript, Dexie.js). " +
      "Designed the multi-tenant schema, built JWT authentication and RBAC middleware that the other three developers' slices depended on, and shipped password-reset, soft-delete, and full Admin/Team CRUD across backend and frontend.",
    techStack: ["Go", "Fiber", "GORM", "PostgreSQL", "React", "TypeScript", "JWT", "RBAC", "Dexie.js"],
    imageUrl:    "/images/projects/coming_soon.jpg",
    imageAlt:    "Habeshan REMS admin dashboard showing employee and team management interface",
    githubUrl:   "https://github.com/vamous-am/Habeshan-REMS-Project",
  },
];

/** Most recent entry first. No invented metrics or team sizes. */
export const TIMELINE: TimelineEntry[] = [
  {
    id:           "insa-bootcamp",
    role:         "Software Development Bootcamp",
    organisation: "Information Network Security Administration (INSA)",
    period:       "July 2026 – August 2026",
    bullets: [
      "Selected for a competitive one-month bootcamp at Ethiopia's national information and network security agency.",
      "Owned the Auth, Users, Organizations, Teams & Admin slice end-to-end on a 4-developer team building Habeshan REMS — a multi-tenant offline-first workforce platform (Go/Fiber, PostgreSQL/GORM, React/TypeScript, Dexie.js).",
      "Designed the multi-tenant schema, built JWT authentication and RBAC middleware that the other three developers' slices depended on, and shipped password-reset, soft-delete, and full Admin/Team CRUD across backend and frontend.",
    ],
  },
  {
    id:           "future-interns",
    role:         "Full-Stack Intern",
    organisation: "Future Interns",
    period:       "June 2026 – Present",
    bullets: [
      "Building a Mini CRM (client/lead management) using a TypeScript monorepo with React/Vite frontend, Node/Express backend, and shared Zod validation schemas — JWT auth in HttpOnly cookies, MongoDB Atlas, and React Query polling with rate limiting.",
      "Resolved a typescript-eslint 8.x / TypeScript 7 incompatibility by adopting Microsoft's interim @typescript/typescript6 package and documenting the fix for the project.",
      "Built and deployed a personal portfolio in Next.js 16 (App Router), Tailwind CSS v4, and Framer Motion — achieving Lighthouse scores of 90+ Performance, 95 Accessibility, 100 SEO.",
    ],
  },
  {
    id:           "aait-coursework",
    role:         "ECE Systems Coursework",
    organisation: "Addis Ababa Institute of Technology (AAiT)",
    period:       "2022 – Present",
    bullets: [
      "Studied hardware-software integration: digital logic design, microprocessor architecture, and signal processing fundamentals.",
      "Designed embedded system logic and programmed microcontroller loops in C/C++ for sensor acquisition and actuator control.",
      "Applied simulation tools (MATLAB, Proteus, Logism) to validate circuit behaviour and firmware correctness before physical prototyping.",
    ],
  },
];

// ── Education ─────────────────────────────────────────────────────────────────

export const EDUCATION: EducationData = {
  degree:              "Bachelor of Science in Electrical and Computer Engineering",
  institution:         "Addis Ababa Institute of Technology (AAiT)",
  expectedGraduation:  "2027",
  description:
    "Core curriculum spanning digital systems, microprocessor architecture, signal processing, embedded programming, and computer networks — with elective focus on software engineering and IoT applications.",
};

/** Leave empty until real credentials are earned. The Education layout collapses to full-width when empty. */
export const CERTIFICATES: Certificate[] = [];

/** Technical workflow and methodology tags rendered as pill badges. */
export const CORE_COMPETENCIES: CoreCompetencyTag[] = [
  "REST API Design",
  "Responsive Design",
  "Git Workflow",
  "System Design",
  "Debugging & Profiling",
  "Agile Methodologies",
  "Database Schema Design",
  "Authentication & Security",
  "CI/CD Pipelines",
  "Hardware-Software Integration",
];
