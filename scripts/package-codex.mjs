import { cp, mkdir, rm, stat } from "node:fs/promises";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distRoot = join(repoRoot, "dist");
const packageRoot = join(distRoot, "uniquel");
const archivePath = join(distRoot, "uniquel.zip");

const files = [
  "plugin.json",
  "mcp.json",
  ".mcp.json",
  "server.json",
  "LICENSE",
  "README.md",
  ".codex-plugin",
  "assets"
];

const optionalDirectories = ["skills"];

process.chdir(repoRoot);
await import("./generate-manifests.mjs");

await rm(packageRoot, { recursive: true, force: true });
await rm(archivePath, { force: true });
await mkdir(packageRoot, { recursive: true });

for (const relativePath of files) {
  await cp(join(repoRoot, relativePath), join(packageRoot, relativePath), {
    recursive: true
  });
}

for (const relativePath of optionalDirectories) {
  try {
    const source = join(repoRoot, relativePath);
    if ((await stat(source)).isDirectory()) {
      await cp(source, join(packageRoot, relativePath), { recursive: true });
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

await execFileAsync("zip", ["-qr", archivePath, "uniquel"], { cwd: distRoot });
console.log(`Created ${archivePath}`);
