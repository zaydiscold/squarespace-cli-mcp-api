# API map status

## Commerce API (public)
Mapped from Squarespace's documented Commerce API. Covered groups: orders,
products + variants, inventory, transactions, profiles/contacts, webhook
subscriptions.

## Account / domains (internal)
Folded in from an authenticated dashboard capture
(`account-api-redacted.json`). Endpoints recorded: project-picker context,
website briefs, website summaries (project-picker + legacy path),
developer-platform manifest, user domains, domain summaries. Two endpoints were
observed returning 500 (`project-picker-client`, `billing/customer`) and one
returning 400 (`domain-summaries` without the full param contract); these are
recorded in the markdown for completeness. All IDs/tokens are masked.

## What's not here yet
- Order refunds, partial fulfillments, gift-card endpoints.
- Pages/blocks content APIs (not Commerce).
- Mutating account/domains actions — the dashboard surface is mapped read-only on purpose.
