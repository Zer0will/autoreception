import Link from "next/link";

import { site } from "@/lib/site";

const nav = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#offer", label: "Offer" },
  { href: "/demo", label: "Demo" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link className="flex items-center gap-3" href="/" aria-label="AutoReception home">
          <span className="grid size-10 place-items-center rounded-2xl bg-ember font-black text-white shadow-glow">
            AR
          </span>
          <span className="text-lg font-black tracking-tight text-white">{site.name}</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-white/70 md:flex">
          {nav.map((item) => (
            <Link className="transition hover:text-white" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-ink transition hover:bg-sage"
          href="/demo"
        >
          See 2-min demo
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink px-6 py-10 text-white/70">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <p className="text-xl font-black text-white">{site.name}</p>
          <p className="mt-3 max-w-md text-sm leading-6">
            Missed-call recovery and lead warming for local service businesses. Demo flows are illustrative until connected to your phone, CRM, and booking stack.
          </p>
        </div>
        <div>
          <p className="font-bold text-white">Product</p>
          <div className="mt-3 grid gap-2 text-sm">
            <Link href="/demo">Interactive demo</Link>
            <Link href="/#offer">Offer</Link>
            <Link href="/#how-it-works">How it works</Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-white">Legal</p>
          <div className="mt-3 grid gap-2 text-sm">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
