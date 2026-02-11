import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import {
  TrendingUp,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
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

const HomePage: React.FC = () => {
  // Production data
  const productionData = [
    { month: "Jul", planned: 4500, actual: 4200, efficiency: 93 },
    { month: "Aug", planned: 4800, actual: 4650, efficiency: 96 },
    { month: "Sep", planned: 5000, actual: 4800, efficiency: 96 },
    { month: "Oct", planned: 5200, actual: 5100, efficiency: 98 },
    { month: "Nov", planned: 5500, actual: 5300, efficiency: 96 },
    { month: "Dec", planned: 5800, actual: 5600, efficiency: 96 },
    { month: "Jan", planned: 6000, actual: 5850, efficiency: 97 },
  ];

  // Maintenance status
  const maintenanceData = [
    { name: "Completed", value: 45, color: "#10b981" },
    { name: "In Progress", value: 12, color: "#f59e0b" },
    { name: "Scheduled", value: 8, color: "#3b82f6" },
    { name: "Overdue", value: 3, color: "#ef4444" },
  ];

  // Department performance
  const departmentData = [
    { dept: "Production", score: 94 },
    { dept: "Quality", score: 88 },
    { dept: "Maintenance", score: 91 },
    { dept: "Logistics", score: 86 },
    { dept: "HR", score: 92 },
  ];

  // Task statistics
  const taskStats = [
    {
      title: "Pending Approvals",
      count: 12,
      change: "+3",
      trend: "up",
      icon: Clock,
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      title: "Active Tasks",
      count: 28,
      change: "+5",
      trend: "up",
      icon: CheckCircle,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Production Lines",
      count: 8,
      change: "100%",
      trend: "up",
      icon: Package,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Maintenance Alerts",
      count: 3,
      change: "-2",
      trend: "down",
      icon: AlertCircle,
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      action: "Production Schedule Approved",
      user: "Manager - Ahmad Budiman",
      time: "5 minutes ago",
      type: "success",
    },
    {
      id: 2,
      action: "BOM Updated for Product XYZ-500",
      user: "PPIC - Sarah Lestari",
      time: "23 minutes ago",
      type: "info",
    },
    {
      id: 3,
      action: "Maintenance Request Created",
      user: "Operator - Budi Santoso",
      time: "1 hour ago",
      type: "warning",
    },
    {
      id: 4,
      action: "Delivery Schedule Confirmed",
      user: "Logistics - Rina Permata",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 5,
      action: "Payroll Processing Completed",
      user: "HR - Dian Kusuma",
      time: "3 hours ago",
      type: "success",
    },
  ];

  // Quick stats
  const quickStats = [
    { label: "Today's Production", value: "485 units", target: "500 units" },
    { label: "OEE", value: "87.5%", target: "85% target" },
    { label: "Active Employees", value: "234", target: "240 total" },
    { label: "On-Time Delivery", value: "96.2%", target: "95% target" },
  ];

  return (
    <DefaultLayout>
      <div className="min-h-screen space-y-4 md:space-y-6">
        {/* Header Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 md:gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                Dashboard Overview
              </h1>
              <p className="text-white/80 text-xs md:text-sm">
                Welcome back! Here's what's happening with your operations
                today.
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-white/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-white/30">
                <div className="flex items-center gap-1.5 md:gap-2 text-white text-xs md:text-sm">
                  <Calendar size={14} className="md:w-4 md:h-4" />
                  <span className="font-medium hidden sm:inline">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="font-medium sm:hidden">
                    {new Date().toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Statistics Cards - Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {taskStats.map((stat, index) => {
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
                  <div
                    className={`flex items-center gap-0.5 md:gap-1 text-[10px] md:text-xs font-semibold ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight
                        size={12}
                        className="md:w-[14px] md:h-[14px]"
                      />
                    ) : (
                      <ArrowDownRight
                        size={12}
                        className="md:w-[14px] md:h-[14px]"
                      />
                    )}
                    {stat.change}
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

        {/* Charts Row - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Production Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                  Production Overview
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Planned vs Actual Production (Last 7 Months)
                </p>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 bg-green-50 px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg w-fit">
                <TrendingUp
                  size={16}
                  className="md:w-[18px] md:h-[18px] text-green-600"
                />
                <span className="text-xs md:text-sm font-semibold text-green-600">
                  +12% YoY
                </span>
              </div>
            </div>
            <ResponsiveContainer
              width="100%"
              height={250}
              className="md:h-[300px]"
            >
              <LineChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
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
                  dataKey="planned"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  name="Planned"
                  className="md:stroke-[3]"
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", r: 4 }}
                  name="Actual"
                  className="md:stroke-[3]"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Maintenance Status */}
          <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">
              Maintenance Status
            </h2>
            <ResponsiveContainer
              width="100%"
              height={200}
              className="md:h-[240px]"
            >
              <PieChart>
                <Pie
                  data={maintenanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                  className="md:inner-radius-[60] md:outer-radius-[90]"
                >
                  {maintenanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3 md:mt-4 space-y-1.5 md:space-y-2">
              {maintenanceData.map((item, index) => (
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

        {/* Department Performance & Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Department Performance */}
          <div className="lg:col-span-1 bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">
              Department Performance
            </h2>
            <ResponsiveContainer
              width="100%"
              height={240}
              className="md:h-[280px]"
            >
              <BarChart data={departmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  style={{ fontSize: "11px" }}
                />
                <YAxis
                  dataKey="dept"
                  type="category"
                  width={80}
                  style={{ fontSize: "11px" }}
                  className="md:text-xs"
                />
                <Tooltip contentStyle={{ fontSize: "12px" }} />
                <Bar dataKey="score" radius={[0, 8, 8, 0]}>
                  {departmentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.score >= 90
                          ? "#10b981"
                          : entry.score >= 85
                            ? "#3b82f6"
                            : "#f59e0b"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">
                Recent Activities
              </h2>
              <button className="text-xs md:text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-3 md:space-y-4 max-h-[280px] md:max-h-[320px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-2.5 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                      activity.type === "success"
                        ? "bg-green-100"
                        : activity.type === "warning"
                          ? "bg-orange-100"
                          : "bg-blue-100"
                    }`}
                  >
                    {activity.type === "success" ? (
                      <CheckCircle
                        size={16}
                        className="md:w-5 md:h-5 text-green-600"
                      />
                    ) : activity.type === "warning" ? (
                      <AlertCircle
                        size={16}
                        className="md:w-5 md:h-5 text-orange-600"
                      />
                    ) : (
                      <BarChart3
                        size={16}
                        className="md:w-5 md:h-5 text-blue-600"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-semibold text-gray-800 mb-0.5 md:mb-1">
                      {activity.action}
                    </p>
                    <p className="text-[10px] md:text-xs text-gray-500">
                      {activity.user}
                    </p>
                  </div>
                  <span className="text-[10px] md:text-xs text-gray-400 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-white/70 text-xs md:text-sm mb-1 md:mb-2">
                  {stat.label}
                </p>
                <p className="text-2xl md:text-3xl font-bold text-white mb-0.5 md:mb-1">
                  {stat.value}
                </p>
                <p className="text-white/60 text-[10px] md:text-xs">
                  {stat.target}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
