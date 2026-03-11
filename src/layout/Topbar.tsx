import { motion } from "framer-motion";

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

export function Topbar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold tracking-tight text-slate-100">{title}</h1>
          <p className="mt-0.5 hidden text-xs text-slate-400 sm:block">
            Calm, readable UI for medical staff — ready to connect to real trial data.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <input
                placeholder="Search trials, patients, sites…"
                className="w-[320px] rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              />
            </label>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-700 bg-slate-900/40 text-slate-200 shadow-sm transition hover:bg-slate-900/70"
            aria-label="Notifications"
          >
            <BellIcon />
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/40 px-3 py-2 shadow-sm transition hover:bg-slate-900/70"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-blue-700 to-sky-500 text-xs font-bold text-white">
              CT
            </span>
            <div className="hidden text-left sm:block">
              <div className="text-sm font-semibold leading-tight text-slate-100">Dr. Patel</div>
              <div className="text-xs text-slate-400">Trial Coordinator</div>
            </div>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
