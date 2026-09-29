# FUTURE_FS_01: Portfolio Website

**Amanuel Musa** · Full-Stack Developer | Electrical and Computer Engineering Student, AAiT

> **[Live Portfolio](https://future-fs-01.vercel.app)** · **[Contact Me](mailto:amanuelmusa11@gmail.com)**

A production-grade personal portfolio built as Task 1 of the Future Interns Full-Stack Web Development track. Single-page application with anchor-based navigation, a serverless contact backend, and Lighthouse scores of 90+ Performance / 95 Accessibility / 100 Best Practices / 100 SEO.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Animation | Framer Motion | 12.x |
| Theme | next-themes | 0.4.x |
| Validation | Zod | 4.x |
| Email | Resend SDK | 6.x |
| Icons | Lucide React + react-icons/si | latest |

---

## Key Engineering Decisions

### 1. Tailwind v4 Dark Mode: Custom Variant

Tailwind CSS v4 changed its default dark mode strategy. The `dark:` variant compiles to a `@media (prefers-color-scheme: dark)` rule by default, not a `.dark` class selector. This conflicts with `next-themes`, which toggles a `dark` class on the `<html>` element, meaning a user clicking the theme toggle would have zero effect on any `dark:` utility in the stylesheet.

The fix is a single declaration at the top of `globals.css`:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

This tells the Tailwind v4 compiler to generate `.dark:bg-navy:where(.dark, .dark *)` class selectors instead of media query wrappers, restoring the class-based strategy that `next-themes` depends on.

---

### 2. SEO-Safe Lazy Hydration

All section components below the hero are imported via `next/dynamic()` with `ssr: true` (the default). This is a deliberate choice against `ssr: false`.

Using `ssr: false` would produce empty `<div>` placeholders in the server-rendered HTML. Search engine crawlers would see blank sections with none of the portfolio content, collapsing SEO despite the 100/100 local score. With `ssr: true`, dynamic imports split Framer Motion and animation-heavy section code into deferred JS chunks, reducing Total Blocking Time without sacrificing indexability. The HTML delivered to crawlers is fully rendered.

---

### 3. Secure Serverless Mail Routing

The `/api/contact` route handles POST requests through a validation-first pipeline:

1. **Payload validation** — `contactSchema.safeParse(body)` runs before any email dispatch. On failure, `z.flattenError(parsed.error).fieldErrors` produces a flat `{ fieldName: string[] }` object the client maps directly to inline form errors with no parsing logic.
2. **Honeypot check** — if the honeypot field is non-empty the route returns a fake `200 OK` without dispatching anything, avoiding disclosure of the detection mechanism.
3. **Plain-text email body** — the Resend call uses the `text` property rather than `html`. Markup pasted into the message field arrives as literal characters rather than executable content, preventing HTML injection into the inbox client.
4. **Error boundary** — `try/catch` around the Resend call logs the raw error server-side via `console.error` while the client receives only a generic 500 message with no API internals exposed.

---

### 4. Spam Trap: Honeypot Architecture

The contact form includes a visually hidden input field that legitimate users never interact with:

```tsx
<div
  aria-hidden="true"
  style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
>
  <input name="honeypot" tabIndex={-1} autoComplete="off" />
</div>
```

Three properties work together:
- `position: absolute; left: -9999px` moves the field off-screen without `display: none`. Automated scripts that skip hidden fields still fill this one; real users never see it.
- `tabIndex={-1}` removes it from keyboard tab order so no keyboard user accidentally reaches it.
- `aria-hidden="true"` on the wrapper prevents screen readers from announcing the field.

The server checks `if (honeypot)` before any email dispatch and returns a convincing `{ success: true }` without revealing that detection occurred.

---

### 5. Motion Accessibility: `useReducedMotion()`

Every animated component checks `const reduced = useReducedMotion()` from Framer Motion before defining animation variants. When the OS "Reduce motion" setting is active:

- Framer Motion stagger variants resolve to their final visible state immediately with no fade-up, no delay, and no typing loop animation.
- CSS marquee animations are paused via `@media (prefers-reduced-motion: reduce) { animation-play-state: paused }`.
- The typing cursor stops blinking.

All content remains fully visible and accessible, satisfying WCAG 2.1 SC 2.3.3 for users with vestibular disorders or motion sensitivities.

---

## Local Setup

```bash
# Clone
git clone https://github.com/vamous-am/FUTURE_FS_01.git
cd FUTURE_FS_01

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local and add your Resend API key and deployment URL

# Production build + local preview
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | From [resend.com/api-keys](https://resend.com/api-keys). Contact form renders without it but email dispatch fails at runtime. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Your Vercel deployment URL. Used by `metadataBase`, `sitemap.xml`, and `robots.txt`. Falls back to `https://future-fs-01.vercel.app` if unset. |

---

## Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts   # Serverless POST handler: Zod validation + Resend
│   ├── layout.tsx             # Root layout, metadata, font loading
│   ├── page.tsx               # Section composition with next/dynamic imports
│   ├── sitemap.ts             # Dynamic sitemap generator
│   └── robots.ts              # Robots directives
├── components/
│   ├── layout/                # Sidebar, BottomBar, scroll-spy navigation
│   ├── sections/              # Hero, About, Projects, Expertise, Experience, Contact
│   └── ui/                   # Card, ProjectCard, Toast, ThemeToggle, ProfileAvatar
├── data/index.ts              # All content, zero hardcoding inside components
├── hooks/use-scroll-spy.ts    # Intersection Observer active-nav tracker
├── lib/
│   ├── constants.ts           # Design tokens, nav config, contact info, SITE_URL
│   ├── schemas.ts             # Zod contact schema, shared by client and server
│   └── resend.ts              # Resend client singleton
└── types/index.ts             # All TypeScript interfaces
```

---

## Lighthouse Scores (Production Build)

| Metric | Score |
|---|---|
| Performance | 90+ |
| Accessibility | 95 |
| Best Practices | 100 |
| SEO | 100 |

---

*Built for the Future Interns Full-Stack Web Development Internship Track, Task 1.*
