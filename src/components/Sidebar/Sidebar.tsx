// Sidebar.tsx - Fixed with suitable icons and dynamic vertical line
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

  // Calculate vertical line height dynamically
  const calculateLineHeight = (subItemsLength: number) => {
    if (subItemsLength === 0) return "0px";
    // Base calculation: first item at 13px, each subsequent item adds 47px
    const baseOffset = 13;
    const itemHeight = 47;
    const totalHeight = baseOffset + (subItemsLength - 1) * itemHeight;
    return `${totalHeight}px`;
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-[70px]" : "w-[280px]"
      } h-screen bg-gradient-to-b from-white to-[#f8f9fa] border-r border-[#e5e7eb] flex flex-col transition-all duration-300 ease-in-out fixed left-0 top-0 overflow-hidden z-[100] lg:z-auto
      ${
        isMobileMenuOpen
          ? "translate-x-0"
          : "-translate-x-full lg:translate-x-0"
      }
      shadow-2xl lg:shadow-none`}
    >
      {/* Logo Section */}
      <div
        className={`${
          isCollapsed ? "min-h-[30px] p-[15px]" : "min-h-[30px] p-[16px_20px]"
        } flex-shrink-0 flex items-center justify-center transition-all duration-300`}
      >
        {!isCollapsed ? (
          <div className="flex items-center justify-center w-full">
            <img
              src={MainIcon}
              alt="Logo"
              className="w-full h-auto max-h-[100px] block transition-all duration-300"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <img
              src={MainIcon}
              alt="Logo"
              className="object-contain transition-all duration-300"
            />
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-[8px_0] scrollbar-thin scrollbar-thumb-[#cbd5e1] scrollbar-track-transparent hover:scrollbar-thumb-[#94a3b8] scrollbar-thumb-rounded-[3px]">
        {menuItems.map((item) => {
          const active = isActive(item);
          const isExpanded = expandedItem === item.id;
          const IconComponent = item.icon;

          return (
            <div key={item.id} className="mb-[2px]">
              {item.subItems ? (
                <button
                  className={`${
                    isCollapsed
                      ? "w-[calc(100%-16px)] mx-2"
                      : "w-[calc(100%-24px)] mx-3"
                  } flex items-center ${
                    isCollapsed ? "justify-center p-3" : "p-[11px_16px]"
                  } border-none cursor-pointer text-sm font-medium transition-all duration-200 relative gap-3 text-left rounded-lg group ${
                    active
                      ? "bg-gradient-to-br from-[#2563eb] to-[#3b82f6] text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]"
                      : "bg-transparent text-[#475569] hover:bg-[#f1f5f9] hover:text-[#1e40af]"
                  }`}
                  onClick={() => toggleExpand(item.id)}
                >
                  <span
                    className={`${
                      isCollapsed ? "" : "flex-shrink-0"
                    } flex items-center justify-center w-5 h-5`}
                  >
                    <IconComponent
                      size={22}
                      className={`transition-all duration-200 ${
                        active
                          ? "text-white"
                          : "text-[#475569] group-hover:text-[#1e40af]"
                      }`}
                    />
                  </span>
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
                        {item.label}
                      </span>
                      <ChevronRight
                        size={16}
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
                      ? "w-[calc(100%-16px)] mx-2"
                      : "w-[calc(100%-24px)] mx-3"
                  } flex items-center ${
                    isCollapsed ? "justify-center p-3" : "p-[11px_16px]"
                  } border-none cursor-pointer text-sm font-medium transition-all duration-200 relative gap-3 text-left rounded-lg group ${
                    active
                      ? "bg-gradient-to-br from-[#2563eb] to-[#3b82f6] text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]"
                      : "bg-transparent text-[#475569] hover:bg-[#f1f5f9] hover:text-[#1e40af]"
                  }`}
                >
                  <span
                    className={`${
                      isCollapsed ? "" : "flex-shrink-0"
                    } flex items-center justify-center w-5 h-5`}
                  >
                    <IconComponent
                      size={22}
                      className={`transition-all duration-200 ${
                        active
                          ? "text-white"
                          : "text-[#475569] group-hover:text-[#1e40af]"
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

              {!isCollapsed && item.subItems && isExpanded && (
                <div className="bg-transparent p-[4px_0] ml-3 mr-3 mt-1 mb-2 relative overflow-hidden animate-fadeIn">
                  {/* Vertical line - dynamically calculated */}
                  <div
                    className="absolute left-[26px] w-[3px] bg-[#94a3b8] rounded-t-[1.5px]"
                    style={{
                      top: "13px",
                      height: calculateLineHeight(item.subItems.length),
                    }}
                  />
                  {item.subItems.map((subItem, index) => (
                    <Link
                      key={index}
                      to={subItem.path}
                      onClick={handleLinkClick}
                      className={`flex items-center p-[10px_16px] pl-12 text-sm font-medium transition-all duration-200 rounded-md my-[3px] relative whitespace-nowrap overflow-hidden text-ellipsis before:content-[''] before:absolute before:left-[26px] before:top-1/2 before:-translate-y-1/2 before:w-[14px] before:h-[3px] before:rounded-[1.5px] after:content-[''] after:absolute after:left-[25px] after:top-1/2 after:-translate-y-1/2 after:w-0 after:h-0 after:bg-transparent after:rounded-full after:transition-all after:duration-200 ${
                        location.pathname === subItem.path
                          ? "text-[#64748b] before:bg-[#2563eb] before:h-[3px] before:w-[14px] after:w-0 after:h-0 after:bg-[#2563eb] after:left-[25px]"
                          : "text-[#64748b] before:bg-[#94a3b8] hover:text-[#1e40af] hover:pl-[53px] hover:before:bg-[#1e40af]"
                      }`}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <button
        className={`hidden lg:flex items-center gap-2 p-[14px_16px] bg-none border-none border-t border-t-[#e5e7eb] cursor-pointer text-[#64748b] text-[13px] transition-all duration-200 w-full ${
          isCollapsed ? "justify-center" : "justify-start"
        } flex-shrink-0 hover:bg-[#f1f5f9] hover:text-[#1e40af]`}
        onClick={toggleSidebar}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        {!isCollapsed && <span>Collapse</span>}
      </button>
    </div>
  );
};

export default Sidebar;
