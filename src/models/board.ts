// Import mongoose
import mongoose, { Schema, models } from 'mongoose'
import { generateSlug } from '@/utils'

export interface BoardDocument {
  _id: string
  slug: string
  name: string
  user: {
    _id: mongoose.Schema.Types.ObjectId
  }
  createdAt: Date
  updatedAt: Date
}

const boardSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      default: () => generateSlug(''), // Set a default value using the generateSlug function
    },
    name: {
      type: String,
      required: [true, "Fullname is required"],
      minLength: [3, "fullname must be at least 3 characters"],
      maxLength: [50, "fullname must be at most 50 characters"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
  },
  { timestamps: true },
)

// Pre-save hook to generate slug from name
boardSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = generateSlug(this.name)
  }
  next()
})

// Create and export the Board model
const Board = models.Board || mongoose.model<BoardDocument>('Board', boardSchema)
export default Board
