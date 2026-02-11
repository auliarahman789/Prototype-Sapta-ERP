import React, { useState } from "react";
import {
  Wrench,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Plus,
  ChevronDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DefaultLayout from "../../../layout/DefaultLayout";

const MaintenanceRequestPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Request statistics
  const requestStats = [
    {
      title: "Pending",
      count: 15,
      percentage: "38%",
      icon: Clock,
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      title: "In Progress",
      count: 12,
      percentage: "30%",
      icon: Wrench,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Completed",
      count: 8,
      percentage: "20%",
      icon: CheckCircle,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Rejected",
      count: 5,
      percentage: "12%",
      icon: XCircle,
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
  ];

  // Weekly request trend
  const weeklyTrend = [
    { day: "Mon", submitted: 8, completed: 5 },
    { day: "Tue", submitted: 6, completed: 7 },
    { day: "Wed", submitted: 10, completed: 6 },
    { day: "Thu", submitted: 7, completed: 8 },
    { day: "Fri", submitted: 9, completed: 6 },
  ];

  // Priority distribution
  const priorityData = [
    { name: "Critical", value: 8, color: "#ef4444" },
    { name: "High", value: 12, color: "#f59e0b" },
    { name: "Medium", value: 15, color: "#3b82f6" },
    { name: "Low", value: 5, color: "#10b981" },
  ];

  // Maintenance requests
  const maintenanceRequests = [
    {
      id: "MR-2024-001",
      equipment: "CNC Machine #3",
      location: "Production Line A",
      issue: "Abnormal vibration during operation",
      priority: "High",
      status: "In Progress",
      requestedBy: "Budi Santoso",
      requestDate: "2024-02-10",
      assignedTo: "Agus Maintenance Team",
      estimatedCompletion: "2024-02-12",
    },
    {
      id: "MR-2024-002",
      equipment: "Conveyor Belt #2",
      location: "Warehouse Section B",
      issue: "Motor making unusual noise",
      priority: "Medium",
      status: "Pending",
      requestedBy: "Rina Permata",
      requestDate: "2024-02-11",
      assignedTo: "Unassigned",
      estimatedCompletion: "-",
    },
    {
      id: "MR-2024-003",
      equipment: "Air Compressor #1",
      location: "Utility Room",
      issue: "Pressure gauge not reading correctly",
      priority: "Critical",
      status: "In Progress",
      requestedBy: "Ahmad Budiman",
      requestDate: "2024-02-09",
      assignedTo: "Joko Maintenance Team",
      estimatedCompletion: "2024-02-11",
    },
    {
      id: "MR-2024-004",
      equipment: "Forklift #5",
      location: "Loading Dock",
      issue: "Hydraulic system leaking",
      priority: "High",
      status: "Pending",
      requestedBy: "Sarah Lestari",
      requestDate: "2024-02-11",
      assignedTo: "Unassigned",
      estimatedCompletion: "-",
    },
    {
      id: "MR-2024-005",
      equipment: "Packaging Machine #2",
      location: "Production Line C",
      issue: "Sealing temperature inconsistent",
      priority: "Medium",
      status: "Completed",
      requestedBy: "Dian Kusuma",
      requestDate: "2024-02-08",
      assignedTo: "Agus Maintenance Team",
      estimatedCompletion: "2024-02-10",
    },
    {
      id: "MR-2024-006",
      equipment: "Cooling System",
      location: "Server Room",
      issue: "Temperature rising above normal",
      priority: "Critical",
      status: "In Progress",
      requestedBy: "IT Department",
      requestDate: "2024-02-11",
      assignedTo: "Joko Maintenance Team",
      estimatedCompletion: "2024-02-11",
    },
    {
      id: "MR-2024-007",
      equipment: "Overhead Crane #1",
      location: "Assembly Area",
      issue: "Brake not engaging properly",
      priority: "High",
      status: "Pending",
      requestedBy: "Production Supervisor",
      requestDate: "2024-02-11",
      assignedTo: "Unassigned",
      estimatedCompletion: "-",
    },
    {
      id: "MR-2024-008",
      equipment: "Lighting System",
      location: "Section D",
      issue: "Multiple lights not working",
      priority: "Low",
      status: "Rejected",
      requestedBy: "Facility Manager",
      requestDate: "2024-02-10",
      assignedTo: "-",
      estimatedCompletion: "-",
    },
  ];

  const getPriorityBadge = (priority: string) => {
    const styles = {
      Critical: "bg-red-100 text-red-700 border-red-200",
      High: "bg-orange-100 text-orange-700 border-orange-200",
      Medium: "bg-blue-100 text-blue-700 border-blue-200",
      Low: "bg-green-100 text-green-700 border-green-200",
    };
    return styles[priority as keyof typeof styles] || "";
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Pending: "bg-orange-100 text-orange-700 border-orange-200",
      "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
      Completed: "bg-green-100 text-green-700 border-green-200",
      Rejected: "bg-red-100 text-red-700 border-red-200",
    };
    return styles[status as keyof typeof styles] || "";
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen space-y-4 md:space-y-6">
        {/* Header Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 md:gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                Maintenance Requests
              </h1>
              <p className="text-white/80 text-xs md:text-sm">
                Submit and track maintenance requests for equipment and
                facilities
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg hover:shadow-xl text-sm md:text-base">
                <Plus size={16} className="md:w-[18px] md:h-[18px]" />
                New Request
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards - Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {requestStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg md:rounded-xl p-3 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-2 md:mb-4">
                  <div
                    className={`${stat.bgColor} p-2 md:p-3 rounded-lg flex items-center justify-center`}
                  >
                    <Icon className={`${stat.textColor}`} size={18} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] md:text-xs text-gray-500 font-medium">
                      of Total
                    </p>
                    <p
                      className={`text-sm md:text-lg font-bold ${stat.textColor}`}
                    >
                      {stat.percentage}
                    </p>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-0.5 md:mb-1">
                  {stat.count}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 font-medium">
                  {stat.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* Charts Section - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Weekly Request Trend */}
          <div className="lg:col-span-2 bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                  Weekly Request Trend
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Submitted vs Completed requests this week
                </p>
              </div>
            </div>
            <ResponsiveContainer
              width="100%"
              height={250}
              className="md:h-[300px]"
            >
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="day"
                  stroke="#6b7280"
                  style={{ fontSize: "11px" }}
                  className="md:text-xs"
                />
                <YAxis
                  stroke="#6b7280"
                  style={{ fontSize: "11px" }}
                  className="md:text-xs"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line
                  type="monotone"
                  dataKey="submitted"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  name="Submitted"
                  className="md:stroke-[3]"
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", r: 4 }}
                  name="Completed"
                  className="md:stroke-[3]"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Priority Distribution */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">
              Priority Distribution
            </h2>
            <ResponsiveContainer
              width="100%"
              height={200}
              className="md:h-[240px]"
            >
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                  className="md:inner-radius-[60] md:outer-radius-[90]"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3 md:mt-4 space-y-1.5 md:space-y-2">
              {priorityData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs md:text-sm text-gray-600">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-gray-800">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Requests Table - Responsive */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">
              Maintenance Requests
            </h2>
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[160px] lg:flex-none lg:w-auto">
                <Search
                  className="absolute left-2.5 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 md:pl-10 pr-3 md:pr-4 py-1.5 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
              </div>
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none pl-3 md:pl-4 pr-8 md:pr-10 py-1.5 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
                <ChevronDown
                  className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
              <div className="relative">
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="appearance-none pl-3 md:pl-4 pr-8 md:pr-10 py-1.5 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Priority</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <ChevronDown
                  className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Request ID
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Equipment
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                      Issue
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                      Requested By
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell">
                      Date
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell">
                      Assigned To
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {maintenanceRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-blue-600">
                        {request.id}
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 text-xs md:text-sm text-gray-800">
                        <div className="font-medium">{request.equipment}</div>
                        <div className="text-[10px] md:text-xs text-gray-500">
                          {request.location}
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 text-xs md:text-sm text-gray-600 max-w-xs hidden lg:table-cell">
                        {request.issue}
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap">
                        <span
                          className={`px-2 md:px-3 py-0.5 md:py-1 inline-flex text-[10px] md:text-xs leading-5 font-semibold rounded-full border ${getPriorityBadge(request.priority)}`}
                        >
                          {request.priority}
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap">
                        <span
                          className={`px-2 md:px-3 py-0.5 md:py-1 inline-flex text-[10px] md:text-xs leading-5 font-semibold rounded-full border ${getStatusBadge(request.status)}`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-800 hidden md:table-cell">
                        {request.requestedBy}
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-600 hidden xl:table-cell">
                        {request.requestDate}
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-800 hidden xl:table-cell">
                        {request.assignedTo}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MaintenanceRequestPage;
