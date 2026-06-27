import type { Metadata } from "next";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy baseline for AutoReception missed-call recovery demos and lead forms.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="bg-cream px-6 py-16 text-ink">
      <article className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-ember">Last updated: June 27, 2026</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.04em]">Privacy Policy</h1>
        <p className="mt-5 leading-7 text-ink/70">
          This is a practical launch baseline, not lawyer-reviewed legal advice. AutoReception helps businesses respond to missed calls, warm leads by SMS, and summarize qualified opportunities.
        </p>
        <section className="mt-8 space-y-4 leading-7 text-ink/70">
          <h2 className="text-2xl font-black text-ink">Information we may collect</h2>
          <p>When you request a demo or audit, we may collect your name, business name, website, phone number, email address, and notes you submit.</p>
          <p>If a business connects phone/SMS systems in the future, call metadata, message content, job details, urgency, address, and callback preferences may be processed to provide the service.</p>
          <h2 className="text-2xl font-black text-ink">How we use information</h2>
          <p>We use information to respond to inquiries, provide demos, qualify missed-call opportunities, create summaries, improve the service, and communicate about AutoReception.</p>
          <h2 className="text-2xl font-black text-ink">SMS consent</h2>
          <p>By submitting a form or asking to be contacted by text, you consent to receive operational SMS messages related to your inquiry or missed-call recovery workflow. Message and data rates may apply. Reply STOP to opt out when supported.</p>
          <h2 className="text-2xl font-black text-ink">Vendors</h2>
          <p>AutoReception may use hosting, analytics, email, phone, SMS, AI, and CRM vendors as needed. Demo pages on this site use illustrative data and do not represent a live customer integration.</p>
          <h2 className="text-2xl font-black text-ink">Contact</h2>
          <p>Questions can be sent to {site.email}.</p>
        </section>
      </article>
    </main>
  );
}
