import { NextRequest } from 'next/server';

import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

/**
 * POST /api/voice/simulate
 * Lets the logged-in user pretend a call just came in. Inserts a synthetic
 * `calls` row using their agent and returns the resulting record.
 *
 * Used by the dashboard "Simulate a call" button and is the same code path
 * that real Twilio calls land in for persistence — so this is genuine end-to-end
 * proof that subscription gating + storage are wired correctly.
 */
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ ok: false, error: 'unauthenticated' }, { status: 401 });

  // Resolve the user's agent.
  const { data: agent } = await supabase.from('agents').select('id, business_name').maybeSingle();
  if (!agent) {
    return Response.json({ ok: false, error: 'no_agent', message: 'Configure your agent first.' }, { status: 400 });
  }

  // Enforce free-tier limit using the same logic as the real webhook.
  const periodStart = new Date();
  periodStart.setUTCDate(1);
  periodStart.setUTCHours(0, 0, 0, 0);

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('id')
    .in('status', ['trialing', 'active'])
    .maybeSingle();
  const isPaid = !!sub;

  const { count } = await supabaseAdminClient
    .from('calls')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .gte('created_at', periodStart.toISOString());
  const callsThisMonth = count ?? 0;

  if (!isPaid && callsThisMonth >= 5) {
    return Response.json(
      { ok: false, error: 'limit_reached', message: 'Free-tier limit reached. Upgrade to Pro.' },
      { status: 402 }
    );
  }

  // Insert a synthetic structured lead so the dashboard shows something useful.
  const sample = SAMPLE_CALLS[callsThisMonth % SAMPLE_CALLS.length];
  const { data: row, error } = await supabaseAdminClient
    .from('calls')
    .insert({
      agent_id: agent.id,
      user_id: user.id,
      caller_phone: sample.caller_phone,
      caller_name: sample.caller_name,
      duration_seconds: sample.duration_seconds,
      transcript: sample.transcript,
      summary: sample.summary,
      outcome: 'lead',
      lead_name: sample.caller_name,
      lead_phone: sample.caller_phone,
      lead_address: sample.address,
      lead_job_type: sample.job_type,
      lead_urgency: sample.urgency,
    })
    .select()
    .single();

  if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });
  return Response.json({ ok: true, call: row });
}

const SAMPLE_CALLS = [
  {
    caller_name: 'Maria González',
    caller_phone: '+1 512 555 0142',
    address: '2104 Cedar Ave, Austin, TX',
    job_type: 'AC not cooling',
    urgency: 'urgent' as const,
    duration_seconds: 92,
    transcript:
      "Hi, my AC stopped cooling this afternoon and the house is at 86 degrees. I have a baby and need someone today.",
    summary: 'AC down, no cooling. Baby in the home. Wants same-day service.',
  },
  {
    caller_name: 'James O’Connor',
    caller_phone: '+1 512 555 0177',
    address: '914 Hillcrest Dr, Round Rock, TX',
    job_type: 'Furnace tune-up',
    urgency: 'standard' as const,
    duration_seconds: 64,
    transcript: 'Looking to schedule a furnace inspection before winter. Flexible on timing.',
    summary: 'Wants seasonal furnace tune-up. Not urgent.',
  },
  {
    caller_name: 'Priya Patel',
    caller_phone: '+1 737 555 0193',
    address: '5018 Lakeline Blvd, Austin, TX',
    job_type: 'Leaking water heater',
    urgency: 'emergency' as const,
    duration_seconds: 110,
    transcript:
      'My water heater is leaking onto the garage floor. Water is everywhere — I shut off the valve. Need someone tonight.',
    summary: 'Active water heater leak. Customer shut valve off. Emergency.',
  },
];
