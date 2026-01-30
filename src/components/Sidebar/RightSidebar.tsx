// RightSidebar.tsx - Updated with manufacturing ERP mock data
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
        return "bg-[#fff3e0] text-[#f57c00]";
      case "approved":
        return "bg-[#e8f5e9] text-[#2e7d32]";
      case "rejected":
        return "bg-[#ffebee] text-[#c62828]";
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
      <button
        className={`fixed top-1/2 -translate-y-1/2 w-[30px] h-[50px] bg-white border border-blue-400 border-r-0 rounded-l-lg cursor-pointer flex items-center justify-center transition-[right] duration-300 shadow-[-2px_0_8px_rgba(0,0,0,0.1)] z-[101] hover:bg-[#f5f5f5] ${
          isCollapsed ? "right-0" : "right-[280px] sm:right-[320px]"
        }`}
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ChevronLeft size={20} color="blue" />
        ) : (
          <ChevronRight size={20} color="blue" />
        )}
      </button>

      <div
        className={`fixed right-0 top-0 h-screen w-[280px] sm:w-[320px] bg-white shadow-[-2px_0_8px_rgba(0,0,0,0.1)] transition-transform duration-300 z-[100] overflow-y-auto ${
          isCollapsed ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="p-[20px] sm:p-[24px_20px]">
          <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 border-[#e0e0e0]">
            <h2 className="text-lg sm:text-xl font-semibold text-[#1a1a1a] m-0">
              My Task
            </h2>
            <span className="bg-[#2196f3] text-white py-1 px-3 rounded-2xl text-sm font-semibold">
              {summary.totalTasks}
            </span>
          </div>

          {/* Task Summary Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-[#fff3e0] rounded-lg p-2 text-center">
              <div className="text-[#f57c00] text-xl font-bold">
                {summary.pending}
              </div>
              <div className="text-[#f57c00] text-[10px] font-medium">
                Pending
              </div>
            </div>
            <div className="bg-[#e8f5e9] rounded-lg p-2 text-center">
              <div className="text-[#2e7d32] text-xl font-bold">
                {summary.approved}
              </div>
              <div className="text-[#2e7d32] text-[10px] font-medium">
                Approved
              </div>
            </div>
            <div className="bg-[#ffebee] rounded-lg p-2 text-center">
              <div className="text-[#c62828] text-xl font-bold">
                {summary.rejected}
              </div>
              <div className="text-[#c62828] text-[10px] font-medium">
                Rejected
              </div>
            </div>
          </div>

          {taskList.length > 0 && (
            <div className="mt-3 pt-3">
              <div className="flex flex-col gap-3 overflow-y-auto pr-1 mb-6 sm:mb-8 max-h-[calc(100vh-280px)] scrollbar-thin scrollbar-w-1 scrollbar-track-[#f1f1f1] scrollbar-thumb-[#888] hover:scrollbar-thumb-[#555] scrollbar-track-rounded-[2px] scrollbar-thumb-rounded-[2px]">
                {taskList.map((task) => (
                  <div
                    key={task.id}
                    className="bg-[#f8f9fa] border border-[#e0e0e0] rounded-lg p-3 transition-all duration-200 cursor-pointer hover:bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:-translate-y-[2px]"
                  >
                    <div className="flex justify-end mb-2">
                      <span
                        className={`py-1 px-[10px] rounded-xl text-[11px] font-semibold uppercase tracking-[0.5px] ${getStatusColor(
                          task.status,
                        )}`}
                      >
                        {getStatusLabel(task.status)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <h4 className="text-sm font-semibold text-[#1a1a1a] m-0 leading-[1.4] overflow-hidden text-ellipsis line-clamp-2">
                        {task.title}
                      </h4>
                      {task.subtitle && (
                        <p className="text-xs text-[#666] m-0 leading-[1.3] overflow-hidden text-ellipsis line-clamp-2">
                          {task.subtitle}
                        </p>
                      )}
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="flex items-center gap-[6px] text-[11px] text-[#999]">
                          <FileText
                            size={14}
                            className="text-[#999] flex-shrink-0"
                          />
                          <span className="truncate">{task.quotationNo}</span>
                        </div>
                        <div className="flex items-center gap-[6px] text-[11px] text-[#999]">
                          <Calendar
                            size={14}
                            className="text-[#999] flex-shrink-0"
                          />
                          <span>{task.date}</span>
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
