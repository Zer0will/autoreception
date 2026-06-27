# AutoReception — Project Context for Claude

## Project
AutoReception is a focused marketing/demo site for a missed-call recovery and SMS lead-warming offer for plumbers and home-service businesses.

The current production app is intentionally simple:
- Next.js App Router + TypeScript + Tailwind
- Static marketing homepage
- Interactive `/demo` route with local illustrative data
- `/privacy`, `/terms`, `/robots.txt`, and `/sitemap.xml`
- No Supabase, Stripe, auth dashboard, live voice API, or required build-time secrets

## Product Positioning
This is not generic lead generation. The wedge is the conversion leak after marketing works:
1. A homeowner calls.
2. The business misses the call.
3. AutoReception sends a fast, transparent text-back.
4. The lead is warmed and qualified.
5. The owner gets a callback-ready job card.
6. Weekly reporting shows recovered opportunities and estimated revenue.

## Accuracy Rules
- Demo data is illustrative unless real phone/SMS/CRM integrations are configured.
- Do not claim Twilio, OpenAI, CRM, booking, payment, or auth integrations are live unless the code and environment prove it.
- Avoid generic SaaS template routes unless they are actually implemented and useful.

## Design Direction
- Dark, decisive, trade-owner friendly.
- Strong offer clarity over decorative complexity.
- Primary accent: orange/ember.
- Copy should help a skeptical local service owner understand the value in under 10 seconds.
