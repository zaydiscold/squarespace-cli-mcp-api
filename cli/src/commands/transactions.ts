import { Command } from "commander";
import { run, formatOutcome } from "../lib.js";

export function transactionsCommand(): Command {
  const cmd = new Command("transactions").description("Commerce transactions: list");

  cmd
    .command("list")
    .description("List transactions (GET /transactions)")
    .option("--cursor <cursor>", "pagination cursor")
    .option("--modified-after <iso>", "ISO 8601 lower bound on modification time")
    .option("--modified-before <iso>", "ISO 8601 upper bound on modification time")
    .option("--json", "compact JSON output")
    .action(async (opts) => {
      const outcome = await run({
        method: "GET",
        path: "/transactions",
        query: {
          cursor: opts.cursor,
          modifiedAfter: opts.modifiedAfter,
          modifiedBefore: opts.modifiedBefore
        }
      });
      process.stdout.write(formatOutcome(outcome, Boolean(opts.json)));
    });

  return cmd;
}
