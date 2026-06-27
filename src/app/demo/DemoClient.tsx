"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type DemoStep = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
};

const demoSteps: DemoStep[] = [
  {
    id: "missed-call",
    eyebrow: "Step 01 / Missed call captured",
    title: "A homeowner calls after hours. Nobody on your team picks up.",
    body: "AutoReception catches the call before it turns into voicemail, gathers the urgent details, and keeps the homeowner from calling the next plumber on Google.",
  },
  {
    id: "sms",
    eyebrow: "Step 02 / Lead warmed by text",
    title: "The homeowner gets an instant, helpful text conversation.",
    body: "The assistant confirms the problem, urgency, address, access notes, and best callback time — without pretending to be a human dispatcher.",
  },
  {
    id: "lead-card",
    eyebrow: "Step 03 / Owner gets the qualified lead",
    title: "You receive the job details in a clean card, ready to call back.",
    body: "Instead of a vague missed-call log, you see job type, urgency, estimated value, customer intent, and the recommended next action.",
  },
  {
    id: "summary",
    eyebrow: "Step 04 / Weekly revenue view",
    title: "At the end of the week, you see what was recovered.",
    body: "Track handled missed calls, qualified jobs, booked appointments, and estimated revenue that would have gone to voicemail or competitors.",
  },
];

const smsMessages = [
  {
    from: "auto",
    text: "Hi Maya — this is AutoReception for Harbor Pipe Co. We saw you called about a plumbing issue. Is this an emergency or can it wait until normal hours?",
    time: "7:43 PM",
  },
  {
    from: "homeowner",
    text: "Emergency. Kitchen sink is backing up and water is leaking under the cabinet.",
    time: "7:44 PM",
  },
  {
    from: "auto",
    text: "Got it. Are you at 418 Cedar Ave, and can a technician access the kitchen tonight if the owner approves the callout?",
    time: "7:44 PM",
  },
  {
    from: "homeowner",
    text: "Yes. I am home all night. Please have someone call me ASAP.",
    time: "7:45 PM",
  },
  {
    from: "auto",
    text: "Thanks — we sent the details to Harbor Pipe Co. as an urgent drain/leak lead. Expect a callback shortly.",
    time: "7:45 PM",
  },
];

const recoveredStats = [
  ["18", "missed calls handled"],
  ["11", "qualified plumbing leads"],
  ["7", "appointments booked"],
  ["$6.8k", "estimated recovered revenue"],
];

const leadDetails = [
  ["Customer", "Maya Robinson"],
  ["Phone", "(206) 555-0148"],
  ["Job", "Kitchen sink backup + active cabinet leak"],
  ["Urgency", "Emergency — tonight"],
  ["Address", "418 Cedar Ave"],
  ["Best next step", "Call within 5 minutes and quote emergency dispatch fee"],
];

function cls(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function PhoneSimulator({ stepIndex }: { stepIndex: number }) {
  const isAnswered = stepIndex > 0;

  return (
    <div className="rounded-[2rem] border border-white/15 bg-[#0B0F0D] p-4 shadow-2xl shadow-black/40">
      <div className="mx-auto max-w-[19rem] rounded-[2rem] border border-white/10 bg-black p-4">
        <div className="mx-auto mb-4 h-1.5 w-20 rounded-full bg-white/20" />
        <div className="rounded-[1.5rem] bg-gradient-to-b from-[#13351F] to-[#050806] p-5 text-center">
          <p className="font-mono text-xs font-black uppercase tracking-[0.22em] text-[#00C853]">
            Incoming call
          </p>
          <div className="mx-auto mt-6 grid size-20 place-items-center rounded-full bg-[#00C853]/15 text-4xl">
            🚰
          </div>
          <h2 className="mt-5 text-2xl font-black tracking-[-0.05em] text-white">
            Maya Robinson
          </h2>
          <p className="mt-1 text-sm text-white/55">Homeowner near Queen Anne</p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-red-500/20 px-3 py-4 text-sm font-black text-red-100">
              Missed by crew
            </div>
            <div className="rounded-2xl bg-[#00C853] px-3 py-4 text-sm font-black text-black">
              Auto answered
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-white/45">
            <span>Call status</span>
            <span className={cls("rounded-full px-2 py-1", isAnswered ? "bg-[#00C853] text-black" : "bg-yellow-400 text-black")}>
              {isAnswered ? "Captured" : "Ringing"}
            </span>
          </div>
          <div className="mt-4 flex items-end gap-1.5">
            {[28, 52, 38, 68, 44, 74, 32, 60].map((height, index) => (
              <span
                key={index}
                className="w-full rounded-t bg-[#00C853]"
                style={{ height }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SmsConversation() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4">
      <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="grid size-11 place-items-center rounded-full bg-[#00C853] font-black text-black">AR</div>
        <div>
          <p className="font-black text-white">AutoReception</p>
          <p className="text-sm text-white/50">Warming lead for Harbor Pipe Co.</p>
        </div>
      </div>
      <div className="space-y-3">
        {smsMessages.map((message, index) => (
          <div
            key={`${message.time}-${index}`}
            className={cls("flex", message.from === "homeowner" ? "justify-end" : "justify-start")}
          >
            <div
              className={cls(
                "max-w-[86%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-lg",
                message.from === "homeowner"
                  ? "bg-white text-[#1A1A1A]"
                  : "bg-[#00C853] text-[#061008]",
              )}
            >
              <p>{message.text}</p>
              <p className="mt-2 font-mono text-[10px] font-black uppercase tracking-[0.16em] opacity-55">
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QualifiedLeadCard() {
  return (
    <div className="rounded-[2rem] border border-[#00C853]/35 bg-[#061008] p-5 shadow-2xl shadow-[#00C853]/10">
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start">
        <div>
          <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#00C853]">
            Qualified lead sent
          </p>
          <h3 className="mt-2 text-3xl font-black tracking-[-0.06em] text-white">
            Emergency plumbing job
          </h3>
          <p className="mt-2 text-white/60">Texted to owner at 7:46 PM</p>
        </div>
        <span className="w-fit rounded-full bg-red-500 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white">
          Hot lead
        </span>
      </div>
      <div className="mt-5 grid gap-3">
        {leadDetails.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:grid sm:grid-cols-[9rem_1fr] sm:gap-4">
            <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-white/45">{label}</p>
            <p className="mt-1 font-bold text-white sm:mt-0">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl bg-[#00C853] p-4 text-black">
        <p className="font-mono text-xs font-black uppercase tracking-[0.18em]">Recommended owner action</p>
        <p className="mt-2 text-lg font-black tracking-[-0.03em]">
          Call now. The homeowner confirmed urgency, address, and availability.
        </p>
      </div>
    </div>
  );
}

function WeeklySummary() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white p-5 text-[#1A1A1A] shadow-2xl shadow-black/30">
      <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-5 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#00A846]">
            Weekly recovery report
          </p>
          <h3 className="mt-2 text-3xl font-black tracking-[-0.06em]">Harbor Pipe Co.</h3>
        </div>
        <p className="font-mono text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
          Mon–Sun / mock data
        </p>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {recoveredStats.map(([value, label]) => (
          <div key={label} className="rounded-2xl border border-neutral-200 bg-[#F6F8F5] p-5">
            <p className="font-mono text-4xl font-black tracking-[-0.08em] text-[#00A846]">{value}</p>
            <p className="mt-2 text-sm font-black uppercase tracking-[0.12em] text-neutral-600">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border-l-4 border-l-[#00C853] bg-[#ECFFF4] p-5">
        <p className="font-black tracking-[-0.02em]">Owner takeaway</p>
        <p className="mt-2 leading-7 text-neutral-700">
          Your marketing does not need more unworked leads. It needs every missed call answered, qualified, and pushed toward a booked job.
        </p>
      </div>
    </div>
  );
}

function DemoPanel({ stepIndex }: { stepIndex: number }) {
  if (stepIndex === 0) return <PhoneSimulator stepIndex={stepIndex} />;
  if (stepIndex === 1) return <SmsConversation />;
  if (stepIndex === 2) return <QualifiedLeadCard />;
  return <WeeklySummary />;
}

export default function DemoClient() {
  const [stepIndex, setStepIndex] = useState(0);
  const activeStep = demoSteps[stepIndex];
  const progress = useMemo(() => ((stepIndex + 1) / demoSteps.length) * 100, [stepIndex]);

  return (
    <main className="min-h-screen bg-[#050806] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050806]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="size-3 rounded-full bg-[#00C853] shadow-[0_0_22px_#00C853]" />
            <span className="text-xl font-black tracking-[-0.04em]">AutoReception</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white/80 hover:bg-white/10 sm:inline-flex">
              Dashboard
            </Link>
            <a href="#audit" className="rounded-full bg-[#00C853] px-4 py-2 text-sm font-black text-black hover:bg-[#18ee73]">
              Book audit
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,200,83,0.20),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          <div className="self-center">
            <p className="font-mono text-xs font-black uppercase tracking-[0.34em] text-[#00C853]">
              2-minute interactive demo / built for plumbers
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.075em] sm:text-7xl">
              See how one missed plumbing call becomes a booked job.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
              Walk through the exact flow a home-service owner cares about: capture the missed call, warm the homeowner, qualify the job, and show recovered revenue at the end of the week.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["0", "real integrations"],
                ["4", "demo moments"],
                ["2 min", "owner-friendly pitch"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="font-mono text-3xl font-black tracking-[-0.06em] text-[#00C853]">{value}</p>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-white/45">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-black uppercase tracking-[0.22em] text-white/45">Live demo</p>
                <p className="mt-1 text-2xl font-black tracking-[-0.04em]">Missed-call recovery</p>
              </div>
              <p className="rounded-full bg-[#00C853]/15 px-3 py-2 font-mono text-xs font-black text-[#00C853]">
                {stepIndex + 1}/4
              </p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[#00C853] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-6">
              <DemoPanel stepIndex={stepIndex} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-16">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-xs font-black uppercase tracking-[0.3em] text-[#00C853]">Current moment</p>
          <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.06em]">{activeStep.title}</h2>
          <p className="mt-5 text-lg leading-8 text-white/65">{activeStep.body}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <button
              type="button"
              onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
              disabled={stepIndex === 0}
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={() => setStepIndex((current) => Math.min(demoSteps.length - 1, current + 1))}
              disabled={stepIndex === demoSteps.length - 1}
              className="rounded-full bg-[#00C853] px-5 py-3 text-sm font-black text-black transition hover:bg-[#18ee73] disabled:cursor-not-allowed disabled:opacity-45"
            >
              Next step →
            </button>
          </div>
        </aside>

        <div className="grid gap-3">
          {demoSteps.map((step, index) => (
            <button
              key={step.id}
              type="button"
              onClick={() => setStepIndex(index)}
              className={cls(
                "rounded-3xl border p-5 text-left transition",
                stepIndex === index
                  ? "border-[#00C853] bg-[#00C853] text-black shadow-[0_0_34px_rgba(0,200,83,0.18)]"
                  : "border-white/10 bg-white/[0.04] text-white hover:border-white/25 hover:bg-white/[0.07]",
              )}
            >
              <p className={cls("font-mono text-xs font-black uppercase tracking-[0.2em]", stepIndex === index ? "text-black/55" : "text-[#00C853]")}>{step.eyebrow}</p>
              <p className="mt-2 text-xl font-black tracking-[-0.04em]">{step.title}</p>
              <p className={cls("mt-2 text-sm leading-6", stepIndex === index ? "text-black/70" : "text-white/55")}>{step.body}</p>
            </button>
          ))}
        </div>
      </section>

      <section id="audit" className="px-5 pb-16 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#00C853]/35 bg-[#ECFFF4] text-[#1A1A1A] shadow-2xl shadow-[#00C853]/10">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-7 sm:p-10">
              <p className="font-mono text-xs font-black uppercase tracking-[0.26em] text-[#008A39]">
                Conversion-focused offer
              </p>
              <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.065em] sm:text-5xl">
                Book a free missed-call audit.
              </h2>
              <p className="mt-5 text-lg leading-8 text-neutral-700">
                We will look at your call flow, response speed, after-hours coverage, and follow-up gaps — then show how many jobs your current process may be losing.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/dashboard" className="rounded-full bg-[#1A1A1A] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.12em] text-white hover:bg-black">
                  Book a free missed-call audit
                </Link>
                <Link href="/" className="rounded-full border border-[#1A1A1A] px-6 py-4 text-center text-sm font-black uppercase tracking-[0.12em] hover:bg-white">
                  Back to site
                </Link>
              </div>
            </div>
            <div className="bg-[#1A1A1A] p-7 text-white sm:p-10">
              <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-[#00C853]">Audit checks</p>
              <ul className="mt-5 space-y-4 text-sm leading-6 text-white/70">
                <li>✓ What happens when a plumber misses a high-intent emergency call</li>
                <li>✓ Whether the lead is qualified before an owner calls back</li>
                <li>✓ How fast the homeowner is pushed toward a booked appointment</li>
                <li>✓ How recovered calls are reported as revenue, not vanity metrics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
