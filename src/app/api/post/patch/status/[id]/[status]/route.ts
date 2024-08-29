import { NextResponse } from 'next/server'

import mongoose from 'mongoose'

import Post from '@/models/post'
import { connectDB } from '@/server/mongodb'
import { ENV } from '@/utils/constants'
import { sanitizeString } from '@/utils/sanitize-string'

interface Params {
  id: string
  status: string
}

/**
 * Update post status.
 *
 * @param {Request} req - The request object.
 * @param {Params} params - The route parameters.
 * @returns {Promise<Response>} The response object.
 */
export async function PATCH(req: Request, { params }: { params: Params }) {
  if (req.method !== 'PATCH') {
    return NextResponse.json(
      { message: 'Method Not Allowed' },
      { status: 405 }
    )
  }

  const { id, status } = params

  // Validate post ID
  if (typeof id !== 'string' || !mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      { message: 'Invalid post ID.' }, 
      { status: 400 }
    )
  }

  const safeStatus = sanitizeString(status)

  try {
    // Connect to MongoDB
    await connectDB()

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { status: safeStatus },
      { new: true }
    )

    if (!updatedPost) {
      return NextResponse.json(
        { message: 'Post not found.' }, 
        { status: 404 }
      )
    }

    // Return a success response with the updated post
    return NextResponse.json(
      {
        message: 'Post updated successfully',
        data: { post: updatedPost },
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      ENV.IS_DEV 
        ? { error } 
        : { message: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
