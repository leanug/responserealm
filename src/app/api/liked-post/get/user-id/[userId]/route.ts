import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

import LikedPost from '@/models/liked-post' // Adjust the import path according to your setup
import { connectDB } from '@/server/mongodb'
import { ENV } from '@/utils/constants'

interface Params {
  userId: string
}

/**
 * Handles GET requests to fetch liked posts based on the provided user ID.
 * 
 * @param {Request} req - The HTTP request object.
 * @param {Object} params - The parameters for the request.
 * @param {string} params.userId - The ID of the user for whom liked posts are being fetched.
 * 
 * @returns {Promise<NextResponse>} A promise that resolves to the HTTP response object with the fetched posts or an error message.
 */
export async function GET(req: Request, {params}: {params: Params}) {
  if (req.method !== 'GET') {
    return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 })
  }

  const { userId } = params

  // Validate userId
  if (typeof userId !== 'string' || !mongoose.isValidObjectId(userId)) {
    return NextResponse.json(
      { message: 'Invalid user ID.' }, 
      { status: 400 }
    )
  }

  try {
    // Connect to MongoDB
    await connectDB()

    // Fetch liked posts for the user
    const likedPosts = await LikedPost.find(
      { userId }, 
      {postId: 1}
    )

    // Return a success response with the liked posts
    return NextResponse.json({
      message: 'Liked posts retrieved successfully.',
      data: { likedPosts }
    }, {
      status: 200
    })
  } catch (error) {
    return NextResponse.json(
      ENV.IS_DEV 
        ? { error } 
        : { message: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
