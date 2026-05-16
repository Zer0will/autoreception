'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import { Database } from '@/libs/supabase/types';

const businessTypes = [
  'hvac',
  'plumbing',
  'electrical',
  'roofing',
  'landscaping',
  'cleaning',
  'general_contractor',
  'general',
] as const;

const agentSchema = z.object({
  business_name: z.string().min(2).max(120),
  business_type: z.enum(businessTypes),
  business_phone: z.string().max(40).optional().or(z.literal('')),
  business_email: z.string().email().optional().or(z.literal('')),
  service_area: z.string().max(160).optional().or(z.literal('')),
  greeting: z.string().min(10).max(500),
  voice: z.enum(['alloy', 'echo', 'shimmer', 'verse']),
  hours_summary: z.string().max(200).optional().or(z.literal('')),
  after_hours_message: z.string().max(500).optional().or(z.literal('')),
  forward_to_phone: z.string().max(40).optional().or(z.literal('')),
  send_sms_on_lead: z.coerce.boolean().optional().default(true),
  is_active: z.coerce.boolean().optional().default(true),
});

export async function saveAgentAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const raw = Object.fromEntries(formData.entries());
  const parsed = agentSchema.safeParse({
    ...raw,
    send_sms_on_lead: raw.send_sms_on_lead === 'on' || raw.send_sms_on_lead === 'true',
    is_active: raw.is_active === 'on' || raw.is_active === 'true',
  });

  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten() };
  }

  const payload = {
    user_id: user.id,
    business_name: parsed.data.business_name,
    business_type: parsed.data.business_type,
    business_phone: parsed.data.business_phone || null,
    business_email: parsed.data.business_email || null,
    service_area: parsed.data.service_area || null,
    greeting: parsed.data.greeting,
    voice: parsed.data.voice,
    hours_summary: parsed.data.hours_summary || null,
    after_hours_message: parsed.data.after_hours_message || null,
    forward_to_phone: parsed.data.forward_to_phone || null,
    send_sms_on_lead: parsed.data.send_sms_on_lead ?? true,
    is_active: parsed.data.is_active ?? true,
  };

  const { error } = await supabase.from('agents').upsert(payload as unknown as never[], { onConflict: 'user_id' });
  if (error) return { ok: false as const, error: { formErrors: [error.message], fieldErrors: {} } };

  revalidatePath('/dashboard');
  return { ok: true as const };
}
