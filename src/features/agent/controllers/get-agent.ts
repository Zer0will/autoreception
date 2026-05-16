import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

export async function getAgent() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from('agents').select('*').maybeSingle();
  if (error) console.error(error);
  return data;
}

export async function getRecentCalls(limit = 25) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('calls')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) console.error(error);
  return data ?? [];
}
