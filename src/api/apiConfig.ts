/**
 * Central API configuration + token handling.
 *
 * Why centralized?
 * - Keeps endpoints, headers, and token logic in one place.
 * - Makes it easy to debug requests (single choke point).
 * - Avoids hard-coding URLs across the app.
 */

export type Role = "Admin" | "Manager" | "User";

export const apiConfig = {
  /**
   * Base URL for the backend API.
   *
   * Set this in `.env` as:
   *   VITE_API_BASE_URL="https://api.example.com"
   */
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000",

  /**
   * All API endpoints live here so refactors are easy.
   * Keep paths *relative* to baseUrl.
   */
  endpoints: {
    auth: {
      login: "/auth/login",
      register: "/auth/register",
      logout: "/auth/logout",
      refresh: "/auth/refresh",
      me: "/auth/me",
    },
  },

  /**
   * Common request config used by the fetch wrapper.
   */
  request: {
    timeoutMs: 20_000,
    defaultHeaders: {
      "Content-Type": "application/json",
      Accept: "application/json",
    } as Record<string, string>,
  },

  /**
   * Token storage keys.
   * Keeping keys here makes it easy to rotate/migrate.
   */
  tokenStorage: {
    accessTokenKey: "ct_access_token",
    refreshTokenKey: "ct_refresh_token",
  },
};

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

export const tokenStore = {
  getAccessToken(): string | null {
    return localStorage.getItem(apiConfig.tokenStorage.accessTokenKey);
  },
  getRefreshToken(): string | null {
    return localStorage.getItem(apiConfig.tokenStorage.refreshTokenKey);
  },
  setTokens(tokens: AuthTokens) {
    // Why localStorage?
    // - Simple for SPA demos.
    // - For higher security, prefer httpOnly secure cookies on the backend.
    localStorage.setItem(apiConfig.tokenStorage.accessTokenKey, tokens.accessToken);
    if (tokens.refreshToken) {
      localStorage.setItem(apiConfig.tokenStorage.refreshTokenKey, tokens.refreshToken);
    }
  },
  clear() {
    localStorage.removeItem(apiConfig.tokenStorage.accessTokenKey);
    localStorage.removeItem(apiConfig.tokenStorage.refreshTokenKey);
  },
};

/**
 * Returns the Authorization header if an access token exists.
 */
export function getAuthHeaders(): Record<string, string> {
  const token = tokenStore.getAccessToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}
