import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/**
 * Route-guard component.
 *
 * Where auth is verified:
 * - Here we verify if user is authenticated for UI route access.
 * - Backend MUST still verify tokens for API access.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null; // or a spinner/skeleton

  if (!isAuthenticated) {
    // Preserve original URL so after login we can redirect back.
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
