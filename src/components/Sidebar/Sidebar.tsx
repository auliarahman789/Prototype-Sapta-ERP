// Sidebar.tsx - Saptaloka Digital Brand Theme
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Database,
  Package,
  Wrench,
  Users,
  Calculator,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import MainIcon from "../../iconSidebar/saptaIcon.svg";

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  path?: string;
  subItems?: { label: string; path: string }[];
}

interface SidebarProps {
  onMobileClose?: () => void;
  isMobileMenuOpen?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onMobileClose,
  isMobileMenuOpen,
  onCollapsedChange,
}) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      path: "/",
    },
    {
      id: "PPIC",
      label: "PPIC",
      icon: Package,
      subItems: [
        { label: "Production Schedule", path: "/ppic/schedule/add" },
        { label: "Delivery Schedule", path: "/ppic/delivery-schedule/list" },
        { label: "Bill Of Materials", path: "/ppic/bom/list" },
        { label: "Manager Approval", path: "/ppic/manager-approval/list" },
      ],
    },
    {
      id: "Maintenance",
      label: "Maintenance",
      icon: Wrench,
      subItems: [
        { label: "Maintenance Request", path: "/maintenance/request" },
        { label: "List Maintenance", path: "/maintenance/list" },
        { label: "Maintenance Schedule", path: "/maintenance/schedule" },
        { label: "Monitoring", path: "/maintenance/monitoring" },
        { label: "Request Sparepart", path: "/maintenance/request-sparepart" },
      ],
    },
    {
      id: "HR",
      label: "Human Resource",
      icon: Users,
      subItems: [
        { label: "Personal Data", path: "/hr/personal-data" },
        { label: "List Employee", path: "/hr/list-employee" },
        { label: "Attendance", path: "/hr/attendance" },
        { label: "Leave Management", path: "/hr/leave-management" },
        { label: "Payroll", path: "/hr/payroll" },
      ],
    },
    {
      id: "Accounting",
      label: "Accounting",
      icon: Calculator,
      subItems: [
        { label: "General Ledger", path: "/accounting/general-ledger" },
        { label: "Journal Entry", path: "/accounting/journal-entry" },
        { label: "Balance Sheet", path: "/accounting/balance-sheet" },
      ],
    },
    {
      id: "masterData",
      label: "Master Data",
      icon: Database,
      path: "/master-data",
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const itemToExpand = menuItems.find((item) => {
      if (item.subItems) {
        return item.subItems.some((subItem) => subItem.path === currentPath);
      }
      return false;
    });

    if (itemToExpand) {
      setExpandedItem(itemToExpand.id);
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (newCollapsedState) setExpandedItem(null);

    if (onCollapsedChange) {
      onCollapsedChange(newCollapsedState);
    }
  };

  const toggleExpand = (itemId: string) => {
    if (isCollapsed) {
      setIsCollapsed(false);
    }
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const isActive = (item: MenuItem) => {
    if (item.path === location.pathname) {
      return true;
    }
    if (item.subItems) {
      return item.subItems.some(
        (subItem) => subItem.path === location.pathname,
      );
    }
    return false;
  };

  const handleLinkClick = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-[70px]" : "w-[280px]"
      } h-screen bg-white border-r-2 border-slate-200 flex flex-col transition-all duration-300 ease-in-out fixed left-0 top-0 overflow-hidden z-[100] lg:z-auto
      ${
        isMobileMenuOpen
          ? "translate-x-0"
          : "-translate-x-full lg:translate-x-0"
      }
      shadow-[0_0_32px_rgba(14,165,233,0.12)] lg:shadow-none`}
    >
      {/* Logo Section with brand styling */}
      <div
        className={`${
          isCollapsed ? "min-h-[80px] p-4" : "min-h-[100px] p-6"
        } flex-shrink-0 flex items-center justify-center transition-all duration-300 border-b-2 border-slate-100 bg-gradient-to-br from-white to-slate-50`}
      >
        {!isCollapsed ? (
          <div className="flex items-center justify-center w-full  ">
            <img
              src={MainIcon}
              alt="Saptaloka Digital"
              className="w-full h-auto max-h-[70px] block transition-all duration-300 drop-shadow-sm rounded"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <img
              src={MainIcon}
              alt="Saptaloka Digital"
              className="h-[40px] w-auto object-contain transition-all duration-300 drop-shadow-sm rounded"
            />
          </div>
        )}
      </div>

      {/* Navigation Menu with Saptaloka brand colors */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 scrollbar-thin scrollbar-thumb-[#0EA5E9] scrollbar-track-transparent hover:scrollbar-thumb-[#1E88E5] scrollbar-thumb-rounded-full">
        {menuItems.map((item) => {
          const active = isActive(item);
          const isExpanded = expandedItem === item.id;
          const IconComponent = item.icon;

          return (
            <div key={item.id} className="mb-1">
              {item.subItems ? (
                <button
                  className={`${
                    isCollapsed
                      ? "w-[calc(100%-8px)] mx-1"
                      : "w-[calc(100%-16px)] mx-2"
                  } flex items-center ${
                    isCollapsed ? "justify-center p-3" : "p-3.5"
                  } border-none cursor-pointer text-sm font-bold transition-all duration-200 relative gap-3 text-left rounded-xl group ${
                    active
                      ? "bg-gradient-to-r from-[#0EA5E9] to-[#1E88E5] text-white shadow-[0_4px_16px_rgba(14,165,233,0.35)]"
                      : "bg-transparent text-slate-700 hover:bg-gradient-to-br hover:from-sky-50 hover:to-blue-50 hover:text-[#0EA5E9]"
                  }`}
                  onClick={() => toggleExpand(item.id)}
                >
                  <span
                    className={`${
                      isCollapsed ? "" : "flex-shrink-0"
                    } flex items-center justify-center w-5 h-5`}
                  >
                    <IconComponent
                      size={20}
                      strokeWidth={2.5}
                      className={`transition-all duration-200 ${
                        active
                          ? "text-white drop-shadow-sm"
                          : "text-[#0EA5E9] group-hover:text-[#1E88E5] group-hover:scale-110"
                      }`}
                    />
                  </span>
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
                        {item.label}
                      </span>
                      <ChevronRight
                        size={18}
                        strokeWidth={2.5}
                        className={`flex-shrink-0 transition-transform duration-200 ml-auto ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      />
                    </>
                  )}
                </button>
              ) : (
                <Link
                  to={item.path!}
                  onClick={handleLinkClick}
                  className={`${
                    isCollapsed
                      ? "w-[calc(100%-8px)] mx-1"
                      : "w-[calc(100%-16px)] mx-2"
                  } flex items-center ${
                    isCollapsed ? "justify-center p-3" : "p-3.5"
                  } border-none cursor-pointer text-sm font-bold transition-all duration-200 relative gap-3 text-left rounded-xl group ${
                    active
                      ? "bg-gradient-to-r from-[#0EA5E9] to-[#1E88E5] text-white shadow-[0_4px_16px_rgba(14,165,233,0.35)]"
                      : "bg-transparent text-slate-700 hover:bg-gradient-to-br hover:from-sky-50 hover:to-blue-50 hover:text-[#0EA5E9]"
                  }`}
                >
                  <span
                    className={`${
                      isCollapsed ? "" : "flex-shrink-0"
                    } flex items-center justify-center w-5 h-5`}
                  >
                    <IconComponent
                      size={20}
                      strokeWidth={2.5}
                      className={`transition-all duration-200 ${
                        active
                          ? "text-white drop-shadow-sm"
                          : "text-[#0EA5E9] group-hover:text-[#1E88E5] group-hover:scale-110"
                      }`}
                    />
                  </span>
                  {!isCollapsed && (
                    <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
                      {item.label}
                    </span>
                  )}
                </Link>
              )}

              {/* Submenu with modern pill indicators */}
              {!isCollapsed && item.subItems && isExpanded && (
                <div className="bg-gradient-to-br from-slate-50/50 to-blue-50/50 backdrop-blur-sm rounded-xl p-2 ml-2 mr-2 mt-2 mb-2 border border-slate-200/50 shadow-sm overflow-hidden animate-fadeIn">
                  {item.subItems.map((subItem, index) => (
                    <Link
                      key={index}
                      to={subItem.path}
                      onClick={handleLinkClick}
                      className={`flex items-center gap-3 p-2.5 pl-4 text-[13px] font-semibold transition-all duration-200 rounded-lg my-1 relative whitespace-nowrap overflow-hidden text-ellipsis group ${
                        location.pathname === subItem.path
                          ? "text-white font-bold bg-gradient-to-r from-[#0EA5E9] to-[#1E88E5] shadow-md"
                          : "text-slate-600 hover:text-[#0EA5E9] hover:bg-white hover:shadow-sm"
                      }`}
                    >
                      {/* Modern pill indicator */}
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 flex-shrink-0 ${
                          location.pathname === subItem.path
                            ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                            : "bg-slate-300 group-hover:bg-[#0EA5E9] group-hover:shadow-[0_0_8px_rgba(14,165,233,0.6)]"
                        }`}
                      />
                      <span className="flex-1">{subItem.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse Button with brand styling */}
      <button
        className={`hidden lg:flex items-center gap-2.5 p-4 bg-gradient-to-br from-white to-slate-50 border-none border-t-2 border-t-slate-100 cursor-pointer text-slate-600 text-sm font-bold transition-all duration-200 w-full ${
          isCollapsed ? "justify-center" : "justify-start"
        } flex-shrink-0 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 hover:text-[#0EA5E9] group`}
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ChevronRight
            size={20}
            strokeWidth={2.5}
            className="text-[#0EA5E9] group-hover:text-[#1E88E5] transition-all duration-200 group-hover:scale-110"
          />
        ) : (
          <>
            <ChevronLeft
              size={20}
              strokeWidth={2.5}
              className="text-[#0EA5E9] group-hover:text-[#1E88E5] transition-all duration-200 group-hover:scale-110"
            />
            <span>Collapse</span>
          </>
        )}
      </button>
    </div>
  );
};

export default Sidebar;
