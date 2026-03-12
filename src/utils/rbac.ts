import type { Role } from "../api/apiConfig";

/**
 * Central RBAC helpers.
 *
 * Frontend RBAC is for UX only.
 * Backend must enforce the same rules server-side.
 */

export type Permission =
  | "trials:read"
  | "trials:write"
  | "patients:read"
  | "patients:write"
  | "reports:read"
  | "admin:manage";

// Example mapping. Adjust to your product needs.
export const rolePermissions: Record<Role, Permission[]> = {
  Admin: ["admin:manage", "trials:read", "trials:write", "patients:read", "patients:write", "reports:read"],
  Manager: ["trials:read", "trials:write", "patients:read", "reports:read"],
  User: ["trials:read", "patients:read"],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}
