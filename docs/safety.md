# Write safety

The core contract of this CLI:

- **Reads (`GET`) run live** against the API as soon as you ask for them.
- **Writes (`POST` / `PUT` / `DELETE` / `PATCH`) default to a dry-run.** The CLI
  builds the exact request plan (method, URL, headers, body) and prints it
  **without sending anything**. The output is tagged `"mode": "dry-run"` with a
  note telling you how to actually send it.
- To execute a write you must pass `--live-write` explicitly. Only then does the
  CLI read `SQUARESPACE_API_KEY`, send the request, and print
  `[LIVE WRITE -> SQUARESPACE]` to stderr first.

This is enforced in one place — `run()` in `cli/src/lib.ts` — so every command
group inherits it. There is no way to mutate by accident.

Credentials are never printed: the `Authorization` header is redacted in all output.
