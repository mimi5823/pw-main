"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedLineChart, EnhancedBarChart, EnhancedPieChart, ChartSkeleton } from "@/components/charts/enhanced-charts";

export default function EnhancedAnalyticsPage() {
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
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        fill: true,
      },
      {
        label: "New Signups",
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
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
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
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
        backgroundColor: "rgba(75, 192, 192, 0.5)",
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
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
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
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
        fill: true,
      },
      {
        label: "Pages per Session",
        data: [4.2, 5.1, 5.8, 6.3],
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        tension: 0.1,
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
      <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
        <div className="flex gap-4 mb-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Start Date</label>
            <input 
              type="date" 
              className="bg-black border border-gray-700 rounded p-1 text-white text-sm"
              value={localStartDate}
              onChange={(e) => setLocalStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">End Date</label>
            <input 
              type="date" 
              className="bg-black border border-gray-700 rounded p-1 text-white text-sm"
              value={localEndDate}
              onChange={(e) => setLocalEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
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
            className="text-xs bg-primary hover:bg-primary/80 px-3 py-1 rounded transition-colors"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    );
  };

  // AI Insights Component
  const AIInsights = () => {
    const [insights, setInsights] = useState([
      {
        id: 1,
        type: 'positive',
        metric: 'User Retention',
        message: 'User retention has increased by 12% compared to last month, likely due to the new onboarding flow.',
        recommendation: 'Consider expanding the improved onboarding to all user segments.'
      },
      {
        id: 2,
        type: 'negative',
        metric: 'Course Completion',
        message: 'The "Smart Contract Development" course has seen a 5% drop in completion rates over the past 2 weeks.',
        recommendation: 'Review the course content, especially modules 3-5 where most users drop off.'
      },
      {
        id: 3,
        type: 'neutral',
        metric: 'Revenue',
        message: 'Revenue growth is stable at 18% month-over-month, in line with user growth.',
        recommendation: 'Current pricing strategy appears effective.'
      }
    ]);
    
    return (
      <Card className="bg-black text-white shadow-lg hover:shadow-primary/5 transition-all duration-300 border border-gray-800">
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
          <CardDescription className="text-gray-400">Automatically generated insights from your data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.map(insight => (
              <div 
                key={insight.id} 
                className={`p-4 rounded-lg border ${
                  insight.type === 'positive' ? 'border-green-800 bg-green-900/20' : 
                  insight.type === 'negative' ? 'border-red-800 bg-red-900/20' : 
                  'border-gray-800 bg-gray-900/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {insight.type === 'positive' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                  )}
                  {insight.type === 'negative' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                      <polyline points="17 18 23 18 23 12"></polyline>
                    </svg>
                  )}
                  {insight.type === 'neutral' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  )}
                  <h4 className="font-medium text-white">{insight.metric}</h4>
                </div>
                <p className="text-sm text-gray-300 mb-2">{insight.message}</p>
                <p className="text-xs text-gray-400">
                  <span className="font-medium">Recommendation:</span> {insight.recommendation}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
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
      <Card className="bg-black text-white shadow-lg hover:shadow-primary/5 transition-all duration-300 border border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className={`p-2 rounded-full bg-${color}-500/10`}>
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center justify-between mt-1">
            <p className={`text-xs text-${change >= 0 ? 'green' : 'red'}-500 flex items-center`}>
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
    );
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {loading ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="animate-pulse">
              <div className="h-8 w-64 bg-gray-800 rounded mb-2"></div>
              <div className="h-4 w-96 bg-gray-800 rounded"></div>
            </div>
            <div className="animate-pulse">
              <div className="h-10 w-[400px] bg-gray-800 rounded"></div>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          
          {/* AI Insights Skeleton */}
          <Card className="bg-black text-white shadow-lg hover:shadow-primary/5 transition-all duration-300 border border-gray-800">
            <CardHeader>
              <div className="animate-pulse">
                <div className="h-6 w-48 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 w-64 bg-gray-800 rounded"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse space-y-3">
                <div className="h-20 bg-gray-800/30 rounded-lg border border-gray-800"></div>
                <div className="h-20 bg-gray-800/30 rounded-lg border border-gray-800"></div>
                <div className="h-20 bg-gray-800/30 rounded-lg border border-gray-800"></div>
              </div>
            </CardContent>
          </Card>
          
          {/* Chart Skeletons - One per row */}
          <div className="grid gap-6 grid-cols-1">
            <ChartSkeleton />
          </div>
          
          <div className="grid gap-6 grid-cols-1">
            <ChartSkeleton />
          </div>
          
          <div className="grid gap-6 grid-cols-1">
            <ChartSkeleton />
          </div>
          
          <div className="grid gap-6 grid-cols-1">
            <ChartSkeleton />
          </div>
          
          <div className="grid gap-6 grid-cols-1">
            <ChartSkeleton />
          </div>
          
          {/* Platform Growth Skeleton */}
          <div className="grid gap-6 grid-cols-1">
            <Card className="bg-black text-white shadow-lg hover:shadow-primary/5 transition-all duration-300 border border-gray-800">
              <CardHeader>
                <div className="animate-pulse flex justify-between items-center">
                  <div>
                    <div className="h-6 w-40 bg-gray-800 rounded mb-2"></div>
                    <div className="h-4 w-56 bg-gray-800 rounded"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-32 bg-gray-800/30 rounded-lg border border-gray-800"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">Enhanced Analytics Dashboard</h2>
              <p className="text-gray-400 mt-1">Comprehensive overview of platform performance metrics</p>
              <p className="text-primary text-sm mt-2">
                Viewing data from {dateRange.startDate.toLocaleDateString()} to {dateRange.endDate.toLocaleDateString()}
              </p>
            </div>
            <div className="w-full md:w-[400px]">
              <DateRangePicker />
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KeyMetricCard 
              title="Total Users"
              value="2,350"
              change={12.5}
              secondaryValue="258"
              secondaryLabel="active now"
              color="blue"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              }
            />
            
            <KeyMetricCard 
              title="Active Courses"
              value="12"
              change={2}
              secondaryValue="3"
              secondaryLabel="in development"
              color="purple"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              }
            />
            
            <KeyMetricCard 
              title="Revenue"
              value="$24,780"
              change={18.2}
              secondaryValue="$820"
              secondaryLabel="today"
              color="green"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              }
            />
            
            <KeyMetricCard 
              title="Completion Rate"
              value="68.2%"
              change={5.1}
              secondaryValue="Target:"
              secondaryLabel="75%"
              color="primary"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              }
            />
          </div>

          {/* AI Insights Section */}
          <AIInsights />

          {/* Main Charts - Each in its own row for better visibility */}
          <div className="grid gap-6 grid-cols-1">
            <EnhancedLineChart data={userActivityData} />
          </div>

          <div className="grid gap-6 grid-cols-1">
            <EnhancedBarChart data={revenueData} />
          </div>

          {/* Course Engagement and Demographics - Each in its own row */}
          <div className="grid gap-6 grid-cols-1">
            <EnhancedBarChart data={courseEngagementData} />
          </div>

          <div className="grid gap-6 grid-cols-1">
            <EnhancedPieChart data={{
              ...userDemographicsData,
              datasets: [{
                ...userDemographicsData.datasets[0],
                backgroundColor: [
                  '#3b82f6', // blue
                  '#f59e0b', // amber
                  '#10b981', // emerald
                  '#8b5cf6', // violet
                  '#ec4899', // pink
                ],
              }]
            }} />
          </div>

          {/* Engagement Metrics */}
          <div className="grid gap-6 grid-cols-1">
            <EnhancedLineChart data={engagementMetricsData} />
          </div>
            
          {/* Platform Growth */}
          <div className="grid gap-6 grid-cols-1">
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
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 hover:border-blue-800 transition-colors duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-gray-400 text-sm">User Growth</h3>
                      <span className="text-xs text-green-500">+32%</span>
                    </div>
                    <p className="text-xl font-bold text-white">768</p>
                    <p className="text-xs text-gray-500 mt-1">New users this month</p>
                    <div className="h-1 w-full bg-gray-800 mt-3 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 hover:border-purple-800 transition-colors duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-gray-400 text-sm">Content Growth</h3>
                      <span className="text-xs text-green-500">+18%</span>
                    </div>
                    <p className="text-xl font-bold text-white">24</p>
                    <p className="text-xs text-gray-500 mt-1">New lessons this month</p>
                    <div className="h-1 w-full bg-gray-800 mt-3 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: '58%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 hover:border-green-800 transition-colors duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-gray-400 text-sm">Revenue Growth</h3>
                      <span className="text-xs text-green-500">+42%</span>
                    </div>
                    <p className="text-xl font-bold text-white">$8,240</p>
                    <p className="text-xs text-gray-500 mt-1">Increase from last month</p>
                    <div className="h-1 w-full bg-gray-800 mt-3 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 hover:border-primary transition-colors duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-gray-400 text-sm">Retention Rate</h3>
                      <span className="text-xs text-green-500">+8%</span>
                    </div>
                    <p className="text-xl font-bold text-white">78.5%</p>
                    <p className="text-xs text-gray-500 mt-1">30-day retention</p>
                    <div className="h-1 w-full bg-gray-800 mt-3 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '78.5%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}