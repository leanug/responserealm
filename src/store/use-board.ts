import {create} from 'zustand'

interface BoardStore {
  currentBoardId: string | null;
  setCurrentBoardId: (id: string) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  currentBoardId: null,
  setCurrentBoardId: (id) => set({ currentBoardId: id }),
}));
