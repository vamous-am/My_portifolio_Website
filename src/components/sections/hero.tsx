"use client";

/** Above-the-fold hero section with staggered Framer Motion fade-in.
 *  Renders the headline, typing carousel, bio, CTA buttons, animated scroll indicator,
 *  and two full-width tech marquee strips.
 *  All animations are disabled when `useReducedMotion()` is active.
 *  Page 0 of the paginated layout — its entrance plays only while it is the active page. */

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Download, ChevronDown } from "lucide-react";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/lib/constants";
import { TypingCarousel } from "@/components/ui/typing-carousel";
import { Marquee } from "@/components/ui/marquee";
import { usePageNav } from "@/context/pagination";
import type { SectionProps } from "@/types";

const TYPING_PHRASES = [
  "Building Full-Stack Applications",
  "Building Embedded Systems",
  "Building IoT Solutions",
  "Building AI-Powered Projects",
];

const WEB_STACK = ["Next.js", "React", "TypeScript", "Node.js", "Express", "MongoDB", "PostgreSQL", "Docker", "Git", "Tailwind"];
const ECE_STACK = ["ESP32", "Arduino", "MATLAB", "Proteus", "Python", "OpenCV", "Linux", "MQTT", "C++"];

function buildVariants(reduced: boolean | null): { container: Variants; item: Variants } {
  if (reduced) {
    return {
      container: {},
      item: { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } },
    };
  }
  return {
    container: {
      hidden: {},
      visible: { transition: { delayChildren: 0.1, staggerChildren: 0.15 } },
    },
    item: {
      hidden:  { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    },
  };
}

export function Hero({ isActive }: SectionProps) {
  const reduced = useReducedMotion();
  const variants = buildVariants(reduced);
  const { goToPage } = usePageNav();

  return (
    <motion.section
      id="home"
      variants={variants.container}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      className="flex flex-col bg-background"
    >
      <div className={`${SECTION_PADDING}`}>
        <div className={`${CONTAINER_CLASS}`}>
          <motion.p variants={variants.item} className="text-base text-primary-text font-medium tracking-wide mb-2">
            Hello, I&apos;m Amanuel Musa
          </motion.p>

          <motion.h1 variants={variants.item} className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-4 text-foreground">
            Full-Stack Developer{" "}
            <span className="text-primary-text">| ECE Student</span>
          </motion.h1>

          <motion.div variants={variants.item} className="mb-6 h-8">
            <TypingCarousel phrases={TYPING_PHRASES} className="text-lg text-foreground/70 font-medium" />
          </motion.div>

          <motion.p variants={variants.item} className="text-base text-foreground/60 max-w-lg leading-relaxed mb-8">
            Electrical &amp; Computer Engineering student at AAiT who builds production-grade web applications
            and embedded systems. I bring systems thinking from hardware to software, designing reliable
            full-stack products from database schema through to responsive UI.
          </motion.p>

          <motion.div variants={variants.item} className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => goToPage(1)}
              className="cursor-pointer inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-semibold text-sm hover:bg-primary/85 transition-colors"
            >
              View Projects
            </button>
            <a
              href="/Amanuel_Musa_CV.pdf"
              download="Amanuel_Musa_CV.pdf"
              aria-label="Download Amanuel Musa CV as PDF"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border-2 border-foreground/70 text-foreground font-semibold text-sm hover:bg-foreground/5 transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download CV
            </a>
            <button
              type="button"
              onClick={() => goToPage(5)}
              className="cursor-pointer inline-flex items-center justify-center px-6 py-3 rounded-md border-2 border-primary text-primary-text font-semibold text-sm hover:bg-primary/10 transition-colors"
            >
              Let&apos;s Connect
            </button>
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center pb-6">
        <motion.div
          animate={reduced || !isActive ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <ChevronDown className="w-6 h-6 text-foreground/30" />
        </motion.div>
      </div>

      <div className="border-t border-foreground/8 py-4 space-y-4 pb-8">
        <Marquee items={WEB_STACK} direction="left" duration={40} ariaLabel="Web technology stack" />
        <Marquee items={ECE_STACK} direction="right" duration={40} ariaLabel="Electrical and Computer Engineering stack" />
      </div>
    </motion.section>
  );
}
