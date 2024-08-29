//src/app/api/liked-post/delete/[id]/route.ts

import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

import LikedPost from '@/models/liked-post' // Adjust the import path according to your setup
import { connectDB } from '@/server/mongodb'
import { ENV } from '@/utils/constants'

interface Params {
  id: string
}

/**
 * Handles the DELETE request to remove a liked post from the database.
 *
 * @param req - The HTTP request object.
 * @param params - The parameters of the request, including the liked post ID.
 * @returns A response indicating the success or failure of the deletion operation.
 * 
 * @throws {400} If the liked post ID is invalid.
 * @throws {404} If the liked post is not found.
 * @throws {500} If there is an internal server error.
 */
export async function DELETE(
  req: Request, 
  { params }: { params: Params }) 
{
  if (req.method !== 'DELETE') {
    return NextResponse.json(
      { message: 'Method Not Allowed' },
      { status: 405 }
    )
  }

  const { id } = params

  // Validate liked post ID
  if (typeof id !== 'string' || !mongoose.isValidObjectId(id)) {
    return NextResponse.json(
      { message: 'Invalid liked post ID.' }, 
      { status: 400 }
    )
  }

  try {
    // Connect to MongoDB
    await connectDB()

    // Delete the liked post from the database
    const result = await LikedPost.findByIdAndDelete(id)

    if (!result) {
      return NextResponse.json(
        { message: 'Liked post not found.' }, 
        { status: 404 }
      )
    }

    // Return a success response
    return NextResponse.json({
      message: 'Liked post deleted successfully',
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