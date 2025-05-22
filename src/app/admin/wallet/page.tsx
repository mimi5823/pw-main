"use client";

import { useState, useEffect } from "react";
import { Wallet, Search, Plus, Filter, RefreshCw, ArrowUpRight, ArrowDownLeft, BarChart3, DollarSign, Bitcoin } from "lucide-react";

export default function WalletIntegration() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

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
          <p className="text-gray-400 animate-pulse">Loading wallet data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Wallet Integration</h1>
        <p className="text-gray-400">Manage blockchain wallet integrations and cryptocurrency transactions.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Connected Wallets</h3>
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Wallet className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">248</p>
        </div>
        
        <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Total Transactions</h3>
            <div className="p-2 rounded-lg bg-primary/10">
              <ArrowUpRight className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">1,024</p>
        </div>
        
        <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Transaction Volume</h3>
            <div className="p-2 rounded-lg bg-green-500/10">
              <BarChart3 className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">$24,680</p>
        </div>
        
        <div className="bg-black rounded-xl p-4 border border-gray-800 shadow-md">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 text-sm">Active Chains</h3>
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Wallet className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">4</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <div className="flex space-x-1 overflow-x-auto">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "overview" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-1" />
            Overview
          </button>
          <button 
            onClick={() => setActiveTab("transactions")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "transactions" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <ArrowUpRight className="w-4 h-4 inline mr-1" />
            Transactions
          </button>
          <button 
            onClick={() => setActiveTab("wallets")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "wallets" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Wallet className="w-4 h-4 inline mr-1" />
            Connected Wallets
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === "settings" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <DollarSign className="w-4 h-4 inline mr-1" />
            Payment Settings
          </button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search transactions..."
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
            <span>New Transaction</span>
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      {activeTab === "transactions" && (
        <div className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900/50 border-b border-gray-800">
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Transaction ID</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Type</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Amount</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">User</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/30">
                    <td className="px-4 py-3">
                      <p className="text-white font-mono text-sm">
                        0x{Math.random().toString(16).substring(2, 10)}...{Math.random().toString(16).substring(2, 6)}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {index % 2 === 0 ? (
                          <>
                            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1.5" />
                            <span className="text-white">Payment</span>
                          </>
                        ) : (
                          <>
                            <ArrowDownLeft className="w-4 h-4 text-blue-500 mr-1.5" />
                            <span className="text-white">Deposit</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {index % 3 === 0 ? (
                          <>
                            <Bitcoin className="w-4 h-4 text-blue-400 mr-1.5" />
                            <span className="text-white">{(0.01 * index).toFixed(3)} ETH</span>
                          </>
                        ) : index % 3 === 1 ? (
                          <>
                            <Bitcoin className="w-4 h-4 text-orange-400 mr-1.5" />
                            <span className="text-white">{(0.001 * index).toFixed(4)} BTC</span>
                          </>
                        ) : (
                          <>
                            <DollarSign className="w-4 h-4 text-green-400 mr-1.5" />
                            <span className="text-white">${(50 * index).toFixed(2)}</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-xs mr-2">
                          {index % 2 === 0 ? "JS" : "KL"}
                        </div>
                        <span className="text-white">
                          {index % 2 === 0 ? "John Smith" : "Karen Lee"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        index % 4 === 0 ? "bg-yellow-500/20 text-yellow-500" : 
                        index % 4 === 1 ? "bg-green-500/20 text-green-500" : 
                        index % 4 === 2 ? "bg-blue-500/20 text-blue-500" :
                        "bg-red-500/20 text-red-500"
                      }`}>
                        {index % 4 === 0 ? "Pending" : 
                         index % 4 === 1 ? "Confirmed" : 
                         index % 4 === 2 ? "Processing" :
                         "Failed"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm">
                      {index === 1 ? "Just now" : 
                       index === 2 ? "2 hours ago" : 
                       index === 3 ? "Yesterday" : 
                       index === 4 ? "2 days ago" : 
                       "1 week ago"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-800 flex justify-between items-center">
            <p className="text-sm text-gray-400">Showing 5 of 1,024 transactions</p>
            <div className="flex space-x-1">
              <button className="px-3 py-1 bg-gray-800 text-white rounded-md text-sm">Previous</button>
              <button className="px-3 py-1 bg-primary text-black rounded-md text-sm">Next</button>
            </div>
          </div>
        </div>
      )}

      {/* Connected Wallets */}
      {activeTab === "wallets" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="bg-black rounded-xl border border-gray-800 p-4 shadow-md hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  {index % 3 === 0 && <Bitcoin className="w-6 h-6 text-blue-400 mr-2" />}
                  {index % 3 === 1 && <Bitcoin className="w-6 h-6 text-orange-400 mr-2" />}
                  {index % 3 === 2 && <Wallet className="w-6 h-6 text-purple-400 mr-2" />}
                  <h3 className="text-lg font-bold text-white">
                    {index % 3 === 0 ? "Ethereum Wallet" : 
                     index % 3 === 1 ? "Bitcoin Wallet" : 
                     "Multi-Chain Wallet"}
                  </h3>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  index % 2 === 0 ? "bg-green-500/20 text-green-500" : "bg-blue-500/20 text-blue-500"
                }`}>
                  {index % 2 === 0 ? "Active" : "Connected"}
                </span>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-3 mb-3">
                <p className="text-gray-400 text-xs mb-1">Wallet Address</p>
                <p className="text-white font-mono text-sm truncate">
                  0x{Math.random().toString(16).substring(2, 10)}...{Math.random().toString(16).substring(2, 6)}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-gray-400 text-xs mb-1">Transactions</p>
                  <p className="text-white text-lg font-bold">{index * 12 + 4}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-gray-400 text-xs mb-1">Balance</p>
                  <p className="text-white text-lg font-bold">
                    {index % 3 === 0 ? `${(0.5 * index).toFixed(2)} ETH` : 
                     index % 3 === 1 ? `${(0.01 * index).toFixed(3)} BTC` : 
                     `$${(100 * index).toFixed(2)}`}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                <p className="text-xs text-gray-400">
                  Connected {index === 1 ? "just now" : `${index} days ago`}
                </p>
                <button className="text-primary text-sm hover:underline">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Transaction Volume Chart Placeholder */}
          <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
            <h3 className="text-lg font-bold text-white mb-4">Transaction Volume</h3>
            <div className="h-64 bg-gray-900 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Transaction volume chart would appear here</p>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                  <span className="text-sm text-gray-400">Payments</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-400">Deposits</span>
                </div>
              </div>
              <div className="text-sm text-gray-400">Last 30 days</div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
            <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="flex items-start p-3 bg-gray-900 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    index % 3 === 0 ? "bg-green-500/20" : 
                    index % 3 === 1 ? "bg-blue-500/20" : 
                    "bg-yellow-500/20"
                  } mr-3`}>
                    {index % 3 === 0 && <ArrowUpRight className={`w-5 h-5 text-green-500`} />}
                    {index % 3 === 1 && <ArrowDownLeft className={`w-5 h-5 text-blue-500`} />}
                    {index % 3 === 2 && <RefreshCw className={`w-5 h-5 text-yellow-500`} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-white font-medium">
                        {index % 3 === 0 ? "Payment Processed" : 
                         index % 3 === 1 ? "Deposit Received" : 
                         "Transaction Pending"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {index === 1 ? "Just now" : 
                         index === 2 ? "2 hours ago" : 
                         index === 3 ? "Yesterday" : 
                         "2 days ago"}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {index % 3 === 0 ? `Payment of ${(0.05 * index).toFixed(2)} ETH for Course Access` : 
                       index % 3 === 1 ? `User deposited ${(0.1 * index).toFixed(2)} ETH to their account` : 
                       `Waiting for confirmation on transaction #${1000 + index}`}
                    </p>
                    <div className="flex items-center mt-2">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-xs mr-1.5">
                        {index % 2 === 0 ? "JS" : "KL"}
                      </div>
                      <span className="text-xs text-gray-500">
                        {index % 2 === 0 ? "John Smith" : "Karen Lee"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Supported Chains */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
              <div className="flex items-center mb-3">
                <Bitcoin className="w-8 h-8 text-blue-400 mr-2" />
                <h3 className="text-lg font-bold text-white">Ethereum</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">Main network for smart contracts and DApps</p>
              <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                <p className="text-xs text-gray-500">124 transactions</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                  Active
                </span>
              </div>
            </div>
            
            <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
              <div className="flex items-center mb-3">
                <Bitcoin className="w-8 h-8 text-orange-400 mr-2" />
                <h3 className="text-lg font-bold text-white">Bitcoin</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">Original cryptocurrency network</p>
              <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                <p className="text-xs text-gray-500">56 transactions</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                  Active
                </span>
              </div>
            </div>
            
            <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold mr-2">P</div>
                <h3 className="text-lg font-bold text-white">Polygon</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">Layer 2 scaling solution for Ethereum</p>
              <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                <p className="text-xs text-gray-500">78 transactions</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                  Active
                </span>
              </div>
            </div>
            
            <div className="bg-black rounded-xl border border-gray-800 p-4 shadow-md">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-2">S</div>
                <h3 className="text-lg font-bold text-white">Solana</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">High-performance blockchain</p>
              <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                <p className="text-xs text-gray-500">42 transactions</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Settings */}
      {activeTab === "settings" && (
        <div className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-md">
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-lg font-bold text-white mb-1">Payment Settings</h3>
            <p className="text-sm text-gray-400">Configure wallet integration and payment options</p>
          </div>
          <div className="p-4 space-y-4">
            {["Accept Cryptocurrency Payments", "Enable Fiat On-ramp", "Automatic Conversions", "Transaction Notifications", "Gas Fee Optimization", "Multi-signature Approvals"].map((setting, index) => (
              <div key={index} className="flex justify-between items-center p-3 border border-gray-800 rounded-lg">
                <div>
                  <p className="text-white font-medium">{setting}</p>
                  <p className="text-xs text-gray-400">
                    {index === 0 && "Allow users to pay with cryptocurrencies"}
                    {index === 1 && "Enable users to purchase crypto with fiat"}
                    {index === 2 && "Automatically convert between currencies"}
                    {index === 3 && "Send notifications for all transactions"}
                    {index === 4 && "Optimize gas fees for lower costs"}
                    {index === 5 && "Require multiple signatures for large transactions"}
                  </p>
                </div>
                <div className="relative inline-block w-10 h-6 rounded-full bg-gray-700">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    defaultChecked={index !== 5}
                  />
                  <span className={`block w-4 h-4 rounded-full ${index !== 5 ? 'bg-primary translate-x-5' : 'bg-gray-400 translate-x-1'} transform transition-transform duration-200 ease-in-out absolute top-1`}></span>
                </div>
              </div>
            ))}
            
            <div className="mt-6 pt-4 border-t border-gray-800">
              <h4 className="text-white font-medium mb-3">Supported Cryptocurrencies</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Bitcoin (BTC)", "Ethereum (ETH)", "USD Coin (USDC)", "Tether (USDT)", "Solana (SOL)", "Polygon (MATIC)"].map((crypto, index) => (
                  <div key={index} className="flex items-center p-2 border border-gray-800 rounded-lg">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-600 text-primary focus:ring-primary mr-2"
                      defaultChecked={index < 4}
                    />
                    <span className="text-white">{crypto}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end mt-6 pt-4 border-t border-gray-800">
              <button className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm mr-2">
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-medium">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}