"use client";

/** Fixed-viewport paginated shell — the site is six pages instead of one long scroll.
 *
 *  - The document itself never scrolls: this shell is `h-full` inside the `h-dvh` layout wrapper and is
 *    `overflow-hidden`. Each page has its own `overflow-y-auto` wrapper, so tall content (Projects on a
 *    small phone) is never clipped.
 *  - Every page stays mounted. Inactive pages are `opacity-0`, `inert` and `aria-hidden`, so they cannot
 *    be seen, clicked, focused or tabbed into — but each keeps its own scroll position.
 *  - The dots nav is deliberately a *sibling* of the section container, never a child: as a child it
 *    would sit inside an `inert` wrapper and become unreachable.
 *  - Page turns come from the dots, ArrowUp/ArrowDown, and vertical swipes. No scroll-snap, no drag lib. */

import { useEffect, useRef, type ReactNode } from "react";
import { PAGE_IDS, usePageNav } from "@/context/pagination";
import { NAV_ITEMS } from "@/lib/constants";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Expertise } from "@/components/sections/expertise";
import { ExperienceSection } from "@/components/sections/experience-section";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";
import type { SectionProps } from "@/types";

/** Order MUST match `PAGE_IDS` (i.e. `NAV_ITEMS`): 0 Home, 1 Projects, 2 About, 3 Skills, 4 Experience, 5 Contact. */
const PAGE_COMPONENTS: Array<(props: SectionProps) => ReactNode> = [
  Hero,
  Projects,
  About,
  Expertise,
  ExperienceSection,
  Contact,
];

/** Minimum vertical travel before a gesture counts as a page swipe. */
const SWIPE_THRESHOLD_PX = 50;

/** iOS elastic overscroll can leave `scrollTop` a hair outside the real range, so edge tests are inclusive. */
const SCROLL_EDGE_TOLERANCE_PX = 1;

export function PaginatedView() {
  const { activePage, goToPage, nextPage, prevPage } = usePageNav();

  /** One scroll container per page — the swipe edge check reads the active one. */
  const scrollRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sectionContainerRef = useRef<HTMLDivElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  /** Lets the bind-once touch listeners read the current page without re-binding. */
  const activePageRef = useRef(activePage);
  useEffect(() => {
    activePageRef.current = activePage;
  }, [activePage]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

      const target = event.target as HTMLElement | null;
      if (target?.isContentEditable) return;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      event.preventDefault();
      if (event.key === "ArrowDown") nextPage();
      else prevPage();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage]);

  useEffect(() => {
    const node = sectionContainerRef.current;
    if (!node) return;

    function handleTouchStart(event: TouchEvent) {
      if (event.touches.length !== 1) {
        touchStartRef.current = null;
        return;
      }
      touchStartRef.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }

    function handleTouchEnd(event: TouchEvent) {
      const start = touchStartRef.current;
      touchStartRef.current = null;
      if (!start) return;

      const touch = event.changedTouches[0];
      if (!touch) return;

      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;

      if (Math.abs(dy) < SWIPE_THRESHOLD_PX) return;   // too short to be a page swipe
      if (Math.abs(dx) > Math.abs(dy)) return;         // mostly horizontal — leave it alone

      // A scrollable section only hands the gesture over once it sits at its own top/bottom edge.
      const scroller = scrollRefs.current[activePageRef.current];
      const atTop = !scroller || scroller.scrollTop <= SCROLL_EDGE_TOLERANCE_PX;
      const atBottom =
        !scroller ||
        scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight <= SCROLL_EDGE_TOLERANCE_PX;

      if (dy < 0) {
        if (atBottom) nextPage();                      // swipe up → next page
      } else if (atTop) {
        prevPage();                                    // swipe down → previous page
      }
    }

    function handleTouchCancel() {
      touchStartRef.current = null;
    }

    node.addEventListener("touchstart", handleTouchStart, { passive: true });
    node.addEventListener("touchend", handleTouchEnd, { passive: true });
    node.addEventListener("touchcancel", handleTouchCancel, { passive: true });
    return () => {
      node.removeEventListener("touchstart", handleTouchStart);
      node.removeEventListener("touchend", handleTouchEnd);
      node.removeEventListener("touchcancel", handleTouchCancel);
    };
  }, [nextPage, prevPage]);

  return (
    <div className="relative h-full overflow-hidden">
      {/* Section container — the dots nav below is its sibling on purpose, never its child. */}
      <div ref={sectionContainerRef} className="h-full overflow-hidden">
        {PAGE_COMPONENTS.map((Section, index) => {
          const isActive = index === activePage;
          return (
            <div
              key={PAGE_IDS[index]}
              ref={(element) => {
                scrollRefs.current[index] = element;
              }}
              aria-hidden={!isActive}
              inert={!isActive}
              className={`absolute inset-0 overflow-y-auto overscroll-contain transition-opacity duration-200 ${
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Section isActive={isActive} />
              {/* The footer travels with the last page, inside that page's own scroll area. */}
              {index === PAGE_COMPONENTS.length - 1 && <Footer />}
            </div>
          );
        })}
      </div>

      {/* Dots — 8px visible dot inside a 32px hit area. Focus ring comes from the global :focus-visible rule. */}
      <nav
        aria-label="Page navigation"
        className="absolute right-1 lg:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3"
      >
        {PAGE_COMPONENTS.map((_, index) => {
          const item = NAV_ITEMS[index];
          const isActive = index === activePage;
          return (
            <button
              key={item.href}
              type="button"
              onClick={() => goToPage(index)}
              aria-label={`Go to ${item.label}`}
              aria-current={isActive ? "true" : undefined}
              className="group flex h-8 w-8 items-center justify-center rounded-full cursor-pointer"
            >
              <span
                className={`block h-2 w-2 rounded-full transition-all duration-200 ${
                  isActive ? "bg-primary scale-125" : "bg-foreground/25 group-hover:bg-foreground/40"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
