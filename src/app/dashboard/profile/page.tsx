"use client";

import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { 
  User, 
  Award, 
  BookOpen, 
  Clock, 
  BarChart3, 
  Trophy, 
  CheckCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Zap,
  Target,
  Flame,
  Star,
  Sparkles
} from "lucide-react";
import Link from "next/link";

// Mock data for user metrics
const userMetrics = {
  totalXP: 2450,
  xpThisWeek: 320,
  xpGrowth: 18,
  streak: 12,
  longestStreak: 21,
  coursesEnrolled: 5,
  coursesCompleted: 2,
  modulesCompleted: 28,
  quizzesCompleted: 14,
  quizAvgScore: 87,
  totalLearningTime: 64, // hours
  learningTimeThisWeek: 8.5, // hours
  learningTimeGrowth: 12,
  achievements: [
    { id: 1, name: "Fast Learner", description: "Complete 5 modules in a single day", icon: <Zap className="w-5 h-5" />, date: "2025-05-15" },
    { id: 2, name: "Streak Master", description: "Maintain a 10-day learning streak", icon: <Flame className="w-5 h-5" />, date: "2025-05-10" },
    { id: 3, name: "Quiz Whiz", description: "Score 90%+ on 5 consecutive quizzes", icon: <Star className="w-5 h-5" />, date: "2025-05-05" },
    { id: 4, name: "Early Adopter", description: "Join during platform beta phase", icon: <Sparkles className="w-5 h-5" />, date: "2025-04-20" },
  ],
  skills: [
    { name: "Blockchain Fundamentals", level: 85 },
    { name: "Smart Contracts", level: 72 },
    { name: "DeFi Principles", level: 64 },
    { name: "Crypto Economics", level: 58 },
    { name: "Web3 Development", level: 45 },
  ],
  recentActivity: [
    { type: "course_progress", course: "Blockchain Fundamentals", module: "Consensus Mechanisms", date: "2025-05-21" },
    { type: "quiz_completed", course: "Smart Contract Security", score: 92, date: "2025-05-20" },
    { type: "achievement", name: "Fast Learner", date: "2025-05-15" },
    { type: "course_completed", course: "Crypto Basics", date: "2025-05-12" },
    { type: "streak_milestone", days: 10, date: "2025-05-10" },
  ]
};

export default function ProfilePage() {
  const { user, ready } = usePrivy();
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  
  useEffect(() => {
    if (ready) {
      // Simulate loading user data
      const timer = setTimeout(() => {
        setLoading(false);
        // Set display name from email if available
        if (user?.email) {
          // Convert to string safely
          const emailStr = String(user.email);
          if (emailStr.includes('@')) {
            const nameFromEmail = emailStr.split('@')[0];
            setDisplayName(nameFromEmail);
          }
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [ready, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-12 h-12 border-4 border-primary border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-800 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">User Dashboard</h1>
          <p className="text-gray-400 mt-2">
            Track your learning progress and achievements
          </p>
        </div>
        <Link
          href="/dashboard/profile/analytics"
          className="px-4 py-2 rounded-lg font-medium transition-colors bg-primary text-black hover:bg-primary/90"
        >
          Detailed Analytics
        </Link>
      </div>

      {/* User Overview Card */}
      <div className="bg-black rounded-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-primary/90 flex items-center justify-center text-black font-bold text-3xl flex-shrink-0">
            {displayName ? displayName[0].toUpperCase() : "U"}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">
              {displayName || "User"}
            </h2>
            
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
              Level {Math.floor(userMetrics.totalXP / 500) + 1} Learner
            </div>
            
            <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center text-gray-300 text-sm">
                <Trophy className="w-4 h-4 mr-1 text-primary" />
                {userMetrics.totalXP} XP Total
              </div>
              
              <div className="flex items-center text-gray-300 text-sm">
                <Flame className="w-4 h-4 mr-1 text-primary" />
                {userMetrics.streak} Day Streak
              </div>
              
              <div className="flex items-center text-gray-300 text-sm">
                <BookOpen className="w-4 h-4 mr-1 text-primary" />
                {userMetrics.coursesCompleted}/{userMetrics.coursesEnrolled} Courses
              </div>
              
              <div className="flex items-center text-gray-300 text-sm">
                <Clock className="w-4 h-4 mr-1 text-primary" />
                {userMetrics.totalLearningTime}h Learning Time
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black rounded-xl p-5 border border-gray-800 hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-400 text-sm font-medium">XP This Week</div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="flex items-baseline">
            <div className="text-2xl font-bold text-white">{userMetrics.xpThisWeek}</div>
            <div className="ml-2 text-xs px-1.5 py-0.5 rounded-md bg-green-500/10 text-green-500 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              {userMetrics.xpGrowth}%
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">+{userMetrics.xpThisWeek} XP this week</div>
        </div>

        <div className="bg-black rounded-xl p-5 border border-gray-800 hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-400 text-sm font-medium">Learning Streak</div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Flame className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="flex items-baseline">
            <div className="text-2xl font-bold text-white">{userMetrics.streak} days</div>
            <div className="ml-2 text-xs px-1.5 py-0.5 rounded-md bg-green-500/10 text-green-500 flex items-center">
              <Target className="w-3 h-3 mr-0.5" />
              {userMetrics.longestStreak}
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">Longest streak: {userMetrics.longestStreak} days</div>
        </div>

        <div className="bg-black rounded-xl p-5 border border-gray-800 hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-400 text-sm font-medium">Quiz Performance</div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="flex items-baseline">
            <div className="text-2xl font-bold text-white">{userMetrics.quizAvgScore}%</div>
            <div className="ml-2 text-xs px-1.5 py-0.5 rounded-md bg-green-500/10 text-green-500 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              5%
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">{userMetrics.quizzesCompleted} quizzes completed</div>
        </div>

        <div className="bg-black rounded-xl p-5 border border-gray-800 hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-400 text-sm font-medium">Learning Time</div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="flex items-baseline">
            <div className="text-2xl font-bold text-white">{userMetrics.learningTimeThisWeek}h</div>
            <div className="ml-2 text-xs px-1.5 py-0.5 rounded-md bg-green-500/10 text-green-500 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              {userMetrics.learningTimeGrowth}%
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">{userMetrics.totalLearningTime}h total learning time</div>
        </div>
      </div>

      {/* Skills Progress */}
      <div className="bg-black rounded-xl p-6 border border-gray-800 hover:border-primary/30 transition-all duration-300">
        <div className="flex items-center mb-6">
          <BarChart3 className="w-5 h-5 text-primary mr-2" />
          <h3 className="text-lg font-bold text-white">Skills Progress</h3>
        </div>
        
        <div className="space-y-4">
          {userMetrics.skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">{skill.name}</span>
                <span className="text-primary font-medium">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-black rounded-xl p-6 border border-gray-800 hover:border-primary/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Award className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-lg font-bold text-white">Recent Achievements</h3>
          </div>
          <Link href="/dashboard/rewards" className="text-primary text-sm hover:underline">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {userMetrics.achievements.map((achievement) => (
            <div key={achievement.id} className="bg-black border border-gray-800 rounded-lg p-4 hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3 mx-auto">
                {achievement.icon}
              </div>
              <h4 className="text-white font-medium text-center mb-1">{achievement.name}</h4>
              <p className="text-gray-400 text-xs text-center mb-2">{achievement.description}</p>
              <p className="text-gray-500 text-xs text-center">Earned on {new Date(achievement.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-black rounded-xl p-6 border border-gray-800 hover:border-primary/30 transition-all duration-300">
        <div className="flex items-center mb-6">
          <Calendar className="w-5 h-5 text-primary mr-2" />
          <h3 className="text-lg font-bold text-white">Recent Activity</h3>
        </div>
        
        <div className="space-y-4">
          {userMetrics.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start border-b border-gray-800 pb-4 last:border-0 last:pb-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                {activity.type === 'course_progress' && <BookOpen className="w-4 h-4 text-primary" />}
                {activity.type === 'quiz_completed' && <CheckCircle className="w-4 h-4 text-primary" />}
                {activity.type === 'achievement' && <Award className="w-4 h-4 text-primary" />}
                {activity.type === 'course_completed' && <Trophy className="w-4 h-4 text-primary" />}
                {activity.type === 'streak_milestone' && <Flame className="w-4 h-4 text-primary" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    {activity.type === 'course_progress' && (
                      <p className="text-white font-medium">Continued learning {activity.course}</p>
                    )}
                    {activity.type === 'quiz_completed' && (
                      <p className="text-white font-medium">Completed quiz in {activity.course}</p>
                    )}
                    {activity.type === 'achievement' && (
                      <p className="text-white font-medium">Earned achievement: {activity.name}</p>
                    )}
                    {activity.type === 'course_completed' && (
                      <p className="text-white font-medium">Completed course: {activity.course}</p>
                    )}
                    {activity.type === 'streak_milestone' && (
                      <p className="text-white font-medium">Reached {activity.days}-day learning streak</p>
                    )}
                  </div>
                  <span className="text-gray-500 text-xs">{new Date(activity.date).toLocaleDateString()}</span>
                </div>
                <div className="mt-1">
                  {activity.type === 'course_progress' && (
                    <p className="text-gray-400 text-sm">Module: {activity.module}</p>
                  )}
                  {activity.type === 'quiz_completed' && (
                    <p className="text-gray-400 text-sm">Score: {activity.score}%</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}