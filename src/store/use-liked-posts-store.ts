import { create } from 'zustand'

// Define the type for a liked post
interface LikedPost {
  _id: string
  postId: string
}

// Define the type for the liked posts store
interface LikedPostsStore {
  likedPosts: Record<string, LikedPost>
  addLikedPost: (likedPost: LikedPost) => void
  removeLikedPost: (likedPostId: string) => void
  setLikedPosts: (likedPosts: Record<string, LikedPost>) => void
}

// Create the Zustand store
export const useLikedPostsStore = create<LikedPostsStore>((set) => ({
  likedPosts: {},
  setLikedPosts: (likedPosts) => set({ likedPosts }),
  addLikedPost: (likedPost) => set((state) => ({
    likedPosts: {
      ...state.likedPosts,
      [likedPost.postId]: likedPost,
    }
  })),
  removeLikedPost: (likedPostId) => set((state) => {
    const newLikedPosts = Object.keys(state.likedPosts).reduce((acc, key) => {
      if (state.likedPosts[key]._id !== likedPostId) {
        acc[key] = state.likedPosts[key]
      }
      return acc
    }, {} as Record<string, LikedPost>)
    return { likedPosts: newLikedPosts }
  }),
}))
