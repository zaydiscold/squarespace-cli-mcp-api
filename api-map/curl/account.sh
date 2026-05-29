#!/usr/bin/env bash
# Squarespace account/domains dashboard surface — curl recipes.
# These are session-authenticated. Export your logged-in cookie string
# (login_session, member-session, crumb, ...) as SS_COOKIE before running.
# All values here are masked placeholders.
set -euo pipefail

BASE="https://account.squarespace.com"
COOKIE=(-H "Cookie: ${SS_COOKIE:-login_session=REDACTED; member-session=REDACTED}")
ACCOUNT_ID="1"

# Account context
curl -sS "${COOKIE[@]}" "${BASE}/api/account/${ACCOUNT_ID}/context/project-picker"

# Website briefs
curl -sS "${COOKIE[@]}" "${BASE}/api/account/${ACCOUNT_ID}/website-briefs"

# Website summaries (project picker)
curl -sS "${COOKIE[@]}" "${BASE}/api/account/${ACCOUNT_ID}/project-picker/website-summaries?page=0"

# User domains
curl -sS "${COOKIE[@]}" "${BASE}/api/account/${ACCOUNT_ID}/user/domains"

# Domain summaries (note: stricter param contract; returned 400 in capture)
curl -sS "${COOKIE[@]}" "${BASE}/api/account/${ACCOUNT_ID}/domain-summaries?page=0&pageSize=20"
