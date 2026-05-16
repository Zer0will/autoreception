import { NextRequest } from 'next/server';

import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';

/**
 * Twilio Voice webhook (POST application/x-www-form-urlencoded).
 *
 * Configure the AutoReception phone number in Twilio: Voice "A call comes in" →
 *    Webhook → https://<your-domain>/api/voice/incoming  (HTTP POST)
 *
 * We:
 *  1. Identify which agent owns the dialed number (`To`).
 *  2. Check the owner's entitlements: if free tier limit hit, play a fallback
 *     message and bail out without spawning a Realtime session.
 *  3. Otherwise return TwiML that opens a bidirectional <Stream> to our /api/voice/stream
 *     WebSocket, which proxies audio between Twilio and OpenAI Realtime.
 */
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const to = String(form.get('To') ?? '');
  const from = String(form.get('From') ?? '');
  const callSid = String(form.get('CallSid') ?? '');

  // Look up agent + owner
  const { data: agent } = await supabaseAdminClient
    .from('agents')
    .select('id, user_id, business_name, business_type, greeting, voice, hours_summary, after_hours_message, forward_to_phone, send_sms_on_lead, is_active')
    .eq('twilio_phone_number', to)
    .maybeSingle();

  if (!agent || !agent.is_active) {
    return twiml(`<Response><Say voice="Polly.Joanna">Sorry, this line is not currently active.</Say><Hangup/></Response>`);
  }

  // Check usage against subscription tier
  const periodStart = new Date();
  periodStart.setUTCDate(1);
  periodStart.setUTCHours(0, 0, 0, 0);

  const [{ count }, subRes] = await Promise.all([
    supabaseAdminClient
      .from('calls')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', agent.user_id)
      .gte('created_at', periodStart.toISOString()),
    supabaseAdminClient
      .from('subscriptions')
      .select('id, status, prices(products(metadata))')
      .eq('user_id', agent.user_id)
      .in('status', ['trialing', 'active'])
      .maybeSingle(),
  ]);

  const isPaid = !!subRes.data;
  const callsThisMonth = count ?? 0;
  const FREE_LIMIT = 5;

  if (!isPaid && callsThisMonth >= FREE_LIMIT) {
    // Free-tier limit hit — politely bounce the caller.
    return twiml(
      `<Response><Say voice="Polly.Joanna">Thanks for calling ${escapeXml(agent.business_name)}. We are not able to take this call right now. Please try again later.</Say><Hangup/></Response>`
    );
  }

  // Pre-create the call row so the WS handler can append transcript later.
  await supabaseAdminClient.from('calls').insert({
    agent_id: agent.id,
    user_id: agent.user_id,
    caller_phone: from,
    twilio_call_sid: callSid,
    outcome: 'unknown',
  });

  const host = req.headers.get('host');
  const wsUrl = `wss://${host}/api/voice/stream?agent_id=${agent.id}&call_sid=${encodeURIComponent(callSid)}`;

  // <Connect><Stream/></Connect> hands the audio to our WebSocket endpoint.
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Stream url="${wsUrl}" />
  </Connect>
</Response>`;
  return twiml(xml);
}

function twiml(body: string) {
  return new Response(body.startsWith('<?xml') ? body : `<?xml version="1.0" encoding="UTF-8"?>${body}`, {
    headers: { 'content-type': 'text/xml; charset=utf-8' },
  });
}

function escapeXml(s: string) {
  return s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]!));
}
