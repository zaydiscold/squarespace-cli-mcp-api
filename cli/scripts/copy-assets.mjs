import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const cliRoot = resolve(here, "..");
const repoRoot = resolve(cliRoot, "..");
const distRoot = resolve(cliRoot, "dist");

await mkdir(distRoot, { recursive: true });
for (const name of ["api-map", "docs"]) {
  const target = resolve(distRoot, name);
  await rm(target, { recursive: true, force: true });
  await cp(resolve(repoRoot, name), target, { recursive: true });
}
