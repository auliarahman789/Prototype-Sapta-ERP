import React, { useState } from "react";

import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Search,
  ChevronDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
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

const AttendancePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Attendance statistics
  const attendanceStats = [
    {
      title: "Present Today",
      count: 218,
      percentage: "93%",
      icon: CheckCircle,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Late Arrivals",
      count: 12,
      percentage: "5%",
      icon: Clock,
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      title: "Absent",
      count: 8,
      percentage: "3%",
      icon: XCircle,
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      title: "On Leave",
      count: 6,
      percentage: "2%",
      icon: AlertCircle,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
  ];

  // Weekly attendance trend
  const weeklyTrend = [
    { day: "Mon", present: 232, late: 8, absent: 4 },
    { day: "Tue", present: 228, late: 10, absent: 6 },
    { day: "Wed", present: 230, late: 9, absent: 5 },
    { day: "Thu", present: 225, late: 14, absent: 5 },
    { day: "Fri", present: 218, late: 12, absent: 8 },
  ];

  // Department attendance
  const departmentData = [
    { name: "Production", value: 85, color: "#3b82f6" },
    { name: "Quality Control", value: 28, color: "#10b981" },
    { name: "Maintenance", value: 35, color: "#f59e0b" },
    { name: "Logistics", value: 42, color: "#8b5cf6" },
    { name: "HR & Admin", value: 28, color: "#ec4899" },
  ];

  // Employee attendance records
  const attendanceRecords = [
    {
      id: "EMP001",
      name: "Ahmad Budiman",
      department: "Production",
      checkIn: "07:45 AM",
      checkOut: "04:30 PM",
      status: "Present",
      workHours: "8h 45m",
    },
    {
      id: "EMP002",
      name: "Sarah Lestari",
      department: "PPIC",
      checkIn: "08:15 AM",
      checkOut: "-",
      status: "Late",
      workHours: "-",
    },
    {
      id: "EMP003",
      name: "Budi Santoso",
      department: "Maintenance",
      checkIn: "07:30 AM",
      checkOut: "04:15 PM",
      status: "Present",
      workHours: "8h 45m",
    },
    {
      id: "EMP004",
      name: "Rina Permata",
      department: "Logistics",
      checkIn: "-",
      checkOut: "-",
      status: "Absent",
      workHours: "-",
    },
    {
      id: "EMP005",
      name: "Dian Kusuma",
      department: "HR",
      checkIn: "07:55 AM",
      checkOut: "04:25 PM",
      status: "Present",
      workHours: "8h 30m",
    },
    {
      id: "EMP006",
      name: "Agus Pramono",
      department: "Quality Control",
      checkIn: "-",
      checkOut: "-",
      status: "On Leave",
      workHours: "-",
    },
    {
      id: "EMP007",
      name: "Siti Nurhaliza",
      department: "Production",
      checkIn: "07:50 AM",
      checkOut: "04:20 PM",
      status: "Present",
      workHours: "8h 30m",
    },
    {
      id: "EMP008",
      name: "Joko Widodo",
      department: "Maintenance",
      checkIn: "08:20 AM",
      checkOut: "-",
      status: "Late",
      workHours: "-",
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      Present: "bg-green-100 text-green-700 border-green-200",
      Late: "bg-orange-100 text-orange-700 border-orange-200",
      Absent: "bg-red-100 text-red-700 border-red-200",
      "On Leave": "bg-blue-100 text-blue-700 border-blue-200",
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
                Attendance Management
              </h1>
              <p className="text-white/80 text-xs md:text-sm">
                Track and manage employee attendance and work hours
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-white/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-white/30 text-white text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-white/30 text-white text-xs md:text-sm font-medium hover:bg-white/30 transition-all flex items-center gap-1.5 md:gap-2">
                <Download size={14} className="md:w-4 md:h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards - Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {attendanceStats.map((stat, index) => {
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
          {/* Weekly Trend */}
          <div className="lg:col-span-2 bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                  Weekly Attendance Trend
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Attendance patterns for this week
                </p>
              </div>
            </div>
            <ResponsiveContainer
              width="100%"
              height={250}
              className="md:h-[300px]"
            >
              <BarChart data={weeklyTrend}>
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
                <Bar
                  dataKey="present"
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                  name="Present"
                />
                <Bar
                  dataKey="late"
                  fill="#f59e0b"
                  radius={[8, 8, 0, 0]}
                  name="Late"
                />
                <Bar
                  dataKey="absent"
                  fill="#ef4444"
                  radius={[8, 8, 0, 0]}
                  name="Absent"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Department Distribution */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">
              Department Distribution
            </h2>
            <ResponsiveContainer
              width="100%"
              height={200}
              className="md:h-[240px]"
            >
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                  className="md:inner-radius-[60] md:outer-radius-[90]"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3 md:mt-4 space-y-1.5 md:space-y-2">
              {departmentData.map((item, index) => (
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

        {/* Attendance Records Table - Responsive */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">
              Today's Attendance Records
            </h2>
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[160px] lg:flex-none lg:w-auto">
                <Search
                  className="absolute left-2.5 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search employee..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 md:pl-10 pr-3 md:pr-4 py-1.5 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
              </div>
              <div className="relative">
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="appearance-none pl-3 md:pl-4 pr-8 md:pr-10 py-1.5 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Departments</option>
                  <option value="production">Production</option>
                  <option value="ppic">PPIC</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="logistics">Logistics</option>
                  <option value="hr">HR</option>
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
                      Employee ID
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                      Department
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Check In
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                      Check Out
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell">
                      Work Hours
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                        {record.id}
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-800">
                        {record.name}
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-600 hidden md:table-cell">
                        {record.department}
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-800">
                        {record.checkIn}
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-800 hidden lg:table-cell">
                        {record.checkOut}
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-800 hidden xl:table-cell">
                        {record.workHours}
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap">
                        <span
                          className={`px-2 md:px-3 py-0.5 md:py-1 inline-flex text-[10px] md:text-xs leading-5 font-semibold rounded-full border ${getStatusBadge(record.status)}`}
                        >
                          {record.status}
                        </span>
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

export default AttendancePage;
