import { productMetadataSchema } from '@/features/pricing/models/product-metadata';
import { supabaseAdminClient } from '@/libs/supabase/supabase-admin';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

export type Entitlements = {
  tier: 'free' | 'paid';
  monthlyCallLimit: number;
  callsThisMonth: number;
  callsRemaining: number | 'unlimited';
  hasReachedLimit: boolean;
  afterHours: boolean;
  leadSms: boolean;
};

const FREE_DEFAULTS: Pick<Entitlements, 'tier' | 'monthlyCallLimit' | 'afterHours' | 'leadSms'> = {
  tier: 'free',
  monthlyCallLimit: 5,
  afterHours: true,
  leadSms: false,
};

/**
 * Resolves what the currently logged-in user is allowed to do.
 * - Free (no active sub) → 5 calls / month, no lead SMS
 * - Paid (active Pro sub) → unlimited calls, lead SMS, after-hours, premium support
 */
export async function getEntitlements(): Promise<Entitlements> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ...FREE_DEFAULTS, callsThisMonth: 0, callsRemaining: 5, hasReachedLimit: false };
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  let tier: 'free' | 'paid' = 'free';
  let monthlyCallLimit = FREE_DEFAULTS.monthlyCallLimit;
  let afterHours = FREE_DEFAULTS.afterHours;
  let leadSms = FREE_DEFAULTS.leadSms;

  if (subscription?.prices?.products?.metadata) {
    const parsed = productMetadataSchema.safeParse(subscription.prices.products.metadata);
    if (parsed.success) {
      tier = parsed.data.tier;
      monthlyCallLimit = parsed.data.monthlyCallLimit;
      afterHours = parsed.data.afterHours;
      leadSms = parsed.data.leadSms;
    }
  }

  // Use service-role client so we can run an aggregate without RLS friction.
  const periodStart = new Date();
  periodStart.setUTCDate(1);
  periodStart.setUTCHours(0, 0, 0, 0);

  const { count } = await supabaseAdminClient
    .from('calls')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .gte('created_at', periodStart.toISOString());

  const callsThisMonth = count ?? 0;
  const isUnlimited = monthlyCallLimit === Number.POSITIVE_INFINITY;
  const callsRemaining: number | 'unlimited' = isUnlimited ? 'unlimited' : Math.max(0, monthlyCallLimit - callsThisMonth);
  const hasReachedLimit = !isUnlimited && callsThisMonth >= monthlyCallLimit;

  return { tier, monthlyCallLimit, callsThisMonth, callsRemaining, hasReachedLimit, afterHours, leadSms };
}
