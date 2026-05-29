# Products & Variants

Base: `https://api.squarespace.com/1.0/commerce`

## `GET /products` — list products
Query: `cursor`, `type` (`PHYSICAL` | `DIGITAL` | `SERVICE` | `GIFT_CARD`). Read-only.

## `POST /products` — create a product
**Write.** JSON body. Dry-run by default; `--live-write` to send.

## `GET /products/{productId}` — get one product
Read-only.

## `POST /products/{productId}` — update a product
**Write.** JSON body. Dry-run by default.

## `GET /products/{productId}/variants` — list variants
Read-only.

## `POST /products/{productId}/variants` — create a variant
**Write.** Dry-run by default.

## `DELETE /products/{productId}/variants/{variantId}` — delete a variant
**Write.** Dry-run by default.
