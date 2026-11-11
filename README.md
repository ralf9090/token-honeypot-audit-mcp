# Token Honeypot Detector, Smart Contract Audit & AML MCP Server

[![MCP Compatible](https://img.shields.io/badge/MCP-2024--11--05%20%7C%202025--06--18-blue)](https://modelcontextprotocol.io)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](#)
[![Free Tier](https://img.shields.io/badge/Free%20Tier-2%20Calls%2FDay-success)](https://agent-kiosk.vercel.app/mcp)
[![Unlimited Pass](https://img.shields.io/badge/Unlimited%20Pass-%241%20%2F%20%245-purple)](https://agent-kiosk.vercel.app/buy)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> Pre-flight 0x token honeypot & tax scanner, OFAC/sanctions wallet AML screening, DEX order-flow alpha, 3-in-1 token due diligence & executable Base swap calldata MCP.

Searching for a **Token Honeypot MCP**, **Smart Contract Security Audit MCP**, or **Base DeFi Safety MCP server**? `token-honeypot-audit-mcp` protects AI wallets and crypto researchers from rugpulls, hidden sell taxes, malicious URLs, and sanctioned addresses — while delivering live DexScreener order-flow alpha and executable DEX swap quotes.

---

## Why Use `token-honeypot-audit-mcp`?

- **Honeypot, Tax & Drainer Scanner (`security_audit`)** — Audits any `0x...` contract on Base, Ethereum, Arbitrum, BSC, Polygon, or Optimism (GoPlus + DexScreener) OR scans web URLs for phishing/prompt-injection traps.
- **OFAC & Sanctions AML Check (`compliance_check`)** — Screens wallet addresses and entities against sanctions & high-risk compliance lists before signing transactions.
- **DEX Order-Flow & Institutional Due Diligence (`token_alpha`, `token_due_diligence`)** — Buy/sell pressure, liquidity depth, FDV velocity, plus a composite A–F investment grade combining on-chain security + DEX liquidity + social sentiment.
- **Free Executable DEX Swap Quotes (`defi_swap_quote`)** — Generates live cross-chain/same-chain EVM swap calldata via Relay Instant Solver.
- **2 Free Calls / Day Out of the Box** — Works immediately with **zero configuration** and **no API key required**.
- **Instant Unlimited Upgrade** — Need high-volume production calls? Grab an instant API key at **[https://agent-kiosk.vercel.app/buy](https://agent-kiosk.vercel.app/buy)** (**$1 Starter 7-Day Pass** or **$5 Pro 30-Day Pass**) or pay per request natively via **x402 (USDC on Base)**.

---

## Option 1: Zero-Install Remote MCP URL (Fastest)

Connect directly via **Streamable-HTTP MCP** without installing anything locally:

- **Free Tier (2 Free Calls/Day, Zero Config):**
  ```text
  https://agent-kiosk.vercel.app/mcp
  ```
- **Paid Unlimited URL (With Prepaid Pass Key):**
  ```text
  https://agent-kiosk.vercel.app/mcp?api_key=ak_live_YOUR_KEY_HERE
  ```

> **Get an Instant API Key in 10 Seconds:** **[https://agent-kiosk.vercel.app/buy](https://agent-kiosk.vercel.app/buy)**
> - **$1.00 USDC** — **7-Day Starter Pass** (Instant `ak_live_...` key)
> - **$5.00 USDC** — **30-Day Pro Pass** (Full unmasked datasets across all endpoints)

---

## Option 2: Local `npx` / Stdio Setup (Claude Desktop, Cursor, Codex)

This package is **pure Node.js >= 18** with **zero external npm dependencies**, exposing **only** the 5 focused tools for this workflow so your LLM context window stays lean.

### Claude Desktop (`claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "token-honeypot-audit-mcp": {
      "command": "npx",
      "args": ["-y", "github:ralf9090/token-honeypot-audit-mcp"],
      "env": {
        "AGENT_KIOSK_API_KEY": ""
      }
    }
  }
}
```
*(Leave `AGENT_KIOSK_API_KEY` empty for **2 free calls/day**, or paste your `ak_live_...` key from [agent-kiosk.vercel.app/buy](https://agent-kiosk.vercel.app/buy) for unlimited access.)*

### Cursor (`.cursor/mcp.json`)

```json
{
  "mcpServers": {
    "token-honeypot-audit-mcp": {
      "command": "npx",
      "args": ["-y", "github:ralf9090/token-honeypot-audit-mcp"],
      "env": {
        "AGENT_KIOSK_API_KEY": "ak_live_OPTIONAL_PASS_KEY"
      }
    }
  }
}
```

### OpenAI Codex CLI (`~/.codex/config.toml`)

```toml
[mcp_servers.token_honeypot_audit_mcp]
command = "npx"
args = ["-y", "github:ralf9090/token-honeypot-audit-mcp"]
env = { AGENT_KIOSK_API_KEY = "" }
```

### Run Directly via `git clone` + `node index.js`

```bash
git clone https://github.com/ralf9090/token-honeypot-audit-mcp.git
cd token-honeypot-audit-mcp
node index.js
```

---

## Included MCP Tools (5)

### `security_audit`
Pre-flight security and scam radar for AI agents. Audits 0x smart contracts/tokens (honeypot check, buy/sell tax, mintable risk, DEX liquidity via GoPlus & DexScreener) or web URLs (phishing, wallet drainers, prompt injection).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `target` | `string` | **Yes** | 0x... token/contract address OR https://... URL to audit |
| `chain` | `base \| ethereum \| bsc \| arbitrum \| polygon \| optimism` | No | Blockchain network when target is a 0x address (default: 'base') |
| `x_api_key` | `string` | No | Optional ak_live_... 30-day Prepaid API Pass key to unlock the full unmasked dataset |

### `compliance_check`
Institutional AML, Sanctions (OFAC), Phishing, Mixer, and Malicious Counterparty Compliance Screening ($0.05 USDC). Screens any 0x EVM address against GoPlus Security (Base + Ethereum) and 4-chain RPC footprint before autonomous agents execute transfers.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `address` | `string` | **Yes** | 0x... 40-hex EVM wallet or contract address to screen for AML/sanctions |
| `x_api_key` | `string` | No | Optional ak_live_... 30-day Prepaid API Pass key to unlock the full unmasked dataset |

### `token_alpha`
Real-time crypto & DeFi order-flow intelligence. Analyzes buy vs. sell transaction pressure, liquidity depth, volume velocity, FDV, and top DEX pools for any token ticker or contract address.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `query` | `string` | **Yes** | Token symbol (e.g., 'AERO', 'PEPE', 'VIRTUAL') or contract address (0x...) |
| `chain` | `all \| base \| ethereum \| solana \| arbitrum \| bsc` | No | Optional chain filter (default: 'all') |
| `x_api_key` | `string` | No | Optional ak_live_... 30-day Prepaid API Pass key to unlock the full unmasked dataset |

### `token_due_diligence`
Institutional 3-in-1 Token Due Diligence Report ($0.10 USDC). Combines GoPlus on-chain honeypot/tax security audit, DexScreener DEX order-flow alpha & liquidity depth, and live Reddit/HN social sentiment into a composite investment grade (A-F).

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `query` | `string` | **Yes** | Token symbol (e.g., 'AERO', 'VIRTUAL', 'PEPE') or 0x contract address |
| `chain` | `base \| ethereum \| solana \| arbitrum \| bsc \| all` | No | Blockchain network (default: 'base') |
| `x_api_key` | `string` | No | Optional ak_live_... 30-day Prepaid API Pass key to unlock the full unmasked dataset |

### `defi_swap_quote`
Executable DeFi Swap & Cross-Chain Bridge Action Calldata Builder ($0.05 USDC). Queries LI.FI and ParaSwap aggregators to compute the best DEX/Bridge route and returns ready-to-sign EVM transaction calldata (to, data, value, gasLimit) on Base, Ethereum, Arbitrum, Polygon, and Optimism.

| Parameter | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `from_token` | `string` | **Yes** | Source token symbol (e.g., 'USDC', 'ETH', 'AERO') or 0x contract address |
| `to_token` | `string` | **Yes** | Destination token symbol (e.g., 'ETH', 'USDC', 'AERO', 'cbBTC') or 0x address |
| `amount` | `string` | No | Amount of from_token to swap (human-readable e.g. '10' or atomic units) |
| `from_chain` | `base \| ethereum \| arbitrum \| polygon \| optimism` | No | Source blockchain network (default: 'base') |
| `to_chain` | `base \| ethereum \| arbitrum \| polygon \| optimism` | No | Destination blockchain network (default: same as from_chain) |
| `wallet` | `string` | No | Optional 0x sender wallet address for transaction simulation |
| `x_api_key` | `string` | No | Optional ak_live_... 30-day Prepaid API Pass key to unlock the full unmasked dataset |


---

## Example Prompts

- "Audit 0x940181a94A35A4569E4529A3CDfB74e38FD98631 on Base for honeypot risk, buy/sell taxes, and mint permissions."
- "Run a full 3-in-1 token_due_diligence report on VIRTUAL on Base and give me its safety grade."
- "Check compliance_check on wallet 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 and quote a 100 USDC -> WETH swap on Base."

---

## Pricing & Rate Limits

| Tier | Cost | Quota | Setup |
| :--- | :--- | :--- | :--- |
| **Free Trial** | **$0** | **2 Free Calls / Day** | Zero config — works out of the box |
| **Starter Pass** | **$1 USDC** | **7 Days Unlimited** | Get `ak_live_...` at [agent-kiosk.vercel.app/buy](https://agent-kiosk.vercel.app/buy) |
| **Pro Pass** | **$5 USDC** | **30 Days Unlimited** | Get `ak_live_...` at [agent-kiosk.vercel.app/buy](https://agent-kiosk.vercel.app/buy) |
| **x402 Pay-Per-Call** | **$0.008–$0.10** | Unlimited autonomous | Pass `payment_signature` (Base USDC EIP-3009) |

---

## License

MIT © [ralf9090](https://github.com/ralf9090) — Powered by [Agent Kiosk](https://agent-kiosk.vercel.app) ([Upgrade / Buy API Key](https://agent-kiosk.vercel.app/buy)).
