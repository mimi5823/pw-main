"use client";

import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Award, Settings, User, BarChart3, Shield } from "lucide-react";
import { useAdmin } from "@/context/admin-context";

export default function MobileNav() {
  const { logout } = usePrivy();
  const { isAdmin } = useAdmin();
  const pathname = usePathname();

  // Base navigation items
  const baseNavItems = [
    { 
      name: "Overview", 
      path: "/dashboard", 
      icon: <LayoutDashboard className="h-4 w-4 sm:h-5 sm:w-5" /> 
    },
    { 
      name: "Profile", 
      path: "/dashboard/profile", 
      icon: <User className="h-4 w-4 sm:h-5 sm:w-5" /> 
    },
    { 
      name: "Analytics", 
      path: "/dashboard/profile/analytics", 
      icon: <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" /> 
    },
    { 
      name: "Learn", 
      path: "/dashboard/learn", 
      icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" /> 
    },
  ];
  
  // Admin-only navigation items
  const adminNavItems = isAdmin ? [
    { 
      name: "Admin", 
      path: "/admin", 
      icon: <Shield className="h-4 w-4 sm:h-5 sm:w-5" /> 
    }
  ] : [
    { 
      name: "Rewards", 
      path: "/dashboard/rewards", 
      icon: <Award className="h-4 w-4 sm:h-5 sm:w-5" /> 
    }
  ];

  // Combine navigation items - limit to 5 for mobile
  const mobileNavItems = [...baseNavItems, ...adminNavItems].slice(0, 5);

  return (
    <div className="md:hidden">
      {/* Fixed bottom navigation bar with enhanced styling */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800/30 z-40 shadow-xl gradient-border-mobile-t backdrop-blur-sm">
        <div className="flex justify-around items-center py-2 px-1">
          {mobileNavItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center px-2 py-2 rounded-lg transition-all duration-200 ${
                pathname === item.path || (item.path !== "/dashboard" && pathname?.startsWith(item.path))
                  ? "text-primary font-medium bg-primary/10 border border-primary/20 shadow-lg shadow-primary/10"
                  : "text-gray-400 hover:text-gray-200 hover:bg-black/40 border border-transparent"
              }`}
              aria-label={item.name}
            >
              <span className="mb-1">{item.icon}</span>
              <span className="text-[10px] sm:text-[11px] font-medium whitespace-nowrap">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}