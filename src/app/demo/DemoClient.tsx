"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3,CheckCircle2, ClipboardList, MessageCircle, PhoneMissed } from "lucide-react";

const stages = [
  {
    label: "Missed call",
    title: "Maya calls at 7:42 PM",
    body: "Kitchen sink line burst. She needs emergency plumbing help and will call the next company if she gets voicemail.",
    icon: PhoneMissed,
  },
  {
    label: "SMS warm-up",
    title: "Text-back starts in seconds",
    body: "AutoReception explains the missed call, asks what happened, confirms urgency, and collects address/context.",
    icon: MessageCircle,
  },
  {
    label: "Qualified job card",
    title: "The owner gets the useful version",
    body: "Instead of a missed-call notification, the business gets urgency, job type, location, callback window, and recommended next action.",
    icon: ClipboardList,
  },
  {
    label: "Weekly proof",
    title: "Recovered-call report",
    body: "The business sees handled calls, qualified jobs, booked work, and estimated recovered revenue.",
    icon: BarChart3,
  },
];

const sms = [
  ["AutoReception", "Hi Maya — this is Northside Plumbing’s missed-call assistant. Sorry we missed you. What plumbing issue are you dealing with right now?"],
  ["Maya", "Water is leaking under my kitchen sink and the shutoff valve is not stopping it."],
  ["AutoReception", "That sounds urgent. Is water still actively leaking, and what address should the dispatcher use for the callback?"],
  ["Maya", "Yes. 1842 Pine Street. I can answer now or in the next 15 minutes."],
  ["AutoReception", "Got it. I’ll mark this as emergency active leak and send the details to the team for fastest callback."],
];

export default function DemoClient() {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  const progress = useMemo(() => `${((active + 1) / stages.length) * 100}%`, [active]);
  const Icon = stage.icon;

  return (
    <main className="bg-ink px-6 py-16 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.95fr_1.05fr]">
          <div>
            <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-sage">
              Interactive 2-minute sales demo
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-7xl">
              Show the owner exactly what happens after a missed call.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              This is a local mock demo, not a live phone integration. It is designed to sell the operational outcome: recovered intent, warmer conversations, qualified callbacks, and proof.
            </p>
            <div className="mt-8 flex gap-3">
              <button
                className="rounded-full bg-white px-5 py-3 font-black text-ink disabled:opacity-40"
                disabled={active === 0}
                onClick={() => setActive((value) => Math.max(0, value - 1))}
              >
                Previous
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 font-black text-white"
                onClick={() => setActive((value) => Math.min(stages.length - 1, value + 1))}
              >
                Next step <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl">
            <div className="mb-4 h-2 rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-ember transition-all" style={{ width: progress }} />
            </div>
            <div className="rounded-[1.5rem] bg-cream p-6 text-ink">
              <div className="flex items-start gap-4">
                <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-ember text-white">
                  <Icon size={28} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-ember">{stage.label}</p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">{stage.title}</h2>
                  <p className="mt-3 leading-7 text-ink/68">{stage.body}</p>
                </div>
              </div>

              {active === 0 && (
                <div className="mt-8 rounded-3xl bg-white p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-ink/45">Incoming call log</p>
                  <div className="mt-4 grid gap-3 text-sm">
                    <p><strong>Caller:</strong> Maya Robinson</p>
                    <p><strong>Time:</strong> 7:42 PM, after office hours</p>
                    <p><strong>Risk:</strong> high — emergency searches usually call multiple providers</p>
                  </div>
                </div>
              )}

              {active === 1 && (
                <div className="mt-8 grid gap-3">
                  {sms.map(([speaker, message]) => (
                    <div className={speaker === "Maya" ? "ml-8 rounded-3xl bg-ink p-4 text-white" : "mr-8 rounded-3xl bg-white p-4"} key={message}>
                      <p className="text-xs font-black uppercase tracking-[0.16em] opacity-50">{speaker}</p>
                      <p className="mt-1 text-sm leading-6">{message}</p>
                    </div>
                  ))}
                </div>
              )}

              {active === 2 && (
                <div className="mt-8 grid gap-3 rounded-3xl bg-white p-5">
                  {[
                    ["Job", "Emergency active leak under kitchen sink"],
                    ["Address", "1842 Pine Street"],
                    ["Customer intent", "Ready for fastest available callback"],
                    ["Recommended action", "Call now; mention emergency dispatch availability"],
                    ["Estimated value", "$350-$1,200 depending on repair scope"],
                  ].map(([label, value]) => (
                    <div className="border-b border-ink/10 pb-3 last:border-0 last:pb-0" key={label}>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-ink/45">{label}</p>
                      <p className="mt-1 font-bold">{value}</p>
                    </div>
                  ))}
                </div>
              )}

              {active === 3 && (
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {[
                    ["42", "missed calls handled"],
                    ["19", "qualified jobs"],
                    ["11", "booked callbacks"],
                    ["$7,850", "estimated recovered revenue"],
                  ].map(([value, label]) => (
                    <div className="rounded-3xl bg-white p-5" key={label}>
                      <p className="text-3xl font-black">{value}</p>
                      <p className="mt-1 text-sm text-ink/55">{label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {stages.map((item, index) => (
            <button
              className={`rounded-3xl border p-5 text-left transition ${
                index === active ? "border-ember bg-ember/15" : "border-white/10 bg-white/[0.05] hover:bg-white/[0.08]"
              }`}
              key={item.label}
              onClick={() => setActive(index)}
            >
              <CheckCircle2 className={index <= active ? "text-sage" : "text-white/25"} />
              <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-white/45">Step {index + 1}</p>
              <p className="mt-2 font-black">{item.label}</p>
            </button>
          ))}
        </div>

        <div className="mt-14 rounded-[2rem] bg-white p-8 text-center text-ink">
          <h2 className="text-3xl font-black tracking-[-0.04em]">Use this as the pitch: “We recover the value after your marketing makes the phone ring.”</h2>
          <p className="mx-auto mt-3 max-w-2xl text-ink/60">
            The next real step is connecting the business phone/SMS provider and routing summaries into the owner’s preferred inbox or CRM.
          </p>
          <Link className="mt-6 inline-flex rounded-full bg-ink px-7 py-4 font-black text-white" href="/">
            Back to homepage
          </Link>
        </div>
      </section>
    </main>
  );
}
