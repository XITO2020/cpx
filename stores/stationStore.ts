import { create } from 'zustand';

interface StationState {
  activeStation: string | null;
  setActiveStation: (station: string | null) => void;
}

export const useStationStore = create<StationState>((set) => ({
  activeStation: null,
  setActiveStation: (station) => set({ activeStation: station }),
}));