import { Command } from "commander";
import { run, formatOutcome } from "../lib.js";

export function inventoryCommand(): Command {
  const cmd = new Command("inventory").description("Inventory: get levels, adjust quantities");

  cmd
    .command("get")
    .description("Get inventory (GET /inventory)")
    .option("--cursor <cursor>", "pagination cursor")
    .option("--json", "compact JSON output")
    .action(async (opts) => {
      const outcome = await run({ method: "GET", path: "/inventory", query: { cursor: opts.cursor } });
      process.stdout.write(formatOutcome(outcome, Boolean(opts.json)));
    });

  cmd
    .command("get-one <variantId>")
    .description("Get inventory for one variant (GET /inventory/{variantId})")
    .option("--json", "compact JSON output")
    .action(async (variantId, opts) => {
      const outcome = await run({ method: "GET", path: "/inventory/{variantId}", pathParams: { variantId } });
      process.stdout.write(formatOutcome(outcome, Boolean(opts.json)));
    });

  cmd
    .command("adjust")
    .description("Adjust inventory (POST /inventory/adjustments) - dry-run by default")
    .requiredOption("--body <json>", "adjustment payload as a JSON string")
    .option("--live-write", "actually send the request (otherwise dry-run)")
    .option("--json", "compact JSON output")
    .action(async (opts) => {
      const outcome = await run(
        { method: "POST", path: "/inventory/adjustments", body: JSON.parse(opts.body) },
        { liveWrite: Boolean(opts.liveWrite) }
      );
      process.stdout.write(formatOutcome(outcome, Boolean(opts.json)));
    });

  return cmd;
}
