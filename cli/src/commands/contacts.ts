import { Command } from "commander";
import { run, formatOutcome } from "../lib.js";

export function contactsCommand(): Command {
  const cmd = new Command("contacts").description("Customer profiles / contacts: list, get");

  cmd
    .command("list")
    .description("List profiles (GET /profiles)")
    .option("--cursor <cursor>", "pagination cursor")
    .option("--filter <expr>", "Squarespace profile filter expression")
    .option("--sort-direction <dir>", "ASC | DESC")
    .option("--sort-field <field>", "field to sort by")
    .option("--json", "compact JSON output")
    .action(async (opts) => {
      const outcome = await run({
        method: "GET",
        path: "/profiles",
        query: {
          cursor: opts.cursor,
          filter: opts.filter,
          sortDirection: opts.sortDirection,
          sortField: opts.sortField
        }
      });
      process.stdout.write(formatOutcome(outcome, Boolean(opts.json)));
    });

  cmd
    .command("get <profileId>")
    .description("Get a single profile (GET /profiles/{profileId})")
    .option("--json", "compact JSON output")
    .action(async (profileId, opts) => {
      const outcome = await run({ method: "GET", path: "/profiles/{profileId}", pathParams: { profileId } });
      process.stdout.write(formatOutcome(outcome, Boolean(opts.json)));
    });

  return cmd;
}
