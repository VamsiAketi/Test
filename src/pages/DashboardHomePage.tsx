import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
      <div className="mt-2 text-sm text-slate-600">{hint}</div>
    </motion.div>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-1 text-xs text-slate-500">{subtitle}</p> : null}
        </div>
      </div>
      <div className="mt-4">{children}</div>
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
  { name: "Pending", value: 4, color: "#0EA5E9" },
  { name: "Completed", value: 7, color: "#10B981" },
];

const sitesPerformance = [
  { site: "Boston", enrollments: 142 },
  { site: "NYC", enrollments: 121 },
  { site: "Austin", enrollments: 98 },
  { site: "Seattle", enrollments: 76 },
];

export function DashboardHomePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active trials" value="12" hint="Across 4 therapeutic areas" />
        <StatCard label="Enrolled patients" value="1,284" hint="+38 this week" />
        <StatCard label="Sites" value="27" hint="Onboarding 2 new sites" />
        <StatCard label="Pending documents" value="18" hint="IRB + consent updates" />
      </div>

      {/* Charts (high-level, easy-to-scan) */}
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card title="Enrollment trend" subtitle="Total enrolled patients (demo data)">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={enrollmentTrend} margin={{ left: 6, right: 12, top: 8, bottom: 0 }}>
                  <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
                  <XAxis dataKey="week" tickLine={false} axisLine={{ stroke: "#CBD5E1" }} />
                  <YAxis tickLine={false} axisLine={{ stroke: "#CBD5E1" }} width={44} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, borderColor: "#E2E8F0" }}
                    labelStyle={{ color: "#0F172A" }}
                  />
                  <Line type="monotone" dataKey="enrolled" stroke="#2563EB" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Trial status" subtitle="How many trials are in each status (demo)">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#E2E8F0" }} />
                  <Pie data={trialStatus} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                    {trialStatus.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid gap-2">
              {trialStatus.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    {s.name}
                  </div>
                  <div className="font-semibold text-slate-900">{s.value}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Table + operational widgets */}
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-semibold text-slate-900">Recent clinical trials</h2>
              <button className="text-sm font-semibold text-blue-700 hover:text-blue-900">View all</button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-slate-500">
                  <tr className="border-b border-slate-200">
                    <th className="py-3 pr-4">Trial</th>
                    <th className="py-3 pr-4">Phase</th>
                    <th className="py-3 pr-4">Status</th>
                    <th className="py-3 pr-4">Enrollment</th>
                    <th className="py-3 text-right">Last updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-3 pr-4 font-semibold text-slate-900">CT-{2400 + i} • Cardiology Study</td>
                      <td className="py-3 pr-4 text-slate-700">Phase {i % 3 === 0 ? "III" : "II"}</td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                          Active
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-slate-700">{120 + i * 8}/200</td>
                      <td className="py-3 text-right text-slate-600">{i}d ago</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card title="Top enrolling sites" subtitle="Enrollments per site (demo)">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sitesPerformance} margin={{ left: 6, right: 12, top: 8, bottom: 0 }}>
                  <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
                  <XAxis dataKey="site" tickLine={false} axisLine={{ stroke: "#CBD5E1" }} />
                  <YAxis tickLine={false} axisLine={{ stroke: "#CBD5E1" }} width={44} />
                  <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#E2E8F0" }} />
                  <Bar dataKey="enrollments" radius={[10, 10, 10, 10]} fill="#0EA5E9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-sm font-semibold text-slate-900">Activity timeline</h2>
            <div className="mt-4 space-y-4">
              {[
                { t: "Consent form updated", d: "CT-2403 • Documents" },
                { t: "Site onboarding started", d: "Boston General" },
                { t: "Enrollment milestone reached", d: "1,250 patients" },
                { t: "New report generated", d: "Safety summary" },
              ].map((a, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{a.t}</div>
                    <div className="text-xs text-slate-500">{a.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
