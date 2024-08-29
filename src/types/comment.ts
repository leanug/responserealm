export interface Comment {
  _id: string
  content: string
  post: string
  user: {
    _id: string
    name: string
    image: string
  }
  createdAt: Date
  updatedAt: Date
}