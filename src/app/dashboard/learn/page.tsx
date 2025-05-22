"use client";

import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";

export default function LearnPage() {
  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: "Intro to Algorithmic Trading",
      description: "Learn the basics of algorithmic trading and market making",
      progress: 75,
      modules: [
        { id: 1, title: "Introduction to Markets", completed: true },
        { id: 2, title: "Market Making Fundamentals", completed: true },
        { id: 3, title: "Basic Trading Algorithms", completed: false },
        { id: 4, title: "Risk Management", completed: false },
      ],
      difficulty: "Basic",
    },
    {
      id: 2,
      title: "Market Making Strategies",
      description: "Advanced strategies for market makers",
      progress: 30,
      modules: [
        { id: 1, title: "Liquidity Provision Basics", completed: true },
        { id: 2, title: "Spread Management", completed: false },
        { id: 3, title: "Inventory Management", completed: false },
        { id: 4, title: "Advanced Order Types", completed: false },
      ],
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Directional Strategies",
      description: "Learn to build directional trading strategies",
      progress: 0,
      modules: [
        { id: 1, title: "Trend Following", completed: false },
        { id: 2, title: "Mean Reversion", completed: false },
        { id: 3, title: "Momentum Strategies", completed: false },
        { id: 4, title: "Volatility Trading", completed: false },
      ],
      difficulty: "Intermediate",
    },
    {
      id: 4,
      title: "Cross Exchange Market Making",
      description: "Advanced techniques for cross-exchange arbitrage",
      progress: 0,
      modules: [
        { id: 1, title: "Cross-Exchange Basics", completed: false },
        { id: 2, title: "Arbitrage Opportunities", completed: false },
        { id: 3, title: "Latency Management", completed: false },
        { id: 4, title: "Risk Controls", completed: false },
      ],
      difficulty: "Advanced",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white">My Journey</h1>
        <p className="text-gray-400 mt-2">
          Track your learning progress and continue where you left off
        </p>
      </div>

      {/* Continue Learning Section */}
      <div className="bg-black rounded-xl p-6 shadow-xl border border-gray-800 gradient-border-card">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="text-primary mr-2">📚</span> Continue Learning
        </h2>
        
        <div className="bg-black rounded-lg p-5 border border-gray-800 hover:border-primary/30 transition-all duration-300 card-glow-hover">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h3 className="text-white font-medium text-lg">Intro to Algorithmic Trading</h3>
              <p className="text-gray-400 mt-1 flex items-center">
                <span className="inline-block w-2 h-2 bg-primary rounded-full mr-1"></span>
                Next: Basic Trading Algorithms
              </p>
            </div>
            <Link
              href="#"
              className="mt-4 md:mt-0 py-2 px-6 bg-primary text-black rounded-lg hover:bg-primary/90 transition-colors inline-block font-medium shadow-lg shadow-primary/20"
            >
              Continue
            </Link>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm text-primary font-medium">75%</span>
            </div>
            <div className="w-full bg-black rounded-full h-2.5 border border-gray-800">
              <div
                className="bg-primary h-2.5 rounded-full shadow-inner shadow-primary/30"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* All Courses Section */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="text-primary mr-2">🎓</span> All Courses
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-black rounded-xl overflow-hidden shadow-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 card-hover card-glow-hover gradient-border-card">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-medium text-lg">{course.title}</h3>
                    <p className="text-gray-400 mt-1 text-sm">{course.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    course.difficulty === "Basic" 
                      ? "bg-green-900/30 text-green-400 border border-green-900" 
                      : course.difficulty === "Intermediate"
                      ? "bg-blue-900/30 text-blue-400 border border-blue-900"
                      : "bg-purple-900/30 text-purple-400 border border-purple-900"
                  }`}>
                    {course.difficulty}
                  </span>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm text-primary font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-black rounded-full h-2.5 border border-gray-800">
                    <div
                      className={`h-2.5 rounded-full shadow-inner ${
                        course.progress > 0 ? "bg-primary shadow-primary/30" : "bg-gray-700"
                      }`}
                      style={{ width: `${course.progress || 5}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  {course.modules.slice(0, 2).map((module) => (
                    <div key={module.id} className="flex items-center">
                      <div className={`w-5 h-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center ${
                        module.completed ? "bg-primary shadow-lg shadow-primary/20" : "bg-black border border-gray-700"
                      }`}>
                        {module.completed && (
                          <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm ${module.completed ? "text-gray-300" : "text-gray-500"}`}>
                        {module.title}
                      </span>
                    </div>
                  ))}
                  {course.modules.length > 2 && (
                    <p className="text-xs text-gray-500 pl-7">
                      +{course.modules.length - 2} more modules
                    </p>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-800 p-4 gradient-border-t">
                <Link
                  href="#"
                  className={`block text-center py-2 px-4 rounded-lg transition-colors font-medium shadow-lg ${
                    course.progress > 0 
                      ? "bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 shadow-primary/10" 
                      : "bg-black hover:bg-gray-900 text-white border border-gray-700 hover:border-primary/30"
                  }`}
                >
                  {course.progress > 0 ? "Continue Course" : "Start Course"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}