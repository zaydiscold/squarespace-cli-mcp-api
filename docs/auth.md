# Auth

## Commerce API
- Header: `Authorization: Bearer <key>`
- Env var: `SQUARESPACE_API_KEY`
- Get a key from the Squarespace dashboard under **Settings → Advanced → Developer API Keys**. Scope it to the permissions you actually need (orders, products, inventory, transactions, profiles).
- The CLI reads `SQUARESPACE_API_KEY` at call time. It is never printed; plans and results redact the `Authorization` header to `Bearer <redacted>`.

## Account / domains dashboard surface
- Authenticated by the logged-in browser **session** (cookies: `login_session`, `member-session`, `crumb`, `SS_SESSION_ID`), not the bearer key.
- This repo maps that surface **read-only** and does not store cookies or tokens. To call it yourself, supply your own session cookie (see `api-map/curl/account.sh`).
