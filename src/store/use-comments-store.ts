import { create } from 'zustand'

import { Comment } from '@/types/comment'

interface CommentState {
  comments: Comment[]
  setComments: (comments: Comment[]) => void
  addComment: (comment: Comment) => void
  deleteComment: (id: string) => void
}

export const useCommentsStore = create<CommentState>((set) => ({
  comments: [],
  setComments: (comments) => set({ comments }),
  addComment: (comment) => set((state) => ({ comments: [comment, ...state.comments] })),
  deleteComment: (id) => set((state) => ({
    comments: state.comments.filter((comment) => comment._id !== id),
  })),
}))