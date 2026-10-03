"use client";

/** Core competency pill badges sourced from `CORE_COMPETENCIES`.
 *  Renders technical workflow labels — no personal buzzwords.
 *  Staggered fade-in inherited from the section it lives in. Animations disabled under `useReducedMotion()`. */

import { motion, useReducedMotion } from "framer-motion";
import { CORE_COMPETENCIES } from "@/data";

const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export function Competencies() {
  const reduced = useReducedMotion();
  const itemVariant    = reduced ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : fadeUp;
  const sectionVariant = reduced ? { hidden: {}, visible: {} } : stagger;

  return (
    <div>
      <motion.div variants={sectionVariant} className="mb-10">
        <motion.h3 variants={itemVariant} className="font-heading text-2xl font-bold text-foreground mb-2">Core Competencies</motion.h3>
        <motion.div variants={itemVariant} className="w-8 h-1 bg-primary rounded-full" aria-hidden="true" />
      </motion.div>

      <motion.ul className="flex flex-wrap gap-3" variants={sectionVariant} aria-label="Core competencies">
        {CORE_COMPETENCIES.map((tag) => (
          <motion.li key={tag} variants={itemVariant}>
            <span className="inline-block px-4 py-2 text-sm font-medium rounded-full bg-foreground/5 border border-foreground/10 text-foreground/70 hover:bg-primary/10 hover:border-primary/30 hover:text-primary-text transition-colors cursor-default">
              {tag}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
