#!/usr/bin/env node
/**
 * Token Honeypot Detector, Smart Contract Audit & AML MCP Server (token-honeypot-audit-mcp)
 * Zero-dependency MCP stdio proxy routing focused niche tools to https://agent-kiosk.vercel.app/mcp
 *
 * Free tier: 2 free calls/day out of the box (no API key needed).
 * Unlimited upgrade: https://agent-kiosk.vercel.app/buy ($1 7-Day Starter Pass / $5 30-Day Pro Pass)
 */
import readline from "node:readline";

const SERVER_NAME = "token-honeypot-audit-mcp";
const SERVER_VERSION = "1.0.0";
const REMOTE_MCP_URL =
  process.env.AGENT_KIOSK_MCP_URL || "https://agent-kiosk.vercel.app/mcp";

const TOOLS = [
  {
    "name": "security_audit",
    "description": "Pre-flight security and scam radar for AI agents. Audits 0x smart contracts/tokens (honeypot check, buy/sell tax, mintable risk, DEX liquidity via GoPlus & DexScreener) or web URLs (phishing, wallet drainers, prompt injection).",
    "inputSchema": {
      "type": "object",
      "properties": {
        "target": {
          "type": "string",
          "description": "0x... token/contract address OR https://... URL to audit"
        },
        "chain": {
          "type": "string",
          "enum": [
            "base",
            "ethereum",
            "bsc",
            "arbitrum",
            "polygon",
            "optimism"
          ],
          "description": "Blockchain network when target is a 0x address (default: 'base')"
        },
        "payment_signature": {
          "type": "string",
          "description": "Optional x402 v2/v1 Base64 or JSON EIP-3009 USDC payment signature to unlock the full unmasked dataset directly via MCP"
        },
        "x_api_key": {
          "type": "string",
          "description": "Optional ak_live_... 30-day Prepaid API Pass key to unlock the full unmasked dataset"
        }
      },
      "required": [
        "target"
      ]
    },
    "annotations": {
      "title": "Security Audit",
      "readOnlyHint": true,
      "destructiveHint": false,
      "idempotentHint": true,
      "openWorldHint": true
    }
  },
  {
    "name": "compliance_check",
    "description": "Institutional AML, Sanctions (OFAC), Phishing, Mixer, and Malicious Counterparty Compliance Screening ($0.05 USDC). Screens any 0x EVM address against GoPlus Security (Base + Ethereum) and 4-chain RPC footprint before autonomous agents execute transfers.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string",
          "description": "0x... 40-hex EVM wallet or contract address to screen for AML/sanctions"
        },
        "payment_signature": {
          "type": "string",
          "description": "Optional x402 v2/v1 Base64 or JSON EIP-3009 USDC payment signature to unlock the full unmasked dataset directly via MCP"
        },
        "x_api_key": {
          "type": "string",
          "description": "Optional ak_live_... 30-day Prepaid API Pass key to unlock the full unmasked dataset"
        }
      },
      "required": [
        "address"
      ]
    },
    "annotations": {
      "title": "Compliance Check",
      "readOnlyHint": true,
      "destructiveHint": false,
      "idempotentHint": true,
      "openWorldHint": true
    }
  },
  {
    "name": "token_alpha",
    "description": "Real-time crypto & DeFi order-flow intelligence. Analyzes buy vs. sell transaction pressure, liquidity depth, volume velocity, FDV, and top DEX pools for any token ticker or contract address.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "query": {
          "type": "string",
          "description": "Token symbol (e.g., 'AERO', 'PEPE', 'VIRTUAL') or contract address (0x...)"
        },
        "chain": {
          "type": "string",
          "enum": [
            "all",
            "base",
            "ethereum",
            "solana",
            "arbitrum",
            "bsc"
          ],
          "description": "Optional chain filter (default: 'all')"
        },
        "payment_signature": {
          "type": "string",
          "description": "Optional x402 v2/v1 Base64 or JSON EIP-3009 USDC payment signature to unlock the full unmasked dataset directly via MCP"
        },
        "x_api_key": {
          "type": "string",
          "description": "Optional ak_live_... 30-day Prepaid API Pass key to unlock the full unmasked dataset"
        }
      },
      "required": [
        "query"
      ]
    },
    "annotations": {
      "title": "Token Alpha",
      "readOnlyHint": true,
      "destructiveHint": false,
      "idempotentHint": true,
      "openWorldHint": true
    }
  },
  {
    "name": "token_due_diligence",
    "description": "Institutional 3-in-1 Token Due Diligence Report ($0.10 USDC). Combines GoPlus on-chain honeypot/tax security audit, DexScreener DEX order-flow alpha & liquidity depth, and live Reddit/HN social sentiment into a composite investment grade (A-F).",
    "inputSchema": {
      "type": "object",
      "properties": {
        "query": {
          "type": "string",
          "description": "Token symbol (e.g., 'AERO', 'VIRTUAL', 'PEPE') or 0x contract address"
        },
        "chain": {
          "type": "string",
          "enum": [
            "base",
            "ethereum",
            "solana",
            "arbitrum",
            "bsc",
            "all"
          ],
          "description": "Blockchain network (default: 'base')"
        },
        "payment_signature": {
          "type": "string",
          "description": "Optional x402 v2/v1 Base64 or JSON EIP-3009 USDC payment signature to unlock the full unmasked dataset directly via MCP"
        },
        "x_api_key": {
          "type": "string",
          "description": "Optional ak_live_... 30-day Prepaid API Pass key to unlock the full unmasked dataset"
        }
      },
      "required": [
        "query"
      ]
    },
    "annotations": {
      "title": "Token Due Diligence",
      "readOnlyHint": true,
      "destructiveHint": false,
      "idempotentHint": true,
      "openWorldHint": true
    }
  },
  {
    "name": "defi_swap_quote",
    "description": "Executable DeFi Swap & Cross-Chain Bridge Action Calldata Builder ($0.05 USDC). Queries LI.FI and ParaSwap aggregators to compute the best DEX/Bridge route and returns ready-to-sign EVM transaction calldata (to, data, value, gasLimit) on Base, Ethereum, Arbitrum, Polygon, and Optimism.",
    "inputSchema": {
      "type": "object",
      "properties": {
        "from_token": {
          "type": "string",
          "description": "Source token symbol (e.g., 'USDC', 'ETH', 'AERO') or 0x contract address"
        },
        "to_token": {
          "type": "string",
          "description": "Destination token symbol (e.g., 'ETH', 'USDC', 'AERO', 'cbBTC') or 0x address"
        },
        "amount": {
          "type": "string",
          "description": "Amount of from_token to swap (human-readable e.g. '10' or atomic units)"
        },
        "from_chain": {
          "type": "string",
          "enum": [
            "base",
            "ethereum",
            "arbitrum",
            "polygon",
            "optimism"
          ],
          "description": "Source blockchain network (default: 'base')"
        },
        "to_chain": {
          "type": "string",
          "enum": [
            "base",
            "ethereum",
            "arbitrum",
            "polygon",
            "optimism"
          ],
          "description": "Destination blockchain network (default: same as from_chain)"
        },
        "wallet": {
          "type": "string",
          "description": "Optional 0x sender wallet address for transaction simulation"
        },
        "payment_signature": {
          "type": "string",
          "description": "Optional x402 v2/v1 Base64 or JSON EIP-3009 USDC payment signature to unlock the full unmasked dataset directly via MCP"
        },
        "x_api_key": {
          "type": "string",
          "description": "Optional ak_live_... 30-day Prepaid API Pass key to unlock the full unmasked dataset"
        }
      },
      "required": [
        "from_token",
        "to_token"
      ]
    },
    "annotations": {
      "title": "Defi Swap Quote",
      "readOnlyHint": true,
      "destructiveHint": false,
      "idempotentHint": true,
      "openWorldHint": true
    }
  }
];
const ALLOWED_TOOLS = new Set(TOOLS.map((t) => t.name));

function sendRpc(payload) {
  process.stdout.write(JSON.stringify(payload) + "\n");
}

async function forwardToolCall(id, params) {
  const toolName = params?.name;
  const rawArgs =
    params?.arguments && typeof params.arguments === "object"
      ? { ...params.arguments }
      : {};

  if (!toolName || !ALLOWED_TOOLS.has(toolName)) {
    return sendRpc({
      jsonrpc: "2.0",
      id,
      error: {
        code: -32601,
        message: `Unknown tool '${toolName}'. Available tools in ${SERVER_NAME}: ${Array.from(ALLOWED_TOOLS).join(", ")}`,
      },
    });
  }

  const apiKey = (
    rawArgs.x_api_key ||
    process.env.AGENT_KIOSK_API_KEY ||
    ""
  ).trim();

  if (apiKey && !rawArgs.x_api_key) {
    rawArgs.x_api_key = apiKey;
  }

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": `${SERVER_NAME}/${SERVER_VERSION}`,
  };

  if (apiKey) {
    headers["X-API-KEY"] = apiKey;
  }
  if (rawArgs.payment_signature) {
    headers["PAYMENT-SIGNATURE"] = String(rawArgs.payment_signature);
  }

  try {
    const response = await fetch(REMOTE_MCP_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        jsonrpc: "2.0",
        id,
        method: "tools/call",
        params: {
          name: toolName,
          arguments: rawArgs,
        },
      }),
    });

    const text = await response.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = null;
    }

    if (parsed && parsed.jsonrpc === "2.0") {
      parsed.id = id;
      return sendRpc(parsed);
    }

    return sendRpc({
      jsonrpc: "2.0",
      id,
      result: {
        isError: !response.ok,
        content: [
          {
            type: "text",
            text: parsed ? JSON.stringify(parsed, null, 2) : text,
          },
        ],
      },
    });
  } catch (err) {
    return sendRpc({
      jsonrpc: "2.0",
      id,
      result: {
        isError: true,
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                error: "UPSTREAM_CONNECTION_ERROR",
                message: err?.message || String(err),
                remote_mcp_url: REMOTE_MCP_URL,
                upgrade_url: "https://agent-kiosk.vercel.app/buy",
              },
              null,
              2
            ),
          },
        ],
      },
    });
  }
}

async function handleLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return;

  let rpc;
  try {
    rpc = JSON.parse(trimmed);
  } catch (err) {
    return sendRpc({
      jsonrpc: "2.0",
      id: null,
      error: { code: -32700, message: `Parse error: ${err.message}` },
    });
  }

  const { id, method, params } = rpc;

  if (method && method.startsWith("notifications/")) {
    return;
  }

  if (method === "initialize") {
    const requestedVersion = params?.protocolVersion;
    const supportedVersions = ["2024-11-05", "2025-03-26", "2025-06-18"];
    const protocolVersion = supportedVersions.includes(requestedVersion)
      ? requestedVersion
      : "2024-11-05";

    return sendRpc({
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion,
        capabilities: {
          tools: {},
        },
        serverInfo: {
          name: SERVER_NAME,
          version: SERVER_VERSION,
        },
      },
    });
  }

  if (method === "ping" || method === "logging/setLevel") {
    return sendRpc({
      jsonrpc: "2.0",
      id,
      result: {},
    });
  }

  if (method === "tools/list") {
    return sendRpc({
      jsonrpc: "2.0",
      id,
      result: {
        tools: TOOLS,
      },
    });
  }

  if (method === "resources/list") {
    return sendRpc({
      jsonrpc: "2.0",
      id,
      result: { resources: [] },
    });
  }

  if (method === "resources/templates/list") {
    return sendRpc({
      jsonrpc: "2.0",
      id,
      result: { resourceTemplates: [] },
    });
  }

  if (method === "prompts/list") {
    return sendRpc({
      jsonrpc: "2.0",
      id,
      result: { prompts: [] },
    });
  }

  if (method === "tools/call") {
    return await forwardToolCall(id, params);
  }

  if (id !== undefined) {
    return sendRpc({
      jsonrpc: "2.0",
      id,
      error: { code: -32601, message: `Method not found: ${method}` },
    });
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

let queue = Promise.resolve();
rl.on("line", (line) => {
  queue = queue.then(() => handleLine(line)).catch((err) => {
    sendRpc({
      jsonrpc: "2.0",
      id: null,
      error: { code: -32603, message: err?.message || "Internal error" },
    });
  });
});
