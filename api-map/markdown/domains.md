# Domains (internal dashboard surface)

Base: `https://account.squarespace.com`
Auth: logged-in browser session. Mapped **read-only**. IDs masked. `accountId` observed as `1`.

Source: authenticated dashboard capture (`account-api-redacted.json`).

## `GET /api/account/{accountId}/user/domains`
Array of the user's domains. (200, JSON — empty array on the captured account.)

## `GET /api/account/{accountId}/domain-summaries?page=0&pageSize=20`
Paged domain summaries. In the capture this returned **400** with an error shape `{ contextId, details, message, subtype, type }` — recorded so callers know the param contract is stricter than the path alone suggests.
