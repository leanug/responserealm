import { NextResponse } from 'next/server'

import Post from '@/models/post'
import { connectDB } from '@/server/mongodb'
import { ENV } from '@/utils/constants'
import mongoose from 'mongoose'

interface Params {
  id: string
}

/**
 * Handles GET requests to fetch posts based on the provided post slug.
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

  const {id} = params
  
  // Validate userId
  if (typeof id !== 'string' || !mongoose.isValidObjectId(id)) {
    return NextResponse.json({ message: 'Internal ObjectId format' }, { status: 500 })
  }

  try {
    // Connect to MongoDB
    await connectDB()
    
    // Fetch projects related to the userId
    const post = await Post
      .find({ _id: id }).
      populate('user').
      exec()
    
    // Return a success response with the newly created user
    return NextResponse.json({ 
      message: 'Post retrieved successfully.', 
      data: {post}
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