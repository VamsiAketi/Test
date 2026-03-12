import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Role } from "../api/apiConfig";
import { useAuth } from "../auth/AuthContext";
import { InputField } from "./InputField";
import { PrimaryButton } from "./PrimaryButton";

export function AuthCard({ mode }: { mode: "login" | "register" }) {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("User");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = mode === "login";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.01 }}
      className="mx-auto w-full max-w-md"
    >
      <div className="rounded-2xl bg-white/90 p-8 shadow-xl shadow-slate-900/10 ring-1 ring-slate-200 backdrop-blur">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{isLogin ? "Welcome back" : "Create your account"}</h1>
          <p className="mt-2 text-sm text-slate-600">
            {isLogin ? "Sign in to ClinTrust to continue." : "Register to start using ClinTrust."}
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setIsSubmitting(true);

            try {
              if (isLogin) {
                await login(email, password);
              } else {
                await register(email, password, role);
              }

              // After auth succeeds, send the user into the app.
              navigate("/app/dashboard", { replace: true });
            } catch (err: any) {
              // Why surface a friendly error?
              // - Auth failures are common during setup.
              // - We want the user to see the backend message when available.
              setError(err?.message ?? "Authentication failed");
            } finally {
              setIsSubmitting(false);
            }
          }}
          className="space-y-5"
        >
          <InputField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@hospital.org"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isLogin ? (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Role</label>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-clintrust-600 focus:outline-none focus:ring-2 focus:ring-clintrust-200"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
              >
                <option value="User">User</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
              <p className="text-xs text-slate-500">For production, roles should usually be assigned server-side.</p>
            </div>
          ) : null}

          {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

          <div className="flex items-center justify-between gap-4">
            {isLogin ? (
              <a href="#" className="text-sm font-medium text-clintrust-700 hover:text-clintrust-900">
                Forgot password?
              </a>
            ) : (
              <span />
            )}

            {isLogin ? (
              <a
                href="/register"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/register");
                }}
              >
                Create account
              </a>
            ) : (
              <a
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Back to login
              </a>
            )}
          </div>

          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Please wait…" : isLogin ? "Log in" : "Register"}
          </PrimaryButton>

          <p className="text-xs leading-relaxed text-slate-500">By continuing, you agree to ClinTrust’s security and privacy standards.</p>
        </form>
      </div>
    </motion.div>
  );
}
