# Uniquel MCP Server

Connect your AI coding agent to the Uniquel UI library. The remote MCP server lets your agent search the catalog in plain language, retrieve production-ready component source, and use it in your project without leaving your workflow.

**Endpoint:** `https://uniquel.io/api/mcp`  
**Setup and product documentation:** [uniquel.io/mcp](https://uniquel.io/mcp)

## What you can do

- Search Uniquel's UI library for components, sections, and interface patterns.
- Retrieve component source for the matches your agent finds.
- Use free components with a Uniquel account.
- Retrieve premium block source with an All Access membership.
- Bring selected components into a project through your client's normal approval flow.

The server is a remote HTTP MCP server. It works with Claude, Codex, Cursor, and other clients that support remote HTTP MCP.

## Connect

### Codex

Run:

```bash
codex mcp add uniquel --url https://uniquel.io/api/mcp
```

Complete the Uniquel sign-in flow when prompted, then verify the connection:

```bash
codex mcp list
```

Start a new Codex session after the server is connected.

### Claude

In Claude, open **Settings → Connectors**, add a custom connector, and use:

```
https://uniquel.io/api/mcp
```

Approve the sign-in request, enable Uniquel in **Search and tools**, then start a new conversation.

### Cursor

Open **Cursor Settings → MCP**, add a remote MCP server, and use:

```json
{
  "mcpServers": {
    "uniquel": {
      "url": "https://uniquel.io/api/mcp"
    }
  }
}
```

Complete the sign-in flow in the client when it opens.

### Other clients

Use the same endpoint in any client that supports remote HTTP MCP:

```json
{
  "mcpServers": {
    "uniquel": {
      "url": "https://uniquel.io/api/mcp"
    }
  }
}
```

## Authentication and access

Uniquel uses secure OAuth authentication. Sign in with your Uniquel account when your client prompts you; access remains tied to that account.

The free library is available through the server. All Access members can also retrieve premium block source.

## Try it

After connecting, ask your agent:

> Use the Uniquel MCP to find a free component that would improve this project, then show me the best match before adding it.

For new UI work, add the rule in [AGENTS.md](./AGENTS.md) to your project so your coding agent checks the catalog first.

## Troubleshooting

- **The sign-in window did not complete.** Reconnect the MCP server from your client and complete the OAuth flow again.
- **No Uniquel tools appear.** Restart the client or begin a new session after connecting.
- **Premium results are unavailable.** Confirm that the account used during OAuth has an active All Access membership.
- **Your client is not listed above.** It must support remote HTTP MCP; use the endpoint shown above.

## Links

- [Connect Uniquel MCP](https://uniquel.io/mcp)
- [Browse the component library](https://uniquel.io/components)
- [Uniquel](https://uniquel.io)
