import {create} from 'zustand';

interface FilterState {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const usePostFilterStore = create<FilterState>((set) => ({
  statusFilter: 'All', // Default to 'All'
  setStatusFilter: (status) => set({ statusFilter: status }),
}));
