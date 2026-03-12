/**
 * Minimal JWT helpers.
 *
 * NOTE:
 * - This does NOT validate signatures (frontend can't, and shouldn't).
 * - It's used only for convenience (showing role/expiry in UI).
 * - The backend remains the source of truth.
 */

export type JwtPayload = {
  sub?: string;
  email?: string;
  role?: string;
  roles?: string[];
  exp?: number; // seconds since epoch
  iat?: number;
  [key: string]: unknown;
};

function base64UrlDecode(input: string): string {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return atob(padded);
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const json = base64UrlDecode(parts[1]);
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export function isJwtExpired(token: string, skewSeconds = 30): boolean {
  const payload = decodeJwt(token);
  if (!payload?.exp) return false; // If missing exp, treat as non-expiring (backend should enforce).
  const nowSeconds = Math.floor(Date.now() / 1000);
  return payload.exp <= nowSeconds + skewSeconds;
}
