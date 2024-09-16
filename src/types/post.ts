export type Post = {
  _id: string
  board: string
  commentCount: number
  description: string
  name: string
  likes: number
  slug: string
  status: string
  user: {
    _id: string
    image: string
    name: string
  }
  createdAt: string // Use Date if you prefer to handle dates
  updatedAt: string // Use Date if you prefer to handle dates
  __v: number
}