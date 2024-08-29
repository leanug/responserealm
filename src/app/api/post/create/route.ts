import { NextResponse } from "next/server"

import mongoose from 'mongoose'

import Post from "@/models/post"
import { connectDB } from '@/server/mongodb'
import { ENV } from "@/utils/constants"
import { sanitizeString } from "@/utils/sanitize-string"
import PostFormSchema from '@/validators/board'
import { auth } from "@/auth"

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return Response.json(
      { message: "Method Not Allowed" }, 
      { status: 405 }
    )
  }

  const data = await req.json()
  const {boardId, name, description} = data

  const session = await auth()

  // Check if user is authenticated
  if (!session) {
    return NextResponse.json(
      { message: 'User not authenticated. Please log in to continue.' }, 
      { status: 401 }
    )
  }

  // Validate board ID
  if (typeof boardId !== 'string' || !mongoose.isValidObjectId(boardId)) {
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' }, 
      { status: 500 }
    )
  }

  const validatedUserInputData = PostFormSchema.safeParse(
    { name, description }
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
  //const _id = session?.user?._id ?? ''
  const userName = session?.user?.name ?? ''
  const userImage = session?.user?.image ?? ''
  const userId = session?.user?.id ?? ''

  const safeName = sanitizeString(name)
  const safeDesc = sanitizeString(description)
  const safeData = {
    name: safeName,
    description: safeDesc,
    board: boardId,
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
    const newPost = await Post.create(safeData)
    // Return a success response with the newly created board
    return NextResponse.json({
      message: 'Post created',
      data: {
        post: newPost
      }
    }, {
      status: 201
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