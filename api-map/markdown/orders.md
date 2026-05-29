# Orders

Base: `https://api.squarespace.com/1.0/commerce`

## `GET /orders` — list orders
Query: `cursor`, `modifiedAfter` (ISO 8601), `modifiedBefore` (ISO 8601), `fulfillmentStatus` (`PENDING` | `FULFILLED` | `CANCELED`).
Read-only. `squarespace-cli orders list`.

## `GET /orders/{orderId}` — get one order
Read-only. `squarespace-cli orders get <orderId>`.

## `POST /orders/{orderId}/fulfillments` — fulfill an order
**Write.** Body: `{ shouldNotifyCustomer, shipments[] }`.
Dry-run by default; pass `--live-write` to send. `squarespace-cli orders fulfill <orderId> --body '{...}' --live-write`.
