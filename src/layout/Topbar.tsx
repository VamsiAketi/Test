import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../theme/useTheme";

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M15 17H9m9-2V11a6 6 0 1 0-12 0v4l-2 2h16l-2-2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ThemeIcon({ mode }: { mode: "light" | "dark" }) {
  return mode === "dark" ? (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M21 13a8 8 0 0 1-10-10 8.5 8.5 0 1 0 10 10z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Topbar({ title }: { title: string }) {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">{title}</h1>
          <p className="mt-0.5 hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
            Calm, readable UI for medical staff — ready to connect to real trial data.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <input
                placeholder="Search trials, patients, sites…"
                className="w-[320px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
              />
            </label>
          </div>

          <button
            onClick={toggle}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-900/70"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            type="button"
          >
            <ThemeIcon mode={theme} />
          </button>

          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-900/70"
            aria-label="Notifications"
            type="button"
          >
            <BellIcon />
          </button>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-900/70"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-blue-700 to-sky-500 text-xs font-bold text-white">
              CT
            </span>
            <div className="hidden text-left sm:block">
              <div className="text-sm font-semibold leading-tight text-slate-900 dark:text-slate-100">
                {user?.email ?? "Unknown user"}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{user?.role ?? ""}</div>
            </div>

            <button
              type="button"
              className="ml-2 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-900/70"
              onClick={async () => {
                await logout();
                navigate("/login", { replace: true });
              }}
            >
              Logout
            </button>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
