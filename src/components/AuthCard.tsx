import { motion } from "framer-motion";
import { InputField } from "./InputField";
import { PrimaryButton } from "./PrimaryButton";

export function AuthCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.01 }}
      className="w-full max-w-md"
    >
      <div className="rounded-2xl bg-white/90 p-8 shadow-xl shadow-slate-900/10 ring-1 ring-slate-200 backdrop-blur">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-600">Sign in to ClinTrust to continue.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="space-y-5"
        >
          <InputField label="Email" name="email" type="email" autoComplete="email" placeholder="you@hospital.org" required />
          <InputField label="Password" name="password" type="password" autoComplete="current-password" placeholder="••••••••" required />

          <div className="flex items-center justify-between gap-4">
            <a href="#" className="text-sm font-medium text-clintrust-700 hover:text-clintrust-900">
              Forgot password?
            </a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Create account
            </a>
          </div>

          <PrimaryButton type="submit">Log in</PrimaryButton>

          <p className="text-xs leading-relaxed text-slate-500">
            By continuing, you agree to ClinTrust’s security and privacy standards.
          </p>
        </form>
      </div>
    </motion.div>
  );
}
