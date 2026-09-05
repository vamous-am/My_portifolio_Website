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

// ── Bio ──────────────────────────────────

export const BIO: BioData = {
  name: "Amanuel Musa",
  paragraphs: [
    "I'm an Electrical & Computer Engineering student at Addis Ababa Institute of Technology (AAiT), building full-stack web and mobile software alongside embedded systems work. My foundation spans Java, Go, TypeScript, and Dart, picked up through coursework and production projects, not just tutorials.",
    "On the backend I've designed multi-tenant relational schemas, built JWT authentication and RBAC middleware that other developers' work depended on, and shipped APIs in both Node/Express and Go/Fiber. On the frontend I've delivered React/Next.js web apps and a Flutter mobile app with Riverpod state management. I was selected for a competitive software development bootcamp at Ethiopia's national cybersecurity agency.",
    "My ECE background adds a layer most software developers don't have: digital logic, microprocessor architecture, circuit design with Altium and Proteus. I see that as a broader engineering foundation, not a detour from software.",
  ],
};

/** 4-block qualitative scale: 4=Advanced, 3=Intermediate, 2=Intermediate/Learning, 1=Learning. */
export const COMPETENCIES: Competency[] = [
  {
    label:      "Backend Development",
    levelLabel: "Advanced",
    filled:     4,
    total:      4,
  },
  {
    label:      "Frontend & Mobile",
    levelLabel: "Intermediate",
    filled:     3,
    total:      4,
  },
  {
    label:      "Embedded Systems",
    levelLabel: "Intermediate",
    filled:     3,
    total:      4,
  },
  {
    label:      "Cloud & DevOps",
    levelLabel: "Intermediate",
    filled:     3,
    total:      4,
  },
];

/** 6 tech categories. `icon` is a Lucide icon name resolved via the Expertise component's icon map. */
export const TECH_CATEGORIES: TechCategory[] = [
  {
    category: "Languages",
    icon: "Code2",
    items: [
      { name: "Java" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Go" },
      { name: "Dart" },
      { name: "Python" },
      { name: "SQL" },
    ],
  },
  {
    category: "Frontend & Mobile",
    icon: "Layers",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Flutter" },
      { name: "Tailwind CSS" },
      { name: "Vite" },
    ],
  },
  {
    category: "Backend & APIs",
    icon: "Briefcase",
    items: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "Go / Fiber" },
      { name: "REST APIs" },
      { name: "JWT / RBAC" },
      { name: "Zod" },
      { name: "Socket.io" },
    ],
  },
  {
    category: "Databases & ORMs",
    icon: "FolderOpen",
    items: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "GORM" },
      { name: "Sequelize" },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: "Wrench",
    items: [
      { name: "AWS (S3, EC2)" },
      { name: "Docker" },
      { name: "Vercel" },
      { name: "Render" },
      { name: "Git / GitHub" },
      { name: "GitHub Actions" },
    ],
  },
  {
    category: "Embedded & Engineering",
    icon: "Home",
    items: [
      { name: "C / C++" },
      { name: "MATLAB" },
      { name: "Proteus" },
      { name: "Logisim" },
      { name: "Altium" },
      { name: "Postman" },
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
    imageUrl:    "/images/projects/saporivivi.jpg",
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
    title:       "Habeshan REMS - Remote Employee Management",
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

// ── Education ───────────────────────────────────────────

export const EDUCATION: EducationData = {
  degree:              "Bachelor of Science in Electrical and Computer Engineering",
  institution:         "Addis Ababa Institute of Technology (AAiT)",
  expectedGraduation:  "2027",
  description:
    "Core curriculum spanning digital systems, microprocessor architecture, signal processing, embedded programming, and computer networks with elective focus on software engineering and IoT applications.",
};

/** Leave empty until real credentials are earned. The Education layout collapses to full-width when empty. */
export const CERTIFICATES: Certificate[] = [];

/** Technical workflow and methodology tags rendered as pill badges. */
export const CORE_COMPETENCIES: CoreCompetencyTag[] = [
  "REST API Design",
  "Responsive Design",
  "Git Workflow",
  "System Design",
  "Authentication & RBAC",
  "Database Schema Design",
  "Schema Design & Migrations",
  "Mobile Development",
  "Multi-Tenant Systems",
  "CI/CD Pipelines",
];
