// Import mongoose
import mongoose, { Schema, models } from 'mongoose'

interface UserDocument {
  _id: string
  email: string
  name: string
  role: string
  image?: string;
  emailVerified?: Date | null
  createdAt: Date
  updatedAt: Date
}

// Define the user schema
const userSchema = new Schema<UserDocument>(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [1, "fullname must be at least 3 characters"],
      maxLength: [150, "fullname must be at most 25 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    role: {
      type: String,
      enum: ['visitor', 'user', 'admin'], // Enum defines allowed values
      default: 'visitor',
    },
    emailVerified: { 
      type: Date, default: null 
    },
  },
  { timestamps: true },
)

// Create and export the User model
const User = models.User || mongoose.model<UserDocument>('User', userSchema)
export default User
