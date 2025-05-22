"use client";

import { useState, useEffect } from "react";
import { Server, Activity, Cpu, Database, HardDrive, RefreshCw, Clock, AlertTriangle, CheckCircle, BarChart3, Zap } from "lucide-react";

export default function SystemHealth() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-solid rounded-full border-t-transparent animate-spin mb-4"></div>
          <p className="text-gray-400 animate-pulse">Loading system data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">System Health</h1>
        <p className="text-gray-400">Monitor and manage platform performance and system resources.</p>
      </div>

      {/* System Status Overview */}
      <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-500/20 mr-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">All Systems Operational</h2>
              <p className="text-sm text-gray-400">Last checked: 2 minutes ago</p>
            </div>
          </div>
          <button className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400 text-sm">Server Uptime</h3>
              <Server className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-xl font-bold text-white">99.98%</p>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400 text-sm">CPU Usage</h3>
              <Cpu className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xl font-bold text-white">24%</p>
            <p className="text-xs text-gray-500 mt-1">Average</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400 text-sm">Memory Usage</h3>
              <HardDrive className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-xl font-bold text-white">42%</p>
            <p className="text-xs text-gray-500 mt-1">8.4 GB / 20 GB</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400 text-sm">Response Time</h3>
              <Zap className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-xl font-bold text-white">124ms</p>
            <p className="text-xs text-gray-500 mt-1">Average</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <div className="flex space-x-1 overflow-x-auto">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "overview" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Activity className="w-4 h-4 inline mr-1" />
            Overview
          </button>
          <button 
            onClick={() => setActiveTab("servers")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "servers" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Server className="w-4 h-4 inline mr-1" />
            Servers
          </button>
          <button 
            onClick={() => setActiveTab("database")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "database" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Database className="w-4 h-4 inline mr-1" />
            Database
          </button>
          <button 
            onClick={() => setActiveTab("logs")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "logs" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <AlertTriangle className="w-4 h-4 inline mr-1" />
            System Logs
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Performance Chart Placeholder */}
          <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Performance Metrics</h3>
              <div className="flex space-x-2">
                <button className="px-2 py-1 bg-gray-800 text-white rounded-md text-xs">24h</button>
                <button className="px-2 py-1 bg-primary text-black rounded-md text-xs">7d</button>
                <button className="px-2 py-1 bg-gray-800 text-white rounded-md text-xs">30d</button>
              </div>
            </div>
            <div className="h-64 bg-gray-900 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Performance metrics chart would appear here</p>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                  <span className="text-sm text-gray-400">CPU</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-400">Memory</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-400">Network</span>
                </div>
              </div>
              <button className="text-primary text-sm hover:underline">Export Data</button>
            </div>
          </div>
          
          {/* System Events */}
          <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
            <h3 className="text-lg font-bold text-white mb-4">Recent System Events</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="flex items-start p-3 bg-gray-900 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    index === 1 ? "bg-green-500/20" : 
                    index === 2 ? "bg-blue-500/20" : 
                    index === 3 ? "bg-yellow-500/20" :
                    "bg-red-500/20"
                  } mr-3`}>
                    {index === 1 && <CheckCircle className={`w-5 h-5 text-green-500`} />}
                    {index === 2 && <RefreshCw className={`w-5 h-5 text-blue-500`} />}
                    {index === 3 && <AlertTriangle className={`w-5 h-5 text-yellow-500`} />}
                    {index === 4 && <AlertTriangle className={`w-5 h-5 text-red-500`} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-white font-medium">
                        {index === 1 ? "System Update Completed" : 
                         index === 2 ? "Database Backup" : 
                         index === 3 ? "High CPU Usage Detected" :
                         "API Endpoint Timeout"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {index === 1 ? "2 hours ago" : 
                         index === 2 ? "6 hours ago" : 
                         index === 3 ? "Yesterday" : 
                         "2 days ago"}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {index === 1 ? "System updated to version 2.4.0 successfully" : 
                       index === 2 ? "Automated database backup completed" : 
                       index === 3 ? "CPU usage peaked at 85% for 10 minutes" :
                       "API endpoint /api/courses timed out after 30s"}
                    </p>
                    <div className="flex items-center mt-2">
                      <Clock className="w-3.5 h-3.5 text-gray-500 mr-1.5" />
                      <span className="text-xs text-gray-500">
                        {index === 1 ? "May 21, 2025 - 10:24 AM" : 
                         index === 2 ? "May 21, 2025 - 06:00 AM" : 
                         index === 3 ? "May 20, 2025 - 08:15 PM" :
                         "May 19, 2025 - 11:42 AM"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
              <p className="text-sm text-gray-400">Showing 4 of 248 events</p>
              <button className="text-primary text-sm hover:underline">View All Events</button>
            </div>
          </div>
          
          {/* Resource Utilization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
              <h3 className="text-lg font-bold text-white mb-3">CPU Utilization</h3>
              <div className="space-y-3">
                {["Web Server", "API Server", "Database", "Background Jobs"].map((server, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <p className="text-white">{server}</p>
                      <p className="text-white font-medium">{15 + (index * 10)}%</p>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${15 + (index * 10)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
              <h3 className="text-lg font-bold text-white mb-3">Memory Utilization</h3>
              <div className="space-y-3">
                {["Web Server", "API Server", "Database", "Background Jobs"].map((server, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <p className="text-white">{server}</p>
                      <p className="text-white font-medium">{20 + (index * 12)}%</p>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2.5">
                      <div 
                        className="bg-blue-500 h-2.5 rounded-full" 
                        style={{ width: `${20 + (index * 12)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Servers Tab */}
      {activeTab === "servers" && (
        <div className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900/50 border-b border-gray-800">
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Server</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">CPU</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Memory</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Disk</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Uptime</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {["Web Server", "API Server", "Database Server", "Cache Server", "Worker Server"].map((server, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Server className="w-5 h-5 text-primary mr-2" />
                        <span className="text-white font-medium">{server}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        index !== 3 ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                      }`}>
                        {index !== 3 ? "Online" : "Maintenance"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-800 rounded-full h-2 mr-2">
                          <div 
                            className={`${index % 2 === 0 ? "bg-primary" : "bg-blue-500"} h-2 rounded-full`} 
                            style={{ width: `${15 + (index * 10)}%` }}
                          ></div>
                        </div>
                        <span className="text-white">{15 + (index * 10)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-800 rounded-full h-2 mr-2">
                          <div 
                            className={`${index % 2 === 0 ? "bg-blue-500" : "bg-purple-500"} h-2 rounded-full`} 
                            style={{ width: `${20 + (index * 12)}%` }}
                          ></div>
                        </div>
                        <span className="text-white">{20 + (index * 12)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-800 rounded-full h-2 mr-2">
                          <div 
                            className={`${index % 2 === 0 ? "bg-green-500" : "bg-yellow-500"} h-2 rounded-full`} 
                            style={{ width: `${30 + (index * 8)}%` }}
                          ></div>
                        </div>
                        <span className="text-white">{30 + (index * 8)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white">
                      {index === 0 ? "24 days" : 
                       index === 1 ? "18 days" : 
                       index === 2 ? "30 days" : 
                       index === 3 ? "2 hours" : 
                       "12 days"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="p-1.5 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
                          <BarChart3 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Database Tab */}
      {activeTab === "database" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-400 text-sm">Query Performance</h3>
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Zap className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">42ms</p>
              <p className="text-xs text-gray-500 mt-1">Avg. response time</p>
            </div>
            
            <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-400 text-sm">Active Connections</h3>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">24</p>
              <p className="text-xs text-gray-500 mt-1">Current connections</p>
            </div>
            
            <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-400 text-sm">Database Size</h3>
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Database className="w-5 h-5 text-green-500" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">4.2 GB</p>
              <p className="text-xs text-gray-500 mt-1">Total size</p>
            </div>
            
            <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-400 text-sm">Last Backup</h3>
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Clock className="w-5 h-5 text-purple-500" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">6h ago</p>
              <p className="text-xs text-gray-500 mt-1">Automated backup</p>
            </div>
          </div>
          
          {/* Database Tables */}
          <div className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md">
            <div className="p-4 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">Database Tables</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/50 border-b border-gray-800">
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Table Name</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Size</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Rows</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Last Updated</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {["users", "courses", "enrollments", "lessons", "transactions", "content", "analytics"].map((table, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/30">
                      <td className="px-4 py-3 text-white font-medium">{table}</td>
                      <td className="px-4 py-3 text-white">
                        {(Math.random() * 1000).toFixed(2)} MB
                      </td>
                      <td className="px-4 py-3 text-white">
                        {Math.floor(Math.random() * 10000)}
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {index === 0 ? "2 minutes ago" : 
                         index === 1 ? "1 hour ago" : 
                         index === 2 ? "3 hours ago" : 
                         index === 3 ? "Yesterday" : 
                         "2 days ago"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                          Healthy
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Query Performance */}
          <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
            <h3 className="text-lg font-bold text-white mb-4">Slow Queries</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((index) => (
                <div key={index} className="p-3 bg-gray-900 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-white font-mono text-sm">
                      SELECT * FROM {index === 1 ? "users" : index === 2 ? "courses" : "analytics"} 
                      WHERE {index === 1 ? "last_login" : index === 2 ? "status" : "created_at"} = '...'
                    </p>
                    <span className="text-red-500 font-medium">{200 + (index * 100)}ms</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Executed {index === 1 ? "24" : index === 2 ? "12" : "8"} times</span>
                    <button className="text-primary hover:underline">Optimize</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* System Logs Tab */}
      {activeTab === "logs" && (
        <div className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">System Logs</h3>
            <div className="flex space-x-2">
              <select className="bg-gray-800 border border-gray-700 rounded-lg text-white text-sm px-3 py-1.5">
                <option>All Levels</option>
                <option>Error</option>
                <option>Warning</option>
                <option>Info</option>
                <option>Debug</option>
              </select>
              <button className="px-3 py-1.5 bg-primary text-black rounded-lg text-sm">
                Download Logs
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900/50 border-b border-gray-800">
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Timestamp</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Level</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Service</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Message</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { time: "10:24:15", level: "ERROR", service: "API", message: "Failed to connect to payment gateway: Timeout" },
                  { time: "10:22:03", level: "WARN", service: "Auth", message: "Multiple failed login attempts for user: john.doe@example.com" },
                  { time: "10:20:45", level: "INFO", service: "Database", message: "Automated backup completed successfully" },
                  { time: "10:18:32", level: "INFO", service: "Web", message: "User registered: sarah.smith@example.com" },
                  { time: "10:15:18", level: "DEBUG", service: "Cache", message: "Cache invalidated for course content: ID-12345" },
                  { time: "10:12:05", level: "ERROR", service: "Worker", message: "Failed to process video conversion: Out of memory" },
                  { time: "10:10:59", level: "INFO", service: "System", message: "Application started successfully" },
                ].map((log, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/30">
                    <td className="px-4 py-3 text-gray-400 font-mono text-sm">
                      2025-05-21 {log.time}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        log.level === "ERROR" ? "bg-red-500/20 text-red-500" : 
                        log.level === "WARN" ? "bg-yellow-500/20 text-yellow-500" : 
                        log.level === "INFO" ? "bg-blue-500/20 text-blue-500" :
                        "bg-gray-500/20 text-gray-500"
                      }`}>
                        {log.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white">
                      {log.service}
                    </td>
                    <td className="px-4 py-3 text-white">
                      {log.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-800 flex justify-between items-center">
            <p className="text-sm text-gray-400">Showing 7 of 1,248 log entries</p>
            <div className="flex space-x-1">
              <button className="px-3 py-1 bg-gray-800 text-white rounded-md text-sm">Previous</button>
              <button className="px-3 py-1 bg-primary text-black rounded-md text-sm">Next</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}