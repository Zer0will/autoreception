'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { saveAgentAction } from '../actions/save-agent-action';

type AgentRow = {
  business_name?: string | null;
  business_type?: string | null;
  business_phone?: string | null;
  business_email?: string | null;
  service_area?: string | null;
  greeting?: string | null;
  voice?: string | null;
  hours_summary?: string | null;
  after_hours_message?: string | null;
  forward_to_phone?: string | null;
  send_sms_on_lead?: boolean | null;
  is_active?: boolean | null;
} | null;

const BUSINESS_TYPES = [
  ['hvac', 'HVAC'],
  ['plumbing', 'Plumbing'],
  ['electrical', 'Electrical'],
  ['roofing', 'Roofing'],
  ['landscaping', 'Landscaping'],
  ['cleaning', 'Cleaning'],
  ['general_contractor', 'General contractor'],
  ['general', 'Other / general'],
] as const;

export function AgentForm({ agent, locked }: { agent: AgentRow; locked?: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  function onSubmit(formData: FormData) {
    setMessage(null);
    startTransition(async () => {
      const res = await saveAgentAction(formData);
      if (res.ok) {
        setMessage('Saved.');
        router.refresh();
      } else {
        setMessage(res.error.formErrors?.[0] ?? 'Something went wrong.');
      }
    });
  }

  return (
    <form action={onSubmit} className='flex flex-col gap-4 text-sm'>
      <fieldset disabled={locked} className='flex flex-col gap-4'>
        <Field label='Business name'>
          <Input name='business_name' required defaultValue={agent?.business_name ?? ''} placeholder='Acme HVAC' />
        </Field>

        <Field label='Business type'>
          <select
            name='business_type'
            defaultValue={agent?.business_type ?? 'general'}
            className='h-10 rounded-md border border-zinc-800 bg-zinc-900 px-3 text-white'
          >
            {BUSINESS_TYPES.map(([v, label]) => (
              <option key={v} value={v}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <Field label='Business phone'>
            <Input name='business_phone' defaultValue={agent?.business_phone ?? ''} placeholder='+1 555 123 4567' />
          </Field>
          <Field label='Forward urgent calls to'>
            <Input
              name='forward_to_phone'
              defaultValue={agent?.forward_to_phone ?? ''}
              placeholder='+1 555 000 0000'
            />
          </Field>
        </div>

        <Field label='Service area'>
          <Input
            name='service_area'
            defaultValue={agent?.service_area ?? ''}
            placeholder='Within 25 miles of Austin, TX'
          />
        </Field>

        <Field label='Greeting (what the AI says when it picks up)'>
          <textarea
            name='greeting'
            required
            rows={2}
            defaultValue={
              agent?.greeting ??
              'Thanks for calling Acme HVAC, this is the AI assistant — how can I help you today?'
            }
            className='rounded-md border border-zinc-800 bg-zinc-900 p-3 text-white'
          />
        </Field>

        <Field label='Hours summary'>
          <Input
            name='hours_summary'
            defaultValue={agent?.hours_summary ?? 'Monday to Friday, 8 AM to 6 PM'}
          />
        </Field>

        <Field label='After-hours message'>
          <textarea
            name='after_hours_message'
            rows={2}
            defaultValue={
              agent?.after_hours_message ??
              "We're closed right now, but I can take a message and have someone get back to you first thing tomorrow."
            }
            className='rounded-md border border-zinc-800 bg-zinc-900 p-3 text-white'
          />
        </Field>

        <Field label='Voice'>
          <select
            name='voice'
            defaultValue={agent?.voice ?? 'alloy'}
            className='h-10 rounded-md border border-zinc-800 bg-zinc-900 px-3 text-white'
          >
            <option value='alloy'>Alloy (neutral)</option>
            <option value='echo'>Echo (warm male)</option>
            <option value='shimmer'>Shimmer (warm female)</option>
            <option value='verse'>Verse (energetic)</option>
          </select>
        </Field>

        <label className='flex items-center gap-2'>
          <input type='checkbox' name='send_sms_on_lead' defaultChecked={agent?.send_sms_on_lead ?? true} />
          <span>Text me instantly when a lead comes in</span>
        </label>

        <label className='flex items-center gap-2'>
          <input type='checkbox' name='is_active' defaultChecked={agent?.is_active ?? true} />
          <span>Agent is live and answering calls</span>
        </label>
      </fieldset>

      <div className='flex items-center gap-3'>
        <Button type='submit' variant='sexy' disabled={isPending || locked}>
          {isPending ? 'Saving…' : 'Save agent'}
        </Button>
        {message && <span className='text-zinc-400'>{message}</span>}
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className='flex flex-col gap-1'>
      <span className='text-xs uppercase tracking-wide text-zinc-400'>{label}</span>
      {children}
    </label>
  );
}
