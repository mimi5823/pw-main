"use client";

import { useState, useEffect } from "react";
import { 
  Search, Filter, MoreHorizontal, ChevronDown, ChevronUp, 
  Edit, Trash2, Eye, Download, UserPlus, RefreshCw, 
  CheckCircle, XCircle, AlertCircle, Wallet
} from "lucide-react";
import Link from "next/link";

// Mock user data - in a real app, this would come from your API
const mockUsers = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john.doe@example.com", 
    status: "active", 
    enrolledCourses: 3, 
    completedCourses: 2, 
    lastActive: "2 hours ago",
    walletAddress: "0x1a2b3c4d5e6f7g8h9i0j",
    xp: 1250,
    badges: 5
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    email: "jane.smith@example.com", 
    status: "active", 
    enrolledCourses: 5, 
    completedCourses: 4, 
    lastActive: "1 day ago",
    walletAddress: "0x2b3c4d5e6f7g8h9i0j1k",
    xp: 3420,
    badges: 8
  },
  { 
    id: 3, 
    name: "Robert Johnson", 
    email: "robert.j@example.com", 
    status: "inactive", 
    enrolledCourses: 2, 
    completedCourses: 0, 
    lastActive: "2 weeks ago",
    walletAddress: "0x3c4d5e6f7g8h9i0j1k2l",
    xp: 320,
    badges: 1
  },
  { 
    id: 4, 
    name: "Emily Davis", 
    email: "emily.d@example.com", 
    status: "active", 
    enrolledCourses: 4, 
    completedCourses: 3, 
    lastActive: "3 hours ago",
    walletAddress: "0x4d5e6f7g8h9i0j1k2l3m",
    xp: 2150,
    badges: 6
  },
  { 
    id: 5, 
    name: "Michael Wilson", 
    email: "michael.w@example.com", 
    status: "pending", 
    enrolledCourses: 1, 
    completedCourses: 0, 
    lastActive: "Just now",
    walletAddress: "0x5e6f7g8h9i0j1k2l3m4n",
    xp: 50,
    badges: 0
  },
  { 
    id: 6, 
    name: "Sarah Brown", 
    email: "sarah.b@example.com", 
    status: "active", 
    enrolledCourses: 6, 
    completedCourses: 6, 
    lastActive: "5 hours ago",
    walletAddress: "0x6f7g8h9i0j1k2l3m4n5o",
    xp: 4800,
    badges: 12
  },
  { 
    id: 7, 
    name: "David Miller", 
    email: "david.m@example.com", 
    status: "inactive", 
    enrolledCourses: 2, 
    completedCourses: 1, 
    lastActive: "1 month ago",
    walletAddress: "0x7g8h9i0j1k2l3m4n5o6p",
    xp: 750,
    badges: 2
  },
  { 
    id: 8, 
    name: "Lisa Taylor", 
    email: "lisa.t@example.com", 
    status: "active", 
    enrolledCourses: 4, 
    completedCourses: 2, 
    lastActive: "1 day ago",
    walletAddress: "0x8h9i0j1k2l3m4n5o6p7q",
    xp: 1680,
    badges: 4
  }
];

export default function UserManagement() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<typeof mockUsers>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading data from API
    const timer = setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Filter users based on search term and status filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.walletAddress.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus ? user.status === filterStatus : true;
    
    return matchesSearch && matchesStatus;
  });

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue: string | number | boolean = a[sortField as keyof typeof a] as string | number | boolean;
    let bValue: string | number | boolean = b[sortField as keyof typeof b] as string | number | boolean;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const StatusBadge = ({ status }: { status: string }) => {
    let bgColor = '';
    let textColor = '';
    let icon = null;
    
    switch (status) {
      case 'active':
        bgColor = 'bg-green-500/20';
        textColor = 'text-green-500';
        icon = <CheckCircle className="w-3 h-3 mr-1" />;
        break;
      case 'inactive':
        bgColor = 'bg-red-500/20';
        textColor = 'text-red-500';
        icon = <XCircle className="w-3 h-3 mr-1" />;
        break;
      case 'pending':
        bgColor = 'bg-yellow-500/20';
        textColor = 'text-yellow-500';
        icon = <AlertCircle className="w-3 h-3 mr-1" />;
        break;
      default:
        bgColor = 'bg-gray-500/20';
        textColor = 'text-gray-500';
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
          <p className="text-gray-400 animate-pulse">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">User Management</h1>
        <p className="text-gray-400">Manage and monitor all users in your digital university.</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg w-full sm:w-64 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <div className="relative">
            <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white flex items-center space-x-1">
              <Filter className="w-4 h-4 mr-1" />
              <span>Status</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 hidden">
              <div className="p-2">
                <button className="w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-md">All</button>
                <button className="w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-md">Active</button>
                <button className="w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-md">Inactive</button>
                <button className="w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-md">Pending</button>
              </div>
            </div>
          </div>
          
          <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white flex items-center">
            <RefreshCw className="w-4 h-4 mr-1" />
            <span>Refresh</span>
          </button>
          
          <button className="px-3 py-2 bg-primary text-black rounded-lg font-medium flex items-center">
            <UserPlus className="w-4 h-4 mr-1" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Selected Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 flex flex-wrap gap-2 items-center">
          <span className="text-white">{selectedUsers.length} users selected</span>
          <div className="flex-grow"></div>
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm flex items-center">
            <Edit className="w-3.5 h-3.5 mr-1" />
            <span>Edit</span>
          </button>
          <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm flex items-center">
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            <span>Delete</span>
          </button>
          <button className="px-3 py-1.5 bg-gray-700 text-white rounded-lg text-sm flex items-center">
            <Download className="w-3.5 h-3.5 mr-1" />
            <span>Export</span>
          </button>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-700">
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 text-primary focus:ring-primary"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center text-gray-400 hover:text-white"
                    onClick={() => handleSort('name')}
                  >
                    <span>Name</span>
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? 
                      <ChevronUp className="w-4 h-4 ml-1" /> : 
                      <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center text-gray-400 hover:text-white"
                    onClick={() => handleSort('email')}
                  >
                    <span>Email</span>
                    {sortField === 'email' && (
                      sortDirection === 'asc' ? 
                      <ChevronUp className="w-4 h-4 ml-1" /> : 
                      <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center text-gray-400 hover:text-white"
                    onClick={() => handleSort('status')}
                  >
                    <span>Status</span>
                    {sortField === 'status' && (
                      sortDirection === 'asc' ? 
                      <ChevronUp className="w-4 h-4 ml-1" /> : 
                      <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center text-gray-400 hover:text-white"
                    onClick={() => handleSort('enrolledCourses')}
                  >
                    <span>Courses</span>
                    {sortField === 'enrolledCourses' && (
                      sortDirection === 'asc' ? 
                      <ChevronUp className="w-4 h-4 ml-1" /> : 
                      <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center text-gray-400 hover:text-white"
                    onClick={() => handleSort('xp')}
                  >
                    <span>XP</span>
                    {sortField === 'xp' && (
                      sortDirection === 'asc' ? 
                      <ChevronUp className="w-4 h-4 ml-1" /> : 
                      <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-gray-400">Wallet</span>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center text-gray-400 hover:text-white"
                    onClick={() => handleSort('lastActive')}
                  >
                    <span>Last Active</span>
                    {sortField === 'lastActive' && (
                      sortDirection === 'asc' ? 
                      <ChevronUp className="w-4 h-4 ml-1" /> : 
                      <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <span className="text-gray-400">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 text-primary focus:ring-primary"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium mr-2">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{user.email}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-gray-300">
                      {user.completedCourses}/{user.enrolledCourses}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-primary font-medium">{user.xp.toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-gray-400">
                      <Wallet className="w-3.5 h-3.5 mr-1.5" />
                      <span className="text-xs">{user.walletAddress.substring(0, 6)}...{user.walletAddress.substring(user.walletAddress.length - 4)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{user.lastActive}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-1">
                      <button className="p-1.5 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 bg-gray-700/50 text-gray-400 rounded-lg hover:bg-gray-700">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-4 py-3 bg-gray-800/30 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between">
          <div className="text-gray-400 text-sm mb-2 sm:mb-0">
            Showing <span className="text-white">1</span> to <span className="text-white">{sortedUsers.length}</span> of <span className="text-white">{users.length}</span> users
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1.5 bg-gray-800 text-gray-400 rounded-lg disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-primary text-black rounded-lg font-medium">
              1
            </button>
            <button className="px-3 py-1.5 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700">
              2
            </button>
            <button className="px-3 py-1.5 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700">
              3
            </button>
            <button className="px-3 py-1.5 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}