import Link from 'next/link';
import {
  IoCheckmarkCircle,
  IoCloseCircle,
  IoFlash,
  IoMoonOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5';

import { AnimatedStat } from '@/components/animated-stat';
import { CallTicker } from '@/components/call-ticker';
import { DotPattern } from '@/components/dot-pattern';
import { Button } from '@/components/ui/button';
import { PricingSection } from '@/features/pricing/components/pricing-section';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className='flex flex-col gap-16 lg:gap-28'>
      <Hero />
      <CallTicker />
      <SocialProof />
      <Features />
      <ComparisonStrip />
      <PricingSection />
      <FinalCTA />
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Hero                                                                      */
/* ----------------------------------------------------------------------- */
function Hero() {
  return (
    <section className='relative overflow-hidden bg-zinc-950 px-6 py-20 lg:px-16 lg:py-28'>
      <DotPattern />
      {/* Subtle amber glow at top */}
      <div className='pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(249,131,36,0.12),transparent)]' />
      <div className='relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 text-center'>
        <span className='rounded-full border border-zinc-700 px-3 py-1 text-xs uppercase tracking-wider text-zinc-400'>
          For HVAC, plumbers, electricians, and roofers
        </span>
        <h1 className='bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-4xl font-extrabold leading-tight text-transparent lg:text-6xl'>
          Every missed call is a $500 job walking to your competitor.
        </h1>
        <p className='max-w-2xl text-lg text-zinc-300 lg:text-xl'>
          AutoReception picks up every call, books the job, and texts you the lead — flat $79/mo, no per-minute
          billing.
        </p>
        <div className='flex flex-col items-center gap-3 sm:flex-row'>
          <Button variant='sexy' asChild>
            <Link href='/signup'>Start free — 5 calls on us</Link>
          </Button>
          <Button variant='secondary' asChild>
            <Link href='/pricing'>See pricing</Link>
          </Button>
        </div>
        <p className='text-sm text-zinc-500'>No per-minute billing. No surprise overages. Cancel anytime.</p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/* Social proof                                                              */
/* ----------------------------------------------------------------------- */
function SocialProof() {
  const stats: [string, string][] = [
    ['62%', 'of calls to home-services SMBs go unanswered after hours'],
    ['$1,500', 'average value of an HVAC or plumbing emergency lead'],
    ['$0.00', "what your voicemail earns you when it doesn't pick up"],
  ];
  return (
    <section className='mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-4 sm:grid-cols-3'>
      {stats.map(([n, label]) => (
        <AnimatedStat key={label} value={n} label={label} />
      ))}
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/* Features                                                                  */
/* ----------------------------------------------------------------------- */
function Features() {
  const features = [
    {
      icon: <IoFlash className='h-6 w-6 text-amber-400' />,
      title: 'Picks up in 1 ring. Day or night.',
      copy: 'Your AI receptionist answers every call in under a second, in your business voice — even at 2am on a Saturday.',
    },
    {
      icon: <IoShieldCheckmarkOutline className='h-6 w-6 text-emerald-400' />,
      title: 'Flat $79 a month. No per-minute billing.',
      copy: 'Smith.ai bills 50¢ per call plus add-ons. Most agency setups want $300–$1,000/mo retainers. AutoReception is one flat price — busy month or slow.',
    },
    {
      icon: <IoMoonOutline className='h-6 w-6 text-sky-400' />,
      title: 'Texts the lead to your phone in real time.',
      copy: 'The moment a caller asks for service, you get an SMS with their name, number, address, and what they need. Call them back before your competitor wakes up.',
    },
  ];
  return (
    <section className='mx-auto w-full max-w-5xl px-4'>
      <h2 className='mb-10 text-center text-3xl font-bold lg:text-4xl'>
        Built for trades — not for receptionists in suits.
      </h2>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {features.map((f) => (
          <div key={f.title} className='rounded-lg border border-zinc-800 bg-zinc-950 p-6 transition-colors duration-200 hover:border-zinc-700'>
            <div className='mb-4'>{f.icon}</div>
            <h3 className='mb-2 text-lg font-semibold text-white'>{f.title}</h3>
            <p className='text-sm text-zinc-400'>{f.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/* Comparison table                                                          */
/* ----------------------------------------------------------------------- */
type CompRow = {
  feature: string;
  smith: boolean;
  agency: boolean;
  auto: boolean;
  isBadThing: boolean;
};

function CompCell({ value, isAuto, isBadThing }: { value: boolean; isAuto: boolean; isBadThing: boolean }) {
  if (isAuto) {
    return <IoCheckmarkCircle className='mx-auto h-5 w-5 text-emerald-400' />;
  }
  if (value && isBadThing) {
    return <IoCloseCircle className='mx-auto h-5 w-5 text-red-500' />;
  }
  if (!value && !isBadThing) {
    return <IoCloseCircle className='mx-auto h-5 w-5 text-zinc-600' />;
  }
  return <span className='block text-center text-xs text-zinc-500'>—</span>;
}

function ComparisonStrip() {
  const rows: CompRow[] = [
    { feature: 'Per-minute billing surprises', smith: true, agency: true, auto: false, isBadThing: true },
    { feature: 'Bills you while caller waits on hold', smith: true, agency: true, auto: false, isBadThing: true },
    { feature: 'Requires $300+/mo agency retainer', smith: true, agency: true, auto: false, isBadThing: true },
    { feature: 'Books jobs into Jobber / Housecall Pro', smith: false, agency: false, auto: true, isBadThing: false },
    { feature: 'Texts you the lead before they hang up', smith: false, agency: false, auto: true, isBadThing: false },
    { feature: 'Flat monthly price', smith: false, agency: false, auto: true, isBadThing: false },
  ];

  return (
    <section className='mx-auto w-full max-w-4xl px-4'>
      <h2 className='mb-8 text-center text-2xl font-bold lg:text-3xl'>How AutoReception compares</h2>
      <div className='overflow-hidden rounded-lg border border-zinc-800'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-zinc-900'>
            <tr>
              <th className='p-4 text-zinc-400'>&nbsp;</th>
              <th className='p-4 text-center text-zinc-400'>Smith.ai</th>
              <th className='p-4 text-center text-zinc-400'>Agency</th>
              <th className='p-4 text-center font-semibold text-white'>AutoReception</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.feature} className='border-t border-zinc-800 transition-colors duration-200 hover:bg-zinc-900/40'>
                <td className='p-4 text-zinc-300'>{r.feature}</td>
                <td className='p-4'>
                  <CompCell value={r.smith} isAuto={false} isBadThing={r.isBadThing} />
                </td>
                <td className='p-4'>
                  <CompCell value={r.agency} isAuto={false} isBadThing={r.isBadThing} />
                </td>
                <td className='p-4'>
                  <CompCell value={r.auto} isAuto={true} isBadThing={r.isBadThing} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/* Final CTA                                                                 */
/* ----------------------------------------------------------------------- */
function FinalCTA() {
  return (
    <section className='relative mx-auto w-full max-w-3xl overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 px-6 py-16 text-center lg:px-16'>
      <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent' />
      <h2 className='text-3xl font-bold text-white lg:text-4xl'>Stop losing jobs to voicemail.</h2>
      <p className='mt-3 text-zinc-400'>
        Set up your AI receptionist in 5 minutes. Try it free for your first 5 calls — no credit card required.
      </p>
      <div className='mt-6 flex justify-center gap-3'>
        <Button variant='sexy' asChild>
          <Link href='/signup'>Start free</Link>
        </Button>
        <Button variant='secondary' asChild>
          <Link href='/pricing'>See pricing</Link>
        </Button>
      </div>
      <ul className='mt-8 grid grid-cols-1 gap-2 text-sm text-zinc-400 sm:grid-cols-3'>
        <li className='flex items-center justify-center gap-2'>
          <IoCheckmarkCircle className='text-emerald-400' /> No credit card to start
        </li>
        <li className='flex items-center justify-center gap-2'>
          <IoCheckmarkCircle className='text-emerald-400' /> Cancel anytime
        </li>
        <li className='flex items-center justify-center gap-2'>
          <IoCheckmarkCircle className='text-emerald-400' /> Live in 5 minutes
        </li>
      </ul>
    </section>
  );
}
