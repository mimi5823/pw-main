"use client";

import { useState, useEffect } from "react";
import { 
  Search, Filter, MoreHorizontal, ChevronDown, ChevronUp, 
  Edit, Trash2, Eye, Download, Plus, RefreshCw, 
  CheckCircle, XCircle, Clock, FileText, Video, 
  BookOpen, Users, BarChart3, Calendar, ArrowUpRight
} from "lucide-react";
import Link from "next/link";

// Mock course data - in a real app, this would come from your API
const mockCourses = [
  { 
    id: 1, 
    title: "Blockchain Fundamentals", 
    description: "Introduction to blockchain technology and its applications",
    status: "published", 
    modules: 8, 
    lessons: 24, 
    students: 156, 
    completionRate: 68,
    lastUpdated: "2 days ago",
    instructor: "Dr. Alex Johnson",
    category: "Blockchain"
  },
  { 
    id: 2, 
    title: "Smart Contract Development", 
    description: "Learn to build and deploy smart contracts on Ethereum",
    status: "published", 
    modules: 6, 
    lessons: 18, 
    students: 124, 
    completionRate: 72,
    lastUpdated: "1 week ago",
    instructor: "Sarah Williams",
    category: "Development"
  },
  { 
    id: 3, 
    title: "DeFi Principles", 
    description: "Understanding decentralized finance protocols and applications",
    status: "draft", 
    modules: 5, 
    lessons: 15, 
    students: 0, 
    completionRate: 0,
    lastUpdated: "Just now",
    instructor: "Michael Chen",
    category: "Finance"
  },
  { 
    id: 4, 
    title: "Web3 Development", 
    description: "Building decentralized applications with modern web technologies",
    status: "published", 
    modules: 10, 
    lessons: 32, 
    students: 98, 
    completionRate: 45,
    lastUpdated: "3 days ago",
    instructor: "Emma Rodriguez",
    category: "Development"
  },
  { 
    id: 5, 
    title: "Tokenomics", 
    description: "The economics of tokens and cryptocurrency systems",
    status: "published", 
    modules: 7, 
    lessons: 21, 
    students: 112, 
    completionRate: 58,
    lastUpdated: "5 days ago",
    instructor: "Dr. Robert Kim",
    category: "Economics"
  },
  { 
    id: 6, 
    title: "NFT Creation and Marketing", 
    description: "Create, mint, and market non-fungible tokens",
    status: "scheduled", 
    modules: 6, 
    lessons: 18, 
    students: 0, 
    completionRate: 0,
    lastUpdated: "1 day ago",
    instructor: "Jessica Taylor",
    category: "Art & Marketing"
  }
];

export default function CourseManagement() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<typeof mockCourses>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading data from API
    const timer = setTimeout(() => {
      setCourses(mockCourses);
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
    if (selectedCourses.length === filteredCourses.length) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(filteredCourses.map(course => course.id));
    }
  };

  const handleSelectCourse = (courseId: number) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  // Filter courses based on search term and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus ? course.status === filterStatus : true;
    const matchesCategory = filterCategory ? course.category === filterCategory : true;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue: string | number = a[sortField as keyof typeof a] as string | number;
    let bValue: string | number = b[sortField as keyof typeof b] as string | number;
    
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
      case 'published':
        bgColor = 'bg-green-500/20';
        textColor = 'text-green-500';
        icon = <CheckCircle className="w-3 h-3 mr-1" />;
        break;
      case 'draft':
        bgColor = 'bg-yellow-500/20';
        textColor = 'text-yellow-500';
        icon = <FileText className="w-3 h-3 mr-1" />;
        break;
      case 'scheduled':
        bgColor = 'bg-blue-500/20';
        textColor = 'text-blue-500';
        icon = <Calendar className="w-3 h-3 mr-1" />;
        break;
      case 'archived':
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

  // Get all unique categories
  const categories = [...new Set(courses.map(course => course.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-solid rounded-full border-t-transparent animate-spin mb-4"></div>
          <p className="text-gray-400 animate-pulse">Loading course data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Course Management</h1>
        <p className="text-gray-400">Create, edit, and manage all courses in your digital university.</p>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black rounded-xl shadow-lg hover:shadow-primary/5 transition-all duration-300 p-4 border border-gray-800">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Total Courses</h3>
            <div className="p-2 rounded-lg bg-blue-500/10">
              <BookOpen className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{courses.length}</p>
        </div>
        
        <div className="bg-black rounded-xl shadow-lg hover:shadow-primary/5 transition-all duration-300 p-4 border border-gray-800">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Total Students</h3>
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">
            {courses.reduce((sum, course) => sum + course.students, 0)}
          </p>
        </div>
        
        <div className="bg-black rounded-xl shadow-lg hover:shadow-primary/5 transition-all duration-300 p-4 border border-gray-800">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Avg. Completion</h3>
            <div className="p-2 rounded-lg bg-green-500/10">
              <BarChart3 className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">
            {Math.round(
              courses
                .filter(course => course.status === 'published')
                .reduce((sum, course) => sum + course.completionRate, 0) / 
              courses.filter(course => course.status === 'published').length
            )}%
          </p>
        </div>
        
        <div className="bg-black rounded-xl shadow-lg hover:shadow-primary/5 transition-all duration-300 p-4 border border-gray-800">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Total Content</h3>
            <div className="p-2 rounded-lg bg-purple-500/10">
              <FileText className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">
            {courses.reduce((sum, course) => sum + course.lessons, 0)} lessons
          </p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search courses..."
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
                <button className="w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-md">Published</button>
                <button className="w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-md">Draft</button>
                <button className="w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-md">Scheduled</button>
              </div>
            </div>
          </div>
          
          <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white flex items-center">
            <RefreshCw className="w-4 h-4 mr-1" />
            <span>Refresh</span>
          </button>
          
          <button className="px-3 py-2 bg-primary text-black rounded-lg font-medium flex items-center">
            <Plus className="w-4 h-4 mr-1" />
            <span>New Course</span>
          </button>
        </div>
      </div>

      {/* Selected Actions */}
      {selectedCourses.length > 0 && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 flex flex-wrap gap-2 items-center">
          <span className="text-white">{selectedCourses.length} courses selected</span>
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

      {/* Courses Table */}
      <div className="bg-black rounded-xl shadow-lg hover:shadow-primary/5 transition-all duration-300 border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-700">
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 text-primary focus:ring-primary"
                      checked={selectedCourses.length === filteredCourses.length && filteredCourses.length > 0}
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center text-gray-400 hover:text-white"
                    onClick={() => handleSort('title')}
                  >
                    <span>Course</span>
                    {sortField === 'title' && (
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
                    onClick={() => handleSort('category')}
                  >
                    <span>Category</span>
                    {sortField === 'category' && (
                      sortDirection === 'asc' ? 
                      <ChevronUp className="w-4 h-4 ml-1" /> : 
                      <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center text-gray-400 hover:text-white"
                    onClick={() => handleSort('modules')}
                  >
                    <span>Content</span>
                    {sortField === 'modules' && (
                      sortDirection === 'asc' ? 
                      <ChevronUp className="w-4 h-4 ml-1" /> : 
                      <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center text-gray-400 hover:text-white"
                    onClick={() => handleSort('students')}
                  >
                    <span>Students</span>
                    {sortField === 'students' && (
                      sortDirection === 'asc' ? 
                      <ChevronUp className="w-4 h-4 ml-1" /> : 
                      <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center text-gray-400 hover:text-white"
                    onClick={() => handleSort('completionRate')}
                  >
                    <span>Completion</span>
                    {sortField === 'completionRate' && (
                      sortDirection === 'asc' ? 
                      <ChevronUp className="w-4 h-4 ml-1" /> : 
                      <ChevronDown className="w-4 h-4 ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button 
                    className="flex items-center text-gray-400 hover:text-white"
                    onClick={() => handleSort('lastUpdated')}
                  >
                    <span>Updated</span>
                    {sortField === 'lastUpdated' && (
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
              {sortedCourses.map((course) => (
                <tr key={course.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 text-primary focus:ring-primary"
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => handleSelectCourse(course.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-white font-medium">{course.title}</p>
                      <p className="text-gray-400 text-sm truncate max-w-xs">{course.description}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={course.status} />
                  </td>
                  <td className="px-4 py-3 text-gray-300">{course.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-400">
                        <FileText className="w-3.5 h-3.5 mr-1" />
                        <span>{course.modules}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Video className="w-3.5 h-3.5 mr-1" />
                        <span>{course.lessons}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{course.students}</td>
                  <td className="px-4 py-3">
                    {course.status === 'published' ? (
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${course.completionRate}%` }}
                        ></div>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{course.lastUpdated}</td>
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
            Showing <span className="text-white">1</span> to <span className="text-white">{sortedCourses.length}</span> of <span className="text-white">{courses.length}</span> courses
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1.5 bg-gray-800 text-gray-400 rounded-lg disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-primary text-black rounded-lg font-medium">
              1
            </button>
            <button className="px-3 py-1.5 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black rounded-xl shadow-lg hover:shadow-primary/5 transition-all duration-300 p-5 border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-3">Course Editor</h3>
          <p className="text-gray-400 mb-4">Create and edit course content with our powerful editor.</p>
          <Link href="/admin/courses/editor" className="px-4 py-2 bg-primary text-black rounded-lg font-medium inline-flex items-center">
            Open Editor <ArrowUpRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="bg-black rounded-xl shadow-lg hover:shadow-primary/5 transition-all duration-300 p-5 border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-3">Content Library</h3>
          <p className="text-gray-400 mb-4">Manage all your media assets, documents, and resources.</p>
          <Link href="/admin/content" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium inline-flex items-center">
            Browse Library <ArrowUpRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="bg-black rounded-xl shadow-lg hover:shadow-primary/5 transition-all duration-300 p-5 border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-3">Course Analytics</h3>
          <p className="text-gray-400 mb-4">View detailed analytics and insights for all your courses.</p>
          <Link href="/admin/analytics" className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium inline-flex items-center">
            View Analytics <ArrowUpRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}