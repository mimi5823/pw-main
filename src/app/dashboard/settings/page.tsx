"use client";

import { useState, useEffect } from "react";
import { Bell, Download, Key, Lock, Mail, Shield, Trash2, User, Wallet } from "lucide-react";
import { usePrivyAuth } from "@/hooks/use-privy-auth";

export default function SettingsPage() {
  const { user, linkEmail, linkWallet, unlinkEmail, unlinkWallet, ready, getEmail } = usePrivyAuth();
  
  // State for form inputs
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [notificationSettings, setNotificationSettings] = useState({
    courseUpdates: true,
    achievements: true,
    marketingEmails: false,
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (ready) {
      // Load saved data from localStorage
      const savedName = localStorage.getItem('displayName');
      const savedUsername = localStorage.getItem('username');
      const savedBio = localStorage.getItem('bio');
      
      // Simulate loading user data
      const timer = setTimeout(() => {
        setLoading(false);
        
        // Set display name from localStorage or email if available
        if (savedName) {
          setDisplayName(savedName);
        } else {
          const email = getEmail();
          if (email && email.includes('@')) {
            const nameFromEmail = email.split('@')[0];
            setDisplayName(nameFromEmail);
          }
        }
        
        // Set username and bio if available
        if (savedUsername) setUsername(savedUsername);
        if (savedBio) setBio(savedBio);
        
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [ready, getEmail]);

  // Handle form submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save user data to localStorage
    if (displayName.trim()) {
      localStorage.setItem('displayName', displayName.trim());
    }
    
    if (username.trim()) {
      localStorage.setItem('username', username.trim());
    }
    
    if (bio.trim()) {
      localStorage.setItem('bio', bio.trim());
    }
    
    // Show success message
    setSaveSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  // Handle notification settings changes
  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-12 h-12 border-4 border-primary border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Account Security Section */}
      <div className="bg-black rounded-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 p-6 shadow-lg border border-gray-800">
        <div className="flex items-center mb-6">
          <Shield className="w-6 h-6 text-primary mr-3" />
          <h2 className="text-xl font-bold text-white">Account Security</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Connected Email */}
          <div className="p-5 bg-black rounded-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 border border-gray-800">
            <div className="flex items-center mb-3">
              <Mail className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-white font-medium">Connected Email</h3>
            </div>
            
            {user?.email ? (
              <div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-gray-300">{getEmail()}</p>
                  </div>
                  <button
                    onClick={() => {
                      const email = getEmail();
                      if (email) {
                        try {
                          unlinkEmail(email);
                        } catch (error) {
                          console.error("Error unlinking email:", error);
                        }
                      }
                    }}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors px-3 py-1 rounded-md hover:bg-red-400/10"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Your email is used for important account notifications and recovery.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex flex-col items-center justify-center py-6 px-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-gray-400 mb-4 text-center">No email connected</p>
                  <button
                    onClick={() => linkEmail()}
                    className="w-full py-2 px-4 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Connect Email
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Connected Wallet */}
          <div className="p-5 bg-black rounded-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 border border-gray-800">
            <div className="flex items-center mb-3">
              <Wallet className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-white font-medium">Connected Wallet</h3>
            </div>
            
            {user?.wallet ? (
              <div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Wallet className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-gray-300 font-mono text-sm truncate max-w-[180px]">
                      {user?.wallet?.address && typeof user.wallet.address === 'string' 
                        ? `${user.wallet.address.slice(0, 6)}...${user.wallet.address.slice(-4)}` 
                        : 'Connected Wallet'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (user?.wallet) {
                        try {
                          // Convert wallet to string or use a specific property of wallet that is a string
                          const walletAddress = String(user.wallet);
                          unlinkWallet(walletAddress);
                        } catch (error) {
                          console.error("Error unlinking wallet:", error);
                        }
                      }
                    }}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors px-3 py-1 rounded-md hover:bg-red-400/10"
                  >
                    Disconnect
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  This wallet will be used for receiving NFT certificates and on-chain credentials.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex flex-col items-center justify-center py-6 px-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-gray-400 mb-4 text-center">No wallet connected</p>
                  <button
                    onClick={() => linkWallet()}
                    className="w-full py-2 px-4 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Connect Wallet
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-black rounded-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 p-6 shadow-lg border border-gray-800">
        <div className="flex items-center mb-6">
          <User className="w-6 h-6 text-primary mr-3" />
          <h2 className="text-xl font-bold text-white">Profile Settings</h2>
        </div>
        
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          {saveSuccess && (
            <div className="bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Profile settings saved successfully!
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-400 mb-2">
                Display Name
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your display name"
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-2">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">@</span>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className="w-full pl-8 px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Save Profile
          </button>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-black rounded-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 p-6 shadow-lg border border-gray-800">
        <div className="flex items-center mb-6">
          <Bell className="w-6 h-6 text-primary mr-3" />
          <h2 className="text-xl font-bold text-white">Notification Preferences</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-5 bg-black rounded-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 border border-gray-800">
            <div>
              <h3 className="text-white font-medium">Course Updates</h3>
              <p className="text-sm text-gray-400 mt-1">
                Receive notifications about new lessons and course updates
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.courseUpdates}
                onChange={() => handleNotificationChange("courseUpdates")}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-5 bg-black rounded-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 border border-gray-800">
            <div>
              <h3 className="text-white font-medium">Achievement Notifications</h3>
              <p className="text-sm text-gray-400 mt-1">
                Get notified when you earn new achievements or certificates
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.achievements}
                onChange={() => handleNotificationChange("achievements")}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-5 bg-black rounded-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 border border-gray-800">
            <div>
              <h3 className="text-white font-medium">Marketing Emails</h3>
              <p className="text-sm text-gray-400 mt-1">
                Receive updates about new courses and special offers
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.marketingEmails}
                onChange={() => handleNotificationChange("marketingEmails")}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Privacy Section */}
      <div className="bg-black rounded-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 p-6 shadow-lg border border-gray-800">
        <div className="flex items-center mb-6">
          <Lock className="w-6 h-6 text-primary mr-3" />
          <h2 className="text-xl font-bold text-white">Data Privacy</h2>
        </div>
        
        <div className="p-5 bg-black rounded-xl border border-gray-800 hover:border-primary/30 transition-all duration-300 border border-gray-800">
          <div className="flex items-center mb-3">
            <Key className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-white font-medium">Your Data Privacy</h3>
          </div>
          
          <p className="text-sm text-gray-400 mt-3">
            At Pnyx Institute, we prioritize your data privacy and security. Your personal information is never stored on-chain, 
            and we only use your data to provide and improve our services.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            You can request a copy of your data or delete your account at any time.
          </p>
          
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="flex items-center justify-center py-3 px-4 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-lg transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Download My Data
            </button>
            <button className="flex items-center justify-center py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium rounded-lg transition-colors">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}