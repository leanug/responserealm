import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

import Post from '@/models/post' // Adjust the import path according to your setup
import { connectDB } from '@/server/mongodb'
import { ENV } from '@/utils/constants'

interface Params {
  id: string
}

/**
 * Handles the DELETE request to remove a post from the database.
 *
 * @param req - The HTTP request object.
 * @param params - The parameters of the request, including the post ID.
 * @returns A response indicating the success or failure of the deletion operation.
 * 
 * @throws {400} If the post ID is invalid.
 * @throws {404} If the post is not found.
 * @throws {500} If there is an internal server error.
 */
export async function DELETE(req: Request, { params }: { params: Params }) {
  if (req.method !== 'DELETE') {
    return NextResponse.json(
      { message: 'Method Not Allowed' },
      { status: 405 }
    )
  }

  const { id } = params

  // Validate post ID
  if (typeof id !== 'string' || !mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      { message: 'Invalid post ID.' }, 
      { status: 400 }
    )
  }

  try {
    // Connect to MongoDB
    await connectDB()

    // Delete the post from the database
    const result = await Post.findByIdAndDelete(id)

    if (!result) {
      return NextResponse.json(
        { message: 'Post not found.' }, 
        { status: 404 }
      )
    }

    // Return a success response
    return NextResponse.json({
      message: 'Post deleted successfully',
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
