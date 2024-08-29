import { NextResponse } from 'next/server'

import mongoose from 'mongoose'

import Comment from '@/models/comment'
import { connectDB } from '@/server/mongodb'
import { ENV } from '@/utils/constants'

interface Params {
  postId: string
}

/**
 * Handles GET requests to fetch posts based on the provided board ID.
 * 
 * @param {Request} req - The HTTP request object.
 * @param {Object} params - The parameters for the request.
 * @param {string} params.postId - The ID of the board for which posts are being fetched.
 * 
 * @returns {Promise<NextResponse>} A promise that resolves to the HTTP response object with the fetched posts or an error message.
 */
export async function GET(req: Request, {params}: {params: Params}) {
  if (req.method !== 'GET') {
    return Response.json({ message: "Method Not Allowed" }, { status: 405 })
  }

  const {postId} = params

  // Validate userId
  if (typeof postId !== 'string' || !mongoose.isValidObjectId(postId)) {
    return NextResponse.json({ message: 'Something went wrong. Please try again later.' }, { status: 500 })
  }

  try {
    // Connect to MongoDB
    await connectDB()

    // Fetch projects related to the userId
    const comments = await Comment
      .find({ post: postId })
      .sort({ createdAt: -1 })

    // Return a success response with the newly created user
    return NextResponse.json({ 
      message: 'Comments retrieved successfully.', 
      data: {comments}
    }, { 
      status: 200 
    })
  } catch (error) {
    if (ENV.IS_DEV) console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong on our end. Please try again later.' }, 
      { status: 500 }
    )
  }
}