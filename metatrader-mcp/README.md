# MetaTrader MCP Server Setup

Connect an AI assistant (Claude Desktop, Cursor, or any MCP client) to the
[MetaTrader 5](https://www.metatrader5.com/) trading platform using the
[`metatrader-mcp-server`](https://github.com/ariadng/metatrader-mcp-server)
package. Once connected, the assistant can read account data, pull market
prices and history, and place or manage orders through the
[Model Context Protocol](https://modelcontextprotocol.io/).

> ⚠️ **Risk disclaimer:** Trading financial instruments involves significant
> risk of loss. This software carries no guarantees. You are fully responsible
> for every order executed through it. Start with a **demo account** until you
> have verified the behavior end-to-end.

---

## Prerequisites

| Requirement | Notes |
|-------------|-------|
| **Windows** | The MetaTrader 5 terminal + its Python API are Windows-only. |
| **Python 3.10+** | [Download](https://www.python.org/downloads/) |
| **MetaTrader 5 terminal** | [Download](https://www.metatrader5.com/en/download) — must be installed **and running** while the server is active. |
| **MT5 trading account** | A login number, password, and server name (demo or live). |

---

## 1. Install the server

```bash
pip install metatrader-mcp-server
```

This provides three entry points:

| Command | Purpose |
|---------|---------|
| `metatrader-mcp-server` | MCP server for Claude Desktop / MCP clients (STDIO, SSE, streamable-http). |
| `metatrader-http-server` | HTTP/REST API server (Swagger docs at `/docs`). |
| `metatrader-quote-server` | WebSocket live-quote server (`ws://localhost:8765`). |

## 2. Enable algorithmic trading in MT5

The server cannot place orders unless algo trading is turned on:

1. Open MetaTrader 5.
2. **Tools → Options → Expert Advisors**.
3. Check **"Allow algorithmic trading"**.
4. Click **OK**.

## 3. Configure your MCP client

### Claude Desktop (STDIO)

Edit the Claude Desktop config file:

- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

Copy [`claude_desktop_config.example.json`](./claude_desktop_config.example.json)
into it and replace the placeholders with your real credentials:

```json
{
  "mcpServers": {
    "metatrader": {
      "command": "metatrader-mcp-server",
      "args": [
        "--login",     "YOUR_ACCOUNT_NUMBER",
        "--password",  "YOUR_TRADING_PASSWORD",
        "--server",    "YOUR_BROKER_SERVER_NAME",
        "--transport", "stdio"
      ]
    }
  }
}
```

If MT5 is installed in a non-default location, add a `--path` argument (see the
[`claude_desktop_config.custom-path.example.json`](./claude_desktop_config.custom-path.example.json)
example).

Restart Claude Desktop after editing the config.

### Using a `.env` file instead of CLI args

Rather than putting credentials in the client config, you can create a `.env`
file (copy [`.env.example`](./.env.example)) with `LOGIN`, `PASSWORD`, and
`SERVER`, and run the server without those flags.

> 🔒 **Never commit real credentials.** `.env` and any file containing live
> logins are already covered by [`.gitignore`](./.gitignore).

---

## CLI arguments

| Argument | Description |
|----------|-------------|
| `--login` | MT5 account login number. |
| `--password` | MT5 account password. |
| `--server` | MT5 server name (e.g. `MetaQuotes-Demo`). |
| `--transport` | MCP transport: `stdio`, `sse`, or `streamable-http`. |
| `--path` | Custom path to `terminal64.exe`. |
| `--host` | Host binding (default `0.0.0.0`). |
| `--port` | Port binding (default `8080` for MCP, `8000` for HTTP). |

---

## Available tools

Once connected, the assistant can:

- **Account** — read balance, equity, profit, margin level, leverage, currency.
- **Market data** — list symbols, fetch bid/ask, retrieve OHLCV candles, read
  symbol specifications.
- **Orders** — place market and pending orders; modify stop-loss / take-profit.
- **Positions** — view, filter, and close open positions (including by
  profitability).
- **Pending orders** — list, filter, and cancel pending orders.
- **History** — retrieve completed deals and historical order records.

---

## Alternate servers

Prefer a REST or WebSocket interface instead of MCP?

```bash
# REST API — docs at http://localhost:8000/docs
metatrader-http-server --login YOUR_LOGIN --password YOUR_PASSWORD --server YOUR_SERVER --host 0.0.0.0 --port 8000

# WebSocket live quotes — connect on ws://localhost:8765
metatrader-quote-server --login YOUR_LOGIN --password YOUR_PASSWORD --server YOUR_SERVER
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Server connects but orders fail | Confirm **"Allow algorithmic trading"** is enabled in MT5. |
| "Terminal not found" | MT5 isn't running, or pass the correct `--path` to `terminal64.exe`. |
| Authorization failed | Double-check `--login`, `--password`, and `--server` — the server name must match your broker's exactly. |
| Nothing appears in Claude | Fully quit and reopen Claude Desktop after editing the config. |
| Not on Windows | The MT5 Python API is Windows-only; run the server on a Windows host/VM. |

---

## References

- [`ariadng/metatrader-mcp-server` (GitHub)](https://github.com/ariadng/metatrader-mcp-server)
- [`metatrader-mcp-server` on PyPI](https://pypi.org/project/metatrader-mcp-server/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MetaTrader 5 platform](https://www.metatrader5.com/)
