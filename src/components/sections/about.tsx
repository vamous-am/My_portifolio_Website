"use client";

/** About section with a two-column desktop layout (bio left, profile photo right).
 *  Profile photo falls back to initials on a navy background if `/images/profile.jpg` is missing.
 *  All bio content is imported from `src/data/index.ts`.
 *  Scroll-entry animations are disabled when `useReducedMotion()` is active. */

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/lib/constants";
import { BIO } from "@/data";
import { Card } from "@/components/ui/card";
import type { SectionProps } from "@/types";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const fadeUpStagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export function About({ isActive }: SectionProps) {
  const reduced = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  const initials = BIO.name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");

  const itemVariant  = reduced ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : fadeUp;
  const groupVariant = reduced ? { hidden: {}, visible: {} } : fadeUpStagger;

  return (
    <motion.section
      id="about"
      variants={groupVariant}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      className={`${SECTION_PADDING} bg-background`}
    >
      <div className={CONTAINER_CLASS}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <motion.div className="lg:col-span-7" variants={groupVariant}>
            <motion.h2 variants={itemVariant} className="font-heading text-4xl font-bold text-foreground mb-2">
              About Me
            </motion.h2>
            <motion.div variants={itemVariant} className="w-12 h-1 bg-primary rounded-full mb-8" aria-hidden="true" />
            {BIO.paragraphs.map((para, i) => (
              <motion.p key={i} variants={itemVariant} className="text-base text-foreground/70 leading-relaxed mb-4 last:mb-0">
                {para}
              </motion.p>
            ))}
          </motion.div>

          <motion.div className="lg:col-span-5" variants={itemVariant}>
            {/* p-0 so the photo fills edge-to-edge within the rounded Card frame */}
            <Card className="p-0 overflow-hidden" hoverable={false}>
              <div className="relative w-full aspect-[4/5]">
                {!imgError ? (
                  <Image
                    src="/images/profile.jpg"
                    alt={`${BIO.name} — professional photo`}
                    fill
                    className="object-cover object-top"
                    onError={() => setImgError(true)}
                    priority={false}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-navy dark:bg-foreground/10">
                    <span className="font-heading font-bold text-white text-6xl select-none">{initials}</span>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
