# Squarespace API Map — Overview

Two surfaces, one map.

## 1. Commerce API (public, documented)

- **Base:** `https://api.squarespace.com/1.0/commerce`
- **Auth:** `Authorization: Bearer <SQUARESPACE_API_KEY>`
- **Content type for writes:** `application/json`

| Group | Endpoints |
| --- | --- |
| Orders | `GET /orders`, `GET /orders/{orderId}`, `POST /orders/{orderId}/fulfillments` |
| Products | `GET /products`, `POST /products`, `GET /products/{productId}`, `POST /products/{productId}`, `GET/POST /products/{productId}/variants`, `DELETE /products/{productId}/variants/{variantId}` |
| Inventory | `GET /inventory`, `GET /inventory/{variantId}`, `POST /inventory/adjustments` |
| Transactions | `GET /transactions` |
| Profiles / Contacts | `GET /profiles`, `GET /profiles/{profileId}` |
| Webhooks | `GET /webhook_subscriptions`, `POST /webhook_subscriptions` |

## 2. Account / Domains surface (internal dashboard)

- **Base:** `https://account.squarespace.com`
- **Auth:** logged-in browser session (cookies: `login_session`, `member-session`, `crumb`, …) — not the bearer key.
- **Mapped read-only.** These came from an authenticated dashboard capture; all IDs/tokens are masked.

| Group | Endpoints |
| --- | --- |
| Account | `GET /api/account/{accountId}/context/project-picker`, `GET /api/account/{accountId}/website-briefs`, `GET /api/account/{accountId}/project-picker/website-summaries`, `GET /api/account/{accountId}/website-summaries`, `GET /api/account/{accountId}/manifests/developer-platform` |
| Domains | `GET /api/account/{accountId}/user/domains`, `GET /api/account/{accountId}/domain-summaries` |

`accountId` was observed as `1` for the authenticated account.

See `squarespace-api-map.json` (OpenAPI 3.1) for the machine-readable version and the per-group markdown files alongside this one.
