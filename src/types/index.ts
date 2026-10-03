/** Shared TypeScript interfaces for all portfolio data structures.
 *  All data shapes consumed by section components are defined here and imported from `src/data/index.ts`. */

export interface BioData {
  name: string;
  /** Rendered as individual `<p>` elements — one entry per paragraph. */
  paragraphs: string[];
}

/** Qualitative skill level mapped to a filled-block count out of `total`. */
export interface Competency {
  label: string;
  /** Descriptive label shown beside the block meter, e.g. "Advanced". */
  levelLabel: string;
  /** Number of highlighted blocks representing the current level. */
  filled: number;
  total: number;
}

/** A single technology badge inside a category card. */
export interface TechItem {
  name: string;
}

/** One category card in the tech grid. */
export interface TechCategory {
  category: string;
  /** Lucide icon name resolved via the Expertise component's icon map. */
  icon: string;
  items: TechItem[];
}

/** One entry on the vertical experience timeline. */
export interface TimelineEntry {
  id: string;
  role: string;
  organisation: string;
  period: string;
  bullets: string[];
}

/** Education record rendered as a Card. */
export interface EducationData {
  degree: string;
  institution: string;
  /** Renders as "Expected: {year}" when graduation is pending. */
  expectedGraduation: string;
  description?: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  url?: string;
}

/** Technical workflow tag rendered as a pill badge. */
export type CoreCompetencyTag = string;

export interface Project {
  id: string;
  title: string;
  /** Problem / Solution / Result narrative rendered as body text. */
  description: string;
  techStack?: string[];
  /** Path relative to `/public`. Falls back to a muted panel if the file is missing. */
  imageUrl?: string;
  /** Required when `imageUrl` is present. Must be descriptive for screen readers. */
  imageAlt?: string;
  githubUrl?: string;
  /** Live Demo button is hidden when absent — no dead links. */
  liveUrl?: string;
  /** Renders a dashed "under construction" card with no image or action buttons. */
  isPlaceholder?: boolean;
  /** Spans full grid width (`md:col-span-2`) at the top of the projects grid. */
  featured?: boolean;
}

export type { ContactFormData, ContactFieldErrors } from "@/lib/schemas";

/** Props shared by the six page-level sections of the paginated layout.
 *  `isActive` reaches the section's top-level motion element, which drives variant inheritance
 *  for every nested element — no section uses `whileInView` any more. */
export type SectionProps = { isActive: boolean };
