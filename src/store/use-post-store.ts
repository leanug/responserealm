import { create } from 'zustand'

import { Post } from '@/types/post'

interface PostState {
  posts: Post[]
  setPosts: (posts: Post[]) => void
  addPost: (post: Post) => void
  deletePost: (id: string) => void
  likePost: (id: string) => void
  dislikePost: (id: string) => void
  changePostStatus: (id: string, newStatus: string) => void
  incrementCommentCount: (id: string) => void
  decrementCommentCount: (id: string) => void
  
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  changePostStatus: (id, newStatus) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === id ? { ...post, status: newStatus } : post
      ),
    }))
  },
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post._id !== id),
    })),
  likePost: (id) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === id ? { ...post, likes: post.likes + 1 } : post
      ),
    }))
  },
  dislikePost: (id) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === id ? { ...post, likes: post.likes - 1 } : post
      ),
    }))
  },
  incrementCommentCount: (id) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === id ? { ...post, commentCount: post.commentCount + 1 } : post
      ),
    }))
  },
  decrementCommentCount: (id) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === id ? { ...post, commentCount: post.commentCount - 1 } : post
      ),
    }))
  },
}))