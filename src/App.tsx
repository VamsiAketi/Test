import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./middleware/RequireAuth";
import { RequireRole } from "./middleware/RequireRole";
import { DashboardLayout } from "./layout/DashboardLayout";
import { DocumentsPage } from "./pages/DocumentsPage";
import { DashboardHomePage } from "./pages/DashboardHomePage";
import { LoginPage } from "./pages/LoginPage";
import { PatientsPage } from "./pages/PatientsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SettingsPage } from "./pages/SettingsPage";
import { SitesPage } from "./pages/SitesPage";
import { TrialsPage } from "./pages/TrialsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/app"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardHomePage />} />
          <Route path="trials" element={<TrialsPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="sites" element={<SitesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="documents" element={<DocumentsPage />} />

          {/* Example RBAC restriction: only Admin/Manager can access Settings */}
          <Route
            path="settings"
            element={
              <RequireRole anyOf={["Admin", "Manager"]}>
                <SettingsPage />
              </RequireRole>
            }
          />
        </Route>

        <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
