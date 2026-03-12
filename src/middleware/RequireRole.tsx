import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import type { Role } from "../api/apiConfig";

/**
 * RBAC route guard.
 *
 * Why separate from RequireAuth?
 * - Auth (logged in) and authorization (permissions/role) are different concerns.
 */
export function RequireRole({ children, anyOf }: { children: React.ReactNode; anyOf: Role | Role[] }) {
  const { isLoading, isAuthenticated, hasRole } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const allowed = hasRole(anyOf);
  if (!allowed) {
    // You can change this to a dedicated 403 page.
    return <Navigate to="/app/dashboard" replace />;
  }

  return <>{children}</>;
}
