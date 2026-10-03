import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { PageNavProvider } from "@/context/pagination";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Sidebar } from "@/components/layout/sidebar";
import { BottomBar } from "@/components/layout/bottom-bar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Amanuel Musa | Full-Stack Developer & ECE Student",
    template: "%s | Amanuel Musa",
  },
  description:
    "Full-stack developer and ECE student at AAiT. Built SaporiVivi — a multi-vendor restaurant platform with a 16-table Sequelize schema, HttpOnly cookie auth, and a Cloudinary image pipeline. Proficient in Next.js, Node.js, TypeScript, PostgreSQL, and embedded systems.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Amanuel Musa | Full-Stack Developer & ECE Student",
    description:
      "Full-stack developer specializing in modern web applications and embedded engineering systems.",
    url: SITE_URL,
    siteName: "Amanuel Musa Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Amanuel Musa Portfolio Preview",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="h-full antialiased">
        <ThemeProvider>
          <PageNavProvider>
            <Sidebar />

            <div
              className="lg:hidden fixed right-4 z-50"
              style={{ top: "calc(env(safe-area-inset-top) + 1rem)" }}
            >
              <div className="p-1 rounded-full bg-white/80 dark:bg-navy/80 backdrop-blur-md border border-foreground/10 shadow-sm">
                <ThemeToggle />
              </div>
            </div>

            {/* h-dvh + the bottom-bar reservation give the paginated shell its exact available height. */}
            <div className="h-dvh lg:pl-64 pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0">
              {children}
            </div>
            <BottomBar />
          </PageNavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
