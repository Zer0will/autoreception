# Dashboard Page Overrides
> Extends `MASTER.md`. Rules here take precedence over Master for the `/dashboard` route.

---

## Layout — Two-Column App Shell

The dashboard is an app shell, not a marketing page. Tighter spacing, denser information, no hero-scale typography.

```
Header: "Your AI receptionist" (h1 — but smaller, text-2xl not the full hero scale)
Status badge: tier description below header

[2-col grid on lg+, stacked on mobile]
LEFT:  Agent configuration card
RIGHT: Recent calls card
```

No section-level padding `py-28` — use `py-10` max. Sections are app panels, not marketing sections.

---

## Typography Overrides

| Role | Rule |
|------|------|
| Dashboard h1 | `text-2xl font-bold` — NOT the gradient hero treatment |
| Card h2 | `text-lg font-semibold text-white` |
| Status/description | `text-zinc-400 text-sm` |
| Call item name | `text-sm font-medium text-white` |
| Call timestamp | `text-xs text-zinc-500` |
| Call summary | `text-sm text-zinc-300` |

---

## Card Patterns

### Panel Card (Agent Config, Call List)
```html
<div class="rounded-md border border-zinc-800 bg-zinc-950 p-5">
```
Note: `rounded-md` not `rounded-lg` — app panels feel tighter than marketing cards.

### Call Item Row
```html
<li class="rounded-md border border-zinc-800 p-3 hover:border-zinc-700 transition-colors duration-200">
```

### Paywall Banner (Amber Warning)
```html
<div class="rounded-md border border-amber-600/40 bg-amber-950/40 p-4">
  <h2 class="text-lg font-semibold text-amber-200">...</h2>
  <p class="text-sm text-amber-100/80">...</p>
</div>
```
Keep the amber warning palette — it aligns with brand accent AND semantic warning meaning.

### Outcome / Urgency Badge
```html
<span class="rounded bg-zinc-800 px-2 py-0.5 text-[11px] uppercase tracking-wide text-zinc-500">
  lead
</span>
```

---

## Usage Indicator

Free tier: `{callsThisMonth} of {monthlyCallLimit} calls used this month`
- Progress shown via text, not a progress bar (keep it simple)
- Remaining calls: `text-xs text-zinc-500` top-right of call panel

---

## CTAs in Dashboard

- Upgrade CTA inside paywall banner: `variant="sexy"` (amber gradient) — this is a conversion moment
- No other `sexy` CTAs in the dashboard — too loud for an app shell
- Simulate call button: `variant="default"` (zinc-900 button) — it's a utility action, not a conversion CTA

---

## Empty State

```html
<p class="text-sm text-zinc-500">
  No calls yet. Once you point your business number to your AutoReception phone,
  calls show up here in real time.
</p>
```
Plain text empty state — no illustration needed. Trades users want information, not decoration.

---

## Animation Override

No `animate-spin-slow` in the dashboard (only on marketing CTAs).
All hovers: `transition-colors duration-200` on card borders only.

---

## Mobile Behavior

- Two-column grid collapses to single column: `grid-cols-1 lg:grid-cols-2`
- Agent config appears first (above the fold on mobile)
- Call list scrolls within its panel on desktop; full-length on mobile
- `overflow-x-hidden` on the calls list to prevent horizontal scroll from long phone numbers
