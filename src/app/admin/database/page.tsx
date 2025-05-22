"use client";

import { useState, useEffect } from "react";
import { 
  Database, Server, HardDrive, RefreshCw, Search, 
  Download, Upload, Play, Pause, AlertTriangle, 
  CheckCircle, XCircle, Clock, ArrowUpRight, 
  BarChart3, Shield, Lock, Key, Table, FileJson
} from "lucide-react";
import Link from "next/link";

// Mock database tables
const mockTables = [
  { 
    name: "users", 
    records: 1248, 
    size: "42.6 MB", 
    lastBackup: "2 hours ago",
    status: "healthy",
    type: "User Data"
  },
  { 
    name: "courses", 
    records: 42, 
    size: "18.3 MB", 
    lastBackup: "2 hours ago",
    status: "healthy",
    type: "Course Content"
  },
  { 
    name: "lessons", 
    records: 864, 
    size: "124.5 MB", 
    lastBackup: "2 hours ago",
    status: "healthy",
    type: "Course Content"
  },
  { 
    name: "enrollments", 
    records: 3256, 
    size: "8.7 MB", 
    lastBackup: "2 hours ago",
    status: "healthy",
    type: "User Data"
  },
  { 
    name: "progress", 
    records: 15782, 
    size: "32.1 MB", 
    lastBackup: "2 hours ago",
    status: "warning",
    type: "User Data"
  },
  { 
    name: "quiz_attempts", 
    records: 8945, 
    size: "28.4 MB", 
    lastBackup: "2 hours ago",
    status: "healthy",
    type: "Assessment"
  },
  { 
    name: "badges", 
    records: 24, 
    size: "5.2 MB", 
    lastBackup: "2 hours ago",
    status: "healthy",
    type: "Rewards"
  },
  { 
    name: "user_badges", 
    records: 4562, 
    size: "9.8 MB", 
    lastBackup: "2 hours ago",
    status: "healthy",
    type: "Rewards"
  },
  { 
    name: "wallet_transactions", 
    records: 7845, 
    size: "18.9 MB", 
    lastBackup: "2 hours ago",
    status: "error",
    type: "Blockchain"
  }
];

// Mock queries
const mockQueries = [
  { id: 1, name: "Active Users Last 30 Days", type: "SELECT", lastRun: "1 hour ago" },
  { id: 2, name: "Course Completion Rates", type: "SELECT", lastRun: "3 hours ago" },
  { id: 3, name: "Badge Distribution", type: "SELECT", lastRun: "1 day ago" },
  { id: 4, name: "User Engagement Metrics", type: "SELECT", lastRun: "2 days ago" },
  { id: 5, name: "Content Performance", type: "SELECT", lastRun: "1 week ago" }
];

export default function DatabaseManagement() {
  const [loading, setLoading] = useState(true);
  const [tables, setTables] = useState<typeof mockTables>([]);
  const [queries, setQueries] = useState<typeof mockQueries>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dbStatus, setDbStatus] = useState({
    status: "online",
    uptime: "24 days, 5 hours",
    connections: 12,
    cpu: 24,
    memory: 38,
    storage: 42
  });

  useEffect(() => {
    // Simulate loading data from API
    const timer = setTimeout(() => {
      setTables(mockTables);
      setQueries(mockQueries);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter tables based on search term
  const filteredTables = tables.filter(table => 
    table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    table.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatusIndicator = ({ status }: { status: string }) => {
    let bgColor = '';
    let textColor = '';
    let icon = null;
    
    switch (status) {
      case 'healthy':
        bgColor = 'bg-green-500/20';
        textColor = 'text-green-500';
        icon = <CheckCircle className="w-3 h-3 mr-1" />;
        break;
      case 'warning':
        bgColor = 'bg-yellow-500/20';
        textColor = 'text-yellow-500';
        icon = <AlertTriangle className="w-3 h-3 mr-1" />;
        break;
      case 'error':
        bgColor = 'bg-red-500/20';
        textColor = 'text-red-500';
        icon = <XCircle className="w-3 h-3 mr-1" />;
        break;
      default:
        bgColor = 'bg-gray-500/20';
        textColor = 'text-gray-500';
        icon = <Clock className="w-3 h-3 mr-1" />;
    }
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-solid rounded-full border-t-transparent animate-spin mb-4"></div>
          <p className="text-gray-400 animate-pulse">Loading database information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Database Management</h1>
        <p className="text-gray-400">Monitor and manage your university's database systems.</p>
      </div>

      {/* Database Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-black rounded-xl shadow-lg hover:shadow-primary/5 transition-all duration-300 p-5 border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Database className="w-5 h-5 mr-2 text-primary" />
              Database Status
            </h2>
            <button className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center mb-6">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              dbStatus.status === 'online' ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span className={`font-medium ${
              dbStatus.status === 'online' ? 'text-green-500' : 'text-red-500'
            }`}>
              {dbStatus.status.toUpperCase()}
            </span>
            <span className="text-gray-400 mx-2">•</span>
            <span className="text-gray-400">Uptime: {dbStatus.uptime}</span>
            <span className="text-gray-400 mx-2">•</span>
            <span className="text-gray-400">Active connections: {dbStatus.connections}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">CPU Usage</span>
                <span className={`text-xs font-medium ${
                  dbStatus.cpu > 80 ? 'text-red-500' : 
                  dbStatus.cpu > 60 ? 'text-yellow-500' : 
                  'text-green-500'
                }`}>{dbStatus.cpu}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    dbStatus.cpu > 80 ? 'bg-red-500' : 
                    dbStatus.cpu > 60 ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }`}
                  style={{ width: `${dbStatus.cpu}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Memory Usage</span>
                <span className={`text-xs font-medium ${
                  dbStatus.memory > 80 ? 'text-red-500' : 
                  dbStatus.memory > 60 ? 'text-yellow-500' : 
                  'text-green-500'
                }`}>{dbStatus.memory}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    dbStatus.memory > 80 ? 'bg-red-500' : 
                    dbStatus.memory > 60 ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }`}
                  style={{ width: `${dbStatus.memory}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Storage Usage</span>
                <span className={`text-xs font-medium ${
                  dbStatus.storage > 80 ? 'text-red-500' : 
                  dbStatus.storage > 60 ? 'text-yellow-500' : 
                  'text-green-500'
                }`}>{dbStatus.storage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    dbStatus.storage > 80 ? 'bg-red-500' : 
                    dbStatus.storage > 60 ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }`}
                  style={{ width: `${dbStatus.storage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-black rounded-xl shadow-lg hover:shadow-primary/5 transition-all duration-300 p-5 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-500" />
            Security Status
          </h2>
          
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-400 font-medium">Encryption Active</p>
                <p className="text-gray-400 text-sm">All data is encrypted at rest</p>
              </div>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-400 font-medium">Backups Current</p>
                <p className="text-gray-400 text-sm">Last backup: 2 hours ago</p>
              </div>
            </div>
            
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-400 font-medium">Access Review Needed</p>
                <p className="text-gray-400 text-sm">Last review: 31 days ago</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center">
              <Lock className="w-4 h-4 mr-2" />
              Security Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Database Tables */}
      <div className="bg-black rounded-xl shadow-lg hover:shadow-primary/5 transition-all duration-300 border border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Table className="w-5 h-5 mr-2 text-primary" />
            Database Tables
          </h2>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tables..."
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg w-full sm:w-64 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:text-white">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-700">
                <th className="px-4 py-3 text-left text-gray-400">Table Name</th>
                <th className="px-4 py-3 text-left text-gray-400">Type</th>
                <th className="px-4 py-3 text-left text-gray-400">Records</th>
                <th className="px-4 py-3 text-left text-gray-400">Size</th>
                <th className="px-4 py-3 text-left text-gray-400">Last Backup</th>
                <th className="px-4 py-3 text-left text-gray-400">Status</th>
                <th className="px-4 py-3 text-left text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTables.map((table) => (
                <tr key={table.name} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <FileJson className="w-4 h-4 text-primary mr-2" />
                      <span className="text-white font-medium">{table.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{table.type}</td>
                  <td className="px-4 py-3 text-gray-300">{table.records.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-300">{table.size}</td>
                  <td className="px-4 py-3 text-gray-400">{table.lastBackup}</td>
                  <td className="px-4 py-3">
                    <StatusIndicator status={table.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-1">
                      <button className="p-1.5 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20" title="Query">
                        <Search className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20" title="Backup">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20" title="Optimize">
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

      {/* Database Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black rounded-xl shadow-lg hover:shadow-primary/5 transition-all duration-300 p-5 border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center">
            <Key className="w-5 h-5 mr-2 text-yellow-500" />
            Query Builder
          </h3>
          <p className="text-gray-400 mb-4">Build and execute custom SQL queries against your database.</p>
          <Link href="/admin/database/query" className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium inline-flex items-center">
            Open Query Builder <ArrowUpRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="bg-black rounded-xl shadow-lg hover:shadow-primary/5 transition-all duration-300 p-5 border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center">
            <HardDrive className="w-5 h-5 mr-2 text-blue-500" />
            Backup & Restore
          </h3>
          <p className="text-gray-400 mb-4">Create backups or restore your database from previous backups.</p>
          <div className="flex space-x-2">
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg font-medium inline-flex items-center">
              <Download className="w-4 h-4 mr-1" />
              Backup
            </button>
            <button className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg font-medium inline-flex items-center">
              <Upload className="w-4 h-4 mr-1" />
              Restore
            </button>
          </div>
        </div>
        
        <div className="bg-black rounded-xl shadow-lg hover:shadow-primary/5 transition-all duration-300 p-5 border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center">
            <Server className="w-5 h-5 mr-2 text-red-500" />
            Database Controls
          </h3>
          <p className="text-gray-400 mb-4">Manage database server operations and maintenance.</p>
          <div className="flex space-x-2">
            <button className="px-3 py-2 bg-red-600 text-white rounded-lg font-medium inline-flex items-center">
              <Pause className="w-4 h-4 mr-1" />
              Pause
            </button>
            <button className="px-3 py-2 bg-green-600 text-white rounded-lg font-medium inline-flex items-center">
              <Play className="w-4 h-4 mr-1" />
              Resume
            </button>
          </div>
        </div>
      </div>

      {/* Saved Queries */}
      <div className="bg-black rounded-xl shadow-lg hover:shadow-primary/5 transition-all duration-300 p-5 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <FileJson className="w-5 h-5 mr-2 text-primary" />
          Saved Queries
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-4 py-3 text-left text-gray-400">Name</th>
                <th className="px-4 py-3 text-left text-gray-400">Type</th>
                <th className="px-4 py-3 text-left text-gray-400">Last Run</th>
                <th className="px-4 py-3 text-left text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((query) => (
                <tr key={query.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="px-4 py-3 text-white">{query.name}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-500">
                      {query.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{query.lastRun}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-1">
                      <button className="px-2 py-1 bg-primary text-black rounded-lg text-xs font-medium">
                        Run
                      </button>
                      <button className="px-2 py-1 bg-gray-800 text-gray-300 rounded-lg text-xs font-medium">
                        Edit
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
  );
}