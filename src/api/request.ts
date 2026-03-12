import { apiConfig, getAuthHeaders, tokenStore, type AuthTokens } from "./apiConfig";
import { isJwtExpired } from "../utils/jwt";

export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

/**
 * Create an AbortSignal that auto-aborts after timeoutMs.
 *
 * Why?
 * - Prevents hung requests during backend outages.
 */
function createTimeoutSignal(timeoutMs: number): AbortSignal {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  // If caller aborts early, clear the timeout.
  controller.signal.addEventListener("abort", () => clearTimeout(timeout), { once: true });

  return controller.signal;
}

/**
 * Refresh access token using refresh token.
 *
 * Why separate?
 * - Keeps refresh logic testable and reusable.
 * - Lets request() retry once on 401.
 */
export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = tokenStore.getRefreshToken();
  if (!refreshToken) return null;

  const res = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.auth.refresh}`, {
    method: "POST",
    headers: {
      ...apiConfig.request.defaultHeaders,
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (!res.ok) {
    // If refresh fails, we clear tokens so UI can force re-login.
    tokenStore.clear();
    return null;
  }

  const data = (await res.json()) as Partial<AuthTokens>;
  if (!data.accessToken) {
    tokenStore.clear();
    return null;
  }

  tokenStore.setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken ?? refreshToken });
  return data.accessToken;
}

export type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  body?: unknown;
  headers?: Record<string, string>;
  auth?: boolean;
  /** When true, we will attempt refresh + retry once on 401. */
  retryOnAuthFailure?: boolean;
};

/**
 * Common request wrapper for the app.
 *
 * What it does:
 * - Prefixes baseUrl
 * - Adds JSON headers
 * - Adds Authorization header when auth=true
 * - Normalizes errors into a consistent shape
 * - Optionally refreshes token and retries once
 */
export async function request<T>(opts: RequestOptions): Promise<T> {
  const {
    method = "GET",
    path,
    body,
    headers,
    auth = true,
    retryOnAuthFailure = true,
  } = opts;

  // Pre-emptive refresh if we know the token is expired.
  // Why?
  // - Avoids a wave of 401s and duplicated retries.
  const accessToken = tokenStore.getAccessToken();
  if (auth && accessToken && isJwtExpired(accessToken)) {
    await refreshAccessToken();
  }

  const res = await fetch(`${apiConfig.baseUrl}${path}`, {
    method,
    headers: {
      ...apiConfig.request.defaultHeaders,
      ...(auth ? getAuthHeaders() : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: createTimeoutSignal(apiConfig.request.timeoutMs),
  });

  if (res.status === 401 && auth && retryOnAuthFailure) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      // Retry exactly once to prevent infinite loops.
      return request<T>({ ...opts, retryOnAuthFailure: false });
    }
  }

  if (!res.ok) {
    let details: unknown = undefined;
    try {
      details = await res.json();
    } catch {
      // ignore
    }

    const err: ApiError = {
      status: res.status,
      message: (details as any)?.message ?? res.statusText ?? "Request failed",
      details,
    };
    throw err;
  }

  // Handle empty responses (204 etc)
  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}
