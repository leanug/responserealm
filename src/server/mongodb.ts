// Import the mongoose library
import mongoose from 'mongoose'

// Define the MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI ?? ''

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  )
}
declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export { connectDB }
