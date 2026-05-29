# Webhook Subscriptions

Base: `https://api.squarespace.com/1.0/commerce`

## `GET /webhook_subscriptions` — list subscriptions
Read-only.

## `POST /webhook_subscriptions` — create a subscription
**Write.** Body: `{ endpointUrl, topics[] }`. Dry-run by default; `--live-write` to send.
