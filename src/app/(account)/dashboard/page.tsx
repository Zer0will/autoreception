import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { getEntitlements } from '@/features/account/controllers/get-entitlements';
import { getSession } from '@/features/account/controllers/get-session';
import { AgentForm } from '@/features/agent/components/agent-form';
import { SimulateCallButton } from '@/features/agent/components/simulate-call-button';
import { getAgent, getRecentCalls } from '@/features/agent/controllers/get-agent';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const [agent, calls, ent] = await Promise.all([getAgent(), getRecentCalls(25), getEntitlements()]);

  return (
    <section className='flex flex-col gap-8 py-10'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold'>Your AI receptionist</h1>
        <p className='text-zinc-400'>
          {ent.tier === 'paid'
            ? 'Pro plan — unlimited calls, instant lead SMS, after-hours coverage.'
            : `Free plan — ${ent.callsThisMonth} of ${ent.monthlyCallLimit} calls used this month.`}
        </p>
      </header>

      {/* Paywall banner */}
      {ent.hasReachedLimit && (
        <div className='rounded-md border border-amber-600/40 bg-amber-950/40 p-4'>
          <h2 className='text-lg font-semibold text-amber-200'>You&apos;ve hit the free-tier limit</h2>
          <p className='text-sm text-amber-100/80'>
            Your AI agent has paused. Upgrade to Pro for unlimited handled calls, instant lead SMS, and after-hours
            coverage.
          </p>
          <div className='mt-3'>
            <Button variant='sexy' asChild>
              <Link href='/pricing'>Upgrade to Pro — $79/mo</Link>
            </Button>
          </div>
        </div>
      )}

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        {/* LEFT: agent config */}
        <div className='rounded-md border border-zinc-800 bg-zinc-950 p-5'>
          <h2 className='mb-4 text-lg font-semibold'>Agent configuration</h2>
          <AgentForm agent={agent} locked={ent.hasReachedLimit} />
        </div>

        {/* RIGHT: recent calls */}
        <div className='rounded-md border border-zinc-800 bg-zinc-950 p-5'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Recent calls</h2>
            <span className='text-xs text-zinc-500'>
              {ent.callsRemaining === 'unlimited' ? 'unlimited remaining' : `${ent.callsRemaining} remaining`}
            </span>
          </div>

          <div className='mb-4'>
            <SimulateCallButton />
          </div>

          {calls.length === 0 ? (
            <p className='text-sm text-zinc-500'>
              No calls yet. Once you point your business number to your AutoReception phone, calls show up here in real
              time.
            </p>
          ) : (
            <ul className='flex flex-col gap-3'>
              {calls.map((c) => (
                <li key={c.id} className='rounded-md border border-zinc-800 p-3'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='font-medium'>
                      {c.lead_name || c.caller_name || c.caller_phone || 'Unknown caller'}
                    </span>
                    <span className='text-xs text-zinc-500'>{new Date(c.created_at).toLocaleString()}</span>
                  </div>
                  {c.summary && <p className='mt-1 text-sm text-zinc-300'>{c.summary}</p>}
                  <div className='mt-2 flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-zinc-500'>
                    {c.outcome && <span className='rounded bg-zinc-800 px-2 py-0.5'>{c.outcome}</span>}
                    {c.lead_urgency && <span className='rounded bg-zinc-800 px-2 py-0.5'>{c.lead_urgency}</span>}
                    {c.lead_phone && <span className='rounded bg-zinc-800 px-2 py-0.5'>{c.lead_phone}</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
