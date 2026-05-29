import { Command } from "commander";
import { run, formatOutcome } from "../lib.js";

export function ordersCommand(): Command {
  const cmd = new Command("orders").description("Squarespace Commerce orders: list, get, fulfill");

  cmd
    .command("list")
    .description("List orders (GET /orders)")
    .option("--cursor <cursor>", "pagination cursor")
    .option("--modified-after <iso>", "ISO 8601 lower bound on modification time")
    .option("--modified-before <iso>", "ISO 8601 upper bound on modification time")
    .option("--fulfillment-status <status>", "PENDING | FULFILLED | CANCELED")
    .option("--json", "compact JSON output")
    .action(async (opts) => {
      const outcome = await run({
        method: "GET",
        path: "/orders",
        query: {
          cursor: opts.cursor,
          modifiedAfter: opts.modifiedAfter,
          modifiedBefore: opts.modifiedBefore,
          fulfillmentStatus: opts.fulfillmentStatus
        }
      });
      process.stdout.write(formatOutcome(outcome, Boolean(opts.json)));
    });

  cmd
    .command("get <orderId>")
    .description("Get a single order (GET /orders/{orderId})")
    .option("--json", "compact JSON output")
    .action(async (orderId, opts) => {
      const outcome = await run({ method: "GET", path: "/orders/{orderId}", pathParams: { orderId } });
      process.stdout.write(formatOutcome(outcome, Boolean(opts.json)));
    });

  cmd
    .command("fulfill <orderId>")
    .description("Fulfill an order (POST /orders/{orderId}/fulfillments) - dry-run by default")
    .requiredOption("--body <json>", "fulfillment payload as a JSON string")
    .option("--live-write", "actually send the request (otherwise dry-run)")
    .option("--json", "compact JSON output")
    .action(async (orderId, opts) => {
      const outcome = await run(
        {
          method: "POST",
          path: "/orders/{orderId}/fulfillments",
          pathParams: { orderId },
          body: JSON.parse(opts.body)
        },
        { liveWrite: Boolean(opts.liveWrite) }
      );
      process.stdout.write(formatOutcome(outcome, Boolean(opts.json)));
    });

  return cmd;
}
