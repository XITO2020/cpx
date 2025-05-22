import { createContext, useContext, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import type { CustomSession } from '@/lib/types';

interface SessionContextProviderProps {
  children: ReactNode;
  session: CustomSession | null;
}

const SessionContext = createContext<CustomSession | null>(null);

export function SessionProvider({ children, session }: SessionContextProviderProps) {
  const { data: sessionData } = useSession();

  const customSessionData = session || (sessionData ? {
    ...sessionData,
    user: {
      ...(sessionData.user as CustomSession['user']),
      createdAt: new Date(),
      updatedAt: new Date(),
      favoriteIds: [],
      sessions: [],
      account: [],
      isPremium: false,
      admin: false,
    },
    admin: false,
    email: sessionData.user?.email || '',
    emailVerified: false,
  } : null);

  return (
    <SessionContext.Provider value={customSessionData}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  const context = useContext(SessionContext);
  
  if (context === undefined) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }
  
  return context;
}