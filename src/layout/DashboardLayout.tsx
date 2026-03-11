import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

function titleFromPath(pathname: string) {
  const slug = pathname.split("/").filter(Boolean).slice(-1)[0] ?? "dashboard";
  const map: Record<string, string> = {
    dashboard: "Dashboard",
    trials: "Clinical Trials",
    patients: "Patients",
    sites: "Sites",
    reports: "Reports",
    documents: "Documents",
    settings: "Settings",
  };
  return map[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}

export function DashboardLayout() {
  const location = useLocation();
  const title = titleFromPath(location.pathname);

  return (
    <div className="h-screen overflow-hidden bg-slate-900 text-slate-100">
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar title={title} />

          {/* Fixed fullscreen dashboard: no page-level vertical scroll */}
          <main className="flex-1 overflow-hidden p-4 sm:p-6 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
