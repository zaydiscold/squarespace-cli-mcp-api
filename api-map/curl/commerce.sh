#!/usr/bin/env bash
# Squarespace Commerce API — curl recipes.
# Requires: export SQUARESPACE_API_KEY=...
set -euo pipefail

BASE="https://api.squarespace.com/1.0/commerce"
AUTH=(-H "Authorization: Bearer ${SQUARESPACE_API_KEY}" -H "User-Agent: squarespace-cli")

# List orders
curl -sS "${AUTH[@]}" "${BASE}/orders"

# Get one order
curl -sS "${AUTH[@]}" "${BASE}/orders/ORDER_ID"

# List products of a type
curl -sS "${AUTH[@]}" "${BASE}/products?type=PHYSICAL"

# Get inventory
curl -sS "${AUTH[@]}" "${BASE}/inventory"

# List transactions
curl -sS "${AUTH[@]}" "${BASE}/transactions"

# List profiles (contacts)
curl -sS "${AUTH[@]}" "${BASE}/profiles"

# List webhook subscriptions
curl -sS "${AUTH[@]}" "${BASE}/webhook_subscriptions"

# --- WRITES (run intentionally) ---

# Create a webhook subscription
curl -sS -X POST "${AUTH[@]}" -H "Content-Type: application/json" \
  -d '{"endpointUrl":"https://example.com/hook","topics":["order.create"]}' \
  "${BASE}/webhook_subscriptions"

# Adjust inventory
curl -sS -X POST "${AUTH[@]}" -H "Content-Type: application/json" \
  -d '{"incrementOperations":[{"variantId":"VARIANT_ID","quantity":5}]}' \
  "${BASE}/inventory/adjustments"
