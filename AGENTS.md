# Uniquel MCP Server

- This repo is Claude-only. `plugin-metadata.json`, `scripts/` and other platforms' manifests are local-only (gitignored).
- Edit `plugin-metadata.json`, never the generated manifests (including `.claude-plugin/`).
- After every change to `plugin-metadata.json`, run `node scripts/generate-manifests.mjs`.
- Bump `version` in `plugin-metadata.json` with every change: patch for fixes, minor for new features.
