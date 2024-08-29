// src/app/api/comment/create/route.ts

import { NextResponse } from "next/server"

import mongoose from 'mongoose'

import Comment from "@/models/comment"
import { connectDB } from '@/server/mongodb'
import { ENV } from "@/utils/constants"
import { sanitizeString } from "@/utils/sanitize-string"
import CommentFormSchema from '@/validators/comment'
import { auth } from "@/auth"

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return Response.json(
      { message: "Method Not Allowed" }, 
      { status: 405 }
    )
  }

  const data = await req.json()
  const {postId, comment} = data

  // Validate board ID
  if (typeof postId !== 'string' || !mongoose.isValidObjectId(postId)) {
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' }, 
      { status: 500 })
  }

  const validatedUserInputData = CommentFormSchema.safeParse(
    { comment }
  )

  if (!validatedUserInputData.success) {
    // Return validation errors if any
    const errors = validatedUserInputData.error.format()
    ENV.IS_DEV && console.error('Validation errors', errors)
    return NextResponse.json(
      { message: 'Validation errors', errors },
      { status: 400 }
    )
  }
  
  // User ID
  const session = await auth()
  const userId = session?.user?.id ?? ''
  const userName = session?.user?.name ?? ''
  const userImage = session?.user?.image ?? ''

  const safeComment = sanitizeString(comment)
  const safeData = {
    content: safeComment,
    post: postId,
    user: {
      _id: userId,
      name: userName,
      image: userImage,
    }
  }

  try {
    // Connect to MongoDB
    await connectDB()
    
    // Create a new user in the database
    const newComment = await Comment.create(safeData)
    // Return a success response with the newly created board
    return NextResponse.json({
      success: true,
      message: 'Comment created',
      data: {
        comment: newComment
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
    )
  }
}