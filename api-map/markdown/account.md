# Account (internal dashboard surface)

Base: `https://account.squarespace.com`
Auth: logged-in browser session (cookies `login_session`, `member-session`, `crumb`, `SS_SESSION_ID`, …). Mapped **read-only**. All IDs/tokens masked. `accountId` observed as `1`.

Source: authenticated dashboard capture (`account-api-redacted.json`).

## `GET /api/account/{accountId}/context/project-picker`
Account context. Keys: `assetLocation`, `authenticatedAccountId`, `contextId`, `csrfToken`, `environmentDomain`, `hasDomains`, `hasPersonal`, `hasWebsites`, `isCircleMember`, `isExternalDeveloper`, `isImpersonating`, `preferredLocale`, `sentinelHost`, `termsAcceptanceRequired`. (200, JSON)

## `GET /api/account/{accountId}/website-briefs`
Array of website briefs. Item keys: `active`, `canonicalUrl`, `createdOn`, `expiry`, `id`, `identifier`, `internalUrl`, `language`, `siteLogoUrl`, `timeZone`, `title`, `websiteStatus`, `websiteType`. (200, JSON)

## `GET /api/account/{accountId}/project-picker/website-summaries?page=0`
Paged: `{ hasNextPage, page, websites[] }`. (200, JSON)

## `GET /api/account/{accountId}/website-summaries?page=0`
Same shape as above on a legacy path (returns the dashboard HTML when hit without the project-picker prefix). (200)

## `GET /api/account/{accountId}/manifests/developer-platform`
Developer-platform micro-frontend asset manifest (localized JS/CSS bundle map). (200, JSON)

### Observed-but-erroring (recorded for completeness)
- `GET /api/account/{accountId}/context/project-picker-client` → 500
- `GET /api/billing/customer` → 500
