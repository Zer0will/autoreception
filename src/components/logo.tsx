import Link from 'next/link';

export function Logo() {
  return (
    <Link href='/' className='flex w-fit items-center gap-2'>
      <svg width='32' height='32' viewBox='0 0 32 32' fill='none' aria-hidden='true'>
        <rect width='32' height='32' rx='8' fill='#F98324' fillOpacity='0.15' />
        <path
          d='M10 12a2 2 0 0 1 2-2h1.5a.5.5 0 0 1 .47.33l1 2.5a.5.5 0 0 1-.12.55l-1.2 1.1a8.1 8.1 0 0 0 3.87 3.87l1.1-1.2a.5.5 0 0 1 .55-.12l2.5 1a.5.5 0 0 1 .33.47V20a2 2 0 0 1-2 2C13.13 22 10 18.87 10 15v-3Z'
          fill='#F98324'
        />
      </svg>
      <span className='font-alt text-xl font-semibold text-white'>AutoReception</span>
    </Link>
  );
}
