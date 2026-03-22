import { existsSync, rmSync } from "fs";
import { join } from "path";
import { $ } from "bun";

const distDir = join(import.meta.dir, "dist");

async function build() {
  if (existsSync(distDir)) {
    console.log("Cleaning dist directory...");
    rmSync(distDir, { recursive: true, force: true });
  }

  console.log("Building TypeScript...");
  await $`bunx tsc`;

  console.log("Build complete!");
}

build().catch(console.error);
