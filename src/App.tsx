import { BrowserRouter as Router, Routes, Route } from "react-router";
import PageTitle from "./components/PageTitle";
import HomePage from "./pages/Home/HomePage";
import AttendancePage from "./pages/HumanResource/Attendance/AttendancePage";
import MaintenanceRequestPage from "./pages/Maintenance/MaintenaceRequest/MaintenanceRequestPage";
import ProductionSchedulePage from "./pages/PPIC/ProductionSchedule/ProductionSchedulePage";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <PageTitle title="Saptaloka ERP - Dashboard" />
                <HomePage />
              </>
            }
          />

          {/* HR Routes */}
          <Route
            path="/hr/attendance"
            element={
              <>
                <PageTitle title="Attendance - Human Resource | Saptaloka ERP" />
                <AttendancePage />
              </>
            }
          />

          {/* Maintenance Routes */}
          <Route
            path="/maintenance/request"
            element={
              <>
                <PageTitle title="Maintenance Request | Saptaloka ERP" />
                <MaintenanceRequestPage />
              </>
            }
          />

          {/* PPIC Routes */}
          <Route
            path="/ppic/schedule/add"
            element={
              <>
                <PageTitle title="Production Schedule - PPIC | Saptaloka ERP" />
                <ProductionSchedulePage />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
