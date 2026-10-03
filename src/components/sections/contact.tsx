"use client";

/** Contact section with a two-column layout — contact details left, form right.
 *  Validates inputs client-side with Zod before submission, then mirrors server-side validation errors
 *  returned as `fieldErrors` from the `/api/contact` route directly to inline form field messages.
 *  Includes a honeypot field and a localStorage-based 60-second double-submit guard. */

import { useState, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { Mail, MapPin, Loader2 } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { z } from "zod";
import { CONTAINER_CLASS, SECTION_PADDING, CONTACT_INFO } from "@/lib/constants";
import { contactSchema } from "@/lib/schemas";
import type { ContactFieldErrors } from "@/lib/schemas";
import { Toast } from "@/components/ui/toast";
import type { ToastVariant } from "@/components/ui/toast";
import type { SectionProps } from "@/types";

const DOUBLE_SUBMIT_COOLDOWN_MS = 60_000;
/** Client-side UX guard against accidental double-clicks. Stored in localStorage and trivially bypassable —
 *  not a substitute for server-side rate limiting. */
const LS_LAST_SUBMIT_KEY = "portfolio_contact_last_submit";

interface ToastState { message: string; variant: ToastVariant; }
interface FormState { name: string; email: string; message: string; honeypot: string; }
const emptyForm: FormState = { name: "", email: "", message: "", honeypot: "" };

/** Empty state pair — this element only hands "hidden"/"visible" down to its (un-animated) children. */
const pageVariants: Variants = { hidden: {}, visible: {} };

export function Contact({ isActive }: SectionProps) {
  const [form, setForm]               = useState<FormState>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [pending, setPending]         = useState(false);
  const [toast, setToast]             = useState<ToastState | null>(null);
  const dismissToast = useCallback(() => setToast(null), []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof ContactFieldErrors]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const clientValidation = contactSchema.safeParse(form);
    if (!clientValidation.success) {
      setFieldErrors(z.flattenError(clientValidation.error).fieldErrors);
      return;
    }

    const lastSubmit = localStorage.getItem(LS_LAST_SUBMIT_KEY);
    if (lastSubmit && Date.now() - parseInt(lastSubmit, 10) < DOUBLE_SUBMIT_COOLDOWN_MS) {
      setToast({ message: "Message already sent. Please wait 60 seconds before sending again.", variant: "error" });
      return;
    }

    setPending(true);
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 400 && data.fieldErrors) setFieldErrors(data.fieldErrors);
        else setToast({ message: data.error ?? "Something went wrong. Please try again.", variant: "error" });
        return;
      }

      localStorage.setItem(LS_LAST_SUBMIT_KEY, String(Date.now()));
      setForm(emptyForm);
      setToast({ message: "Message sent! I'll get back to you soon.", variant: "success" });
    } catch {
      setToast({ message: "Network error. Please check your connection and try again.", variant: "error" });
    } finally {
      setPending(false);
    }
  }

  return (
    <motion.section
      id="contact"
      variants={pageVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      className={`${SECTION_PADDING} bg-background`}
    >
      <div className={CONTAINER_CLASS}>

        <h2 className="font-heading text-4xl font-bold text-foreground mb-2">Get In Touch</h2>
        <div className="w-12 h-1 bg-primary rounded-full mb-16" aria-hidden="true" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <p className="text-base text-foreground/60 leading-relaxed mb-8">
                Have a project in mind, a question about my work, or just want to connect?
                Send a message and I&apos;ll get back to you.
              </p>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-3 text-sm text-foreground/70">
                  <Mail className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-primary-text transition-colors">{CONTACT_INFO.email}</a>
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground/70">
                  <MapPin className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  <span>{CONTACT_INFO.location}</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm border border-foreground/10 text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors">
                <SiGithub className="w-4 h-4" aria-hidden="true" />
                GitHub
              </a>
              <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm border border-foreground/10 text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors">
                {/* Inline SVG — simple-icons v14 removed the LinkedIn logo due to brand guideline restrictions */}
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

              {/* Honeypot — off-screen via position:absolute so bots fill it but keyboard/screen-reader users never reach it */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}>
                <label htmlFor="honeypot">Leave this empty</label>
                <input id="honeypot" name="honeypot" type="text" value={form.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                <input id="name" name="name" type="text" value={form.name} onChange={handleChange} autoComplete="name"
                  aria-describedby={fieldErrors.name ? "name-error" : undefined} aria-invalid={!!fieldErrors.name}
                  className="px-4 py-3 rounded-md text-sm bg-white dark:bg-foreground/5 border border-foreground/10 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/30 transition-colors"
                  placeholder="your name" />
                {fieldErrors.name && <p id="name-error" role="alert" className="text-xs text-red-500 mt-1">{fieldErrors.name[0]}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email"
                  aria-describedby={fieldErrors.email ? "email-error" : undefined} aria-invalid={!!fieldErrors.email}
                  className="px-4 py-3 rounded-md text-sm bg-white dark:bg-foreground/5 border border-foreground/10 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/30 transition-colors"
                  placeholder="name@gmail.com" />
                {fieldErrors.email && <p id="email-error" role="alert" className="text-xs text-red-500 mt-1">{fieldErrors.email[0]}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange}
                  aria-describedby={fieldErrors.message ? "message-error" : undefined} aria-invalid={!!fieldErrors.message}
                  className="px-4 py-3 rounded-md text-sm bg-white dark:bg-foreground/5 border border-foreground/10 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/30 transition-colors resize-none"
                  placeholder="Tell me about your project or question..." />
                {fieldErrors.message && <p id="message-error" role="alert" className="text-xs text-red-500 mt-1">{fieldErrors.message[0]}</p>}
              </div>

              <button type="submit" disabled={pending} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-white font-semibold text-sm hover:bg-primary/85 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
                {pending && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                {pending ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} variant={toast.variant} onDismiss={dismissToast} />}
    </motion.section>
  );
}
