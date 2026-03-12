import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { tokenStore, type Role } from "../api/apiConfig";
import { authService, type User } from "../services/authService";

type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  roles: Role[];
};

type AuthContextValue = AuthState & {
  login(email: string, password: string): Promise<void>;
  register(email: string, password: string, role?: Role): Promise<void>;
  logout(): Promise<void>;
  hasRole(required: Role | Role[]): boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Boot-time hydration of auth state.
    // Why?
    // - Allows refresh on page reload.
    // - Keeps route guards consistent.
    (async () => {
      try {
        const current = await authService.getCurrentUser();
        setUser(current);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const isAuthenticated = !!tokenStore.getAccessToken() && !!user;
    const roles = user ? [user.role] : [];

    return {
      user,
      isLoading,
      isAuthenticated,
      roles,

      async login(email: string, password: string) {
        const u = await authService.login({ email, password });
        setUser(u);
      },

      async register(email: string, password: string, role?: Role) {
        const u = await authService.register({ email, password, role });
        setUser(u);
      },

      async logout() {
        await authService.logout();
        setUser(null);
      },

      hasRole(required: Role | Role[]) {
        const list = Array.isArray(required) ? required : [required];
        return list.some((r) => roles.includes(r));
      },
    };
  }, [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
