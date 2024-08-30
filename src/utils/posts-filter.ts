import { Post } from "@/types/post"

export function postsFilter(posts: Post[], statusFilter: string) {
  const filteredPosts = posts.filter((post) => {
    if (statusFilter === 'All') return true
    return post.status === statusFilter
  })

  return filteredPosts
}