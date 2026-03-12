import { motion } from "framer-motion";
import { AuthCard } from "../components/AuthCard";
import { LeftBrandPanel } from "../components/LeftBrandPanel";

export function RegisterPage() {
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

          <div className="relative w-full">
            <AuthCard mode="register" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
