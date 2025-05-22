"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Search, Plus, Filter, RefreshCw, Bell, CheckCircle, XCircle, Clock, Settings, Eye, Trash2 } from "lucide-react";

export default function Alerts() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");

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
          <p className="text-gray-400 animate-pulse">Loading alerts data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Alerts</h1>
        <p className="text-gray-400">Manage system alerts, notifications, and warning messages.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Active Alerts</h3>
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">5</p>
          <p className="text-xs text-gray-500 mt-1">2 critical</p>
        </div>
        
        <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Resolved Today</h3>
            <div className="p-2 rounded-lg bg-green-500/10">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">12</p>
          <p className="text-xs text-gray-500 mt-1">+3 from yesterday</p>
        </div>
        
        <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Avg. Response Time</h3>
            <div className="p-2 rounded-lg bg-primary/10">
              <Clock className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">24m</p>
          <p className="text-xs text-gray-500 mt-1">For critical alerts</p>
        </div>
        
        <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Alert Rules</h3>
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Settings className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">18</p>
          <p className="text-xs text-gray-500 mt-1">Active monitoring rules</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <div className="flex space-x-1 overflow-x-auto">
          <button 
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "active" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <AlertTriangle className="w-4 h-4 inline mr-1" />
            Active Alerts
          </button>
          <button 
            onClick={() => setActiveTab("resolved")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "resolved" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <CheckCircle className="w-4 h-4 inline mr-1" />
            Resolved
          </button>
          <button 
            onClick={() => setActiveTab("rules")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "rules" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4 inline mr-1" />
            Alert Rules
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "settings" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Bell className="w-4 h-4 inline mr-1" />
            Notification Settings
          </button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search alerts..."
            className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg w-full sm:w-64 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <select className="bg-gray-800 border border-gray-700 rounded-lg text-white text-sm px-3 py-2">
            <option>All Severities</option>
            <option>Critical</option>
            <option>Warning</option>
            <option>Info</option>
          </select>
          
          <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white flex items-center">
            <RefreshCw className="w-4 h-4 mr-1" />
            <span>Refresh</span>
          </button>
          
          {activeTab === "rules" && (
            <button className="px-3 py-2 bg-primary text-black rounded-lg font-medium flex items-center">
              <Plus className="w-4 h-4 mr-1" />
              <span>New Rule</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Alerts */}
      {activeTab === "active" && (
        <div className="space-y-4">
          {[
            { id: "ALT-1001", title: "High CPU Usage", description: "Server CPU usage has exceeded 85% for more than 10 minutes", severity: "Critical", time: "10 minutes ago", system: "Web Server", assignee: "Unassigned" },
            { id: "ALT-1002", title: "Database Connection Errors", description: "Multiple failed database connection attempts detected", severity: "Critical", time: "15 minutes ago", system: "Database", assignee: "John Smith" },
            { id: "ALT-1003", title: "Low Disk Space", description: "Server disk space is below 10% free", severity: "Warning", time: "1 hour ago", system: "Storage", assignee: "Unassigned" },
            { id: "ALT-1004", title: "API Response Time", description: "API endpoint /api/courses is responding slowly (>500ms)", severity: "Warning", time: "2 hours ago", system: "API Server", assignee: "Sarah Lee" },
            { id: "ALT-1005", title: "Failed Login Attempts", description: "Multiple failed login attempts from IP 192.168.1.42", severity: "Info", time: "3 hours ago", system: "Authentication", assignee: "Unassigned" },
          ].map((alert, index) => (
            <div key={index} className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                <div className="flex items-start">
                  <div className={`p-2 rounded-full ${
                    alert.severity === "Critical" ? "bg-red-500/20" : 
                    alert.severity === "Warning" ? "bg-yellow-500/20" : 
                    "bg-blue-500/20"
                  } mr-3`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      alert.severity === "Critical" ? "text-red-500" : 
                      alert.severity === "Warning" ? "text-yellow-500" : 
                      "text-blue-500"
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-bold text-white">{alert.title}</h3>
                      <span className="ml-2 text-xs text-gray-500">{alert.id}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{alert.description}</p>
                  </div>
                </div>
                <div className="flex mt-3 md:mt-0">
                  <button className="px-3 py-1.5 bg-gray-800 text-white rounded-lg text-sm mr-2">
                    Acknowledge
                  </button>
                  <button className="px-3 py-1.5 bg-primary text-black rounded-lg text-sm">
                    Resolve
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div className="bg-gray-900 rounded-lg p-2">
                  <p className="text-xs text-gray-500 mb-1">Severity</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    alert.severity === "Critical" ? "bg-red-500/20 text-red-500" : 
                    alert.severity === "Warning" ? "bg-yellow-500/20 text-yellow-500" : 
                    "bg-blue-500/20 text-blue-500"
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <div className="bg-gray-900 rounded-lg p-2">
                  <p className="text-xs text-gray-500 mb-1">System</p>
                  <p className="text-sm text-white">{alert.system}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-2">
                  <p className="text-xs text-gray-500 mb-1">Detected</p>
                  <p className="text-sm text-white">{alert.time}</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-800">
                <div className="flex items-center">
                  <p className="text-xs text-gray-500 mr-2">Assigned to:</p>
                  {alert.assignee === "Unassigned" ? (
                    <button className="text-primary text-xs hover:underline">Assign</button>
                  ) : (
                    <p className="text-xs text-white">{alert.assignee}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-white">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resolved Alerts */}
      {activeTab === "resolved" && (
        <div className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900/50 border-b border-gray-800">
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Alert ID</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Title</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Severity</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Resolved By</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Resolution Time</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "ALT-1000", title: "API Endpoint Down", severity: "Critical", resolvedBy: "John Smith", time: "10 minutes ago", duration: "24m" },
                  { id: "ALT-999", title: "High Memory Usage", severity: "Warning", resolvedBy: "System", time: "1 hour ago", duration: "45m" },
                  { id: "ALT-998", title: "SSL Certificate Expiring", severity: "Warning", resolvedBy: "Sarah Lee", time: "3 hours ago", duration: "2h" },
                  { id: "ALT-997", title: "Payment Gateway Timeout", severity: "Critical", resolvedBy: "Michael Chen", time: "5 hours ago", duration: "18m" },
                  { id: "ALT-996", title: "Unusual Traffic Pattern", severity: "Info", resolvedBy: "System", time: "Yesterday", duration: "1h" },
                  { id: "ALT-995", title: "Database Backup Failed", severity: "Warning", resolvedBy: "John Smith", time: "Yesterday", duration: "30m" },
                  { id: "ALT-994", title: "CDN Cache Issues", severity: "Info", resolvedBy: "System", time: "2 days ago", duration: "1h 15m" },
                ].map((alert, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/30">
                    <td className="px-4 py-3 text-gray-400 font-mono text-sm">
                      {alert.id}
                    </td>
                    <td className="px-4 py-3 text-white">
                      {alert.title}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        alert.severity === "Critical" ? "bg-red-500/20 text-red-500" : 
                        alert.severity === "Warning" ? "bg-yellow-500/20 text-yellow-500" : 
                        "bg-blue-500/20 text-blue-500"
                      }`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white">
                      {alert.resolvedBy}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-gray-400">{alert.time}</span>
                        <span className="text-xs text-gray-500">Duration: {alert.duration}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="p-1.5 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-800 flex justify-between items-center">
            <p className="text-sm text-gray-400">Showing 7 of 124 resolved alerts</p>
            <div className="flex space-x-1">
              <button className="px-3 py-1 bg-gray-800 text-white rounded-md text-sm">Previous</button>
              <button className="px-3 py-1 bg-primary text-black rounded-md text-sm">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Rules */}
      {activeTab === "rules" && (
        <div className="space-y-4">
          {[
            { name: "High CPU Usage", description: "Alert when CPU usage exceeds 80% for 5 minutes", severity: "Critical", target: "All Servers", status: "Active" },
            { name: "Low Disk Space", description: "Alert when free disk space falls below 10%", severity: "Warning", target: "All Servers", status: "Active" },
            { name: "Database Connection Errors", description: "Alert when database connection failures exceed 5 in 1 minute", severity: "Critical", target: "Database Servers", status: "Active" },
            { name: "API Response Time", description: "Alert when API response time exceeds 500ms for 10 consecutive requests", severity: "Warning", target: "API Servers", status: "Active" },
            { name: "Failed Login Attempts", description: "Alert when 5+ failed login attempts occur from same IP within 10 minutes", severity: "Warning", target: "Authentication Service", status: "Active" },
            { name: "Payment Gateway Errors", description: "Alert on any payment gateway error", severity: "Critical", target: "Payment Service", status: "Paused" },
          ].map((rule, index) => (
            <div key={index} className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${
                    rule.severity === "Critical" ? "bg-red-500/20" : 
                    rule.severity === "Warning" ? "bg-yellow-500/20" : 
                    "bg-blue-500/20"
                  } mr-3`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      rule.severity === "Critical" ? "text-red-500" : 
                      rule.severity === "Warning" ? "text-yellow-500" : 
                      "text-blue-500"
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{rule.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{rule.description}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  rule.status === "Active" ? "bg-green-500/20 text-green-500" : "bg-gray-500/20 text-gray-500"
                }`}>
                  {rule.status}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="bg-gray-900 rounded-lg p-2">
                  <p className="text-xs text-gray-500 mb-1">Severity</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    rule.severity === "Critical" ? "bg-red-500/20 text-red-500" : 
                    rule.severity === "Warning" ? "bg-yellow-500/20 text-yellow-500" : 
                    "bg-blue-500/20 text-blue-500"
                  }`}>
                    {rule.severity}
                  </span>
                </div>
                <div className="bg-gray-900 rounded-lg p-2">
                  <p className="text-xs text-gray-500 mb-1">Target</p>
                  <p className="text-sm text-white">{rule.target}</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-800">
                <div className="flex items-center">
                  <p className="text-xs text-gray-500 mr-2">Notifications:</p>
                  <p className="text-xs text-white">Email, Slack, Dashboard</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1.5 text-gray-400 hover:text-white">
                    {rule.status === "Active" ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-white">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === "settings" && (
        <div className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md">
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-lg font-bold text-white mb-1">Notification Settings</h3>
            <p className="text-sm text-gray-400">Configure how and when alert notifications are sent</p>
          </div>
          <div className="p-4 space-y-4">
            <h4 className="text-white font-medium mb-2">Notification Channels</h4>
            {[
              { name: "Email Notifications", description: "Send alert notifications via email", enabled: true },
              { name: "Slack Integration", description: "Send alerts to Slack channels", enabled: true },
              { name: "SMS Alerts", description: "Send critical alerts via SMS", enabled: false },
              { name: "Push Notifications", description: "Send alerts to mobile devices", enabled: true },
              { name: "Webhook Integration", description: "Send alerts to external systems via webhooks", enabled: false },
            ].map((channel, index) => (
              <div key={index} className="flex justify-between items-center p-3 border border-gray-800 rounded-lg">
                <div>
                  <p className="text-white font-medium">{channel.name}</p>
                  <p className="text-xs text-gray-400">{channel.description}</p>
                </div>
                <div className="relative inline-block w-10 h-6 rounded-full bg-gray-700">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    defaultChecked={channel.enabled}
                  />
                  <span className={`block w-4 h-4 rounded-full ${channel.enabled ? 'bg-primary translate-x-5' : 'bg-gray-400 translate-x-1'} transform transition-transform duration-200 ease-in-out absolute top-1`}></span>
                </div>
              </div>
            ))}
            
            <h4 className="text-white font-medium mt-6 mb-2">Notification Rules</h4>
            {[
              { name: "Critical Alerts", description: "Notify all channels immediately", enabled: true },
              { name: "Warning Alerts", description: "Notify email and dashboard only", enabled: true },
              { name: "Info Alerts", description: "Show on dashboard only", enabled: true },
              { name: "After Hours", description: "Only send critical alerts outside business hours", enabled: false },
              { name: "Batched Notifications", description: "Group similar alerts into a single notification", enabled: true },
            ].map((rule, index) => (
              <div key={index} className="flex justify-between items-center p-3 border border-gray-800 rounded-lg">
                <div>
                  <p className="text-white font-medium">{rule.name}</p>
                  <p className="text-xs text-gray-400">{rule.description}</p>
                </div>
                <div className="relative inline-block w-10 h-6 rounded-full bg-gray-700">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    defaultChecked={rule.enabled}
                  />
                  <span className={`block w-4 h-4 rounded-full ${rule.enabled ? 'bg-primary translate-x-5' : 'bg-gray-400 translate-x-1'} transform transition-transform duration-200 ease-in-out absolute top-1`}></span>
                </div>
              </div>
            ))}
            
            <h4 className="text-white font-medium mt-6 mb-2">Recipients</h4>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <div className="flex flex-wrap gap-2 mb-3">
                {["admin@example.com", "operations@example.com", "security@example.com"].map((email, index) => (
                  <div key={index} className="bg-gray-800 rounded-full px-3 py-1 flex items-center">
                    <span className="text-white text-sm">{email}</span>
                    <button className="ml-2 text-gray-400 hover:text-white">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Add recipient email..."
                  className="flex-grow bg-gray-800 border border-gray-700 rounded-l-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="bg-primary text-black rounded-r-lg px-3 py-2">
                  Add
                </button>
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
        </div>
      )}
    </div>
  );
}