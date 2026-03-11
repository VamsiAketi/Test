import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SidebarItem({ to, icon, label }: { to: string; icon: ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
          isActive
            ? "bg-sky-50 text-blue-800 ring-1 ring-sky-100"
            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={
              "grid h-9 w-9 place-items-center rounded-xl transition " +
              (isActive ? "bg-blue-700 text-white shadow-sm" : "bg-white text-slate-700 ring-1 ring-slate-200")
            }
            aria-hidden
          >
            {icon}
          </span>
          <span className="truncate">{label}</span>

          {isActive ? (
            <motion.span
              layoutId="sidebar-active"
              className="absolute inset-0 -z-10 rounded-xl bg-blue-50"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          ) : null}
        </>
      )}
    </NavLink>
  );
}
