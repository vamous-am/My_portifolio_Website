"use client";

/** Shared pagination state for the fixed-viewport (non-scrolling) layout.
 *
 *  Page order is `NAV_ITEMS` order — the same order as the section stack in
 *  `components/layout/paginated-view.tsx`, so index 0 is Home and index 5 is Contact.
 *  State lives here rather than inside `PaginatedView` because `Sidebar` and `BottomBar` are
 *  rendered by `app/layout.tsx` as siblings of the page content and can only reach it via context.
 *
 *  Every navigation clamps at both ends — there is no wrap-around. */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { NAV_ITEMS } from "@/lib/constants";

/** Section element ids in page order. Index i here is page i everywhere in the app. */
export const PAGE_IDS: string[] = NAV_ITEMS.map((item) => item.href.replace("#", ""));

type PageNavValue = {
  activePage: number;
  pageCount: number;
  goToPage: (index: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

const PageNavContext = createContext<PageNavValue | null>(null);

export function PageNavProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState(0);
  const pageCount = PAGE_IDS.length;

  const goToPage = useCallback((index: number) => {
    setActivePage((current) => {
      const next = Math.max(0, Math.min(pageCount - 1, index));
      return next === current ? current : next;
    });
  }, [pageCount]);

  const nextPage = useCallback(() => setActivePage((current) => Math.min(pageCount - 1, current + 1)), [pageCount]);
  const prevPage = useCallback(() => setActivePage((current) => Math.max(0, current - 1)), []);

  const value = useMemo(
    () => ({ activePage, pageCount, goToPage, nextPage, prevPage }),
    [activePage, pageCount, goToPage, nextPage, prevPage]
  );

  return <PageNavContext.Provider value={value}>{children}</PageNavContext.Provider>;
}

export function usePageNav(): PageNavValue {
  const context = useContext(PageNavContext);
  if (!context) throw new Error("usePageNav must be used inside <PageNavProvider>");
  return context;
}
