"use client";

/** Fixed left navigation panel, visible at `lg:` breakpoint and above.
 *  Renders a profile area, all 6 nav links driven by `NAV_ITEMS`, and a theme toggle.
 *  The document no longer scrolls, so active state and navigation come from `usePageNav` —
 *  each row is a button that switches page instead of a `#anchor` link. */

import { Home, User, FolderOpen, Wrench, Briefcase, Mail } from "lucide-react";
import { usePageNav } from "@/context/pagination";
import { NAV_ITEMS, SITE_META } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ProfileAvatar } from "@/components/ui/profile-avatar";

/** Explicit icon map — resolves string keys from `NAV_ITEMS` to imported Lucide components. */
const ICON_MAP = { Home, User, FolderOpen, Wrench, Briefcase, Mail } as const;

export function Sidebar() {
  const { activePage, goToPage } = usePageNav();

  return (
    <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:flex-col bg-white dark:bg-navy border-r border-foreground/10">
      <div className="p-6 border-b border-foreground/10 flex flex-col items-center gap-4">
        <ProfileAvatar name={SITE_META.name} size={80} />
        <div className="text-center">
          <h2 className="font-heading text-lg font-bold text-foreground leading-tight">{SITE_META.name}</h2>
          <p className="text-sm text-foreground/60 mt-1">Full-Stack Developer</p>
          <p className="text-sm text-foreground/60">ECE Student</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map((item, index) => {
          const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP];
          const isActive = index === activePage;
          return (
            <button
              key={item.href}
              type="button"
              onClick={() => goToPage(index)}
              aria-current={isActive ? "true" : undefined}
              className={`
                flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-left cursor-pointer
                transition-colors relative
                ${isActive
                  ? "text-primary-text bg-primary/10"
                  : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"}
              `}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
              )}
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="shrink-0 p-4 border-t border-foreground/10">
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground/50">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
