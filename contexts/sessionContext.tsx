import { createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';
import type { CustomSession } from '@/lib/types';

const SessionContext = createContext<CustomSession | null>(null);

export const SessionProvider: React.FC<{ children: React.ReactNode; session: CustomSession | null }> = ({ children, session }) => {
  const { data: sessionData } = useSession(); // Destructure pour obtenir uniquement la partie 'data'

  // Créer une session personnalisée en combinant les données de session existantes
  const customSessionData = session || (sessionData ? {
    ...sessionData,
    user: {
      // Simplifie le rapport entre session de next et customSession niveau id et githubid
      ...(sessionData.user as typeof sessionData.user & { id?: string; githubId?: string; }),
      // Ajoute d'autres champs personnalisés
      createdAt: new Date(),
      updatedAt: new Date(),
      favoriteIds: [],
      sessions: [],
      account: [],
      isPremium: true,
      admin: false,
    }
  } as unknown as CustomSession : null);

  return (
    <SessionContext.Provider value={customSessionData}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = (): CustomSession | null => {
  return useContext(SessionContext);
};
