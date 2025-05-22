"use client";

import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";

export default function RewardsPage() {
  // Mock data for achievements and NFT certificates
  const achievements = [
    {
      id: 1,
      title: "First Module Completed",
      description: "Completed your first learning module",
      date: "2025-05-15",
      type: "badge",
      icon: "🏆",
    },
    {
      id: 2,
      title: "7-Day Streak",
      description: "Logged in for 7 consecutive days",
      date: "2025-05-18",
      type: "streak",
      icon: "🔥",
    },
    {
      id: 3,
      title: "First Course Completed",
      description: "Completed your first full course",
      date: "2025-05-20",
      type: "badge",
      icon: "🎓",
    },
  ];

  const nftCertificates = [
    {
      id: 1,
      title: "Intro to Algorithmic Trading",
      issueDate: "2025-05-20",
      txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      imageUrl: "/certificate-preview.png",
    },
  ];

  // User stats
  const userStats = {
    totalXP: 1250,
    streak: 7,
    coursesCompleted: 1,
    modulesCompleted: 8,
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white">My Achievements & Credentials</h1>
        <p className="text-gray-400 mt-2">
          Track your progress and showcase your on-chain credentials
        </p>
      </div>

      {/* User Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black rounded-xl p-6 shadow-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 card-glow-hover gradient-border-card">
          <h3 className="text-gray-400 text-sm mb-1 font-medium">Total XP</h3>
          <p className="text-3xl font-bold text-primary">{userStats.totalXP}</p>
        </div>
        
        <div className="bg-black rounded-xl p-6 shadow-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 card-glow-hover gradient-border-card">
          <h3 className="text-gray-400 text-sm mb-1 font-medium">Current Streak</h3>
          <p className="text-3xl font-bold text-primary">{userStats.streak} <span className="text-lg text-gray-400">days</span></p>
        </div>
        
        <div className="bg-black rounded-xl p-6 shadow-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 card-glow-hover gradient-border-card">
          <h3 className="text-gray-400 text-sm mb-1 font-medium">Courses Completed</h3>
          <p className="text-3xl font-bold text-primary">{userStats.coursesCompleted}</p>
        </div>
        
        <div className="bg-black rounded-xl p-6 shadow-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 card-glow-hover gradient-border-card">
          <h3 className="text-gray-400 text-sm mb-1 font-medium">Modules Completed</h3>
          <p className="text-3xl font-bold text-primary">{userStats.modulesCompleted}</p>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-black rounded-xl p-6 shadow-xl border border-gray-800 gradient-border-card">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="text-primary mr-2">🏆</span> Achievements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-black rounded-lg p-5 flex items-start space-x-3 border border-gray-800 hover:border-primary/30 transition-all duration-300 card-hover card-glow-hover"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/10">
                <span className="text-primary text-xl">{achievement.icon}</span>
              </div>
              <div>
                <h3 className="text-white font-medium">{achievement.title}</h3>
                <p className="text-sm text-gray-400">{achievement.description}</p>
                <p className="text-xs text-gray-500 mt-2 flex items-center">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mr-1"></span>
                  Earned on {new Date(achievement.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NFT Certificates Section */}
      <div className="bg-black rounded-xl p-6 shadow-xl border border-gray-800 gradient-border-card">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="text-primary mr-2">🔐</span> On-Chain Credentials
        </h2>
        
        {nftCertificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nftCertificates.map((cert) => (
              <div key={cert.id} className="bg-black rounded-lg overflow-hidden border border-gray-800 hover:border-primary/30 transition-all duration-300 card-hover card-glow-hover">
                <div className="p-5 border-b border-gray-800 gradient-border-b">
                  <h3 className="text-white font-medium">{cert.title} Certificate</h3>
                  <p className="text-sm text-gray-400 flex items-center mt-1">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mr-1"></span>
                    Issued on {new Date(cert.issueDate).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="p-5">
                  <div className="bg-black p-4 rounded-lg mb-4 border border-gray-800">
                    <p className="text-xs text-gray-400 mb-1">Transaction Hash:</p>
                    <p className="text-xs font-mono text-gray-300 break-all">
                      {cert.txHash}
                    </p>
                  </div>
                  
                  <div className="flex justify-between">
                    <Link
                      href={`https://etherscan.io/tx/${cert.txHash}`}
                      target="_blank"
                      className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center btn-outline py-1.5 px-3"
                    >
                      <span>View on Etherscan</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </Link>
                    
                    <button className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center btn-outline py-1.5 px-3">
                      <span>Download</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-black rounded-lg border border-gray-800 card-glow-hover">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black flex items-center justify-center shadow-lg shadow-primary/10">
              <span className="text-primary text-2xl">🎓</span>
            </div>
            <p className="text-gray-300 mb-2 font-medium">You haven't earned any on-chain credentials yet.</p>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Complete courses to earn NFT certificates that verify your skills on-chain.
            </p>
          </div>
        )}
        
        <div className="mt-6 p-5 bg-black rounded-lg border border-gray-800 card-glow-hover">
          <h3 className="text-white font-medium mb-3 flex items-center">
            <span className="text-primary mr-2">ℹ️</span> About On-Chain Credentials
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Our NFT certificates are stored on the Ethereum blockchain, providing tamper-proof verification of your achievements. 
            These credentials can be shared with potential employers or displayed in your digital wallet.
          </p>
          <p className="text-sm text-gray-400 mt-3 leading-relaxed">
            Your data privacy is our priority. Only your achievements are stored on-chain, never your personal information.
          </p>
        </div>
      </div>
    </div>
  );
}