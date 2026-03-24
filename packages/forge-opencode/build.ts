import { existsSync, rmSync, cpSync, mkdirSync } from "fs";
import { join } from "path";
import { $ } from "bun";

const srcDir = import.meta.dir;
const distDir = join(srcDir, "dist");

const STATIC_DIRS = ["agents", "commands", "skills", "templates"];

async function build() {
  if (existsSync(distDir)) {
    console.log("Cleaning dist directory...");
    rmSync(distDir, { recursive: true, force: true });
  }

  console.log("Building TypeScript...");
  await $`bunx tsc`;

  console.log("Copying static files...");
  for (const dir of STATIC_DIRS) {
    const srcPath = join(srcDir, dir);
    const destPath = join(distDir, dir);
    if (existsSync(srcPath)) {
      mkdirSync(destPath, { recursive: true });
      cpSync(srcPath, destPath, { recursive: true });
      console.log(`  - Copied ${dir}/`);
    }
  }

  console.log("Build complete!");
}

build().catch(console.error);
