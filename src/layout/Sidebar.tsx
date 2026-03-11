import { SidebarItem } from "./SidebarItem";

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d={d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 border-r border-slate-800 bg-slate-950 lg:block">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-600/90 text-white shadow-sm ring-1 ring-blue-500/30">
            <Icon d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
          </div>
          <div>
            <div className="text-base font-semibold leading-tight text-slate-100">ClinTrust</div>
            <div className="text-xs text-slate-400">Clinical Trial Management</div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 pb-6">
          <SidebarItem to="/app/dashboard" label="Dashboard" icon={<Icon d="M4 13h7V4H4v9zm9 7h7V11h-7v9zM4 20h7v-5H4v5zm9-11h7V4h-7v5z" />} />
          <SidebarItem to="/app/trials" label="Clinical Trials" icon={<Icon d="M8 7h8M8 12h8M8 17h5M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />} />
          <SidebarItem to="/app/patients" label="Patients" icon={<Icon d="M16 11a4 4 0 1 0-8 0a4 4 0 0 0 8 0zM4 21a8 8 0 0 1 16 0" />} />
          <SidebarItem to="/app/sites" label="Sites" icon={<Icon d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10z" />} />
          <SidebarItem to="/app/reports" label="Reports" icon={<Icon d="M7 17V9m5 8V7m5 10v-6M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z" />} />
          <SidebarItem to="/app/documents" label="Documents" icon={<Icon d="M8 3h6l4 4v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM14 3v5h5" />} />
          <SidebarItem to="/app/settings" label="Settings" icon={<Icon d="M12 15.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7zM19.4 15a7.8 7.8 0 0 0 .1-1 7.8 7.8 0 0 0-.1-1l2-1.5-2-3.5-2.3.8a7.7 7.7 0 0 0-1.7-1l-.3-2.4H11l-.3 2.4a7.7 7.7 0 0 0-1.7 1L6.7 7l-2 3.5L6.7 12a7.8 7.8 0 0 0-.1 1 7.8 7.8 0 0 0 .1 1L4.7 16.5l2 3.5 2.3-.8c.5.4 1.1.7 1.7 1l.3 2.4h4l.3-2.4c.6-.3 1.2-.6 1.7-1l2.3.8 2-3.5L19.4 15z" />} />
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="rounded-xl bg-slate-900/40 p-4 text-xs text-slate-300 ring-1 ring-slate-700/50">
            <div className="font-semibold text-slate-100">Tip</div>
            <div className="mt-1 text-slate-300">This is a demo dashboard shell. Wire in APIs and auth when ready.</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
