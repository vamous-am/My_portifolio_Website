"use client";

/** Technical Expertise section (`id="skills"`).
 *  Renders qualitative competency block-meters and a 6-category tech stack grid.
 *  Meter pill blocks inherit the section's variant state.
 *  All content sourced from `src/data/index.ts`. Animations disabled under `useReducedMotion()`. */

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Layers, Code2, FolderOpen, Wrench, Briefcase, Home } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/lib/constants";
import { COMPETENCIES, TECH_CATEGORIES } from "@/data";
import { Card } from "@/components/ui/card";
import type { SectionProps } from "@/types";

/** Explicit map from `TechCategory.icon` string keys to imported Lucide components. */
const ICON_MAP: Record<string, LucideIcon> = { Layers, Code2, FolderOpen, Wrench, Briefcase, Home };

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

interface MeterProps {
  label: string; levelLabel: string; filled: number; total: number;
  reduced: boolean | null;
}

/** Meter blocks inherit hidden/visible from the section, so they carry `variants` only. */
function CompetencyMeter({ label, levelLabel, filled, total, reduced }: MeterProps) {
  return (
    <motion.div
      aria-label={`${label}: ${levelLabel}`}
      className="flex flex-col gap-2"
      variants={reduced ? undefined : fadeUp}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm text-primary-text font-medium">{levelLabel}</span>
      </div>
      <div className="flex gap-2" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i < filled;
          const barVariant: Variants | undefined = reduced || !isActive ? undefined : {
            hidden:  { scaleX: 0.4, opacity: 0 },
            visible: { scaleX: 1, opacity: 1, transition: { duration: 0.35, delay: i * 0.07, ease: "easeOut" } },
          };
          return (
            <motion.div
              key={i}
              className={`h-3 flex-1 rounded-full ${isActive ? "bg-primary" : "bg-foreground/10"}`}
              variants={barVariant}
              style={{ transformOrigin: "left" }}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

export function Expertise({ isActive }: SectionProps) {
  const reduced = useReducedMotion();
  const sectionVariant = reduced ? { hidden: {}, visible: {} } : stagger;
  const itemVariant    = reduced ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : fadeUp;

  return (
    <motion.section
      id="skills"
      variants={sectionVariant}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      className={`${SECTION_PADDING} bg-gray-bg dark:bg-background`}
    >
      <div className={CONTAINER_CLASS}>

        <motion.div variants={sectionVariant} className="mb-16">
          <motion.h2 variants={itemVariant} className="font-heading text-4xl font-bold text-foreground mb-2">Technical Expertise</motion.h2>
          <motion.div variants={itemVariant} className="w-12 h-1 bg-primary rounded-full" aria-hidden="true" />
        </motion.div>

        <div className="mb-16">
          <motion.h3 variants={itemVariant} className="font-heading text-lg font-semibold text-foreground mb-6">
            Core Competencies
          </motion.h3>
          <div className="flex flex-col gap-6 max-w-2xl">
            {COMPETENCIES.map((c) => (
              <CompetencyMeter key={c.label} label={c.label} levelLabel={c.levelLabel} filled={c.filled} total={c.total} reduced={reduced} />
            ))}
          </div>
        </div>

        <div>
          <motion.h3 variants={itemVariant} className="font-heading text-lg font-semibold text-foreground mb-6">
            Technology Stack
          </motion.h3>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={sectionVariant}>
            {TECH_CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.icon] ?? Wrench;
              return (
                <motion.div key={cat.category} variants={itemVariant}>
                  <Card className="h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="p-2 rounded-md bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                      </span>
                      <h4 className="font-heading text-base font-semibold text-foreground">{cat.category}</h4>
                    </div>
                    <ul className="flex flex-wrap gap-2" aria-label={`${cat.category} technologies`}>
                      {cat.items.map((item) => (
                        <li key={item.name}>
                          <span className="inline-block px-3 py-1 text-sm rounded-full bg-foreground/5 border border-foreground/10 text-foreground/70 hover:bg-primary/10 hover:border-primary/30 hover:text-primary-text transition-colors cursor-default">
                            {item.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
}
