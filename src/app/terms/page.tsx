import type { Metadata } from "next";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms baseline for AutoReception demos and missed-call recovery services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="bg-cream px-6 py-16 text-ink">
      <article className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-ember">Last updated: June 27, 2026</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.04em]">Terms of Service</h1>
        <p className="mt-5 leading-7 text-ink/70">
          These terms are a practical launch baseline, not lawyer-reviewed legal advice. By using this site or requesting a demo, you agree to use AutoReception responsibly.
        </p>
        <section className="mt-8 space-y-4 leading-7 text-ink/70">
          <h2 className="text-2xl font-black text-ink">Demo content</h2>
          <p>The demo uses illustrative calls, text messages, customer names, and revenue numbers. It does not prove actual results for your business and does not represent a live integration unless separately configured.</p>
          <h2 className="text-2xl font-black text-ink">Service scope</h2>
          <p>AutoReception is intended to help businesses respond to missed calls, warm leads, qualify job details, and summarize recovered opportunities. Final sales, scheduling, pricing, and service decisions remain the business owner’s responsibility.</p>
          <h2 className="text-2xl font-black text-ink">Acceptable use</h2>
          <p>Do not use the service to send unlawful, deceptive, abusive, or non-consensual communications. Businesses are responsible for honoring opt-outs and following applicable SMS, privacy, and consumer-protection rules.</p>
          <h2 className="text-2xl font-black text-ink">No guaranteed outcomes</h2>
          <p>AutoReception can improve response speed and lead handling, but it does not guarantee booked jobs, revenue, ranking, ad performance, or customer satisfaction.</p>
          <h2 className="text-2xl font-black text-ink">Contact</h2>
          <p>Questions can be sent to {site.email}.</p>
        </section>
      </article>
    </main>
  );
}
