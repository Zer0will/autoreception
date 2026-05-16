import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import { Database } from '@/libs/supabase/types';

type Agent = Database['public']['Tables']['agents']['Row'];
type Call = Database['public']['Tables']['calls']['Row'];

export async function getAgent(): Promise<Agent | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from('agents').select('*').maybeSingle();
  if (error) console.error(error);
  return data as unknown as Agent | null;
}

export async function getRecentCalls(limit = 25): Promise<Call[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('calls')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) console.error(error);
  return (data ?? []) as unknown as Call[];
}
