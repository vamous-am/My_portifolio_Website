"use client";

/** Education card with an optional Certificates column.
 *  When `CERTIFICATES` is empty the layout is a single full-width column.
 *  When certificates exist a `lg:grid-cols-2` grid activates with Education on the left
 *  and Certificates on the right. Both cards use the canonical `<Card />` component. */

import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Award, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EDUCATION, CERTIFICATES } from "@/data";

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function Education() {
  const reduced = useReducedMotion();
  const itemVariant    = reduced ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : fadeUp;
  const sectionVariant = reduced ? { hidden: {}, visible: {} } : stagger;
  const hasCertificates = CERTIFICATES.length > 0;

  return (
    <div>
      <motion.div variants={sectionVariant} className="mb-10">
        <motion.h3 variants={itemVariant} className="font-heading text-2xl font-bold text-foreground mb-2">Education & Certificates</motion.h3>
        <motion.div variants={itemVariant} className="w-8 h-1 bg-primary rounded-full" aria-hidden="true" />
      </motion.div>

      <motion.div
        className={`grid grid-cols-1 gap-6 ${hasCertificates ? "lg:grid-cols-2" : ""}`}
        variants={sectionVariant}
      >
        <motion.div variants={itemVariant}>
          <Card hoverable={false} className="h-full">
            <div className="flex items-start gap-4 mb-4">
              <span className="p-2 rounded-md bg-primary/10 shrink-0">
                <GraduationCap className="w-5 h-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <h4 className="font-heading text-base font-semibold text-foreground leading-snug">{EDUCATION.degree}</h4>
                <p className="text-sm text-primary-text font-medium mt-1">{EDUCATION.institution}</p>
                <p className="text-sm text-foreground/50 mt-0.5">Expected: {EDUCATION.expectedGraduation}</p>
              </div>
            </div>
            {EDUCATION.description && <p className="text-sm text-foreground/60 leading-relaxed">{EDUCATION.description}</p>}
          </Card>
        </motion.div>

        {hasCertificates && (
          <motion.div variants={itemVariant}>
            <Card hoverable={false} className="h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-md bg-primary/10 shrink-0">
                  <Award className="w-5 h-5 text-primary" aria-hidden="true" />
                </span>
                <h4 className="font-heading text-base font-semibold text-foreground">Certificates</h4>
              </div>
              <ul className="space-y-4">
                {CERTIFICATES.map((cert, i) => (
                  <li key={i} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground leading-snug">{cert.title}</p>
                      <p className="text-xs text-foreground/50 mt-0.5">{cert.issuer} · {cert.date}</p>
                    </div>
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" aria-label={`View certificate: ${cert.title}`} className="shrink-0 text-foreground/40 hover:text-primary-text transition-colors">
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
