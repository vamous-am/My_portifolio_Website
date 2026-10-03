"use client";

/** Sticky bottom navigation bar, visible below `lg:` breakpoint.
 *  Renders the 5 items where `showOnMobile` is `true` — Experience is excluded to keep tap targets wide.
 *  Page indices come from the unfiltered `NAV_ITEMS` array, so filtering can never shift a page number.
 *  Safe-area padding via `env(safe-area-inset-bottom)` prevents overlap with home indicators on iOS/Android.
 *  The site no longer scrolls, so these are buttons driving the shared page state, not `#anchor` links. */

import { Home, User, FolderOpen, Wrench, Mail } from "lucide-react";
import { usePageNav } from "@/context/pagination";
import { NAV_ITEMS } from "@/lib/constants";

const ICON_MAP = { Home, User, FolderOpen, Wrench, Mail } as const;

export function BottomBar() {
  const { activePage, goToPage } = usePageNav();
  const mobileItems = NAV_ITEMS.map((item, index) => ({ ...item, index })).filter((item) => item.showOnMobile);

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-navy border-t border-foreground/10"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around h-16">
        {mobileItems.map((item) => {
          const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP];
          const isActive = item.index === activePage;
          return (
            <button
              key={item.href}
              type="button"
              onClick={() => goToPage(item.index)}
              aria-current={isActive ? "true" : undefined}
              className={`
                flex flex-col items-center justify-center gap-1 flex-1 h-full
                text-xs font-medium transition-colors cursor-pointer
                ${isActive ? "text-primary-text" : "text-foreground/50 hover:text-foreground"}
              `}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
