# Inventory

Base: `https://api.squarespace.com/1.0/commerce`

## `GET /inventory` — list inventory
Query: `cursor`. Read-only.

## `GET /inventory/{variantId}` — inventory for one variant
Read-only.

## `POST /inventory/adjustments` — adjust inventory
**Write.** Body supports `incrementOperations`, `decrementOperations`, `setFiniteOperations` (arrays).
Dry-run by default; `--live-write` to send.
