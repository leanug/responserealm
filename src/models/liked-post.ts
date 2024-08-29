import mongoose, { Schema, models } from 'mongoose'

export interface LikedPostDocument {
  _id: string
  userId: mongoose.Schema.Types.ObjectId
  postId: mongoose.Schema.Types.ObjectId
  createdAt: Date
}

const likedPostSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  { 
    timestamps: true,
    collection: 'liked_posts' // Custom collection name
  }
)

// Create and export the LikedPost model
const LikedPost = models.LikedPost || mongoose.model<LikedPostDocument>('LikedPost', likedPostSchema)
export default LikedPost