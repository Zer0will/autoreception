import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, MessageSquareText, PhoneMissed, TimerReset } from "lucide-react";

import { outcomes, site, steps } from "@/lib/site";

const metrics = [
  ["0-60 sec", "ideal response window after a missed call"],
  ["4 facts", "urgency, job type, address, callback time"],
  ["1 report", "weekly recovered-call revenue view"],
];

const buyerPains = [
  "Your marketing works, then the phone rings while nobody can answer.",
  "The homeowner leaves voicemail, then calls three competitors.",
  "Your office sees a missed-call log, not a qualified job opportunity.",
];

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-ink">
      <section className="relative px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-grid bg-[length:48px_48px] opacity-20" />
        <div className="absolute left-1/2 top-20 size-[520px] -translate-x-1/2 rounded-full bg-ember/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-sage">
              For plumbers and home-service owners who lose jobs to voicemail
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.05em] text-white md:text-7xl">
              Turn missed calls into warm, qualified job opportunities.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              AutoReception catches missed calls, texts the customer back in seconds, qualifies the job, and sends the owner a callback-ready summary — so marketing spend turns into booked work, not voicemail.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link className="inline-flex items-center justify-center gap-2 rounded-full bg-ember px-7 py-4 font-black text-white shadow-glow transition hover:-translate-y-0.5" href="/demo">
                Walk through the demo <ArrowRight size={18} />
              </Link>
              <a className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 font-black text-white transition hover:bg-white/10" href="#offer">
                See the offer
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-4 shadow-2xl backdrop-blur">
            <div className="rounded-[1.5rem] bg-cream p-5 text-ink">
              <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-ember">Recovered lead</p>
                  <h2 className="text-2xl font-black">Burst pipe / after-hours</h2>
                </div>
                <span className="rounded-full bg-sage px-3 py-1 text-xs font-black">Hot</span>
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  ["Customer", "Maya Robinson, homeowner"],
                  ["Problem", "Water under kitchen sink, shutoff failed"],
                  ["Intent", "Wants first available emergency visit"],
                  ["Next action", "Call within 10 minutes; quote dispatch fee"],
                ].map(([label, value]) => (
                  <div className="rounded-2xl bg-white p-4" key={label}>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-ink/45">{label}</p>
                    <p className="mt-1 font-bold">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-ink p-4 text-white">
                <p className="text-sm text-white/65">Illustrative weekly report</p>
                <p className="mt-1 text-3xl font-black">$7,850</p>
                <p className="text-sm text-white/65">estimated revenue from recovered missed calls</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.04] px-6 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {metrics.map(([value, label]) => (
            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6" key={value}>
              <p className="text-3xl font-black text-white">{value}</p>
              <p className="mt-2 text-sm text-white/65">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20" id="offer">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-ember">The different offer</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">
              Not “we got you more leads.” “We helped you stop losing the leads you already paid for.”
            </h2>
          </div>
          <div className="grid gap-4">
            {outcomes.map((item) => (
              <div className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-5" key={item}>
                <CheckCircle2 className="mt-1 shrink-0 text-sage" />
                <p className="text-lg font-semibold leading-7 text-white/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 py-20 text-ink" id="how-it-works">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-ember">How it works</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl">A simple recovery loop for missed-call revenue.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {steps.map((step) => (
              <article className="rounded-[1.5rem] bg-white p-6 shadow-sm" key={step.eyebrow}>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-ember">{step.eyebrow}</p>
                <h3 className="mt-4 text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/65">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {[
            [PhoneMissed, "Bear case", buyerPains.join(" ")],
            [MessageSquareText, "Fix", "Respond instantly, qualify politely, and give the owner a callback-ready summary."],
            [BarChart3, "Proof", "Report recovered opportunities weekly so the business sees value beyond lead counts."],
          ].map(([Icon, title, body]) => {
            const CardIcon = Icon as typeof PhoneMissed;
            return (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7" key={String(title)}>
                <CardIcon className="text-ember" size={32} />
                <h3 className="mt-5 text-2xl font-black text-white">{String(title)}</h3>
                <p className="mt-3 leading-7 text-white/68">{String(body)}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-ember p-8 text-center text-white shadow-glow md:p-12">
          <TimerReset className="mx-auto" size={40} />
          <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-5xl">Stop losing the leads you already paid for.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
            Your ads and referrals already make the phone ring. AutoReception recovers the value after that by texting back, warming the lead, qualifying the job, and proving what was recovered each week.
          </p>
          <Link className="mt-8 inline-flex rounded-full bg-white px-8 py-4 font-black text-ink transition hover:bg-sage" href={site.auditUrl}>
            Open the interactive demo
          </Link>
        </div>
      </section>
    </main>
  );
}
