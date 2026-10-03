"use client";

/** Page 4 of the fixed-viewport layout — the wrapper for the Experience group (`id="experience"`).
 *  It is the variant root its three sub-sections inherit from, which is why they carry `variants` but no
 *  `initial`/`whileInView` of their own: a hidden page is still inside the viewport, so `whileInView`
 *  would fire while that page is invisible.
 *  Dividers are `aria-hidden="true"` — structure is conveyed by sub-section headings, not separators. */

import { motion, type Variants } from "framer-motion";
import { Experience }   from "@/components/sections/experience";
import { Education }    from "@/components/sections/education";
import { Competencies } from "@/components/sections/competencies";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/lib/constants";
import type { SectionProps } from "@/types";

/** Empty state pair — this element's only job is to hand "hidden"/"visible" down to its children. */
const pageVariants: Variants = { hidden: {}, visible: {} };

export function ExperienceSection({ isActive }: SectionProps) {
  return (
    <motion.section
      id="experience"
      variants={pageVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      className={`${SECTION_PADDING} bg-gray-bg dark:bg-background`}
    >
      <div className={CONTAINER_CLASS}>

        <h2 className="font-heading text-4xl font-bold text-foreground mb-2">Experience</h2>
        <div className="w-12 h-1 bg-primary rounded-full mb-16" aria-hidden="true" />

        <Experience />
        <hr aria-hidden="true" className="border-foreground/10 my-16" />
        <Education />
        <hr aria-hidden="true" className="border-foreground/10 my-16" />
        <Competencies />

      </div>
    </motion.section>
  );
}
