import { usePrivy } from "@privy-io/react-auth";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/admin-context";

export function useAdminCheck() {
  const { authenticated, ready } = usePrivy();
  const { isAdmin: isAdminFromContext } = useAdmin();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ready) {
      // Use a small timeout to ensure admin context has been evaluated
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [ready, authenticated]);

  return { isAdmin: isAdminFromContext, loading };
}