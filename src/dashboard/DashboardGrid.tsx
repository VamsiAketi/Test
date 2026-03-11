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

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      whileHover={{ y: -1 }}
      className="h-full rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 flex flex-col"
    >
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      </div>

      <div className="flex-1 min-h-0">{children}</div>
    </motion.section>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "primary" | "success" | "warning";
}) {
  const toneClass =
    tone === "primary"
      ? "text-blue-500"
      : tone === "success"
      ? "text-emerald-500"
      : "text-amber-500";

  return (
    <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>

      <div className={`mt-1 text-2xl font-semibold ${toneClass}`}>
        {value}
      </div>

      <div className="text-xs text-slate-400">Demo data</div>
    </div>
  );
}

/* DATA */

const enrollmentTrend = [
  { week: "W1", enrolled: 1188 },
  { week: "W2", enrolled: 1210 },
  { week: "W3", enrolled: 1236 },
  { week: "W4", enrolled: 1259 },
  { week: "W5", enrolled: 1284 },
];

const trialStatus = [
  { name: "Active", value: 12, color: "#2563EB" },
  { name: "Pending", value: 4, color: "#F59E0B" },
  { name: "Completed", value: 7, color: "#10B981" },
];

const siteEnrollments = [
  { site: "Boston", enrollments: 142 },
  { site: "NYC", enrollments: 121 },
  { site: "Austin", enrollments: 98 },
  { site: "Seattle", enrollments: 76 },
  { site: "Chicago", enrollments: 63 },
];

const patientPipeline = [
  { name: "Screened", value: 1620, color: "#8B5CF6" },
  { name: "Eligible", value: 1394, color: "#EC4899" },
  { name: "Enrolled", value: 1284, color: "#14B8A6" },
];

/* Label showing NAME + % */

const renderLabel = ({ name, percent }: any) =>
  `${name} ${(percent * 100).toFixed(0)}%`;

export function DashboardGrid() {
  return (
    <div className="h-full overflow-hidden p-4">

      <div className="grid h-full min-h-0 grid-cols-12 grid-rows-[auto_1fr_1fr] gap-4">

        {/* STATS */}
        <div className="col-span-12 grid grid-cols-12 gap-4">
          <div className="col-span-6 xl:col-span-3">
            <Stat label="Active Trials" value="12" tone="primary" />
          </div>

          <div className="col-span-6 xl:col-span-3">
            <Stat label="Total Patients" value="1,284" tone="success" />
          </div>

          <div className="col-span-6 xl:col-span-3">
            <Stat label="Active Study Sites" value="27" tone="primary" />
          </div>

          <div className="col-span-6 xl:col-span-3">
            <Stat label="Pending Reviews" value="18" tone="warning" />
          </div>
        </div>

        {/* ROW 2 */}

        {/* DONUT */}
        <div className="col-span-4 min-h-0">
          <Card title="Trial Status Distribution">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />

                <Pie
                  data={trialStatus}
                  dataKey="value"
                  innerRadius={30}
                  outerRadius={45}
                  paddingAngle={3}
                  label={renderLabel}
                >
                  {trialStatus.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>

              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* LINE */}
        <div className="col-span-8 min-h-0">
          <Card title="Patient Enrollment Trend">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="enrolled"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={false}
                />

              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* ROW 3 */}

        {/* BAR */}
        <div className="col-span-8 min-h-0">
          <Card title="Enrollments by Site">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={siteEnrollments}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="site" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="enrollments"
                  fill="#38BDF8"
                  radius={[6, 6, 0, 0]}
                  barSize={20}
                />

              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* PIE */}
        <div className="col-span-4 min-h-0">
          <Card title="Patient Pipeline">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />

                <Pie
                  data={patientPipeline}
                  dataKey="value"
                  outerRadius={55}
                  paddingAngle={3}
                  label={renderLabel}
                >
                  {patientPipeline.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>

              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

      </div>
    </div>
  );
}