import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
// Removed getSession as it's not used in the updated logic
// import { Session } from 'next-auth'; // Session might not be explicitly needed if AppUser is comprehensive

// Define or import your actual AppUser, VideoType, CollectionType
interface AppUser {
  id: string; // Non-nullable when user is logged in
  name: string | null;
  email: string | null;
  image: string | null;
  role: string | null;
  createdAt: string | null;   // session usually serializes Date to string
  isPremium: boolean | null;
  isAdmin: boolean | null;    // Renamed from 'admin' to 'isAdmin' for clarity if needed, or keep as 'admin'
  tabzBalance: number | null;
}

interface VideoType {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  // Add other relevant video fields from your Prisma schema
}

interface CollectionType {
  id: string;
  name: string;
  description?: string;
  category?: string;
  userId: string;
  videos: VideoType[];
  // Add other relevant collection fields
}

interface UserContextType {
  user: AppUser | null;
  role: string | null;
  favorites: CollectionType[]; // Changed
  videos: VideoType[];       // Changed
  isLoading: boolean;
  // login: () => void; // Placeholder
  // logout: () => void; // Placeholder
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<AppUser | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<CollectionType[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const isLoadingSession = status === 'loading';

  useEffect(() => {
    const appUser = session?.user as AppUser | undefined;
    const currentUserId = appUser?.id;

    if (session?.user && currentUserId) {
      setUser(appUser);
      setRole(appUser?.role || 'user');

      const fetchUserCollectionsAndVideos = async (userId: string) => {
        try {
          // console.log('Fetching collections for user:', userId); // For debugging
          const response = await fetch('/api/collections'); // userId is available if needed for query params
          if (!response.ok) {
            throw new Error(`Failed to fetch collections: ${response.statusText}`);
          }
          const collectionsData: CollectionType[] = await response.json();
          setFavorites(collectionsData);

          const allVideos = collectionsData.reduce((acc, collection) => {
            return acc.concat(collection.videos);
          }, [] as VideoType[]);
          setVideos(allVideos);

        } catch (error) {
          console.error("Error fetching user's collections and videos:", error);
          setFavorites([]);
          setVideos([]);
        }
      };

      fetchUserCollectionsAndVideos(currentUserId);

    } else {
      setUser(null);
      setRole(null);
      setFavorites([]);
      setVideos([]);
    }
  }, [session]); // Dependency array includes session

  // Placeholder functions, to be implemented later
  // const login = () => { /* TODO */ };
  // const logout = () => { /* TODO */ };

  return (
    <UserContext.Provider value={{ user, role, favorites, videos, isLoading: isLoadingSession }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
