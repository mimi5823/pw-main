"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePrivy } from "@privy-io/react-auth";

interface AdminContextType {
  isAdmin: boolean;
}

const AdminContext = createContext<AdminContextType>({ isAdmin: false });

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const { user } = usePrivy();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = () => {
      // Check if user is admin based on email or wallet address
      const adminEmails = ['thezbdiary@gmail.com']; 
      const adminWallets = ['0xe6694b04487FC2941687CD6436d4324a1cb5A156'];
      
      const isEmailAdmin = user?.email && adminEmails.includes(String(user.email));
      
      // Check wallet address if available
      const walletAddress = user?.wallet?.address;
      const isWalletAdmin = walletAddress && adminWallets.includes(String(walletAddress));
      
      console.log('Admin check:', { 
        email: user?.email, 
        wallet: user?.wallet?.address,
        isEmailAdmin,
        isWalletAdmin
      });
      
      setIsAdmin(isEmailAdmin || isWalletAdmin || false);
    };

    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  return (
    <AdminContext.Provider value={{ isAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};