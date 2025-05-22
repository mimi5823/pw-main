"use client";

import { useState, useEffect } from "react";
import { FileText, Search, Plus, Filter, RefreshCw, Edit, Trash2, Eye, Download, Image, Video, File, Folder } from "lucide-react";

export default function ContentManagement() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

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
          <p className="text-gray-400 animate-pulse">Loading content data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Content Management</h1>
        <p className="text-gray-400">Manage all platform content, media, and files in one place.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Total Files</h3>
            <div className="p-2 rounded-lg bg-blue-500/10">
              <File className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">1,248</p>
        </div>
        
        <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Images</h3>
            <div className="p-2 rounded-lg bg-primary/10">
              <Image className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">624</p>
        </div>
        
        <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Videos</h3>
            <div className="p-2 rounded-lg bg-green-500/10">
              <Video className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">128</p>
        </div>
        
        <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Documents</h3>
            <div className="p-2 rounded-lg bg-purple-500/10">
              <FileText className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">496</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <div className="flex space-x-1 overflow-x-auto">
          <button 
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "all" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Folder className="w-4 h-4 inline mr-1" />
            All Files
          </button>
          <button 
            onClick={() => setActiveTab("images")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "images" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Image className="w-4 h-4 inline mr-1" />
            Images
          </button>
          <button 
            onClick={() => setActiveTab("videos")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "videos" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Video className="w-4 h-4 inline mr-1" />
            Videos
          </button>
          <button 
            onClick={() => setActiveTab("documents")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "documents" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4 inline mr-1" />
            Documents
          </button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search files..."
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
            <span>Upload</span>
          </button>
        </div>
      </div>

      {/* File Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Sample File Cards */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
          // Determine file type for this card
          let fileType = "document";
          if (activeTab === "images" || (activeTab === "all" && index % 3 === 0)) {
            fileType = "image";
          } else if (activeTab === "videos" || (activeTab === "all" && index % 3 === 1)) {
            fileType = "video";
          } else if (activeTab === "documents" || (activeTab === "all" && index % 3 === 2)) {
            fileType = "document";
          }

          // Skip if we're on a filtered tab and this isn't the right type
          if ((activeTab === "images" && fileType !== "image") ||
              (activeTab === "videos" && fileType !== "video") ||
              (activeTab === "documents" && fileType !== "document")) {
            return null;
          }

          return (
            <div key={index} className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md hover:border-primary/50 transition-colors">
              {/* Preview area */}
              <div className={`h-40 ${
                fileType === "image" 
                  ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20" 
                  : fileType === "video"
                    ? "bg-gradient-to-br from-red-500/20 to-orange-500/20"
                    : "bg-gradient-to-br from-green-500/20 to-teal-500/20"
              } flex items-center justify-center`}>
                {fileType === "image" && (
                  <Image className="w-16 h-16 text-blue-400" />
                )}
                {fileType === "video" && (
                  <Video className="w-16 h-16 text-red-400" />
                )}
                {fileType === "document" && (
                  <FileText className="w-16 h-16 text-green-400" />
                )}
              </div>
              
              {/* File info */}
              <div className="p-4">
                <h3 className="text-white font-medium truncate">
                  {fileType === "image" && `course-image-${index}.jpg`}
                  {fileType === "video" && `lecture-${index}-intro.mp4`}
                  {fileType === "document" && `module-${index}-notes.pdf`}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {fileType === "image" && "1.2 MB"}
                  {fileType === "video" && "24.8 MB"}
                  {fileType === "document" && "3.5 MB"}
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Uploaded {index === 1 ? "just now" : index === 2 ? "2 hours ago" : `${index} days ago`}
                </p>
              </div>
              
              {/* Actions */}
              <div className="border-t border-gray-800 p-3 flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  {fileType === "image" && "Used in 3 courses"}
                  {fileType === "video" && "Viewed 248 times"}
                  {fileType === "document" && "Downloaded 56 times"}
                </span>
                <div className="flex space-x-1">
                  <button className="p-1.5 text-gray-400 hover:text-white">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-white">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-white">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-gray-400">Showing 8 of 1,248 files</p>
        <div className="flex space-x-1">
          <button className="px-3 py-1.5 bg-gray-800 text-white rounded-md text-sm">Previous</button>
          <button className="px-3 py-1.5 bg-primary text-black rounded-md text-sm">Next</button>
        </div>
      </div>
    </div>
  );
}