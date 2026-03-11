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
            ? "bg-blue-500/10 text-slate-100 ring-1 ring-blue-500/20"
            : "text-slate-300 hover:bg-slate-900/60 hover:text-slate-100",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={
              "grid h-9 w-9 place-items-center rounded-xl transition " +
              (isActive
                ? "bg-blue-600/90 text-white shadow-sm ring-1 ring-blue-500/30"
                : "bg-slate-900/40 text-slate-200 ring-1 ring-slate-700/50")
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
