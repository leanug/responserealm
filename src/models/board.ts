// Import mongoose
import mongoose, { Schema, models } from 'mongoose'

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

// Function to generate URL-friendly slug
const generateSlug = (name: string) => {
  const randomNumber = Math.floor(Math.random() * 100000000) // Generate an 8-digit random number
  const urlFriendlyName = name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading or trailing hyphens
  return `${randomNumber}-${urlFriendlyName}`
};

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
