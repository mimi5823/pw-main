"use client";

import { useState, useEffect } from "react";
import { Shield, Search, AlertTriangle, Lock, Key, UserCheck, RefreshCw, Eye, EyeOff, CheckCircle, XCircle, Clock } from "lucide-react";

export default function Security() {
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
          <p className="text-gray-400 animate-pulse">Loading security data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Security</h1>
        <p className="text-gray-400">Monitor and manage platform security settings and threats.</p>
      </div>

      {/* Security Overview */}
      <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-500/20 mr-3">
              <Shield className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Security Status: Strong</h2>
              <p className="text-sm text-gray-400">Last security scan: 2 hours ago</p>
            </div>
          </div>
          <button className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400 text-sm">Threats Blocked</h3>
              <Shield className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-xl font-bold text-white">248</p>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400 text-sm">Failed Logins</h3>
              <Lock className="w-4 h-4 text-primary" />
            </div>
            <p className="text-xl font-bold text-white">124</p>
            <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400 text-sm">2FA Enabled</h3>
              <Key className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-xl font-bold text-white">86%</p>
            <p className="text-xs text-gray-500 mt-1">Of admin users</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400 text-sm">Security Score</h3>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-xl font-bold text-white">92/100</p>
            <p className="text-xs text-gray-500 mt-1">Platform rating</p>
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
            <Shield className="w-4 h-4 inline mr-1" />
            Overview
          </button>
          <button 
            onClick={() => setActiveTab("access")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "access" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <UserCheck className="w-4 h-4 inline mr-1" />
            Access Control
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
            Security Logs
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "settings" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Lock className="w-4 h-4 inline mr-1" />
            Security Settings
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {activeTab === "logs" && (
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search security logs..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg w-full sm:w-64 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <select className="bg-gray-800 border border-gray-700 rounded-lg text-white text-sm px-3 py-2">
              <option>All Events</option>
              <option>Login Attempts</option>
              <option>Permission Changes</option>
              <option>Data Access</option>
            </select>
            
            <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white flex items-center">
              <RefreshCw className="w-4 h-4 mr-1" />
              <span>Refresh</span>
            </button>
            
            <button className="px-3 py-2 bg-primary text-black rounded-lg font-medium flex items-center">
              <Shield className="w-4 h-4 mr-1" />
              <span>Run Security Scan</span>
            </button>
          </div>
        </div>
      )}

      {/* Security Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Security Recommendations */}
          <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
            <h3 className="text-lg font-bold text-white mb-4">Security Recommendations</h3>
            <div className="space-y-3">
              {[
                { status: "good", title: "Two-factor authentication", description: "2FA is enabled for 86% of admin users" },
                { status: "good", title: "Password policy", description: "Strong password requirements are enforced" },
                { status: "warning", title: "API key rotation", description: "Some API keys have not been rotated in over 90 days" },
                { status: "warning", title: "Admin accounts", description: "There are 5 users with full admin privileges" },
                { status: "good", title: "SSL/TLS configuration", description: "Using TLS 1.3 with strong cipher suites" },
              ].map((item, index) => (
                <div key={index} className="flex items-start p-3 bg-gray-900 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    item.status === "good" ? "bg-green-500/20" : 
                    item.status === "warning" ? "bg-yellow-500/20" : 
                    "bg-red-500/20"
                  } mr-3`}>
                    {item.status === "good" && <CheckCircle className={`w-5 h-5 text-green-500`} />}
                    {item.status === "warning" && <AlertTriangle className={`w-5 h-5 text-yellow-500`} />}
                    {item.status === "critical" && <XCircle className={`w-5 h-5 text-red-500`} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                  </div>
                  {item.status !== "good" && (
                    <button className="px-3 py-1 bg-primary text-black rounded-lg text-xs font-medium">
                      Fix Now
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Security Events */}
          <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
            <h3 className="text-lg font-bold text-white mb-4">Recent Security Events</h3>
            <div className="space-y-3">
              {[
                { type: "warning", title: "Multiple failed login attempts", description: "5 failed login attempts for user john.doe@example.com", time: "10 minutes ago" },
                { type: "info", title: "Admin permission granted", description: "User sarah.smith@example.com was granted admin permissions", time: "2 hours ago" },
                { type: "critical", title: "Suspicious API access", description: "Unusual API access pattern detected from IP 192.168.1.254", time: "Yesterday" },
                { type: "info", title: "Password changed", description: "Admin user changed their password", time: "2 days ago" },
              ].map((event, index) => (
                <div key={index} className="flex items-start p-3 bg-gray-900 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    event.type === "info" ? "bg-blue-500/20" : 
                    event.type === "warning" ? "bg-yellow-500/20" : 
                    "bg-red-500/20"
                  } mr-3`}>
                    {event.type === "info" && <CheckCircle className={`w-5 h-5 text-blue-500`} />}
                    {event.type === "warning" && <AlertTriangle className={`w-5 h-5 text-yellow-500`} />}
                    {event.type === "critical" && <XCircle className={`w-5 h-5 text-red-500`} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-white font-medium">{event.title}</p>
                      <p className="text-xs text-gray-400">{event.time}</p>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
              <p className="text-sm text-gray-400">Showing 4 of 124 events</p>
              <button className="text-primary text-sm hover:underline">View All Events</button>
            </div>
          </div>
          
          {/* Security Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
              <h3 className="text-lg font-bold text-white mb-3">Login Attempts</h3>
              <div className="h-48 bg-gray-900 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Login attempts chart would appear here</p>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-400">Successful</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-400">Failed</span>
                  </div>
                </div>
                <span className="text-sm text-gray-400">Last 7 days</span>
              </div>
            </div>
            
            <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
              <h3 className="text-lg font-bold text-white mb-3">Threat Sources</h3>
              <div className="h-48 bg-gray-900 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Threat sources chart would appear here</p>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-400">Bot Attacks</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-400">Suspicious IPs</span>
                  </div>
                </div>
                <span className="text-sm text-gray-400">Last 30 days</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Access Control Tab */}
      {activeTab === "access" && (
        <div className="space-y-6">
          {/* User Roles */}
          <div className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">User Roles & Permissions</h3>
              <button className="px-3 py-1.5 bg-primary text-black rounded-lg text-sm">
                Add New Role
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/50 border-b border-gray-800">
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Role</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Users</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Access Level</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Last Modified</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { role: "Super Admin", users: 2, level: "Full Access", modified: "1 week ago" },
                    { role: "Admin", users: 3, level: "High", modified: "2 days ago" },
                    { role: "Content Manager", users: 8, level: "Medium", modified: "Yesterday" },
                    { role: "Instructor", users: 24, level: "Limited", modified: "3 days ago" },
                    { role: "Support", users: 12, level: "Basic", modified: "5 days ago" },
                  ].map((role, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Shield className="w-5 h-5 text-primary mr-2" />
                          <span className="text-white font-medium">{role.role}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white">
                        {role.users} users
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          role.level === "Full Access" ? "bg-red-500/20 text-red-500" : 
                          role.level === "High" ? "bg-orange-500/20 text-orange-500" : 
                          role.level === "Medium" ? "bg-yellow-500/20 text-yellow-500" : 
                          role.level === "Limited" ? "bg-blue-500/20 text-blue-500" : 
                          "bg-green-500/20 text-green-500"
                        }`}>
                          {role.level}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {role.modified}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button className="p-1.5 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
                            <Key className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Active Sessions */}
          <div className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md">
            <div className="p-4 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">Active Admin Sessions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/50 border-b border-gray-800">
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">User</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">IP Address</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Device</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Location</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Login Time</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { user: "John Smith", email: "john.smith@example.com", ip: "192.168.1.1", device: "Chrome / Windows", location: "New York, US", time: "Active now" },
                    { user: "Sarah Lee", email: "sarah.lee@example.com", ip: "192.168.1.24", device: "Safari / macOS", location: "San Francisco, US", time: "10 minutes ago" },
                    { user: "Michael Chen", email: "michael.chen@example.com", ip: "192.168.1.42", device: "Firefox / Linux", location: "Toronto, CA", time: "1 hour ago" },
                  ].map((session, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-xs mr-2">
                            {session.user.split(' ').map(name => name[0]).join('')}
                          </div>
                          <div>
                            <p className="text-white font-medium">{session.user}</p>
                            <p className="text-xs text-gray-400">{session.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white font-mono text-sm">
                        {session.ip}
                      </td>
                      <td className="px-4 py-3 text-white">
                        {session.device}
                      </td>
                      <td className="px-4 py-3 text-white">
                        {session.location}
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {session.time}
                      </td>
                      <td className="px-4 py-3">
                        <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs">
                          Terminate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* API Keys */}
          <div className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">API Keys</h3>
              <button className="px-3 py-1.5 bg-primary text-black rounded-lg text-sm">
                Generate New Key
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/50 border-b border-gray-800">
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Name</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Key</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Created</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Last Used</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Production API", key: "pk_live_*************", created: "3 months ago", lastUsed: "Just now", status: "Active" },
                    { name: "Development API", key: "pk_test_*************", created: "1 month ago", lastUsed: "2 days ago", status: "Active" },
                    { name: "Analytics Integration", key: "pk_analytics_*************", created: "2 months ago", lastUsed: "1 week ago", status: "Active" },
                  ].map((apiKey, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Key className="w-5 h-5 text-primary mr-2" />
                          <span className="text-white font-medium">{apiKey.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <code className="text-gray-400 font-mono text-sm">{apiKey.key}</code>
                          <button className="ml-2 text-gray-400 hover:text-white">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {apiKey.created}
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        {apiKey.lastUsed}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                          {apiKey.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button className="p-1.5 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20">
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20">
                            <XCircle className="w-4 h-4" />
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
      )}

      {/* Security Logs Tab */}
      {activeTab === "logs" && (
        <div className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900/50 border-b border-gray-800">
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Timestamp</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Event</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">User</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">IP Address</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Details</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Severity</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { time: "10:24:15", event: "Failed Login", user: "john.doe@example.com", ip: "192.168.1.42", details: "Invalid password (5th attempt)", severity: "Warning" },
                  { time: "10:22:03", event: "Permission Change", user: "admin@example.com", ip: "192.168.1.1", details: "Added admin role to user sarah.smith@example.com", severity: "Info" },
                  { time: "10:20:45", event: "API Key Created", user: "admin@example.com", ip: "192.168.1.1", details: "New API key generated for Analytics Integration", severity: "Info" },
                  { time: "10:18:32", event: "Suspicious Access", user: "unknown", ip: "203.0.113.42", details: "Attempted access to admin panel from unrecognized location", severity: "Critical" },
                  { time: "10:15:18", event: "Password Reset", user: "michael.chen@example.com", ip: "192.168.1.24", details: "Password reset requested and completed", severity: "Info" },
                  { time: "10:12:05", event: "Account Locked", user: "test@example.com", ip: "192.168.1.56", details: "Account locked after multiple failed attempts", severity: "Warning" },
                  { time: "10:10:59", event: "2FA Disabled", user: "sarah.lee@example.com", ip: "192.168.1.24", details: "Two-factor authentication disabled", severity: "Warning" },
                ].map((log, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/30">
                    <td className="px-4 py-3 text-gray-400 font-mono text-sm">
                      2025-05-21 {log.time}
                    </td>
                    <td className="px-4 py-3 text-white">
                      {log.event}
                    </td>
                    <td className="px-4 py-3 text-white">
                      {log.user}
                    </td>
                    <td className="px-4 py-3 text-white font-mono text-sm">
                      {log.ip}
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {log.details}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        log.severity === "Critical" ? "bg-red-500/20 text-red-500" : 
                        log.severity === "Warning" ? "bg-yellow-500/20 text-yellow-500" : 
                        "bg-blue-500/20 text-blue-500"
                      }`}>
                        {log.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-800 flex justify-between items-center">
            <p className="text-sm text-gray-400">Showing 7 of 248 security events</p>
            <div className="flex space-x-1">
              <button className="px-3 py-1 bg-gray-800 text-white rounded-md text-sm">Previous</button>
              <button className="px-3 py-1 bg-primary text-black rounded-md text-sm">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* Security Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          {/* Authentication Settings */}
          <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
            <h3 className="text-lg font-bold text-white mb-4">Authentication Settings</h3>
            <div className="space-y-4">
              {[
                { name: "Require Two-Factor Authentication", description: "Require all admin users to set up 2FA", enabled: true },
                { name: "Password Complexity", description: "Require strong passwords with special characters, numbers, and mixed case", enabled: true },
                { name: "Password Expiration", description: "Force password reset every 90 days", enabled: false },
                { name: "Session Timeout", description: "Automatically log out inactive users after 30 minutes", enabled: true },
                { name: "Login Attempt Limits", description: "Lock accounts after 5 failed login attempts", enabled: true },
              ].map((setting, index) => (
                <div key={index} className="flex justify-between items-center p-3 border border-gray-800 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{setting.name}</p>
                    <p className="text-xs text-gray-400">{setting.description}</p>
                  </div>
                  <div className="relative inline-block w-10 h-6 rounded-full bg-gray-700">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      defaultChecked={setting.enabled}
                    />
                    <span className={`block w-4 h-4 rounded-full ${setting.enabled ? 'bg-primary translate-x-5' : 'bg-gray-400 translate-x-1'} transform transition-transform duration-200 ease-in-out absolute top-1`}></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Data Protection */}
          <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
            <h3 className="text-lg font-bold text-white mb-4">Data Protection</h3>
            <div className="space-y-4">
              {[
                { name: "Data Encryption at Rest", description: "Encrypt all sensitive data stored in the database", enabled: true },
                { name: "Secure Data Backups", description: "Encrypt all backup files and store in secure location", enabled: true },
                { name: "Personal Data Anonymization", description: "Anonymize personal data in logs and analytics", enabled: false },
                { name: "Automatic Data Cleanup", description: "Automatically remove inactive user data after 1 year", enabled: false },
              ].map((setting, index) => (
                <div key={index} className="flex justify-between items-center p-3 border border-gray-800 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{setting.name}</p>
                    <p className="text-xs text-gray-400">{setting.description}</p>
                  </div>
                  <div className="relative inline-block w-10 h-6 rounded-full bg-gray-700">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      defaultChecked={setting.enabled}
                    />
                    <span className={`block w-4 h-4 rounded-full ${setting.enabled ? 'bg-primary translate-x-5' : 'bg-gray-400 translate-x-1'} transform transition-transform duration-200 ease-in-out absolute top-1`}></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Network Security */}
          <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
            <h3 className="text-lg font-bold text-white mb-4">Network Security</h3>
            <div className="space-y-4">
              {[
                { name: "HTTPS Enforcement", description: "Redirect all HTTP traffic to HTTPS", enabled: true },
                { name: "Content Security Policy", description: "Implement strict CSP headers", enabled: true },
                { name: "IP Allowlisting", description: "Restrict admin access to specific IP addresses", enabled: false },
                { name: "Rate Limiting", description: "Limit API requests to prevent abuse", enabled: true },
                { name: "CORS Restrictions", description: "Restrict cross-origin requests to trusted domains", enabled: true },
              ].map((setting, index) => (
                <div key={index} className="flex justify-between items-center p-3 border border-gray-800 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{setting.name}</p>
                    <p className="text-xs text-gray-400">{setting.description}</p>
                  </div>
                  <div className="relative inline-block w-10 h-6 rounded-full bg-gray-700">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      defaultChecked={setting.enabled}
                    />
                    <span className={`block w-4 h-4 rounded-full ${setting.enabled ? 'bg-primary translate-x-5' : 'bg-gray-400 translate-x-1'} transform transition-transform duration-200 ease-in-out absolute top-1`}></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end mt-6 pt-4 border-t border-gray-800">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm mr-2">
              Cancel
            </button>
            <button className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-medium">
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}