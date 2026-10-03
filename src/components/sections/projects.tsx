"use client";

/** Featured Projects section (`id="projects"`).
 *  Renders a responsive 2-column grid. The featured project spans both columns (`md:col-span-2`).
 *  All project data is sourced from `src/data/index.ts`. Animations disabled under `useReducedMotion()`. */

import { motion, useReducedMotion } from "framer-motion";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/lib/constants";
import { PROJECT_ITEMS } from "@/data";
import { ProjectCard } from "@/components/ui/project-card";
import type { SectionProps } from "@/types";

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function Projects({ isActive }: SectionProps) {
  const reduced = useReducedMotion();
  const itemVariant    = reduced ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : fadeUp;
  const sectionVariant = reduced ? { hidden: {}, visible: {} } : stagger;

  return (
    <motion.section
      id="projects"
      variants={sectionVariant}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      className={`${SECTION_PADDING} bg-background`}
    >
      <div className={CONTAINER_CLASS}>

        <motion.div variants={sectionVariant} className="mb-16">
          <motion.h2 variants={itemVariant} className="font-heading text-4xl font-bold text-foreground mb-2">Featured Projects</motion.h2>
          <motion.div variants={itemVariant} className="w-12 h-1 bg-primary rounded-full mb-4" aria-hidden="true" />
          <motion.p variants={itemVariant} className="text-base text-foreground/60 max-w-xl">
            Production work and engineering projects — built from schema to deployment.
          </motion.p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={sectionVariant}>
          {PROJECT_ITEMS.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariant}
              className={project.featured ? "md:col-span-2" : ""}
            >
              <div className="relative h-full">
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary text-white shadow-sm">
                      Flagship Project
                    </span>
                  </div>
                )}
                <ProjectCard project={project} />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}
