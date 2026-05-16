import { NextRequest } from 'next/server';

import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';

/**
 * Twilio Status Callback (call completed).
 * Configure on the same number: "Call status changes" → POST /api/voice/status
 */
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const callSid = String(form.get('CallSid') ?? '');
  const callStatus = String(form.get('CallStatus') ?? '');
  const duration = parseInt(String(form.get('CallDuration') ?? '0'), 10) || 0;
  const recordingUrl = (form.get('RecordingUrl') as string | null) ?? null;

  if (!callSid) return Response.json({ ok: false }, { status: 400 });

  await supabaseAdminClient
    .from('calls')
    .update({
      duration_seconds: duration,
      recording_url: recordingUrl,
    })
    .eq('twilio_call_sid', callSid);

  // If completed and we have a structured lead, optionally fire SMS via Twilio.
  if (callStatus === 'completed') {
    const { data: call } = await supabaseAdminClient
      .from('calls')
      .select('id, user_id, lead_name, lead_phone, lead_address, lead_job_type, lead_urgency, summary, agent_id')
      .eq('twilio_call_sid', callSid)
      .maybeSingle();

    if (call?.lead_phone || call?.summary) {
      const { data: agent } = await supabaseAdminClient
        .from('agents')
        .select('forward_to_phone, send_sms_on_lead, business_name')
        .eq('id', call.agent_id)
        .maybeSingle();

      // Confirm an active paid sub before sending SMS
      const { data: sub } = await supabaseAdminClient
        .from('subscriptions')
        .select('id')
        .eq('user_id', call.user_id)
        .in('status', ['trialing', 'active'])
        .maybeSingle();

      if (sub && agent?.send_sms_on_lead && agent.forward_to_phone) {
        await sendTwilioSms(
          agent.forward_to_phone,
          `New ${call.lead_urgency ?? 'lead'} for ${agent.business_name}: ${call.lead_name ?? 'caller'} — ${call.lead_phone ?? ''}\n${call.summary ?? ''}`
        );
      }
    }
  }

  return Response.json({ ok: true });
}

async function sendTwilioSms(to: string, body: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!sid || !token || !from) return;

  const params = new URLSearchParams({ To: to, From: from, Body: body });
  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });
}
