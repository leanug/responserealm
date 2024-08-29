import { LikedPost } from "@/types/liked-post"

export const transformLikedPosts = (likedPosts: LikedPost[] | null): Record<string, LikedPost> => {
  const index: Record<string, LikedPost> = {}
  
  if (likedPosts) {
    likedPosts.forEach(post => {
      index[post.postId] = post
    })
  }
  
  return index
}