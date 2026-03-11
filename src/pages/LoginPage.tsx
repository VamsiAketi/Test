import { motion } from "framer-motion";
import { AuthCard } from "../components/AuthCard";
import { LeftBrandPanel } from "../components/LeftBrandPanel";

export function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <LeftBrandPanel />

        <div className="relative flex items-center justify-center px-6 py-12">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50" />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-10 h-56 w-56 rounded-full bg-blue-200/40 blur-3xl"
            animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative w-full">
            <AuthCard />

            <p className="mx-auto mt-8 max-w-md text-center text-xs text-slate-500">
              {/* For demo UI only — wire this to your auth provider when ready. */}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
