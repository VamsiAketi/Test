import { motion } from "framer-motion";

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
    >
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
      <div className="mt-2 text-sm text-slate-600">{hint}</div>
    </motion.div>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <h2 className="text-sm font-semibold text-slate-900">{children}</h2>;
}

export function DashboardHomePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Trials" value="12" hint="Across 4 therapeutic areas" />
        <StatCard label="Enrolled Patients" value="1,284" hint="+38 this week" />
        <StatCard label="Sites" value="27" hint="Onboarding 2 new sites" />
        <StatCard label="Pending Documents" value="18" hint="IRB + consent updates" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between gap-4">
              <SectionTitle>Recent clinical trials</SectionTitle>
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
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <SectionTitle>Patient enrollment summary</SectionTitle>
            <div className="mt-4 space-y-3">
              {[{ l: "Screened", v: 1620 }, { l: "Eligible", v: 1394 }, { l: "Enrolled", v: 1284 }].map((x) => (
                <div key={x.l} className="flex items-center justify-between">
                  <div className="text-sm text-slate-700">{x.l}</div>
                  <div className="text-sm font-semibold text-slate-900">{x.v.toLocaleString()}</div>
                </div>
              ))}
              <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
                <div className="h-2 w-[79%] rounded-full bg-gradient-to-r from-blue-600 to-sky-400" />
              </div>
              <div className="text-xs text-slate-500">Target completion: 79%</div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <SectionTitle>Activity timeline</SectionTitle>
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
