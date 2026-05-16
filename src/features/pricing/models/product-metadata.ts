import z from 'zod';

export const priceCardVariantSchema = z.enum(['starter', 'pro']);

export const productMetadataSchema = z
  .object({
    price_card_variant: priceCardVariantSchema,
    tier: z.enum(['free', 'paid']).default('free'),
    monthly_call_limit: z.string().optional(),
    after_hours: z.string().optional(),
    lead_sms: z.string().optional(),
    support_level: z.enum(['email', 'live']).default('email'),
  })
  .transform((data) => ({
    priceCardVariant: data.price_card_variant,
    tier: data.tier,
    monthlyCallLimit:
      data.monthly_call_limit === 'unlimited' ? Number.POSITIVE_INFINITY : parseInt(data.monthly_call_limit ?? '5', 10),
    afterHours: data.after_hours === 'true',
    leadSms: data.lead_sms === 'true',
    supportLevel: data.support_level,
  }));

export type ProductMetadata = z.infer<typeof productMetadataSchema>;
export type PriceCardVariant = z.infer<typeof priceCardVariantSchema>;
