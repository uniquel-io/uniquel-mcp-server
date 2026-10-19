# Uniquel MCP Server

- Edit `plugin-metadata.json`, never the generated manifests.
- After every change to `plugin-metadata.json`, run `node scripts/generate-manifests.mjs`.
- Bump `version` in `plugin-metadata.json` with every change: patch for fixes, minor for new features.
