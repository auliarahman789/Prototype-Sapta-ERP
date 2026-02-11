// RightSidebar.tsx - Saptaloka Digital Brand Theme
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, FileText } from "lucide-react";

interface Task {
  id: string;
  title: string;
  subtitle?: string;
  quotationNo: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

interface TaskSummary {
  totalTasks: number;
  pending: number;
  approved: number;
  rejected: number;
}

interface RightSidebarProps {
  taskSummary?: TaskSummary;
  tasks?: Task[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({ taskSummary, tasks }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const defaultSummary: TaskSummary = {
    totalTasks: 8,
    pending: 5,
    approved: 2,
    rejected: 1,
  };

  const defaultTasks: Task[] = [
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
  ];

  const summary = taskSummary || defaultSummary;
  const taskList = tasks || defaultTasks;

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "approved":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "rejected":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      default:
        return "";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  return (
    <>
      {/* Toggle Button with Saptaloka brand colors */}
      <button
        className={`fixed top-1/2 -translate-y-1/2 w-[36px] h-[60px] bg-white border-2 border-[#0EA5E9] border-r-0 rounded-l-xl cursor-pointer flex items-center justify-center transition-all duration-300 shadow-[-4px_0_12px_rgba(14,165,233,0.15)] z-[101] hover:bg-gradient-to-r hover:from-[#0EA5E9] hover:to-[#1E88E5] hover:shadow-[-4px_0_20px_rgba(14,165,233,0.3)] group ${
          isCollapsed ? "right-0" : "right-[280px] sm:right-[320px]"
        }`}
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ChevronLeft
            size={22}
            className="text-[#0EA5E9] group-hover:text-white transition-colors duration-300"
            strokeWidth={2.5}
          />
        ) : (
          <ChevronRight
            size={22}
            className="text-[#0EA5E9] group-hover:text-white transition-colors duration-300"
            strokeWidth={2.5}
          />
        )}
      </button>

      {/* Sidebar Panel */}
      <div
        className={`fixed right-0 top-0 h-screen w-[280px] sm:w-[320px] bg-white shadow-[-4px_0_24px_rgba(14,165,233,0.08)] transition-transform duration-300 z-[100] overflow-y-auto border-l border-slate-200 ${
          isCollapsed ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="p-5 sm:p-6">
          {/* Header with brand gradient */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gradient-to-r from-[#0EA5E9] to-[#1E88E5]">
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#0EA5E9] to-[#1E88E5] bg-clip-text text-transparent m-0">
              My Tasks
            </h2>
            <span className="bg-gradient-to-r from-[#0EA5E9] to-[#1E88E5] text-white py-1.5 px-4 rounded-full text-sm font-bold shadow-md">
              {summary.totalTasks}
            </span>
          </div>

          {/* Task Summary Stats with brand colors */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-1 text-center border border-amber-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-amber-700 text-2xl font-bold mb-1">
                {summary.pending}
              </div>
              <div className="text-amber-600 text-xs font-semibold uppercase tracking-wide">
                Pending
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-1 text-center border border-emerald-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-emerald-700 text-2xl font-bold mb-1">
                {summary.approved}
              </div>
              <div className="text-emerald-600 text-xs font-semibold uppercase tracking-wide">
                Approved
              </div>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-1 text-center border border-rose-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-rose-700 text-2xl font-bold mb-1">
                {summary.rejected}
              </div>
              <div className="text-rose-600 text-xs font-semibold uppercase tracking-wide">
                Rejected
              </div>
            </div>
          </div>

          {/* Task List */}
          {taskList.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex flex-col gap-3 overflow-y-auto pr-1 max-h-[calc(100vh-320px)] scrollbar-thin scrollbar-w-2 scrollbar-track-slate-100 scrollbar-thumb-[#0EA5E9] hover:scrollbar-thumb-[#1E88E5] scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
                {taskList.map((task) => (
                  <div
                    key={task.id}
                    className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-4 transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-[#0EA5E9] hover:-translate-y-1 hover:bg-white group"
                  >
                    {/* Status Badge */}
                    <div className="flex justify-end mb-3">
                      <span
                        className={`py-1.5 px-3 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm ${getStatusColor(
                          task.status,
                        )}`}
                      >
                        {getStatusLabel(task.status)}
                      </span>
                    </div>

                    {/* Task Content */}
                    <div className="flex flex-col gap-2">
                      <h4 className="text-sm font-bold text-slate-800 m-0 leading-relaxed overflow-hidden text-ellipsis line-clamp-2 group-hover:text-[#0EA5E9] transition-colors duration-200">
                        {task.title}
                      </h4>
                      {task.subtitle && (
                        <p className="text-xs text-slate-600 m-0 leading-relaxed overflow-hidden text-ellipsis line-clamp-2">
                          {task.subtitle}
                        </p>
                      )}

                      {/* Metadata */}
                      <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <FileText
                            size={14}
                            className="text-[#0EA5E9] flex-shrink-0"
                            strokeWidth={2}
                          />
                          <span className="truncate font-medium">
                            {task.quotationNo}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Calendar
                            size={14}
                            className="text-[#0EA5E9] flex-shrink-0"
                            strokeWidth={2}
                          />
                          <span className="font-medium">{task.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
