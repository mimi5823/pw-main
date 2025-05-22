"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Search, Plus, Filter, RefreshCw, Mail, Send, Bell, Users, Clock, Settings } from "lucide-react";

export default function Communications() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("messages");

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
          <p className="text-gray-400 animate-pulse">Loading communications data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Communications</h1>
        <p className="text-gray-400">Manage all platform communications, announcements, and notifications.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Total Messages</h3>
            <div className="p-2 rounded-lg bg-blue-500/10">
              <MessageSquare className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">1,248</p>
        </div>
        
        <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Announcements</h3>
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">24</p>
        </div>
        
        <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Open Rate</h3>
            <div className="p-2 rounded-lg bg-green-500/10">
              <Mail className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">76%</p>
        </div>
        
        <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Active Chats</h3>
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Users className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">42</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <div className="flex space-x-1 overflow-x-auto">
          <button 
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "messages" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <MessageSquare className="w-4 h-4 inline mr-1" />
            Messages
          </button>
          <button 
            onClick={() => setActiveTab("announcements")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "announcements" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Bell className="w-4 h-4 inline mr-1" />
            Announcements
          </button>
          <button 
            onClick={() => setActiveTab("email")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "email" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Mail className="w-4 h-4 inline mr-1" />
            Email Templates
          </button>
          <button 
            onClick={() => setActiveTab("notifications")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "notifications" 
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
            placeholder="Search communications..."
            className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg w-full sm:w-64 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white flex items-center space-x-1">
            <Filter className="w-4 h-4 mr-1" />
            <span>Filter</span>
          </button>
          
          <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white flex items-center">
            <RefreshCw className="w-4 h-4 mr-1" />
            <span>Refresh</span>
          </button>
          
          <button className="px-3 py-2 bg-primary text-black rounded-lg font-medium flex items-center">
            <Plus className="w-4 h-4 mr-1" />
            <span>New Message</span>
          </button>
        </div>
      </div>

      {/* Messages List */}
      {activeTab === "messages" && (
        <div className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900/50 border-b border-gray-800">
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">From</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Subject</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Date</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-xs mr-2">
                          {index % 2 === 0 ? "JS" : "KL"}
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {index % 2 === 0 ? "John Smith" : "Karen Lee"}
                          </p>
                          <p className="text-xs text-gray-400">
                            {index % 2 === 0 ? "student" : "instructor"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-white">
                        {index % 3 === 0 && "Question about course materials"}
                        {index % 3 === 1 && "Technical issue with video playback"}
                        {index % 3 === 2 && "Request for additional resources"}
                      </p>
                      <p className="text-xs text-gray-400 truncate max-w-xs">
                        {index % 3 === 0 && "I'm having trouble understanding the concept in module 3..."}
                        {index % 3 === 1 && "The video in lesson 2 keeps freezing at the 5-minute mark..."}
                        {index % 3 === 2 && "Are there any additional practice exercises available for..."}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        index % 3 === 0 ? "bg-yellow-500/20 text-yellow-500" : 
                        index % 3 === 1 ? "bg-green-500/20 text-green-500" : 
                        "bg-blue-500/20 text-blue-500"
                      }`}>
                        {index % 3 === 0 ? "Pending" : index % 3 === 1 ? "Resolved" : "In Progress"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm">
                      {index === 1 ? "Just now" : 
                       index === 2 ? "2 hours ago" : 
                       index === 3 ? "Yesterday" : 
                       index === 4 ? "2 days ago" : 
                       "1 week ago"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="p-1.5 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-800 flex justify-between items-center">
            <p className="text-sm text-gray-400">Showing 5 of 248 messages</p>
            <div className="flex space-x-1">
              <button className="px-3 py-1 bg-gray-800 text-white rounded-md text-sm">Previous</button>
              <button className="px-3 py-1 bg-primary text-black rounded-md text-sm">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* Announcements */}
      {activeTab === "announcements" && (
        <div className="space-y-4">
          {[1, 2, 3].map((index) => (
            <div key={index} className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {index === 1 ? "Platform Maintenance Notice" : 
                     index === 2 ? "New Course Launch: Advanced Blockchain" : 
                     "Important Update to Terms of Service"}
                  </h3>
                  <p className="text-sm text-gray-400 flex items-center mt-1">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    {index === 1 ? "Scheduled for May 25, 2025" : 
                     index === 2 ? "Posted 3 days ago" : 
                     "Posted 1 week ago"}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  index === 1 ? "bg-yellow-500/20 text-yellow-500" : 
                  index === 2 ? "bg-green-500/20 text-green-500" : 
                  "bg-blue-500/20 text-blue-500"
                }`}>
                  {index === 1 ? "Scheduled" : index === 2 ? "Active" : "Archived"}
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                {index === 1 ? "Our platform will be undergoing scheduled maintenance on May 25, 2025, from 2:00 AM to 4:00 AM UTC. During this time, the platform may be temporarily unavailable." : 
                 index === 2 ? "We're excited to announce the launch of our new Advanced Blockchain course. This comprehensive program covers the latest developments in blockchain technology and decentralized applications." : 
                 "We have updated our Terms of Service to reflect new data privacy regulations. Please review the changes at your earliest convenience."}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-300">
                  {index === 1 ? "All Users" : index === 2 ? "Students" : "Global"}
                </span>
                <span className="px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-300">
                  {index === 1 ? "System" : index === 2 ? "Courses" : "Legal"}
                </span>
                {index === 2 && (
                  <span className="px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-300">
                    Blockchain
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
                <div className="text-sm text-gray-400">
                  {index === 1 ? "Visibility: All Users" : 
                   index === 2 ? "Sent to: 248 users" : 
                   "Read by: 85% of users"}
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-gray-800 text-white rounded-lg text-sm">Edit</button>
                  {index === 1 && (
                    <button className="px-3 py-1.5 bg-primary text-black rounded-lg text-sm">Send Now</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Email Templates */}
      {activeTab === "email" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Welcome Email", "Course Completion", "Password Reset", "New Announcement", "Certificate Issued", "Payment Confirmation"].map((template, index) => (
            <div key={index} className="bg-black rounded-xl border border-gray-800 p-4 shadow-md hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-white">{template}</h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  index % 3 === 0 ? "bg-green-500/20 text-green-500" : 
                  index % 3 === 1 ? "bg-blue-500/20 text-blue-500" : 
                  "bg-purple-500/20 text-purple-500"
                }`}>
                  {index % 3 === 0 ? "Active" : index % 3 === 1 ? "System" : "Automated"}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {index % 2 === 0 
                  ? "Last edited 2 weeks ago" 
                  : "Last edited 3 days ago"}
              </p>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
                <div className="text-sm text-gray-400">
                  {index % 2 === 0 
                    ? "Open rate: 78%" 
                    : "Open rate: 92%"}
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-gray-800 text-white rounded-lg text-sm">Preview</button>
                  <button className="px-3 py-1.5 bg-primary text-black rounded-lg text-sm">Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === "notifications" && (
        <div className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md">
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-lg font-bold text-white mb-1">Notification Settings</h3>
            <p className="text-sm text-gray-400">Configure when and how notifications are sent to users</p>
          </div>
          <div className="p-4 space-y-4">
            {["Course Updates", "New Messages", "System Announcements", "Assignment Reminders", "Payment Notifications", "New Content Alerts"].map((setting, index) => (
              <div key={index} className="flex justify-between items-center p-3 border border-gray-800 rounded-lg">
                <div>
                  <p className="text-white font-medium">{setting}</p>
                  <p className="text-xs text-gray-400">
                    {index % 3 === 0 ? "Email, In-app, Push" : 
                     index % 3 === 1 ? "Email, In-app" : 
                     "In-app only"}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative inline-block w-10 h-6 rounded-full bg-gray-700">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      defaultChecked={index !== 5}
                    />
                    <span className={`block w-4 h-4 rounded-full ${index !== 5 ? 'bg-primary translate-x-5' : 'bg-gray-400 translate-x-1'} transform transition-transform duration-200 ease-in-out absolute top-1`}></span>
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}