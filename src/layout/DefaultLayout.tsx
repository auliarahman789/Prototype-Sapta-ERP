// DefaultLayout.tsx - Updated with manufacturing ERP mock data
import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import RightSidebar from "../components/Sidebar/RightSidebar";
import { Menu, X } from "lucide-react";

interface DefaultLayoutProps {
  children: React.ReactNode;
  taskSummary?: {
    totalTasks: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  tasks?: Array<{
    id: string;
    title: string;
    subtitle?: string;
    quotationNo: string;
    date: string;
    status: "pending" | "approved" | "rejected";
  }>;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`lg:hidden fixed top-4 left-4 z-[150] bg-white p-2.5 rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-300 ${
          isMobileMenuOpen ? "rotate-90" : "rotate-0"
        }`}
      >
        {isMobileMenuOpen ? (
          <X size={24} className="text-gray-700" />
        ) : (
          <Menu size={24} className="text-gray-700" />
        )}
      </button>

      {/* Mobile Blur Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[99] transition-all duration-300 animate-fadeIn"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        onMobileClose={() => setIsMobileMenuOpen(false)}
        isMobileMenuOpen={isMobileMenuOpen}
        onCollapsedChange={setIsSidebarCollapsed}
      />

      {/* Main Content - Dynamic margin based on sidebar state */}
      <main
        className={`flex-1 ml-0 ${
          isSidebarCollapsed ? "lg:ml-[70px]" : "lg:ml-[280px]"
        } p-4 sm:p-6 bg-gradient-to-br from-[#2563eb] via-[#337DBE] to-[#1e40af] min-h-screen transition-all duration-300`}
      >
        {children}
      </main>

      {/* Right Sidebar with Manufacturing ERP Mock Data */}
      <RightSidebar
        taskSummary={{
          totalTasks: 8,
          pending: 5,
          approved: 2,
          rejected: 1,
        }}
        tasks={[
          {
            id: "1",
            title: "Production Schedule Approval",
            subtitle: "Weekly production plan for Product Line A - Week 5",
            quotationNo: "PS-2025-001",
            date: "30/01/2025",
            status: "pending",
          },
          {
            id: "2",
            title: "Bill of Materials Review",
            subtitle: "BOM update for new product variant XYZ-500",
            quotationNo: "BOM-2025-045",
            date: "29/01/2025",
            status: "pending",
          },
          {
            id: "3",
            title: "Maintenance Request - CNC Machine",
            subtitle: "Urgent repair needed for CNC-03 production line",
            quotationNo: "MR-2025-012",
            date: "28/01/2025",
            status: "pending",
          },
          {
            id: "4",
            title: "Sparepart Request Approval",
            subtitle: "Replacement parts for hydraulic press machine",
            quotationNo: "SPR-2025-089",
            date: "27/01/2025",
            status: "approved",
          },
          {
            id: "5",
            title: "Employee Leave Request",
            subtitle: "Annual leave application - Ahmad Rizki (Production)",
            quotationNo: "LV-2025-156",
            date: "26/01/2025",
            status: "pending",
          },
          {
            id: "6",
            title: "Delivery Schedule Confirmation",
            subtitle: "Customer PO-8756 - 500 units to Jakarta",
            quotationNo: "DS-2025-234",
            date: "25/01/2025",
            status: "approved",
          },
          {
            id: "7",
            title: "Journal Entry Approval",
            subtitle: "Monthly expense recording - January 2025",
            quotationNo: "JE-2025-001",
            date: "24/01/2025",
            status: "pending",
          },
          {
            id: "8",
            title: "Payroll Processing Review",
            subtitle: "January 2025 salary calculation verification",
            quotationNo: "PR-2025-001",
            date: "23/01/2025",
            status: "rejected",
          },
        ]}
      />
    </div>
  );
};

export default DefaultLayout;
