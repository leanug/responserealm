//src/app/api/liked-post/create/route.ts

import { NextResponse } from 'next/server'

import mongoose from 'mongoose'

import LikedPost from '@/models/liked-post'
import { connectDB } from '@/server/mongodb'
import { ENV } from '@/utils/constants'
import { auth } from "@/auth"

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json(
      { message: 'Method Not Allowed' }, 
      { status: 405 }
    )
  }

  const data = await req.json()
  const {postId} = data

  // Validate post ID
  if (typeof postId !== 'string' || !mongoose.isValidObjectId(postId)) {
    return NextResponse.json(
      { message: 'Invalid post ID.' },
      { status: 400 }
    )
  }

  // User ID
  const session = await auth()
  const userId = session?.user?.id ?? ''

  // Validate post ID
  if (typeof userId !== 'string' || !mongoose.isValidObjectId(userId)) {
    return NextResponse.json(
      { message: 'Invalid user ID.', userId },
      { status: 400 }
    )
  }

  try {
    // Connect to MongoDB
    await connectDB()

    // Create a new liked post entry
    const newLike = await LikedPost.create({ userId, postId })

    // Return a success response with the newly created liked post
    return NextResponse.json({
      success: true,
      message: 'Post liked successfully',
      data: {
        likedPost: newLike
      }
    }, {
      status: 201
    })
  } catch (error) {
    return NextResponse.json(
      ENV.IS_DEV 
        ? { success: false, message: 'Internal server error', error } 
        : { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}