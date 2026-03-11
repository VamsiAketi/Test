import { motion } from "framer-motion";

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9.5 12l1.8 1.8L15 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function Wave({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className={className}>
      <path
        d="M0,120 C200,40 400,200 600,120 C800,40 1000,200 1200,120 L1200,200 L0,200 Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M0,140 C220,80 420,220 620,140 C820,60 1020,220 1200,140 L1200,200 L0,200 Z"
        fill="currentColor"
        opacity="0.18"
      />
    </svg>
  );
}

export function LeftBrandPanel() {
  return (
    <div className="relative hidden h-full overflow-hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-clintrust-900 via-clintrust-700 to-clintrust-400" />

      <motion.div
        aria-hidden
        className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl"
        animate={{ y: [0, 18, 0], x: [0, 12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-28 left-24 h-80 w-80 rounded-full bg-white/10 blur-2xl"
        animate={{ y: [0, -16, 0], x: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0 }}
      >
        <Wave className="absolute bottom-0 left-0 w-[140%] -translate-x-[10%] text-white" />
      </motion.div>

      <div className="relative flex h-full flex-col justify-between p-10 text-white">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20">
            <ShieldIcon />
          </div>
          <div>
            <div className="text-lg font-semibold leading-tight">ClinTrust</div>
            <div className="text-sm text-white/80">Trusted Clinical Trial Management</div>
          </div>
        </div>

        <div className="max-w-sm">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight">
            Calm, secure access to your clinical trial workspace.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/85">
            Track trials, manage participants, and review patient data with a modern interface designed for clarity and
            compliance.
          </p>

          <div className="mt-8 grid gap-3">
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10">
                <PlusIcon />
              </div>
              <div>
                <div className="text-sm font-semibold">Minimal cognitive load</div>
                <div className="text-xs text-white/80">Readable typography, clean spacing, accessible contrast.</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10">
                <ShieldIcon />
              </div>
              <div>
                <div className="text-sm font-semibold">Built for trust</div>
                <div className="text-xs text-white/80">Professional look-and-feel for healthcare teams.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-white/70">© {new Date().getFullYear()} ClinTrust</div>
      </div>
    </div>
  );
}
