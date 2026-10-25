"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Loader2 } from "lucide-react";
import { Reveal, SplitText, ease } from "@/components/motion";
import { Sprout } from "@/components/plant";
import { profile, socials } from "@/data/portfolio";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_FORMSPREE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-28 sm:px-10 md:py-40">
      <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">04</span>
        <span className="h-px w-10 bg-line" />
        Contact
      </div>

      <div className="flex items-end justify-between gap-6">
        <h2 className="text-[clamp(3rem,10vw,9rem)] font-medium leading-[0.92] tracking-[-0.04em]">
          <SplitText text="Let's grow" inView stagger={0.03} />
          <br />
          <SplitText
            text="something."
            inView
            delay={0.25}
            stagger={0.03}
            className="font-serif font-normal italic text-accent"
          />
        </h2>
        <Sprout inView delay={0.4} className="hidden h-56 shrink-0 md:block lg:h-72" />
      </div>

      <div className="mt-20 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">Email</div>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="break-all text-xl font-medium underline decoration-line decoration-1 underline-offset-8 transition-colors hover:decoration-accent md:text-2xl"
              >
                {profile.email}
              </a>
              <button
                onClick={copyEmail}
                aria-label="Copy email"
                className="relative flex size-9 shrink-0 items-center justify-center rounded-full border text-muted transition-colors hover:text-foreground"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "ok" : "copy"}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid grid-cols-2 gap-6">
            <div>
              <div className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">Phone</div>
              <a href={profile.phoneHref} className="transition-colors hover:text-accent">
                {profile.phone}
              </a>
            </div>
            <div>
              <div className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">Based in</div>
              <span>{profile.location}</span>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-12">
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">Elsewhere</div>
            <ul className="border-b">
              {socials.map((s) => (
                <li key={s.label} className="border-t">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-4 transition-colors hover:text-accent"
                  >
                    <span className="transition-transform duration-500 group-hover:translate-x-2">{s.label}</span>
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <form onSubmit={submit} className="space-y-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <Field label="Name" name="name" value={form.name} onChange={update} placeholder="Your name" />
              <Field label="Email" name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" />
            </div>
            <Field label="Subject" name="subject" value={form.subject} onChange={update} placeholder="What's this about?" />
            <Field label="Message" name="message" value={form.message} onChange={update} placeholder="Tell me about your project, or just say hello" textarea />

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-60"
              >
                {status === "sending" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                )}
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              <AnimatePresence>
                {(status === "sent" || status === "error") && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className={status === "sent" ? "text-sm text-accent" : "text-sm text-red-500"}
                    role="status"
                  >
                    {status === "sent"
                      ? "Thanks! Your message is on its way."
                      : "Something went wrong — please try again."}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  textarea,
  ...props
}: {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const className =
    "peer w-full resize-none border-b bg-transparent pb-3 pt-1 text-lg outline-none transition-colors placeholder:text-muted/50 focus:border-accent";
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-muted">{label}</span>
      {textarea ? (
        <textarea {...props} rows={4} required className={className} />
      ) : (
        <input {...props} required className={className} />
      )}
    </label>
  );
}
