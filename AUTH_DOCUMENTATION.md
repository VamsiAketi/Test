# Authentication & RBAC Documentation (ClinTrust Portal)

This document explains the authentication + authorization (RBAC) architecture implemented in this repo.

## 1) Overview

### Goals
- Centralized, consistent API calling pattern (base URL, endpoints, headers, error handling).
- Easy-to-debug authentication flow (login/register/logout, token storage).
- Role-Based Access Control (RBAC) with clean helpers for routes and UI.
- Minimal coupling: backend response formats can change with minimal frontend churn.

### What’s included
- **Central API config:** `src/api/apiConfig.ts`
- **Fetch wrapper + refresh logic:** `src/api/request.ts`
- **Auth service:** `src/services/authService.ts`
- **Auth state (React context):** `src/auth/AuthContext.tsx`
- **Route guards (middleware):**
  - `src/middleware/RequireAuth.tsx`
  - `src/middleware/RequireRole.tsx`
- **RBAC helpers:** `src/utils/rbac.ts`

## 2) API Configuration (Centralized)

File: `src/api/apiConfig.ts`

### Base URL
The backend base URL is controlled by Vite env:

- `.env`:
  ```bash
  VITE_API_BASE_URL="http://localhost:4000"
  ```

At runtime we use:
- `apiConfig.baseUrl`

### Endpoints
All endpoints are defined in one place:
- `apiConfig.endpoints.auth.login` → `POST /auth/login`
- `apiConfig.endpoints.auth.register` → `POST /auth/register`
- `apiConfig.endpoints.auth.logout` → `POST /auth/logout`
- `apiConfig.endpoints.auth.refresh` → `POST /auth/refresh`
- `apiConfig.endpoints.auth.me` → `GET /auth/me`

If your backend paths change, update **only this file**.

### Auth headers
- `getAuthHeaders()` returns `{ Authorization: "Bearer <accessToken>" }` when a token exists.

### Token handling
`tokenStore` provides:
- `getAccessToken()`
- `getRefreshToken()`
- `setTokens({ accessToken, refreshToken? })`
- `clear()`

Token keys are centralized under `apiConfig.tokenStorage`.

## 3) Authentication Flow

### 3.1 Login
Files involved:
- UI: `src/components/AuthCard.tsx` (login mode)
- State: `src/auth/AuthContext.tsx`
- API: `src/services/authService.ts`

Flow:
1. User submits email/password.
2. `AuthContext.login()` calls `authService.login()`.
3. `authService.login()` calls:
   - `POST /auth/login`
4. On success:
   - Tokens are stored via `tokenStore.setTokens()`.
   - User is derived from `data.user` OR decoded from JWT claims.

Expected backend response (recommended):
```json
{
  "accessToken": "<jwt>",
  "refreshToken": "<jwt> (optional)",
  "user": { "id": "1", "email": "a@b.com", "role": "Admin" }
}
```

If `user` is not returned, the JWT should include at least:
- `email`
- `role` (or `roles: []`)

### 3.2 Register
Same flow as login, but calls:
- `POST /auth/register`

### 3.3 Logout
Files involved:
- `src/services/authService.ts`

Flow:
1. Call backend `POST /auth/logout` (best-effort).
2. Always clear tokens locally.

Why best-effort?
- Some backends do not implement token revocation.
- Clearing tokens is enough to log out the SPA.

### 3.4 Token refresh
File: `src/api/request.ts`

Two refresh triggers:
1. **Proactive:** if access token is expired (based on `exp` claim) → attempt refresh before sending request.
2. **Reactive:** if a request returns **401** → attempt refresh and retry once.

Backend expectation (example):
- `POST /auth/refresh` with header:
  - `Authorization: Bearer <refreshToken>`

Response (example):
```json
{ "accessToken": "<newAccessJwt>", "refreshToken": "<newRefreshJwt>" }
```

If refresh fails:
- tokens are cleared
- UI should send user back to `/login`

## 4) RBAC (Role-Based Access Control)

### Roles
Defined in `src/api/apiConfig.ts`:
- `Admin`
- `Manager`
- `User`

### Route restrictions
Route guards are implemented as components:
- `RequireAuth` → user must be logged in
- `RequireRole` → user must have one of the allowed roles

Important note:
- **Frontend RBAC is UX-only.** The backend must enforce roles on API endpoints.

### Permissions (optional layer)
File: `src/utils/rbac.ts`
- `rolePermissions` mapping
- `hasPermission(role, permission)` helper

This lets you gate UI actions like "Create Trial" without hard-coding role checks everywhere.

## 5) Where authentication is verified

### Frontend verification
- `RequireAuth` checks if the user is logged in before allowing route access.
- `request()` injects the `Authorization` header and handles refresh.

### Backend verification (required)
Your backend must:
- Validate JWT signatures
- Verify token expiry
- Enforce RBAC/permissions per endpoint

## 6) Debugging Guide

### Common issues

#### A) Login works but app immediately redirects to /login
Likely cause:
- Token stored, but user claims missing.

Check:
- JWT payload includes `role` + `email` OR backend returns `user`.

#### B) Requests always return 401
Check:
- `VITE_API_BASE_URL`
- backend expects different auth header format
- token is stored under the correct key

In code:
- `tokenStore.getAccessToken()` returns a value?
- `getAuthHeaders()` returns `Authorization: Bearer ...`?

#### C) Refresh loop / repeated refresh attempts
We prevent infinite loops by retrying once (`retryOnAuthFailure: false`).
If still looping, check:
- backend refresh endpoint behavior
- refresh token validity

#### D) Role guard not working
Check:
- `user.role` value
- `RequireRole anyOf={...}` usage

## 7) Example usage

### 7.1 Protect a route (must be logged in)
```tsx
<Route
  path="/app"
  element={
    <RequireAuth>
      <DashboardLayout />
    </RequireAuth>
  }
>
```

### 7.2 Restrict route by role
```tsx
<Route
  path="/app/settings"
  element={
    <RequireRole anyOf={["Admin", "Manager"]}>
      <SettingsPage />
    </RequireRole>
  }
/>
```

### 7.3 Gate a UI action by permission
```tsx
import { hasPermission } from "../utils/rbac";
import { useAuth } from "../auth/AuthContext";

const { user } = useAuth();
const canCreateTrial = user ? hasPermission(user.role, "trials:write") : false;
```

## 8) Extending roles

To add a new role (e.g., `Auditor`):
1. Add it to the Role union in `src/api/apiConfig.ts`.
2. Update `rolePermissions` in `src/utils/rbac.ts`.
3. Ensure backend issues tokens with `role: "Auditor"` and enforces it.
4. Use `RequireRole anyOf="Auditor"` or permission checks.

---

If you share your backend contract (exact endpoints + payload shapes), we can align `authService` and remove any assumptions.
