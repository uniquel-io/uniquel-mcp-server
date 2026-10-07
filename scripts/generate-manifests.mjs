import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const metadata = JSON.parse(await readFile("plugin-metadata.json", "utf8"));
const { mcp, interface: pluginInterface, ...baseManifest } = metadata;

const writeJson = async (path, value) => {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`);
};

const mcpServers = {
  [mcp.serverName]: {
    type: "streamable-http",
    url: mcp.url
  }
};

await Promise.all([
  writeJson("plugin.json", {
    $schema: "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
    ...baseManifest
  }),
  writeJson("mcp.json", {
    $schema: "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json",
    mcpServers
  }),
  writeJson(".mcp.json", {
    mcpServers: Object.fromEntries(
      Object.entries(mcpServers).map(([name, server]) => [name, { url: server.url }])
    )
  }),
  writeJson("server.json", {
    $schema: "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
    name: mcp.registryName,
    title: pluginInterface.displayName,
    description: "Search Uniquel UI components and blocks, then retrieve source for the selected item.",
    version: metadata.version,
    websiteUrl: metadata.homepage,
    remotes: [{ type: "streamable-http", url: mcp.url }]
  }),
  writeJson(".codex-plugin/plugin.json", {
    ...baseManifest,
    mcpServers: "./.mcp.json",
    interface: pluginInterface
  }),
  writeJson(".claude-plugin/plugin.json", baseManifest),
  writeJson(".cursor-plugin/plugin.json", {
    ...baseManifest,
    displayName: pluginInterface.displayName,
    logo: "assets/inverted-icon.png",
    mcpServers: "mcp.json"
  })
]);
