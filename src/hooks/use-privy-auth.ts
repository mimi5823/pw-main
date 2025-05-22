import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function usePrivyAuth() {
  const { 
    ready, 
    authenticated, 
    user, 
    login, 
    logout, 
    linkEmail, 
    linkWallet, 
    unlinkEmail, 
    unlinkWallet 
  } = usePrivy();
  const router = useRouter();

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  // Safe email getter
  const getEmail = (): string => {
    if (user?.email && typeof user.email === 'string') {
      return user.email;
    }
    return '';
  };

  // Get username from email
  const getUsername = (): string => {
    const email = getEmail();
    if (email && email.includes('@')) {
      const parts = email.split('@');
      return parts[0];
    }
    return '';
  };

  return {
    ready,
    authenticated,
    user,
    login,
    logout,
    linkEmail,
    linkWallet,
    unlinkEmail,
    unlinkWallet,
    getEmail,
    getUsername
  };
}