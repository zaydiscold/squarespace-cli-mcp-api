import { Command } from "commander";
import { run, formatOutcome } from "../lib.js";

export function webhooksCommand(): Command {
  const cmd = new Command("webhooks").description("Webhook subscriptions: list, create");

  cmd
    .command("list")
    .description("List webhook subscriptions (GET /webhook_subscriptions)")
    .option("--json", "compact JSON output")
    .action(async (opts) => {
      const outcome = await run({ method: "GET", path: "/webhook_subscriptions" });
      process.stdout.write(formatOutcome(outcome, Boolean(opts.json)));
    });

  cmd
    .command("create")
    .description("Create a webhook subscription (POST /webhook_subscriptions) - dry-run by default")
    .requiredOption("--body <json>", "subscription payload as a JSON string (endpointUrl, topics)")
    .option("--live-write", "actually send the request (otherwise dry-run)")
    .option("--json", "compact JSON output")
    .action(async (opts) => {
      const outcome = await run(
        { method: "POST", path: "/webhook_subscriptions", body: JSON.parse(opts.body) },
        { liveWrite: Boolean(opts.liveWrite) }
      );
      process.stdout.write(formatOutcome(outcome, Boolean(opts.json)));
    });

  return cmd;
}
