import { create } from 'zustand'

import { Board } from '@/types/board'

interface BoardsState {
  boards: Board[]
  setBoards: (boards: Board[]) => void
  addBoard: (board: Board) => void
  updateBoard: (updatedBoard: Board) => void
  deleteBoard: (boardId: string) => void
}

export const useBoardsStore = create<BoardsState>((set) => ({
  boards: [],
  setBoards: (boards) => set({ boards }),
  addBoard: (board) => set((state) => ({ boards: [board, ...state.boards] })),
  updateBoard: (updatedBoard) => set((state) => ({
    boards: state.boards.map((board) =>
      board._id === updatedBoard._id ? updatedBoard : board
    )
  })),
  deleteBoard: (boardId) =>
    set((state) => ({
      boards: state.boards.filter((board) => board._id !== boardId),
    })),
}))
