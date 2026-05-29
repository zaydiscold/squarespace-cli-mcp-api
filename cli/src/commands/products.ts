import { Command } from "commander";
import { run, formatOutcome } from "../lib.js";

export function productsCommand(): Command {
  const cmd = new Command("products").description("Store products: list, get, create, update");

  cmd
    .command("list")
    .description("List store products (GET /products)")
    .option("--cursor <cursor>", "pagination cursor")
    .option("--type <type>", "PHYSICAL | DIGITAL | SERVICE | GIFT_CARD")
    .option("--json", "compact JSON output")
    .action(async (opts) => {
      const outcome = await run({
        method: "GET",
        path: "/products",
        query: { cursor: opts.cursor, type: opts.type }
      });
      process.stdout.write(formatOutcome(outcome, Boolean(opts.json)));
    });

  cmd
    .command("get <productId>")
    .description("Get a single product (GET /products/{productId})")
    .option("--json", "compact JSON output")
    .action(async (productId, opts) => {
      const outcome = await run({ method: "GET", path: "/products/{productId}", pathParams: { productId } });
      process.stdout.write(formatOutcome(outcome, Boolean(opts.json)));
    });

  cmd
    .command("create")
    .description("Create a product (POST /products) - dry-run by default")
    .requiredOption("--body <json>", "product payload as a JSON string")
    .option("--live-write", "actually send the request (otherwise dry-run)")
    .option("--json", "compact JSON output")
    .action(async (opts) => {
      const outcome = await run(
        { method: "POST", path: "/products", body: JSON.parse(opts.body) },
        { liveWrite: Boolean(opts.liveWrite) }
      );
      process.stdout.write(formatOutcome(outcome, Boolean(opts.json)));
    });

  cmd
    .command("update <productId>")
    .description("Update a product (POST /products/{productId}) - dry-run by default")
    .requiredOption("--body <json>", "product update payload as a JSON string")
    .option("--live-write", "actually send the request (otherwise dry-run)")
    .option("--json", "compact JSON output")
    .action(async (productId, opts) => {
      const outcome = await run(
        { method: "POST", path: "/products/{productId}", pathParams: { productId }, body: JSON.parse(opts.body) },
        { liveWrite: Boolean(opts.liveWrite) }
      );
      process.stdout.write(formatOutcome(outcome, Boolean(opts.json)));
    });

  return cmd;
}
