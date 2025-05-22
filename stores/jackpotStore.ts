import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface JackpotStore {
  lastPlayed: Date | null;
  canPlay: boolean;
  setLastPlayed: (date: Date) => void;
}

export const useJackpotStore = create<JackpotStore>()(
  persist(
    (set, get) => ({
      lastPlayed: null,
      canPlay: true,
      setLastPlayed: (date: Date) => {
        set({ 
          lastPlayed: date,
          canPlay: false
        });
        
        // Reset canPlay after one month
        const nextPlayDate = new Date(date);
        nextPlayDate.setMonth(nextPlayDate.getMonth() + 1);
        
        const now = new Date();
        if (now >= nextPlayDate) {
          set({ canPlay: true });
        }
      },
    }),
    {
      name: 'jackpot-storage',
    }
  )
);