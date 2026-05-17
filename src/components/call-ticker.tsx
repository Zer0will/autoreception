'use client';

const CALLS = [
  { caller: 'Mike D.', trade: 'HVAC', msg: '"AC stopped working — 90° in here, need someone today"' },
  { caller: 'Sandra R.', trade: 'Plumbing', msg: '"Pipe burst under the sink, water everywhere"' },
  { caller: 'James T.', trade: 'Electrical', msg: '"Breaker keeps tripping, I need an electrician ASAP"' },
  { caller: 'Patricia L.', trade: 'Roofing', msg: '"Roof is leaking bad after last night\'s storm"' },
  { caller: 'Chris M.', trade: 'HVAC', msg: '"Furnace won\'t kick on, it\'s freezing in here"' },
  { caller: 'Angela B.', trade: 'Plumbing', msg: '"No hot water for two days, please call me back"' },
  { caller: 'Derek N.', trade: 'Electrical', msg: '"Outlets in the garage stopped working after the storm"' },
];

function TickerCard({ caller, trade, msg }: (typeof CALLS)[0]) {
  return (
    <div className='mx-3 flex w-72 shrink-0 flex-col gap-1 rounded-md border border-zinc-800 bg-zinc-950 p-4'>
      <div className='flex items-center gap-2'>
        <span className='h-2 w-2 rounded-full bg-emerald-400' />
        <span className='text-xs font-medium text-white'>{caller}</span>
        <span className='ml-auto rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-zinc-500'>
          {trade}
        </span>
      </div>
      <p className='text-xs leading-relaxed text-zinc-400'>{msg}</p>
    </div>
  );
}

export function CallTicker() {
  const items = [...CALLS, ...CALLS];
  return (
    <div
      aria-hidden='true'
      className='relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'
    >
      <div className='flex animate-marquee motion-reduce:animate-none'>
        {items.map((c, i) => (
          <TickerCard key={i} {...c} />
        ))}
      </div>
    </div>
  );
}
