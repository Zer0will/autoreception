/**
 * AUTORECEPTION CORE SCHEMA
 * Tables specific to the AI receptionist product.
 * Runs AFTER the boilerplate's init migration so it can reference auth.users and subscriptions.
 */

/* ============================================================
 * AGENTS — one AI receptionist configuration per business
 * ============================================================ */
create table public.agents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,

  -- business identity
  business_name text not null,
  business_type text not null default 'general' check (
    business_type in ('hvac', 'plumbing', 'electrical', 'roofing', 'landscaping', 'cleaning', 'general_contractor', 'general')
  ),
  business_phone text,
  business_email text,
  service_area text,

  -- agent personality
  greeting text not null default 'Thanks for calling. How can I help you today?',
  voice text not null default 'alloy',
  hours_summary text default 'Monday to Friday, 8 AM to 6 PM',
  after_hours_message text default 'We''re closed right now, but I can take a message and have someone get back to you first thing tomorrow.',

  -- forward / escalation
  forward_to_phone text,
  send_sms_on_lead boolean not null default true,

  -- runtime
  is_active boolean not null default true,
  twilio_phone_number text,

  created_at timestamptz default timezone('utc', now()) not null,
  updated_at timestamptz default timezone('utc', now()) not null
);

create unique index agents_user_id_unique on public.agents(user_id);
alter table public.agents enable row level security;
create policy "owner_select_agents" on public.agents for select using (auth.uid() = user_id);
create policy "owner_insert_agents" on public.agents for insert with check (auth.uid() = user_id);
create policy "owner_update_agents" on public.agents for update using (auth.uid() = user_id);
create policy "owner_delete_agents" on public.agents for delete using (auth.uid() = user_id);

/* ============================================================
 * CALLS — every captured missed/inbound call handled by the agent
 * ============================================================ */
create type public.call_outcome as enum ('lead', 'message', 'spam', 'wrong_number', 'unknown');

create table public.calls (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references public.agents(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,

  caller_phone text,
  caller_name text,
  duration_seconds integer default 0,
  transcript text,
  summary text,
  outcome public.call_outcome default 'unknown',

  -- structured lead data extracted by the AI
  lead_name text,
  lead_phone text,
  lead_email text,
  lead_address text,
  lead_job_type text,
  lead_urgency text check (lead_urgency in ('emergency', 'urgent', 'standard', 'inquiry') or lead_urgency is null),

  recording_url text,
  twilio_call_sid text,

  created_at timestamptz default timezone('utc', now()) not null
);

create index calls_user_id_created_at on public.calls(user_id, created_at desc);
create index calls_agent_id_created_at on public.calls(agent_id, created_at desc);
alter table public.calls enable row level security;
create policy "owner_select_calls" on public.calls for select using (auth.uid() = user_id);
create policy "owner_insert_calls" on public.calls for insert with check (auth.uid() = user_id);

/* ============================================================
 * USAGE COUNTERS — for free-tier limit enforcement (5 calls/mo)
 * ============================================================ */
create or replace view public.monthly_call_usage as
select
  user_id,
  date_trunc('month', created_at) as period_start,
  count(*) as calls_handled
from public.calls
group by user_id, date_trunc('month', created_at);

/* ============================================================
 * UPDATED_AT trigger
 * ============================================================ */
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end $$;

create trigger agents_set_updated_at
before update on public.agents
for each row execute function public.set_updated_at();
