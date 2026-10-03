"use client";

/** Vertical experience timeline rendered as a semantic `<ol>` (chronological sequence).
 *  Each entry uses a two-column flex layout: a primary-color circle node with connector line on the left,
 *  and role, organisation, period, and bullet accomplishments on the right.
 *  The connector line is hidden on the last item. Animations disabled under `useReducedMotion()`. */

import { motion, useReducedMotion } from "framer-motion";
import { TIMELINE } from "@/data";

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export function Experience() {
  const reduced = useReducedMotion();
  const itemVariant    = reduced ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : fadeUp;
  const sectionVariant = reduced ? { hidden: {}, visible: {} } : stagger;

  return (
    <div>
      <motion.ol
        className="flex flex-col gap-0"
        variants={sectionVariant}
        aria-label="Experience timeline"
      >
        {TIMELINE.map((entry, idx) => {
          const isLast = idx === TIMELINE.length - 1;
          return (
            <motion.li key={entry.id} variants={itemVariant} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-primary shrink-0 mt-1.5 ring-2 ring-primary/30" aria-hidden="true" />
                {!isLast && <div className="w-px flex-1 bg-foreground/10 my-2" aria-hidden="true" />}
              </div>
              <div className={`flex-1 ${isLast ? "pb-0" : "pb-8"}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h4 className="font-heading text-base font-semibold text-foreground">{entry.role}</h4>
                  <span className="text-sm text-foreground/50 font-medium shrink-0">{entry.period}</span>
                </div>
                <p className="text-sm text-primary-text font-medium mb-3">{entry.organisation}</p>
                <ul className="space-y-1.5" aria-label={`Accomplishments at ${entry.organisation}`}>
                  {entry.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground/60 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </div>
  );
}
