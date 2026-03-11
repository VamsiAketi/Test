import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      whileHover={{ y: -1 }}
      className="min-h-0 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800/80 dark:ring-slate-700/60"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
      </div>
      <div className="min-h-0">{children}</div>
    </motion.section>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "primary" | "success" | "warning" }) {
  const toneClass =
    tone === "primary"
      ? "text-blue-300"
      : tone === "success"
        ? "text-emerald-300"
        : "text-amber-300";

  return (
    <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200 dark:bg-slate-800/80 dark:ring-slate-700/60">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</div>
      <div className={`mt-2 text-2xl font-semibold ${toneClass}`}>{value}</div>
      <div className="mt-1 text-xs text-slate-500">Demo data</div>
    </div>
  );
}

const enrollmentTrend = [
  { week: "W1", enrolled: 1188 },
  { week: "W2", enrolled: 1210 },
  { week: "W3", enrolled: 1236 },
  { week: "W4", enrolled: 1259 },
  { week: "W5", enrolled: 1284 },
];

const trialStatus = [
  { name: "Active", value: 12, color: "#2563EB" },
  { name: "Pending", value: 4, color: "#38BDF8" },
  { name: "Completed", value: 7, color: "#22C55E" },
];

export function DashboardGrid() {
  return (
    <div className="h-full">
      {/* 12-col, 3-row control-center grid (no page scroll) */}
      <div className="grid h-full min-h-0 grid-cols-12 grid-rows-[auto_1fr_1fr] gap-4">
        {/* Row 1: stats cards */}
        <div className="col-span-12 grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6 xl:col-span-3">
            <Stat label="Active Trials" value="12" tone="primary" />
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-3">
            <Stat label="Total Patients" value="1,284" tone="success" />
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-3">
            <Stat label="Active Study Sites" value="27" tone="primary" />
          </div>
          <div className="col-span-12 sm:col-span-6 xl:col-span-3">
            <Stat label="Pending Reviews" value="18" tone="warning" />
          </div>
        </div>

        {/* Row 2: charts */}
        <div className="col-span-12 min-h-0 xl:col-span-8">
          <Card title="Patient Enrollment Trend">
            <div className="h-full min-h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={enrollmentTrend} margin={{ left: 8, right: 14, top: 10, bottom: 0 }}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                  <XAxis dataKey="week" tickLine={false} axisLine={{ stroke: "#334155" }} tick={{ fill: "#94A3B8" }} />
                  <YAxis tickLine={false} axisLine={{ stroke: "#334155" }} tick={{ fill: "#94A3B8" }} width={44} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, borderColor: "#334155", backgroundColor: "#0F172A" }}
                    labelStyle={{ color: "#E2E8F0" }}
                  />
                  <Line type="monotone" dataKey="enrolled" stroke="#2563EB" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="col-span-12 min-h-0 xl:col-span-4">
          <Card title="Trial Status Distribution">
            <div className="h-full min-h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trialStatus} margin={{ left: 6, right: 10, top: 10, bottom: 0 }}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                  <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: "#334155" }} tick={{ fill: "#94A3B8" }} />
                  <YAxis tickLine={false} axisLine={{ stroke: "#334155" }} tick={{ fill: "#94A3B8" }} width={36} />
                  <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#334155", backgroundColor: "#0F172A" }} />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                    {trialStatus.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              {trialStatus.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-200 dark:bg-slate-900/40 dark:ring-slate-700/40"
                >
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    {s.name}
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">{s.value}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Row 3: table + activity */}
        <div className="col-span-12 min-h-0 xl:col-span-8">
          <Card title="Recent Clinical Trials">
            <div className="overflow-hidden rounded-lg ring-1 ring-slate-700/40">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600 dark:bg-slate-900/40 dark:text-slate-300">
                  <tr>
                    <th className="px-3 py-2">Trial</th>
                    <th className="px-3 py-2">Phase</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2 text-right">Enrollment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {[1, 2, 3, 4].map((i) => (
                    <tr key={i} className="text-slate-800 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900/30">
                      <td className="px-3 py-2 font-semibold">CT-{2400 + i} • Cardiology Study</td>
                      <td className="px-3 py-2">Phase {i % 3 === 0 ? "III" : "II"}</td>
                      <td className="px-3 py-2">
                        <span className="inline-flex rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/20">
                          Active
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right">{120 + i * 8}/200</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="col-span-12 min-h-0 xl:col-span-4">
          <Card title="Recent Activity">
            <div className="space-y-3">
              {[
                { t: "Consent form updated", d: "CT-2403 • Documents" },
                { t: "Site onboarding started", d: "Boston General" },
                { t: "Enrollment milestone reached", d: "1,250 patients" },
                { t: "Report generated", d: "Safety summary" },
              ].map((a, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-200 dark:bg-slate-900/40 dark:ring-slate-700/40"
                >
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{a.t}</div>
                    <div className="truncate text-xs text-slate-500 dark:text-slate-400">{a.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
