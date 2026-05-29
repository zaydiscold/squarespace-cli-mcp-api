/**
 * Request building + execution for the Squarespace Commerce API.
 *
 * The base for the public Commerce API is https://api.squarespace.com/1.0/commerce
 * and auth is a bearer API key in the `Authorization` header.
 *
 * Request planning (method + url + headers + body) is deliberately split from
 * execution so the planner can be unit-tested without network or credentials,
 * and so every write defaults to a dry-run preview.
 */

export const COMMERCE_BASE = "https://api.squarespace.com/1.0/commerce";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface RequestPlan {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
  body?: unknown;
}

export interface BuildRequestInput {
  method: HttpMethod;
  /** Path relative to the Commerce base, e.g. "/orders" or "/products/{id}". */
  path: string;
  pathParams?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  /** Override the base (used by account/domains internal surface). */
  base?: string;
  /** API key. When omitted, the planner emits a placeholder so plans are still printable. */
  apiKey?: string;
}

const PLACEHOLDER_KEY = "<SQUARESPACE_API_KEY>";

function renderPath(path: string, pathParams: Record<string, string> = {}): string {
  let rendered = path;
  for (const [name, value] of Object.entries(pathParams)) {
    rendered = rendered.replace(new RegExp(`\\{${name}\\}`, "g"), encodeURIComponent(value));
  }
  const missing = Array.from(rendered.matchAll(/\{([^}]+)\}/g), (m) => m[1]);
  if (missing.length > 0) {
    throw new Error(`missing path parameter(s): ${missing.join(", ")}`);
  }
  return rendered;
}

/**
 * Pure function: turns an intent into a concrete request plan. No network.
 */
export function buildRequest(input: BuildRequestInput): RequestPlan {
  const base = input.base ?? COMMERCE_BASE;
  const url = new URL(base.replace(/\/$/, "") + renderPath(input.path, input.pathParams));
  for (const [key, value] of Object.entries(input.query ?? {})) {
    if (value === undefined) continue;
    url.searchParams.set(key, String(value));
  }
  const headers: Record<string, string> = {
    Authorization: `Bearer ${input.apiKey ?? PLACEHOLDER_KEY}`,
    "User-Agent": "squarespace-cli",
    Accept: "application/json"
  };
  if (input.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  return { method: input.method, url: url.toString(), headers, body: input.body };
}

export function getApiKey(): string {
  const key = process.env.SQUARESPACE_API_KEY;
  if (!key) {
    throw new Error("SQUARESPACE_API_KEY is required for live calls (set it in your environment)");
  }
  return key;
}

/**
 * Execute a planned request against the live API. Only ever called once a
 * read is requested or a write has been explicitly confirmed with --live-write.
 */
export async function execute(plan: RequestPlan): Promise<unknown> {
  const body = plan.body === undefined ? undefined : JSON.stringify(plan.body);
  const res = await fetch(plan.url, {
    method: plan.method,
    headers: plan.headers,
    body
  });
  const text = await res.text();
  const parsed = text ? safeJson(text) : null;
  if (!res.ok) {
    const detail = typeof parsed === "object" && parsed !== null ? JSON.stringify(parsed) : text;
    throw new Error(`Squarespace API returned HTTP ${res.status} for ${plan.method} ${plan.url}: ${detail}`);
  }
  return parsed;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
