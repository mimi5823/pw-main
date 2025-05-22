"use client";

import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Users, BookOpen, Award, Settings, LogOut, X, Database,
  ChevronLeft, ChevronRight, BarChart3, Shield, MessageSquare, FileText, 
  AlertTriangle, Server, Wallet
} from "lucide-react";

interface AdminSidebarProps {
  onClose?: () => void;
}

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
  const { logout, user } = usePrivy();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setCollapsed(false); // Always expanded on mobile
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const navItems = [
    { 
      name: "Dashboard", 
      path: "/admin", 
      icon: <LayoutDashboard className="w-5 h-5" />,
      exact: true
    },
    { 
      name: "User Management", 
      path: "/admin/users", 
      icon: <Users className="w-5 h-5" /> 
    },
    { 
      name: "Course Content", 
      path: "/admin/courses", 
      icon: <BookOpen className="w-5 h-5" /> 
    },
    { 
      name: "Analytics", 
      path: "/admin/analytics", 
      icon: <BarChart3 className="w-5 h-5 text-primary" /> 
    },
    { 
      name: "Rewards & Badges", 
      path: "/admin/rewards", 
      icon: <Award className="w-5 h-5" /> 
    },
    { 
      name: "Communications", 
      path: "/admin/communications", 
      icon: <MessageSquare className="w-5 h-5" /> 
    },
    { 
      name: "Content Management", 
      path: "/admin/content", 
      icon: <FileText className="w-5 h-5" /> 
    },
    { 
      name: "Wallet Integration", 
      path: "/admin/wallet", 
      icon: <Wallet className="w-5 h-5" /> 
    },
    { 
      name: "Database", 
      path: "/admin/database", 
      icon: <Database className="w-5 h-5" /> 
    },
    { 
      name: "System Health", 
      path: "/admin/system", 
      icon: <Server className="w-5 h-5" /> 
    },
    { 
      name: "Security", 
      path: "/admin/security", 
      icon: <Shield className="w-5 h-5" /> 
    },
    { 
      name: "Alerts", 
      path: "/admin/alerts", 
      icon: <AlertTriangle className="w-5 h-5" /> 
    },
    { 
      name: "Settings", 
      path: "/admin/settings", 
      icon: <Settings className="w-5 h-5" /> 
    },
  ];

  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    if (onClose) {
      onClose();
    }
    logout();
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return pathname === path;
    }
    return pathname === path || pathname?.startsWith(path);
  };

  return (
    <div
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } bg-black border-r border-gray-800/30 h-screen flex flex-col md:gradient-border-r transition-all duration-300 ease-in-out relative shadow-lg`}
    >
      {/* Toggle collapse button */}
      {!isMobile && (
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-20 bg-black text-primary border border-primary/30 rounded-full p-1.5 shadow-lg z-10 hover:bg-gray-900 transition-all duration-300 backdrop-blur-sm"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      )}

      <div className={`${collapsed ? 'justify-center p-3' : 'justify-between p-4'} flex items-center border-b border-gray-800/30`}>
        <Link href="/admin" className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-2'}`}>
          <div className="relative flex items-center justify-center bg-primary rounded-full p-1 w-8 h-8">
            <Shield className="w-5 h-5 text-black" />
          </div>
          {!collapsed && <span className="text-lg font-bold text-white">Command Center</span>}
        </Link>

        {/* Close button for mobile */}
        {onClose && !collapsed && (
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-gray-900 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>

      {!collapsed && (
        <div className="px-3 py-2 mb-2 border-b border-gray-800/30">
          <div className="bg-black rounded-lg p-3 border border-gray-800/50 shadow-inner">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-bold text-lg shadow-md">
                A
              </div>
              <div>
                <p className="text-white font-medium">Admin User</p>
                <p className="text-xs text-gray-400">
                  {user?.email ? String(user.email) : "thezbdiary@gmail.com"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {collapsed && (
        <div className="flex justify-center py-3 border-b border-gray-800/30">
          <div className="relative w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-bold text-lg shadow-md">
            A
          </div>
        </div>
      )}

      <nav className={`${collapsed ? 'px-2' : 'px-3'} py-2 flex-grow overflow-y-auto`}>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                onClick={handleNavClick}
                className={`flex items-center ${
                  collapsed ? 'justify-center px-1.5' : 'px-3'
                } py-2.5 rounded-lg transition-colors ${
                  isActive(item.path, item.exact)
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-gray-400 hover:bg-gray-900 hover:text-white border border-transparent"
                }`}
                title={collapsed ? item.name : undefined}
              >
                <span className={collapsed ? '' : 'mr-3'}>{item.icon}</span>
                {!collapsed && item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`${collapsed ? 'px-2' : 'px-3'} py-4 border-t border-gray-800/30`}>
        <button
          onClick={handleLogout}
          className={`w-full ${
            collapsed ? 'justify-center px-1.5' : 'px-3'
          } py-2.5 text-gray-400 hover:text-white hover:bg-gray-900 transition-colors rounded-lg flex items-center ${
            collapsed ? 'justify-center' : 'text-left'
          }`}
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
          {!collapsed && "Sign Out"}
        </button>
      </div>
    </div>
  );
}