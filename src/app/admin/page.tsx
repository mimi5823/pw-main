"use client";

import { useState, useEffect } from "react";
import { 
  Users, BookOpen, Award, BarChart3, AlertTriangle, 
  ArrowUpRight, TrendingUp, TrendingDown, Clock, 
  Activity, Server, Database, Shield
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCourses: 0,
    completionRate: 0,
    averageScore: 0,
    revenueGrowth: 0,
    systemHealth: 0,
    securityAlerts: 0
  });

  useEffect(() => {
    // Simulate loading data from API
    const timer = setTimeout(() => {
      // Mock data - in a real app, this would come from your API
      setStats({
        totalUsers: 1248,
        activeUsers: 876,
        totalCourses: 42,
        completionRate: 68,
        averageScore: 82,
        revenueGrowth: 12.4,
        systemHealth: 98,
        securityAlerts: 2
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Recent activities - would come from API in real app
  const recentActivities = [
    { id: 1, user: "John D.", action: "Completed course", course: "Blockchain Fundamentals", time: "2 hours ago" },
    { id: 2, user: "Sarah M.", action: "Enrolled in", course: "Advanced Smart Contracts", time: "4 hours ago" },
    { id: 3, user: "Robert K.", action: "Failed quiz", course: "DeFi Principles", time: "6 hours ago" },
    { id: 4, user: "Emma L.", action: "Earned badge", course: "Web3 Developer", time: "8 hours ago" },
    { id: 5, user: "Michael P.", action: "Submitted assignment", course: "Tokenomics", time: "10 hours ago" }
  ];

  // System alerts - would come from API in real app
  const systemAlerts = [
    { id: 1, type: "warning", message: "Database load above 80%", time: "1 hour ago" },
    { id: 2, type: "error", message: "Failed login attempts detected", time: "3 hours ago" },
    { id: 3, type: "info", message: "System update scheduled", time: "5 hours ago" }
  ];

  const StatCard = ({ title, value, icon, trend, color }: { 
    title: string, 
    value: string | number, 
    icon: React.ReactNode, 
    trend?: { direction: 'up' | 'down' | 'neutral', value: string },
    color?: string
  }) => (
    <div className="bg-black rounded-xl p-4 border border-gray-800 hover:border-primary/30 transition-colors shadow-md">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <div className={`p-2 rounded-lg ${color || 'bg-primary/10'}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-white mb-1">{value}</p>
          {trend && (
            <div className="flex items-center text-xs">
              {trend.direction === 'up' && <TrendingUp className="w-3 h-3 text-green-500 mr-1" />}
              {trend.direction === 'down' && <TrendingDown className="w-3 h-3 text-red-500 mr-1" />}
              {trend.direction === 'neutral' && <Clock className="w-3 h-3 text-yellow-500 mr-1" />}
              <span className={
                trend.direction === 'up' ? 'text-green-500' : 
                trend.direction === 'down' ? 'text-red-500' : 
                'text-yellow-500'
              }>
                {trend.value}
              </span>
            </div>
          )}
        </div>
        <Link href={`/admin/${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary hover:underline text-xs flex items-center">
          Details <ArrowUpRight className="w-3 h-3 ml-1" />
        </Link>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-solid rounded-full border-t-transparent animate-spin mb-4"></div>
          <p className="text-gray-400 animate-pulse">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">University Command Center</h1>
        <p className="text-gray-400">Comprehensive control and insights for your digital university.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers.toLocaleString()} 
          icon={<Users className="w-5 h-5 text-primary" />} 
          trend={{ direction: 'up', value: '+12% this month' }}
        />
        <StatCard 
          title="Active Users" 
          value={stats.activeUsers.toLocaleString()} 
          icon={<Activity className="w-5 h-5 text-green-500" />} 
          trend={{ direction: 'up', value: '+8% this week' }}
          color="bg-green-500/10"
        />
        <StatCard 
          title="Total Courses" 
          value={stats.totalCourses} 
          icon={<BookOpen className="w-5 h-5 text-blue-500" />} 
          trend={{ direction: 'up', value: '+3 this month' }}
          color="bg-blue-500/10"
        />
        <StatCard 
          title="Completion Rate" 
          value={`${stats.completionRate}%`} 
          icon={<Award className="w-5 h-5 text-yellow-500" />} 
          trend={{ direction: 'up', value: '+5% this quarter' }}
          color="bg-yellow-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-black rounded-xl p-5 border border-gray-800 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            <Link href="/admin/activity" className="text-primary hover:underline text-sm flex items-center">
              View all <ArrowUpRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-primary font-bold">{activity.user.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">
                    <span className="text-primary">{activity.user}</span> {activity.action} <span className="text-gray-300">{activity.course}</span>
                  </p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 gap-6">
          {/* Performance Metrics */}
          <div className="bg-black rounded-xl p-5 border border-gray-800 shadow-md">
            <h2 className="text-xl font-bold text-white mb-4">System Performance</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-800">
                <div className="flex justify-center mb-2">
                  <Server className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-sm text-gray-400">System Health</p>
                <p className="text-xl font-bold text-white">{stats.systemHealth}%</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-800">
                <div className="flex justify-center mb-2">
                  <Database className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-sm text-gray-400">Database Load</p>
                <p className="text-xl font-bold text-white">42%</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-800">
                <div className="flex justify-center mb-2">
                  <Shield className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-sm text-gray-400">Security Alerts</p>
                <p className="text-xl font-bold text-white">{stats.securityAlerts}</p>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-black rounded-xl p-5 border border-gray-800 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">System Alerts</h2>
              <Link href="/admin/alerts" className="text-primary hover:underline text-sm flex items-center">
                View all <ArrowUpRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
            <div className="space-y-3">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg flex items-start ${
                  alert.type === 'error' ? 'bg-red-900/20 border border-red-800/50' : 
                  alert.type === 'warning' ? 'bg-yellow-900/20 border border-yellow-800/50' : 
                  'bg-blue-900/20 border border-blue-800/50'
                }`}>
                  <div className={`p-2 rounded-full mr-3 ${
                    alert.type === 'error' ? 'bg-red-500/20 text-red-500' : 
                    alert.type === 'warning' ? 'bg-yellow-500/20 text-yellow-500' : 
                    'bg-blue-500/20 text-blue-500'
                  }`}>
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      alert.type === 'error' ? 'text-red-400' : 
                      alert.type === 'warning' ? 'text-yellow-400' : 
                      'text-blue-400'
                    }`}>{alert.message}</p>
                    <p className="text-gray-500 text-xs">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="bg-black rounded-xl p-5 border border-gray-800 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Analytics Overview</h2>
          <Link href="/admin/analytics" className="text-primary hover:underline text-sm flex items-center">
            Detailed analytics <ArrowUpRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-gray-400 font-medium">User Engagement</h3>
            <div className="h-40 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-800">
              <BarChart3 className="w-12 h-12 text-primary/30" />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Daily active users</span>
              <span className="text-white font-medium">432</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-gray-400 font-medium">Course Performance</h3>
            <div className="h-40 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-800">
              <BarChart3 className="w-12 h-12 text-blue-500/30" />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Average completion</span>
              <span className="text-white font-medium">{stats.completionRate}%</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-gray-400 font-medium">Revenue Metrics</h3>
            <div className="h-40 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-800">
              <BarChart3 className="w-12 h-12 text-green-500/30" />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Monthly growth</span>
              <span className="text-white font-medium">+{stats.revenueGrowth}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}