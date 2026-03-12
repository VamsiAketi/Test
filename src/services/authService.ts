import { apiConfig, tokenStore, type AuthTokens, type Role } from "../api/apiConfig";
import { request } from "../api/request";
import { decodeJwt } from "../utils/jwt";

export type User = {
  id: string;
  email: string;
  role: Role;
  // Add more fields as needed (name, orgId, etc.)
};

export type LoginRequest = { email: string; password: string };
export type RegisterRequest = { email: string; password: string; role?: Role };

/**
 * What we expect from the backend.
 *
 * If your backend responds differently, update ONLY this file.
 * The rest of the app should stay stable.
 */
export type AuthResponse = {
  accessToken: string;
  refreshToken?: string;
  user?: User; // optional if token already includes role/email
};

function deriveUserFromTokenOrResponse(tokens: AuthTokens, user?: User): User | null {
  if (user) return user;
  const payload = decodeJwt(tokens.accessToken);
  if (!payload) return null;

  const role = (payload.role ?? (Array.isArray(payload.roles) ? payload.roles[0] : undefined)) as Role | undefined;
  const email = payload.email as string | undefined;
  const id = (payload.sub as string | undefined) ?? "";

  if (!role || !email) return null;
  return { id, email, role };
}

export const authService = {
  async login(input: LoginRequest): Promise<User> {
    const data = await request<AuthResponse>({
      method: "POST",
      path: apiConfig.endpoints.auth.login,
      body: input,
      auth: false,
    });

    tokenStore.setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });

    const user = deriveUserFromTokenOrResponse({ accessToken: data.accessToken, refreshToken: data.refreshToken }, data.user);
    if (!user) {
      // Why throw?
      // - We want a hard failure when token is missing required claims.
      // - It makes debugging backend responses straightforward.
      throw new Error("Login succeeded but user claims were missing (role/email). Check backend token payload or /auth/me.");
    }

    return user;
  },

  async register(input: RegisterRequest): Promise<User> {
    const data = await request<AuthResponse>({
      method: "POST",
      path: apiConfig.endpoints.auth.register,
      body: input,
      auth: false,
    });

    tokenStore.setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });

    const user = deriveUserFromTokenOrResponse({ accessToken: data.accessToken, refreshToken: data.refreshToken }, data.user);
    if (!user) throw new Error("Register succeeded but user claims were missing (role/email). Check backend response.");
    return user;
  },

  /**
   * Calls backend logout (if supported) then clears tokens.
   * Backend is optional — clearing tokens is what actually logs the SPA out.
   */
  async logout(): Promise<void> {
    try {
      await request<void>({ method: "POST", path: apiConfig.endpoints.auth.logout, body: {}, auth: true });
    } catch {
      // Intentionally ignore failures.
      // Why?
      // - Token revoke endpoints are often best-effort.
      // - We still want the user to be logged out locally.
    } finally {
      tokenStore.clear();
    }
  },

  /**
   * Load current user.
   * Uses /auth/me if available; otherwise derives from JWT.
   */
  async getCurrentUser(): Promise<User | null> {
    const token = tokenStore.getAccessToken();
    if (!token) return null;

    // Prefer server truth when endpoint exists.
    try {
      const user = await request<User>({ method: "GET", path: apiConfig.endpoints.auth.me, auth: true });
      return user;
    } catch {
      const payload = decodeJwt(token);
      const role = (payload?.role ?? (Array.isArray(payload?.roles) ? payload.roles[0] : undefined)) as Role | undefined;
      const email = payload?.email as string | undefined;
      const id = (payload?.sub as string | undefined) ?? "";
      return role && email ? { id, email, role } : null;
    }
  },
};
