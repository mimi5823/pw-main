"use client";

import { useState, useEffect } from "react";
import { Settings, Save, RefreshCw, Globe, Palette, Bell, Shield, Database, Mail, Users, Smartphone, Moon, Sun } from "lucide-react";

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");
  const [darkMode, setDarkMode] = useState(true);

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
          <p className="text-gray-400 animate-pulse">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Configure platform settings and preferences.</p>
      </div>

      {/* Settings Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-black rounded-xl border border-gray-800 p-4 shadow-md">
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab("general")}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                activeTab === "general" 
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white border border-transparent"
              }`}
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>General</span>
            </button>
            
            <button 
              onClick={() => setActiveTab("appearance")}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                activeTab === "appearance" 
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white border border-transparent"
              }`}
            >
              <Palette className="w-5 h-5 mr-3" />
              <span>Appearance</span>
            </button>
            
            <button 
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                activeTab === "notifications" 
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white border border-transparent"
              }`}
            >
              <Bell className="w-5 h-5 mr-3" />
              <span>Notifications</span>
            </button>
            
            <button 
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                activeTab === "security" 
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white border border-transparent"
              }`}
            >
              <Shield className="w-5 h-5 mr-3" />
              <span>Security</span>
            </button>
            
            <button 
              onClick={() => setActiveTab("database")}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                activeTab === "database" 
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white border border-transparent"
              }`}
            >
              <Database className="w-5 h-5 mr-3" />
              <span>Database</span>
            </button>
            
            <button 
              onClick={() => setActiveTab("email")}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                activeTab === "email" 
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white border border-transparent"
              }`}
            >
              <Mail className="w-5 h-5 mr-3" />
              <span>Email</span>
            </button>
            
            <button 
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                activeTab === "users" 
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white border border-transparent"
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              <span>User Settings</span>
            </button>
            
            <button 
              onClick={() => setActiveTab("mobile")}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                activeTab === "mobile" 
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white border border-transparent"
              }`}
            >
              <Smartphone className="w-5 h-5 mr-3" />
              <span>Mobile App</span>
            </button>
          </nav>
        </div>
        
        {/* Settings Content */}
        <div className="flex-1 bg-black rounded-xl border border-gray-800 p-4 shadow-md">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">General Settings</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-white font-medium">Platform Name</label>
                    <input 
                      type="text" 
                      defaultValue="Pnyx Institute"
                      className="w-full bg-black border shadow-lg border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-white font-medium">Admin Email</label>
                    <input 
                      type="email" 
                      defaultValue="thezbdiary@gmail.com"
                      className="w-full bg-black border shadow-lg border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-white font-medium">Time Zone</label>
                    <select className="w-full bg-black border shadow-lg border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option>UTC (Coordinated Universal Time)</option>
                      <option>EST (Eastern Standard Time)</option>
                      <option>PST (Pacific Standard Time)</option>
                      <option>GMT (Greenwich Mean Time)</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-white font-medium">Date Format</label>
                    <select className="w-full bg-black border shadow-lg border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-gray-800 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Maintenance Mode</p>
                      <p className="text-xs text-gray-400">Put the platform in maintenance mode</p>
                    </div>
                    <div className="relative inline-block w-10 h-6 rounded-full bg-gray-700">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        defaultChecked={false}
                      />
                      <span className="block w-4 h-4 rounded-full bg-gray-400 translate-x-1 transform transition-transform duration-200 ease-in-out absolute top-1"></span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-gray-800 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Analytics</p>
                      <p className="text-xs text-gray-400">Enable platform usage analytics</p>
                    </div>
                    <div className="relative inline-block w-10 h-6 rounded-full bg-gray-700">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        defaultChecked={true}
                      />
                      <span className="block w-4 h-4 rounded-full bg-primary translate-x-5 transform transition-transform duration-200 ease-in-out absolute top-1"></span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-800">
                <h3 className="text-lg font-bold text-white mb-3">Language & Region</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-white font-medium">Default Language</label>
                    <select className="w-full bg-black border shadow-lg border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Japanese</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-gray-800 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Auto-Detect Language</p>
                      <p className="text-xs text-gray-400">Detect user's language from browser</p>
                    </div>
                    <div className="relative inline-block w-10 h-6 rounded-full bg-gray-700">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        defaultChecked={true}
                      />
                      <span className="block w-4 h-4 rounded-full bg-primary translate-x-5 transform transition-transform duration-200 ease-in-out absolute top-1"></span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4 border-t border-gray-800">
                <button className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm mr-2">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-medium flex items-center">
                  <Save className="w-4 h-4 mr-1" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Appearance Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-gray-800 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Dark Mode</p>
                      <p className="text-xs text-gray-400">Use dark theme throughout the platform</p>
                    </div>
                    <div className="relative inline-block w-10 h-6 rounded-full bg-gray-700">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                      />
                      <span className={`block w-4 h-4 rounded-full ${darkMode ? 'bg-primary translate-x-5' : 'bg-gray-400 translate-x-1'} transform transition-transform duration-200 ease-in-out absolute top-1`}></span>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-800 rounded-lg">
                    <p className="text-white font-medium mb-3">Theme</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="border-2 border-primary rounded-lg p-2 flex flex-col items-center">
                        <div className="w-full h-12 bg-black rounded-md mb-2"></div>
                        <p className="text-white text-xs">Dark</p>
                      </div>
                      <div className="border border-gray-700 rounded-lg p-2 flex flex-col items-center">
                        <div className="w-full h-12 bg-white rounded-md mb-2"></div>
                        <p className="text-white text-xs">Light</p>
                      </div>
                      <div className="border border-gray-700 rounded-lg p-2 flex flex-col items-center">
                        <div className="w-full h-12 bg-gradient-to-r from-gray-900 to-black rounded-md mb-2"></div>
                        <p className="text-white text-xs">System</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-800 rounded-lg">
                    <p className="text-white font-medium mb-3">Accent Color</p>
                    <div className="grid grid-cols-5 gap-3">
                      <div className="border-2 border-white rounded-lg p-1 flex flex-col items-center">
                        <div className="w-full h-8 bg-blue-500 rounded-md"></div>
                      </div>
                      <div className="border border-gray-700 rounded-lg p-1 flex flex-col items-center">
                        <div className="w-full h-8 bg-purple-500 rounded-md"></div>
                      </div>
                      <div className="border border-gray-700 rounded-lg p-1 flex flex-col items-center">
                        <div className="w-full h-8 bg-green-500 rounded-md"></div>
                      </div>
                      <div className="border border-gray-700 rounded-lg p-1 flex flex-col items-center">
                        <div className="w-full h-8 bg-red-500 rounded-md"></div>
                      </div>
                      <div className="border border-gray-700 rounded-lg p-1 flex flex-col items-center">
                        <div className="w-full h-8 bg-yellow-500 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-white font-medium">Font Size</label>
                    <select className="w-full bg-black border shadow-lg border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option>Small</option>
                      <option selected>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-gray-800 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Animations</p>
                      <p className="text-xs text-gray-400">Enable UI animations and transitions</p>
                    </div>
                    <div className="relative inline-block w-10 h-6 rounded-full bg-gray-700">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        defaultChecked={true}
                      />
                      <span className="block w-4 h-4 rounded-full bg-primary translate-x-5 transform transition-transform duration-200 ease-in-out absolute top-1"></span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-800">
                <h3 className="text-lg font-bold text-white mb-3">Custom Branding</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-white font-medium">Logo</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center">
                        <img src="/phoenix-logo.svg" alt="Logo" className="w-12 h-12" />
                      </div>
                      <button className="px-3 py-1.5 bg-gray-800 text-white rounded-lg text-sm">
                        Change Logo
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-white font-medium">Favicon</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                        <img src="/phoenix-logo.svg" alt="Favicon" className="w-6 h-6" />
                      </div>
                      <button className="px-3 py-1.5 bg-gray-800 text-white rounded-lg text-sm">
                        Change Favicon
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4 border-t border-gray-800">
                <button className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm mr-2">
                  Reset to Default
                </button>
                <button className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-medium flex items-center">
                  <Save className="w-4 h-4 mr-1" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Other Settings Tabs */}
          {activeTab !== "general" && activeTab !== "appearance" && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                {activeTab === "notifications" && <Bell className="w-8 h-8 text-primary" />}
                {activeTab === "security" && <Shield className="w-8 h-8 text-primary" />}
                {activeTab === "database" && <Database className="w-8 h-8 text-primary" />}
                {activeTab === "email" && <Mail className="w-8 h-8 text-primary" />}
                {activeTab === "users" && <Users className="w-8 h-8 text-primary" />}
                {activeTab === "mobile" && <Smartphone className="w-8 h-8 text-primary" />}
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                {activeTab === "notifications" && "Notification Settings"}
                {activeTab === "security" && "Security Settings"}
                {activeTab === "database" && "Database Settings"}
                {activeTab === "email" && "Email Settings"}
                {activeTab === "users" && "User Settings"}
                {activeTab === "mobile" && "Mobile App Settings"}
              </h2>
              <p className="text-gray-400 text-center max-w-md mb-6">
                This settings section is currently under development. Check back soon for more configuration options.
              </p>
              <button className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-medium flex items-center">
                <RefreshCw className="w-4 h-4 mr-1" />
                <span>Check for Updates</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}