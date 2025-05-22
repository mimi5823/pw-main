"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedLineChart, EnhancedBarChart, EnhancedPieChart, ChartSkeleton } from "@/components/charts/enhanced-charts";
import { motion } from "framer-motion";

// Improved EnhancedChartData interface with more flexible insight types
interface EnhancedChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    tension?: number;
    fill?: boolean;
    borderWidth?: number;
  }[];
  title?: string;
  description?: string;
  timeRanges?: string[];
  insights?: {
    text: string;
    type: 'positive' | 'negative' | 'neutral' | string;
  }[];
}

export default function AnalyticsRedesignPage() {
  const [timeframe, setTimeframe] = useState("week");
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date()
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Enhanced sample data for charts with more detailed information
  const userActivityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Active Users",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "#3b82f6", // blue
        tension: 0.3,
        fill: true,
      },
      {
        label: "New Signups",
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: "#f43f5e", // rose
        tension: 0.3,
        fill: true,
      },
    ],
    title: "User Activity",
    description: "User engagement over time",
    timeRanges: ["Last 7 days", "Last 30 days", "Last 90 days"],
    insights: [
      {
        text: "Peak activity occurs on Wednesdays and Thursdays",
        type: "neutral"
      },
      {
        text: "New signups increased by 32% on Saturday",
        type: "positive"
      }
    ]
  };

  const courseEngagementData = {
    labels: ["Blockchain Fundamentals", "Smart Contract Dev", "DeFi Principles", "Web3 Security", "NFT Creation"],
    datasets: [
      {
        label: "Completion Rate (%)",
        data: [65, 59, 80, 81, 56],
        backgroundColor: [
          "#3b82f6", // blue
          "#f59e0b", // amber
          "#10b981", // emerald
          "#8b5cf6", // violet
          "#ec4899", // pink
        ],
      },
    ],
    title: "Course Engagement",
    description: "Completion rates by course",
    insights: [
      {
        text: "Web3 Security has the highest completion rate at 81%",
        type: "positive"
      },
      {
        text: "NFT Creation shows the lowest engagement, consider content review",
        type: "negative"
      }
    ]
  };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: "#10b981", // emerald
      },
    ],
    title: "Revenue",
    description: "Monthly revenue breakdown",
    timeRanges: ["Last 6 months", "Last 12 months", "YTD"],
    insights: [
      {
        text: "Revenue has grown consistently month-over-month",
        type: "positive"
      },
      {
        text: "June shows the highest revenue at $30,000",
        type: "positive"
      }
    ]
  };

  const userDemographicsData = {
    labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
    datasets: [
      {
        label: "User Demographics",
        data: [15, 35, 25, 15, 10],
        backgroundColor: [
          "#3b82f6", // blue
          "#f59e0b", // amber
          "#10b981", // emerald
          "#8b5cf6", // violet
          "#ec4899", // pink
        ],
        borderWidth: 1,
      },
    ],
    title: "User Demographics",
    description: "Age distribution of users",
    insights: [
      {
        text: "25-34 age group represents the largest user segment (35%)",
        type: "neutral"
      },
      {
        text: "35-44 age group shows highest course completion rates",
        type: "positive"
      },
      {
        text: "18-24 age group growing fastest month-over-month",
        type: "positive"
      }
    ]
  };
  
  // Additional data for enhanced analytics
  const engagementMetricsData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Avg. Session Duration (min)",
        data: [12, 15, 18, 22],
        borderColor: "#10b981", // emerald
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Pages per Session",
        data: [4.2, 5.1, 5.8, 6.3],
        borderColor: "#8b5cf6", // violet
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
    title: "Engagement Metrics",
    description: "User session data and interaction metrics",
    insights: [
      {
        text: "Average session duration increased by 83% over the month",
        type: "positive"
      },
      {
        text: "Pages per session shows steady growth, indicating improved content engagement",
        type: "positive"
      }
    ]
  };

  // Date Range Picker Component
  const DateRangePicker = () => {
    const [localStartDate, setLocalStartDate] = useState(dateRange.startDate.toISOString().split('T')[0]);
    const [localEndDate, setLocalEndDate] = useState(dateRange.endDate.toISOString().split('T')[0]);
    
    const handleApply = () => {
      setDateRange({
        startDate: new Date(localStartDate),
        endDate: new Date(localEndDate)
      });
    };
    
    return (
      <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800 shadow-md">
        <div className="flex flex-col sm:flex-row gap-4 mb-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Start Date</label>
            <input 
              type="date" 
              className="bg-black border border-gray-700 rounded p-1 text-white text-sm w-full"
              value={localStartDate}
              onChange={(e) => setLocalStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">End Date</label>
            <input 
              type="date" 
              className="bg-black border border-gray-700 rounded p-1 text-white text-sm w-full"
              value={localEndDate}
              onChange={(e) => setLocalEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="flex gap-2 flex-wrap">
            <button 
              className="text-xs bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded transition-colors"
              onClick={() => {
                const newStartDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                setLocalStartDate(newStartDate.toISOString().split('T')[0]);
                setLocalEndDate(new Date().toISOString().split('T')[0]);
              }}
            >
              Last 7 Days
            </button>
            <button 
              className="text-xs bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded transition-colors"
              onClick={() => {
                const newStartDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                setLocalStartDate(newStartDate.toISOString().split('T')[0]);
                setLocalEndDate(new Date().toISOString().split('T')[0]);
              }}
            >
              Last 30 Days
            </button>
          </div>
          <button 
            className="text-xs bg-primary hover:bg-primary/80 px-3 py-1 rounded transition-colors mt-2 sm:mt-0"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    );
  };

  // Key Metrics Card Component
  const KeyMetricCard = ({ 
    title, 
    value, 
    change, 
    secondaryValue, 
    secondaryLabel, 
    icon, 
    color 
  }: { 
    title: string;
    value: string;
    change: number;
    secondaryValue: string;
    secondaryLabel: string;
    icon: React.ReactNode;
    color: string;
  }) => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        className="w-full"
      >
        <Card className="bg-black text-white shadow-lg hover:shadow-primary/5 transition-all duration-300 border border-gray-800 h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className={`p-2 rounded-full bg-${color}-500/10`}>
              {icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <div className="flex items-center justify-between mt-1">
              <p className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <polyline points={change >= 0 ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                </svg>
                {change >= 0 ? '+' : ''}{change}% from last month
              </p>
              <p className="text-xs text-gray-500">{secondaryValue} {secondaryLabel}</p>
            </div>
            {/* Mini sparkline chart */}
            <div className="h-1 w-full bg-gray-800 mt-3 rounded-full overflow-hidden">
              <div className={`bg-${color}-500 h-full rounded-full`} style={{ width: `${Math.min(Math.abs(change) * 2, 100)}%` }}></div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  // Platform Growth Card Component
  const PlatformGrowthCard = () => {
    return (
      <Card className="bg-black text-white shadow-lg hover:shadow-primary/5 transition-all duration-300 border border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Platform Growth</CardTitle>
              <CardDescription className="text-gray-400">Key growth metrics and trends</CardDescription>
            </div>
            <button className="text-xs text-primary hover:underline">Export Data</button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 hover:border-blue-800 transition-colors duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-400 text-sm">User Growth</h3>
                <span className="text-xs text-green-500">+32%</span>
              </div>
              <p className="text-xl font-bold text-white">768</p>
              <p className="text-xs text-gray-500 mt-1">New users this month</p>
              <div className="h-1 w-full bg-gray-800 mt-3 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '72%' }}></div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 hover:border-purple-800 transition-colors duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-400 text-sm">Content Growth</h3>
                <span className="text-xs text-green-500">+18%</span>
              </div>
              <p className="text-xl font-bold text-white">24</p>
              <p className="text-xs text-gray-500 mt-1">New lessons this month</p>
              <div className="h-1 w-full bg-gray-800 mt-3 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: '58%' }}></div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 hover:border-green-800 transition-colors duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-400 text-sm">Revenue Growth</h3>
                <span className="text-xs text-green-500">+42%</span>
              </div>
              <p className="text-xl font-bold text-white">$8,240</p>
              <p className="text-xs text-gray-500 mt-1">Increase from last month</p>
              <div className="h-1 w-full bg-gray-800 mt-3 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: '82%' }}></div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 hover:border-primary transition-colors duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-400 text-sm">Retention Rate</h3>
                <span className="text-xs text-green-500">+8%</span>
              </div>
              <p className="text-xl font-bold text-white">78.5%</p>
              <p className="text-xs text-gray-500 mt-1">30-day retention</p>
              <div className="h-1 w-full bg-gray-800 mt-3 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '78.5%' }}></div>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="flex-1 space-y-8 p-6 md:p-8 pt-6 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-gray-800 rounded mb-2"></div>
            <div className="h-4 w-96 bg-gray-800 rounded"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-10 w-full md:w-[400px] bg-gray-800 rounded"></div>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="bg-black text-white shadow-lg hover:shadow-primary/5 transition-all duration-300 border border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="h-4 w-24 bg-gray-800 rounded animate-pulse"></div>
                <div className="p-2 rounded-full bg-gray-800 animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-20 bg-gray-800 rounded animate-pulse mb-2"></div>
                <div className="flex items-center justify-between mt-1">
                  <div className="h-3 w-32 bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-3 w-20 bg-gray-800 rounded animate-pulse"></div>
                </div>
                <div className="h-1 w-full bg-gray-800 mt-3 rounded-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Chart Skeletons */}
        <div className="grid gap-8 grid-cols-1">
          <ChartSkeleton />
          <ChartSkeleton />
          <ChartSkeleton />
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 p-6 md:p-8 pt-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white">Analytics Dashboard</h2>
          <p className="text-gray-400 mt-1">Comprehensive overview of platform performance metrics</p>
          <p className="text-primary text-sm mt-2">
            Viewing data from {dateRange.startDate.toLocaleDateString()} to {dateRange.endDate.toLocaleDateString()}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full md:w-[400px]"
        >
          <DateRangePicker />
        </motion.div>
      </div>

      {/* Time Period Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        <Tabs
          value={timeframe}
          onValueChange={setTimeframe}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-4 bg-gray-900 p-1">
            <TabsTrigger 
              value="day" 
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
            >
              Day
            </TabsTrigger>
            <TabsTrigger 
              value="week" 
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
            >
              Week
            </TabsTrigger>
            <TabsTrigger 
              value="month" 
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
            >
              Month
            </TabsTrigger>
            <TabsTrigger 
              value="year" 
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
            >
              Year
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Key Metrics Cards */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <KeyMetricCard
          title="Total Users"
          value="2,350"
          change={12.5}
          secondaryValue="258"
          secondaryLabel="active now"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          }
          color="blue"
        />
        
        <KeyMetricCard
          title="Active Courses"
          value="12"
          change={20}
          secondaryValue="3"
          secondaryLabel="in development"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          }
          color="purple"
        />
        
        <KeyMetricCard
          title="Revenue"
          value="$24,780"
          change={18.2}
          secondaryValue="$820"
          secondaryLabel="today"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          }
          color="green"
        />
        
        <KeyMetricCard
          title="Completion Rate"
          value="68.2%"
          change={5.1}
          secondaryValue="Target:"
          secondaryLabel="75%"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          }
          color="primary"
        />
      </motion.div>

      {/* Main Charts - Each in its own row for better visibility */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid gap-8 grid-cols-1"
      >
        <EnhancedLineChart data={userActivityData} />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid gap-8 grid-cols-1"
      >
        <EnhancedBarChart data={revenueData} />
      </motion.div>

      {/* Course Engagement and Demographics - Each in its own row */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid gap-8 grid-cols-1"
      >
        <EnhancedBarChart data={courseEngagementData} />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid gap-8 grid-cols-1"
      >
        <EnhancedPieChart data={userDemographicsData} />
      </motion.div>

      {/* Engagement Metrics */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="grid gap-8 grid-cols-1"
      >
        <EnhancedLineChart data={engagementMetricsData} />
      </motion.div>
        
      {/* Platform Growth */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="grid gap-8 grid-cols-1"
      >
        <PlatformGrowthCard />
      </motion.div>
    </div>
  );
}