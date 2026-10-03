"use client";

/** Site footer with availability status, copyright, build credit, and a back-to-top button.
 *  Rendered at the bottom of the Contact page (the last page), so "Back to top" returns to page 0. */

import { ArrowUp } from "lucide-react";
import { CONTAINER_CLASS, SITE_META } from "@/lib/constants";
import { usePageNav } from "@/context/pagination";

export function Footer() {
  const { goToPage } = usePageNav();

  return (
    <footer className="bg-gray-bg dark:bg-foreground/5">
      <div className={`${CONTAINER_CLASS} py-8`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              {/* Pulsing dot signals active availability to recruiters */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm text-foreground/60">Open to opportunities</span>
            </div>
            <p className="text-xs text-foreground/40">
              © {new Date().getFullYear()} {SITE_META.name}. All rights reserved.
            </p>
          </div>

          <p className="text-xs text-foreground/40 text-center">
            Designed &amp; built by {SITE_META.name} · Next.js · Tailwind CSS · TypeScript
          </p>

          <button
            type="button"
            onClick={() => goToPage(0)}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 text-xs text-foreground/50 hover:text-primary-text transition-colors group cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
            Back to top
          </button>

        </div>
      </div>
    </footer>
  );
}
