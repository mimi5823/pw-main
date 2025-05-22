"use client";

import { useState, useEffect } from "react";
import { Award, Search, Plus, Filter, RefreshCw, Star, Trophy, Medal, Gift, Crown, Users, UserPlus, Check, ChevronDown, X, Sparkles, Zap, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

export default function RewardsAndBadges() {
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("badges");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [issuingBadge, setIssuingBadge] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);
  const [showUserSelector, setShowUserSelector] = useState(false);
  const [issuingSuccess, setIssuingSuccess] = useState(false);

  // Mock user data
  const users = [
    { id: "u1", name: "Alex Johnson", email: "alex@example.com", avatar: "https://i.pravatar.cc/150?img=1", role: "Student" },
    { id: "u2", name: "Jamie Smith", email: "jamie@example.com", avatar: "https://i.pravatar.cc/150?img=2", role: "Student" },
    { id: "u3", name: "Taylor Wilson", email: "taylor@example.com", avatar: "https://i.pravatar.cc/150?img=3", role: "Student" },
    { id: "u4", name: "Morgan Lee", email: "morgan@example.com", avatar: "https://i.pravatar.cc/150?img=4", role: "Student" },
    { id: "u5", name: "Casey Brown", email: "casey@example.com", avatar: "https://i.pravatar.cc/150?img=5", role: "Student" },
    { id: "u6", name: "Jordan Davis", email: "jordan@example.com", avatar: "https://i.pravatar.cc/150?img=6", role: "Student" },
    { id: "u7", name: "Riley Garcia", email: "riley@example.com", avatar: "https://i.pravatar.cc/150?img=7", role: "Student" },
    { id: "u8", name: "Quinn Martinez", email: "quinn@example.com", avatar: "https://i.pravatar.cc/150?img=8", role: "Student" },
  ];

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Badge data
  const badges = [
    { id: 1, name: "Course Master", description: "Complete all modules in a course", icon: <Trophy />, color: "from-primary to-blue-600", difficulty: 3 },
    { id: 2, name: "Knowledge Seeker", description: "Complete 5 different courses", icon: <Medal />, color: "from-purple-500 to-indigo-600", difficulty: 4 },
    { id: 3, name: "Blockchain Pioneer", description: "Submit a verified project", icon: <Award />, color: "from-green-500 to-emerald-600", difficulty: 3 },
    { id: 4, name: "Web3 Champion", description: "Achieve 95% or higher on all assessments", icon: <Crown />, color: "from-yellow-500 to-amber-600", difficulty: 5 },
    { id: 5, name: "Coding Wizard", description: "Complete 10 coding challenges", icon: <Sparkles />, color: "from-blue-500 to-cyan-600", difficulty: 4 },
    { id: 6, name: "Fast Learner", description: "Complete a course in record time", icon: <Zap />, color: "from-red-500 to-rose-600", difficulty: 2 },
    { id: 7, name: "Dedicated Scholar", description: "Log in for 30 consecutive days", icon: <BookOpen />, color: "from-teal-500 to-green-600", difficulty: 3 },
    { id: 8, name: "Community Leader", description: "Help 5 other students in forums", icon: <Users />, color: "from-orange-500 to-amber-600", difficulty: 4 },
  ];

  // Toggle user selection
  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Handle badge issuance
  const handleIssueBadge = () => {
    setIssuingBadge(true);
    // Simulate API call
    setTimeout(() => {
      setIssuingBadge(false);
      setIssuingSuccess(true);
      // Reset after showing success message
      setTimeout(() => {
        setIssuingSuccess(false);
        setSelectedUsers([]);
        setSelectedBadge(null);
        setShowUserSelector(false);
      }, 2000);
    }, 1500);
  };

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
          <p className="text-gray-400 animate-pulse">Loading rewards data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Rewards & Badges</h1>
        <p className="text-gray-400">Manage achievement rewards and badges for your learning platform.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-black rounded-xl p-4 border border-gray-800 shadow-md hover:border-blue-500/30 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Total Badges</h3>
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Award className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">24</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-black rounded-xl p-4 border border-gray-800 shadow-md hover:border-primary/30 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Badges Awarded</h3>
            <div className="p-2 rounded-lg bg-primary/10">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">1,248</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-black rounded-xl p-4 border border-gray-800 shadow-md hover:border-green-500/30 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Achievement Rate</h3>
            <div className="p-2 rounded-lg bg-green-500/10">
              <Star className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">68%</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-black rounded-xl p-4 border border-gray-800 shadow-md hover:border-purple-500/30 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Reward Types</h3>
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Gift className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">8</p>
        </motion.div>
      </div>

      {/* Tabs for different sections */}
      <Tabs value={selectedTab} className="w-full" onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="issue">Issue Rewards</TabsTrigger>
          <TabsTrigger value="history">Award History</TabsTrigger>
        </TabsList>

        {/* Badges Tab Content */}
        <TabsContent value="badges" className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search badges..."
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg w-full sm:w-64 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white flex items-center space-x-1 hover:bg-gray-700 transition-colors">
                <Filter className="w-4 h-4 mr-1" />
                <span>Filter</span>
              </button>
              
              <button className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white flex items-center hover:bg-gray-700 transition-colors">
                <RefreshCw className="w-4 h-4 mr-1" />
                <span>Refresh</span>
              </button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <button className="px-3 py-2 bg-primary text-black rounded-lg font-medium flex items-center hover:bg-primary/90 transition-colors">
                    <Plus className="w-4 h-4 mr-1" />
                    <span>New Badge</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
                  <DialogHeader>
                    <DialogTitle className="text-xl text-white">Create New Badge</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Design a new achievement badge for your platform.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="badge-name" className="text-right text-white">
                        Name
                      </Label>
                      <Input
                        id="badge-name"
                        placeholder="Enter badge name"
                        className="col-span-3 bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="badge-description" className="text-right text-white">
                        Description
                      </Label>
                      <Textarea
                        id="badge-description"
                        placeholder="Describe how to earn this badge"
                        className="col-span-3 bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="badge-icon" className="text-right text-white">
                        Icon
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3 bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select an icon" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="trophy">Trophy</SelectItem>
                          <SelectItem value="medal">Medal</SelectItem>
                          <SelectItem value="award">Award</SelectItem>
                          <SelectItem value="crown">Crown</SelectItem>
                          <SelectItem value="star">Star</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="badge-color" className="text-right text-white">
                        Color
                      </Label>
                      <div className="col-span-3 flex gap-2">
                        {["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-yellow-500", "bg-primary"].map((color) => (
                          <div 
                            key={color} 
                            className={`w-8 h-8 rounded-full ${color} cursor-pointer hover:ring-2 hover:ring-white transition-all`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-primary text-black hover:bg-primary/90">Create Badge</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {badges.map((badge, index) => (
              <motion.div 
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="p-4 flex flex-col items-center">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <div className="w-10 h-10 text-white">
                      {badge.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{badge.name}</h3>
                  <p className="text-gray-400 text-sm text-center mb-3">{badge.description}</p>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < badge.difficulty ? "fill-current" : "text-gray-600"}`} 
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Awarded {128 - (index * 12)} times</p>
                </div>
                <div className="border-t border-gray-800 p-3 flex justify-between items-center">
                  <span className="text-xs text-gray-400">Created 2 months ago</span>
                  <div className="flex gap-2">
                    <button 
                      className="text-primary text-xs hover:underline"
                      onClick={() => {
                        setSelectedBadge(badge.id);
                        setShowUserSelector(true);
                      }}
                    >
                      Issue
                    </button>
                    <button className="text-primary text-xs hover:underline">Edit</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Issue Rewards Tab Content */}
        <TabsContent value="issue" className="space-y-6">
          <div className="bg-black rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Issue Rewards to Users</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">1. Select a Badge</h3>
                <div className="grid grid-cols-2 gap-3">
                  {badges.map((badge) => (
                    <div 
                      key={badge.id}
                      onClick={() => setSelectedBadge(badge.id)}
                      className={`p-3 rounded-lg border ${
                        selectedBadge === badge.id 
                          ? "border-primary bg-primary/10" 
                          : "border-gray-800 hover:border-gray-700"
                      } cursor-pointer transition-all`}
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center mr-3`}>
                          <div className="w-5 h-5 text-white">
                            {badge.icon}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{badge.name}</p>
                          <p className="text-xs text-gray-400 truncate">{badge.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">2. Select Users</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="h-64 overflow-y-auto border border-gray-800 rounded-lg">
                  {filteredUsers.length > 0 ? (
                    <div className="divide-y divide-gray-800">
                      {filteredUsers.map((user) => (
                        <div 
                          key={user.id}
                          className="flex items-center justify-between p-3 hover:bg-gray-900 transition-colors cursor-pointer"
                          onClick={() => toggleUserSelection(user.id)}
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{user.name}</p>
                              <p className="text-xs text-gray-400">{user.email}</p>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            selectedUsers.includes(user.id) 
                              ? "bg-primary text-black" 
                              : "bg-gray-800 text-gray-500"
                          }`}>
                            {selectedUsers.includes(user.id) && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">No users found</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                  </p>
                  <button 
                    className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
                    onClick={() => setSelectedUsers([])}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">3. Add a Message (Optional)</h3>
              <Textarea
                placeholder="Add a personalized message to accompany this badge..."
                className="w-full bg-gray-800 border-gray-700 text-white"
              />
              
              <div className="mt-6 flex justify-end">
                <Button 
                  className="bg-primary text-black hover:bg-primary/90 flex items-center"
                  disabled={!selectedBadge || selectedUsers.length === 0 || issuingBadge}
                  onClick={handleIssueBadge}
                >
                  {issuingBadge ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-solid rounded-full border-t-transparent animate-spin mr-2"></div>
                      Issuing...
                    </>
                  ) : issuingSuccess ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Issued Successfully!
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4 mr-2" />
                      Issue Badge to {selectedUsers.length} User{selectedUsers.length !== 1 ? 's' : ''}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Award History Tab Content */}
        <TabsContent value="history" className="space-y-6">
          <div className="bg-black rounded-xl border border-gray-800 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Recent Award History</h2>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Filter by badge" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="all">All Badges</SelectItem>
                    {badges.map((badge) => (
                      <SelectItem key={badge.id} value={badge.id.toString()}>{badge.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Badge</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Date Issued</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Issued By</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(8)].map((_, index) => {
                    const badge = badges[index % badges.length];
                    const user = users[index % users.length];
                    const date = new Date();
                    date.setDate(date.getDate() - index);
                    
                    return (
                      <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center mr-3`}>
                              <div className="w-4 h-4 text-white">
                                {badge.icon}
                              </div>
                            </div>
                            <span className="text-white text-sm font-medium">{badge.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-sm text-white">{user.name}</p>
                              <p className="text-xs text-gray-400">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-300">
                          {date.toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-300">Admin User</td>
                        <td className="py-3 px-4">
                          <button className="text-primary text-xs hover:underline">View Details</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <p className="text-sm text-gray-400">Showing 1-8 of 248 entries</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-md text-white hover:bg-gray-700 transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-md text-white hover:bg-gray-700 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* User Selection Dialog */}
      {showUserSelector && (
        <Dialog open={showUserSelector} onOpenChange={setShowUserSelector}>
          <DialogContent className="sm:max-w-[500px] bg-gray-900 text-white border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">
                Issue {badges.find(b => b.id === selectedBadge)?.name} Badge
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Select users to receive this badge.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="h-64 overflow-y-auto border border-gray-800 rounded-lg mb-4">
                {filteredUsers.length > 0 ? (
                  <div className="divide-y divide-gray-800">
                    {filteredUsers.map((user) => (
                      <div 
                        key={user.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-900 transition-colors cursor-pointer"
                        onClick={() => toggleUserSelection(user.id)}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          selectedUsers.includes(user.id) 
                            ? "bg-primary text-black" 
                            : "bg-gray-800 text-gray-500"
                        }`}>
                          {selectedUsers.includes(user.id) && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No users found</p>
                  </div>
                )}
              </div>
              
              <Textarea
                placeholder="Add a personalized message to accompany this badge..."
                className="w-full bg-gray-800 border-gray-700 text-white mb-4"
              />
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowUserSelector(false)}
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button 
                className="bg-primary text-black hover:bg-primary/90 flex items-center"
                disabled={selectedUsers.length === 0 || issuingBadge}
                onClick={handleIssueBadge}
              >
                {issuingBadge ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-solid rounded-full border-t-transparent animate-spin mr-2"></div>
                    Issuing...
                  </>
                ) : issuingSuccess ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Issued Successfully!
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4 mr-2" />
                    Issue Badge to {selectedUsers.length} User{selectedUsers.length !== 1 ? 's' : ''}
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}