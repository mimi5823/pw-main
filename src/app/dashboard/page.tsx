"use client";

import DashboardOverview from "@/components/dashboard/overview";
import { usePrivyAuth } from "@/hooks/use-privy-auth";
import { useAdminCheck } from "@/hooks/use-admin-check";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function DashboardPage() {
  const { authenticated, ready, getUsername } = usePrivyAuth();
  const { isAdmin, loading: adminCheckLoading } = useAdminCheck();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ready && authenticated) {
      // Simulate loading user data
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [ready, authenticated]);

  // Get username using the safe method from the hook
  const username = getUsername();

  if (loading || adminCheckLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-12 h-12 border-4 border-primary border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-800 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">My Learning Hub</h1>
            <p className="text-gray-400 mt-2">
              Welcome back{username ? `, ${username}` : ''}! Track your progress and achievements.
            </p>
          </div>
          
          {isAdmin && (
            <Link 
              href="/admin" 
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center transition-colors"
            >
              <Shield className="w-4 h-4 mr-2" />
              Admin Dashboard
            </Link>
          )}
        </div>
      </div>
      
      <DashboardOverview />
    </div>
  );
}
