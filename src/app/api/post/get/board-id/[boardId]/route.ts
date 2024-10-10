import { NextResponse } from 'next/server'

import mongoose from 'mongoose'

import Post from '@/models/post'
import { connectDB } from '@/server/mongodb'
import { ENV } from '@/utils/constants'

interface Params {
  boardId: string
}

/**
 * Handles GET requests to fetch posts based on the provided board ID.
 * 
 * @param {Request} req - The HTTP request object.
 * @param {Object} params - The parameters for the request.
 * @param {string} params.boardId - The ID of the board for which posts are being fetched.
 * 
 * @returns {Promise<NextResponse>} A promise that resolves to the HTTP response object with the fetched posts or an error message.
 */
export async function GET(req: Request, {params}: {params: Params}) {
  if (req.method !== 'GET') {
    return Response.json({ message: "Method Not Allowed" }, { status: 405 })
  }

  const {boardId} = params
  
  // Validate userId
  if (typeof boardId !== 'string' || !mongoose.isValidObjectId(boardId)) {
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' }, 
      { status: 500 }
    )
  }

  try {
    // Connect to MongoDB
    await connectDB()

    // Fetch projects related to the userId
    const posts = await Post
      .find({ board: boardId })
      .sort({ likes: -1 })
    
    // Return a success response with the newly created user
    return NextResponse.json({ 
      message: 'Posts retrieved successfully.', 
      data: {posts}
    }, { 
      status: 200 
    })
  } catch (error) {
    return NextResponse.json(
      ENV.IS_DEV 
        ? { message: 'Internal server error', error }
        : { message: 'Internal server error' }, 
      { status: 500 }
    )
  }
}