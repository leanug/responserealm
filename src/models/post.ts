import mongoose, { Schema, models } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface PostDocument {
  _id: string
  board: mongoose.Schema.Types.ObjectId
  commentCount: number
  slug: string
  name: string
  description: string
  status: string
  user: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string
    image: string
  }
  createdAt: Date
  updatedAt: Date
}

const postSchema = new Schema(
  {
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board', // Reference to the Board model
      required: true,
    },
    commentCount: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      maxLength: [2000, "Description must be at most 500 characters"],
    },
    name: {
      type: String,
      required: [true, "Fullname is required"],
      minLength: [3, "fullname must be at least 3 characters"],
      maxLength: [200, "fullname must be at most 150 characters"],
    },
    likes: {
      type: Number,
      default: 0
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      default: () => uuidv4(), // Generate UUID string for URL by default
    },
    status: {
      type: String,
      default: 'new'
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

// Create and export the User model
const Post = models.Post || mongoose.model<PostDocument>('Post', postSchema)
export default Post
