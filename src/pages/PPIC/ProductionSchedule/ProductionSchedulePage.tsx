import React, { useState } from "react";

import {
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Plus,
  ChevronDown,
  Download,
  Edit,
  Trash2,
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

const ProductionSchedulePage: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState("current");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Production statistics
  const productionStats = [
    {
      title: "Scheduled",
      count: 28,
      percentage: "45%",
      icon: Calendar,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "In Progress",
      count: 18,
      percentage: "29%",
      icon: Clock,
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      title: "Completed",
      count: 12,
      percentage: "19%",
      icon: CheckCircle,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Delayed",
      count: 4,
      percentage: "7%",
      icon: AlertCircle,
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
  ];

  // Weekly production capacity
  const weeklyCapacity = [
    { day: "Mon", planned: 850, actual: 820, capacity: 1000 },
    { day: "Tue", planned: 900, actual: 880, capacity: 1000 },
    { day: "Wed", planned: 880, actual: 850, capacity: 1000 },
    { day: "Thu", planned: 920, actual: 900, capacity: 1000 },
    { day: "Fri", planned: 950, actual: 920, capacity: 1000 },
  ];

  // Production line utilization
  const lineUtilization = [
    { name: "Line A", value: 92, color: "#10b981" },
    { name: "Line B", value: 88, color: "#3b82f6" },
    { name: "Line C", value: 85, color: "#f59e0b" },
    { name: "Line D", value: 78, color: "#ef4444" },
  ];

  // Product distribution
  const productDistribution = [
    { name: "Product A", value: 35, color: "#3b82f6" },
    { name: "Product B", value: 28, color: "#10b981" },
    { name: "Product C", value: 22, color: "#f59e0b" },
    { name: "Product D", value: 15, color: "#8b5cf6" },
  ];

  // Production schedules
  const productionSchedules = [
    {
      id: "PS-2024-001",
      product: "Product XYZ-500",
      productCode: "XYZ-500",
      quantity: 1000,
      unit: "units",
      productionLine: "Line A",
      startDate: "2024-02-12",
      endDate: "2024-02-14",
      status: "Scheduled",
      priority: "High",
      progress: 0,
      assignedTo: "Team Alpha",
    },
    {
      id: "PS-2024-002",
      product: "Product ABC-250",
      productCode: "ABC-250",
      quantity: 750,
      unit: "units",
      productionLine: "Line B",
      startDate: "2024-02-11",
      endDate: "2024-02-13",
      status: "In Progress",
      priority: "Medium",
      progress: 45,
      assignedTo: "Team Beta",
    },
    {
      id: "PS-2024-003",
      product: "Product DEF-300",
      productCode: "DEF-300",
      quantity: 500,
      unit: "units",
      productionLine: "Line C",
      startDate: "2024-02-10",
      endDate: "2024-02-12",
      status: "In Progress",
      priority: "High",
      progress: 75,
      assignedTo: "Team Gamma",
    },
    {
      id: "PS-2024-004",
      product: "Product GHI-150",
      productCode: "GHI-150",
      quantity: 1200,
      unit: "units",
      productionLine: "Line A",
      startDate: "2024-02-08",
      endDate: "2024-02-10",
      status: "Completed",
      priority: "Medium",
      progress: 100,
      assignedTo: "Team Alpha",
    },
    {
      id: "PS-2024-005",
      product: "Product JKL-400",
      productCode: "JKL-400",
      quantity: 800,
      unit: "units",
      productionLine: "Line D",
      startDate: "2024-02-09",
      endDate: "2024-02-12",
      status: "Delayed",
      priority: "Critical",
      progress: 60,
      assignedTo: "Team Delta",
    },
    {
      id: "PS-2024-006",
      product: "Product MNO-600",
      productCode: "MNO-600",
      quantity: 950,
      unit: "units",
      productionLine: "Line B",
      startDate: "2024-02-13",
      endDate: "2024-02-15",
      status: "Scheduled",
      priority: "Medium",
      progress: 0,
      assignedTo: "Team Beta",
    },
    {
      id: "PS-2024-007",
      product: "Product PQR-200",
      productCode: "PQR-200",
      quantity: 600,
      unit: "units",
      productionLine: "Line C",
      startDate: "2024-02-11",
      endDate: "2024-02-13",
      status: "In Progress",
      priority: "Low",
      progress: 30,
      assignedTo: "Team Gamma",
    },
    {
      id: "PS-2024-008",
      product: "Product STU-350",
      productCode: "STU-350",
      quantity: 1100,
      unit: "units",
      productionLine: "Line A",
      startDate: "2024-02-07",
      endDate: "2024-02-09",
      status: "Completed",
      priority: "High",
      progress: 100,
      assignedTo: "Team Alpha",
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      Scheduled: "bg-blue-100 text-blue-700 border-blue-200",
      "In Progress": "bg-orange-100 text-orange-700 border-orange-200",
      Completed: "bg-green-100 text-green-700 border-green-200",
      Delayed: "bg-red-100 text-red-700 border-red-200",
    };
    return styles[status as keyof typeof styles] || "";
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      Critical: "bg-red-100 text-red-700 border-red-200",
      High: "bg-orange-100 text-orange-700 border-orange-200",
      Medium: "bg-blue-100 text-blue-700 border-blue-200",
      Low: "bg-green-100 text-green-700 border-green-200",
    };
    return styles[priority as keyof typeof styles] || "";
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen space-y-4 md:space-y-6">
        {/* Header Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 md:gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                Production Schedule
              </h1>
              <p className="text-white/80 text-xs md:text-sm">
                Plan, manage, and monitor production schedules across all lines
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="bg-white/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-white/30 text-white text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="current">Current Week</option>
                <option value="next">Next Week</option>
                <option value="previous">Previous Week</option>
              </select>
              <button className="bg-white/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-white/30 text-white text-xs md:text-sm font-medium hover:bg-white/30 transition-all flex items-center gap-1.5 md:gap-2">
                <Download size={14} className="md:w-4 md:h-4" />
                Export
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 md:gap-2 shadow-lg hover:shadow-xl text-xs md:text-sm">
                <Plus size={16} className="md:w-[18px] md:h-[18px]" />
                New Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards - Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {productionStats.map((stat, index) => {
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
          {/* Weekly Production Capacity */}
          <div className="lg:col-span-2 bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                  Weekly Production Capacity
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Planned vs Actual production this week
                </p>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg w-fit">
                <TrendingUp
                  size={16}
                  className="md:w-[18px] md:h-[18px] text-blue-600"
                />
                <span className="text-xs md:text-sm font-semibold text-blue-600">
                  91.5% Efficiency
                </span>
              </div>
            </div>
            <ResponsiveContainer
              width="100%"
              height={250}
              className="md:h-[300px]"
            >
              <BarChart data={weeklyCapacity}>
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
                  dataKey="capacity"
                  fill="#e5e7eb"
                  radius={[8, 8, 0, 0]}
                  name="Capacity"
                />
                <Bar
                  dataKey="planned"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                  name="Planned"
                />
                <Bar
                  dataKey="actual"
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                  name="Actual"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Product Distribution */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">
              Product Distribution
            </h2>
            <ResponsiveContainer
              width="100%"
              height={200}
              className="md:h-[240px]"
            >
              <PieChart>
                <Pie
                  data={productDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                  className="md:inner-radius-[60] md:outer-radius-[90]"
                >
                  {productDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3 md:mt-4 space-y-1.5 md:space-y-2">
              {productDistribution.map((item, index) => (
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
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Production Line Utilization */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">
            Production Line Utilization
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {lineUtilization.map((line, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-3 md:p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <h3 className="text-xs md:text-sm font-semibold text-gray-700">
                    {line.name}
                  </h3>
                  <span
                    className="text-base md:text-lg font-bold"
                    style={{ color: line.color }}
                  >
                    {line.value}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 md:h-2.5">
                  <div
                    className="h-2 md:h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${line.value}%`,
                      backgroundColor: line.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Production Schedules Table - Responsive */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">
              Production Schedules
            </h2>
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[160px] lg:flex-none lg:w-auto">
                <Search
                  className="absolute left-2.5 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search schedules..."
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
                  <option value="scheduled">Scheduled</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="delayed">Delayed</option>
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
                      Schedule ID
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                      Quantity
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                      Line
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell">
                      Timeline
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                      Priority
                    </th>
                    <th className="px-3 md:px-6 py-2.5 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productionSchedules.map((schedule) => (
                    <tr
                      key={schedule.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-blue-600">
                        {schedule.id}
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 text-xs md:text-sm text-gray-800">
                        <div className="font-medium">{schedule.product}</div>
                        <div className="text-[10px] md:text-xs text-gray-500">
                          {schedule.productCode}
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-800 hidden md:table-cell">
                        <div className="font-semibold">{schedule.quantity}</div>
                        <div className="text-[10px] md:text-xs text-gray-500">
                          {schedule.unit}
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-600 hidden lg:table-cell">
                        {schedule.productionLine}
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-600 hidden xl:table-cell">
                        <div className="text-[10px] md:text-xs">
                          <div>Start: {schedule.startDate}</div>
                          <div>End: {schedule.endDate}</div>
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5 md:h-2 w-12 md:w-20">
                            <div
                              className="bg-blue-600 h-1.5 md:h-2 rounded-full transition-all duration-300"
                              style={{ width: `${schedule.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] md:text-xs font-semibold text-gray-700">
                            {schedule.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap">
                        <span
                          className={`px-2 md:px-3 py-0.5 md:py-1 inline-flex text-[10px] md:text-xs leading-5 font-semibold rounded-full border ${getStatusBadge(schedule.status)}`}
                        >
                          {schedule.status}
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap hidden sm:table-cell">
                        <span
                          className={`px-2 md:px-3 py-0.5 md:py-1 inline-flex text-[10px] md:text-xs leading-5 font-semibold rounded-full border ${getPriorityBadge(schedule.priority)}`}
                        >
                          {schedule.priority}
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-2.5 md:py-4 whitespace-nowrap text-xs md:text-sm hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-800 transition-colors">
                            <Edit size={14} className="md:w-4 md:h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800 transition-colors">
                            <Trash2 size={14} className="md:w-4 md:h-4" />
                          </button>
                        </div>
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

export default ProductionSchedulePage;
