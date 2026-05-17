# AutoReception — Project Context for Claude

## Project
AI receptionist SaaS for home-services trades (HVAC, plumbers, electricians, roofers). Flat $79/mo, picks up every call, texts the lead. Built on Next.js 15 + Supabase + Stripe.

---

## Design Context

### Users
Small home-services business owners: time-poor, skeptical of tech, often on a phone between jobs. They want to know in 10 seconds if this solves missed calls. Job to be done: understand → sign up → get back to work.

### Brand Personality
**Reliable. Fast. No-BS.** Tradesperson-to-tradesperson directness. Confident and matter-of-fact. No corporate fluff, no startup cheerfulness.

### Aesthetic Direction
- **Reference**: Vercel.com — dark, sharp, high-contrast, clean typography, decisive whitespace
- **Anti-reference**: Generic SaaS template aesthetic — boilerplate gradients, placeholder feel
- **Theme**: Dark mode only. Near-black backgrounds, pure white text, single accent color
- **Primary accent**: Amber-orange (`#F98324`) — replaces the rainbow starter gradient
- **Positive/checkmarks**: emerald-400 (keep)
- **Warnings**: amber-200/600 (keep)
- **Fonts**: Montserrat Alternates (headings/buttons) + Montserrat (body)

### Design Principles
1. **Clarity over cleverness** — Every element earns its space. Remove decorative complexity that doesn't communicate value.
2. **Dark and decisive** — Near-black + sharp white = professional-grade tool, not a consumer app.
3. **Trades-first, always** — Would a plumber on a job site understand this immediately? If not, simplify.
4. **One accent, used with intention** — Amber-orange only. No rainbow gradients, no secondary accent colors.
5. **Typography carries the weight** — Strong copy + typographic hierarchy before decorative elements.

### Open Items
- `logo.tsx` wordmark still reads `UPDATE_THIS_WITH_YOUR_APP_DISPLAY_NAME` — needs updating to "AutoReception"
- Animated SexyBorder gradient (cyan→magenta→orange) should be replaced with amber-orange for primary CTAs
- Focus rings: change from `pink-500` → `amber-500` or white
- Text selection highlight: change from `cyan-400` → `amber-400`

> Full design context with color token table: `.impeccable.md`
