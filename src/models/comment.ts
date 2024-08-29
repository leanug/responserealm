import mongoose, { Schema, models } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface CommentDocument {
  _id: string
  content: string
  post: mongoose.Schema.Types.ObjectId
  slug: string
  user: {
    _id: mongoose.Schema.Types.ObjectId
    name: string
    image: string
  }
  createdAt: Date
  updatedAt: Date
}

const commentSchema = new Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post', // Reference to the Post model
      required: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      maxLength: [2000, "Content must be at most 2000 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      default: () => uuidv4(), // Generate UUID string for URL by default
    },
    user: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
)

// Create and export the Comment model
const Comment = models.Comment || mongoose.model<CommentDocument>('Comment', commentSchema)
export default Comment
