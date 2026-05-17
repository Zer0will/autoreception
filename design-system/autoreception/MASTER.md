# AutoReception — Design System MASTER
> **LOGIC:** When building a specific page, first check `design-system/autoreception/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file. If not, use this file exclusively.
>
> **Project:** AutoReception | **Stack:** Next.js 15 + shadcn/ui + Tailwind CSS

---

## Brand Identity

- **Product**: AI receptionist SaaS for home-services trades (HVAC, plumbing, electricians, roofers)
- **Personality**: Reliable. Fast. No-BS.
- **Reference**: Vercel.com — dark, sharp, high-contrast, decisive typography
- **Anti-reference**: Generic SaaS template (indigo/white, friendly rounded, starter-kit feel)

---

## Color System

### Background & Surface
```
bg-background       hsl(240 6% 10%)   Page background
bg-zinc-950         #09090b           Cards, panels
bg-zinc-900         #18181b           Elevated surfaces, popovers
border-zinc-800     #27272a           Card borders, dividers
```

### Text
```
text-white                            Headlines, key numbers
text-zinc-300                         Body copy
text-zinc-400                         Secondary labels, captions
text-zinc-500                         Disabled / placeholder
```

### Accent — Single Brand Color
> **Rule**: One accent, used with intention. Amber-orange is the only brand accent.

```
#F98324 / orange-500    Primary CTA, active states, key highlights
orange-400              CTA hover
amber-900/30            Tinted backgrounds behind accent elements
amber-400               Accent text on dark backgrounds
```

### Semantic Colors (keep existing)
```
emerald-400    Checkmarks, success, positive outcomes
amber-200/600  Paywall banners, usage limits
red-500        Errors, destructive actions
sky-400        Neutral info icons
```

### CTA Gradient — Primary Button Only
The `SexyBorder` spinning animation stays for `Button variant="sexy"` on primary CTAs only.
**Replace** the rainbow gradient:
```css
/* BEFORE (starter template rainbow): */
from-[#5ED4FF] via-[#D13C5F] to-[#F98324]

/* AFTER (amber-orange brand): */
from-amber-500 via-orange-500 to-amber-400
```
Must be disabled under `prefers-reduced-motion` with a static amber border fallback.

---

## Typography

Fonts already loaded: **Montserrat Alternates** (`font-alt`) + **Montserrat** (`font-sans`).

| Role | Font | Weight | Tailwind Size |
|------|------|--------|---------------|
| Hero h1 | Montserrat Alternates | extrabold 800 | `text-4xl lg:text-6xl` |
| Section h2 | Montserrat Alternates | bold 700 | `text-2xl lg:text-4xl` |
| Card h3 | Montserrat | semibold 600 | `text-lg` |
| Body | Montserrat | regular 400 | `text-sm lg:text-base` |
| Uppercase label | Montserrat | medium 500 | `text-xs uppercase tracking-wider` |
| Button | Montserrat Alternates | semibold 600 | `text-sm` |

- Hero h1 text: gradient `from-white to-neutral-400` via `bg-clip-text` (keep — it's sharp)
- Section h2 text: plain `text-white`
- Body `leading-relaxed` (1.6 line height)
- Paragraph max width: `max-w-2xl` (~65 chars per line)

---

## Spacing & Layout

| Context | Rule |
|---------|------|
| Container | `max-w-[1440px] px-4` (already set in layout.tsx) |
| Section padding | `py-16 lg:py-28` |
| Section gap | `gap-16 lg:gap-28` |
| Card padding | `p-5 lg:p-8` |
| Grid gap | `gap-6` |
| Border radius | `rounded-lg` cards, `rounded-md` inputs/badges |

---

## Component Patterns

### Card (standard)
```html
<div class="rounded-lg border border-zinc-800 bg-zinc-950 p-5
            hover:border-zinc-700 transition-colors duration-200 cursor-pointer">
```

### Feature Icon Colors
- Urgency / energy: `text-amber-400`
- Trust / success: `text-emerald-400`
- Info / calm: `text-sky-400`

### Badge / Tag
```html
<span class="rounded bg-zinc-800 px-2 py-0.5 text-[11px] uppercase tracking-wide text-zinc-500">
```

### Focus Ring (globals.css)
```css
/* Replace current pink-500 */
*:focus-visible { outline: 2px solid #F98324; outline-offset: 2px; }
```

### Text Selection (globals.css)
```css
/* Replace current cyan-400 */
::selection { background-color: #fbbf24; color: #000; }
```

---

## Landing Page Structure (Funnel Pattern)

```
1. Hero           — Pain headline ("$500 job walking to your competitor") + CTA pair
2. Social Proof   — 3 stat blocks (quantify the problem)
3. Features       — 3 feature cards (solution mechanics)
4. Comparison     — vs. Smith.ai / agency table
5. Pricing        — free + pro cards
6. Final CTA      — repeat + 3 trust signals
```

**CTA rules**:
- `variant="sexy"` (amber gradient spinner): Hero + Final CTA only
- `variant="secondary"`: paired beside sexy CTA
- Never use `sexy` variant inside feature cards or comparison tables

---

## Animation Rules

| Element | Rule | Duration |
|---------|------|----------|
| All hover states | `transition-colors duration-200` | 200ms |
| Card hover | Border color shift only — **never** scale | 200ms |
| CTA gradient spin | `animate-spin-slow` (10s linear) — primary CTA only | 10s loop |
| Accordion | `ease-out 200ms` | 200ms |

```css
/* Always include: */
@media (prefers-reduced-motion: reduce) {
  .animate-spin-slow { animation: none; }
  /* Add static amber border as fallback */
}
```

**Never use**: `animate-bounce`, `animate-ping` on decorative elements.
**Never use**: `hover:scale-*` on cards (layout shift, template feel).

---

## Accessibility

- All `<img>` have descriptive `alt` text
- All form inputs paired with `<label>` elements
- Color is not the sole indicator (icons + text together)
- Focus rings: amber `#F98324` outline, 2px, 2px offset
- Touch targets minimum 44×44px
- `cursor-pointer` on all interactive elements
- WCAG AA minimum (4.5:1): white on zinc-950 ✓
- `prefers-reduced-motion` disables spinner

---

## Pre-Delivery Checklist

- [ ] `SexyBorder` gradient: rainbow → amber-orange (`from-amber-500 via-orange-500 to-amber-400`)
- [ ] Logo wordmark: `UPDATE_THIS_WITH_YOUR_APP_DISPLAY_NAME` → `AutoReception`
- [ ] Focus ring: `pink-500` → `#F98324` (amber)
- [ ] Text selection: `cyan-400` → `amber-400`
- [ ] No emojis as icons — use Lucide or `react-icons/io5`
- [ ] `cursor-pointer` on all interactive cards and links
- [ ] Hover: `transition-colors duration-200` only — no scale transforms
- [ ] Responsive: 375px / 768px / 1024px / 1440px
- [ ] No horizontal scroll on mobile
- [ ] `prefers-reduced-motion` disables spinner animation

---

## Anti-Patterns — Never Do This

| Anti-pattern | Why |
|-------------|-----|
| Rainbow / multi-color gradient outside primary CTA | Reads as starter template, dilutes brand |
| `rounded-full` on cards | Too friendly/playful for trades audience |
| Light backgrounds | Brand is dark-only |
| Corporate blue (`indigo`, `blue-*`) as accent | The explicit anti-reference |
| `animate-bounce` / `animate-ping` on icons | Cartoonish, distracting |
| `hover:scale-105` on cards | Layout shift, template feel |
| Decorative continuous animations | Motion-accessibility fail |
| Multiple accent colors | Dilutes the single amber brand accent |
| Emojis as UI icons | Use SVG icons from Lucide/react-icons |
