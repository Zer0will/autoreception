'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export function SimulateCallButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  function trigger() {
    setMsg(null);
    startTransition(async () => {
      const res = await fetch('/api/voice/simulate', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === 'limit_reached') setMsg('Free-tier limit reached. Upgrade to Pro to keep handling calls.');
        else setMsg(data.message || data.error || 'Could not simulate call.');
        return;
      }
      setMsg('Simulated call captured.');
      router.refresh();
    });
  }

  return (
    <div className='flex items-center gap-3'>
      <Button onClick={trigger} disabled={isPending} variant='default'>
        {isPending ? 'Simulating…' : 'Simulate an inbound call'}
      </Button>
      {msg && <span className='text-xs text-zinc-400'>{msg}</span>}
    </div>
  );
}
