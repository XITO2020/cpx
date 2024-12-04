import { createContext, useContext, ReactNode } from 'react';
import { Session } from '@/lib/types';

interface SessionContextType {
  session: Session | null;
  loading: boolean;
}

export const SessionContext = createContext<SessionContextType>({
  session: null,
  loading: true
});

interface SessionProviderProps {
  children: ReactNode;
  session: Session | null;
}

export const SessionProvider = ({ children, session }: SessionProviderProps) => {
  return (
    <SessionContext.Provider value={{ session, loading: false }}>
      {children}
    </SessionContext.Provider>
  );
};
