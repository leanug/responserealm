import { NextResponse } from 'next/server'

import mongoose from 'mongoose'

import Post from '@/models/post' // Adjust the import path according to your setup
import { connectDB } from '@/server/mongodb'
import { ENV } from '@/utils/constants'
import { sanitizeString } from '@/utils/sanitize-string'

interface Params {
  id: string
  action: string
}

/**
 * Update a post and increment its like count.
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

  const { id, action } = params

  // Validate post ID
  if (typeof id !== 'string' || !mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      { message: 'Invalid post ID.' }, 
      { status: 400 }
    )
  }

  const safeAction = sanitizeString(action)
  const update = safeAction === 'like' 
    ? { $inc: { likes: 1 } } 
    : { $inc: { likes: -1 } }

  try {
    // Connect to MongoDB
    await connectDB()

    // Increment the like count of the post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      update,
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
    if (ENV.IS_DEV) console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
