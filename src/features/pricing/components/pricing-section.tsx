import { PricingCard } from '@/features/pricing/components/price-card';
import { getProducts } from '@/features/pricing/controllers/get-products';

import { createCheckoutAction } from '../actions/create-checkout-action';

export async function PricingSection({ isPricingPage }: { isPricingPage?: boolean }) {
  const products = await getProducts();

  const HeadingLevel = isPricingPage ? 'h1' : 'h2';

  return (
    <section className='relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 py-8'>
      {/* Amber radial glow — on-brand, replaces rainbow starter image */}
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(249,131,36,0.10),transparent)]' />
      <div className='relative z-10 m-auto flex max-w-[1200px] flex-col items-center gap-8 px-4 py-12 lg:py-20'>
        <HeadingLevel className='max-w-4xl bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent lg:text-6xl'>
          Predictable pricing for every use case.
        </HeadingLevel>
        <p className='text-center text-xl text-zinc-400'>
          Find a plan that fits you. Upgrade at any time to enable additional features.
        </p>
        <div className='flex w-full flex-col items-center justify-center gap-2 lg:flex-row lg:gap-8'>
          {products.map((product) => {
            return <PricingCard key={product.id} product={product} createCheckoutAction={createCheckoutAction} />;
          })}
        </div>
      </div>
    </section>
  );
}
