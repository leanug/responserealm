import { NextResponse } from "next/server"
import Board from "@/models/board"
import { connectDB } from '@/server/mongodb'
import { z } from "zod"
import { ENV } from "@/utils/constants"
import mongoose from 'mongoose'

interface Params {
  userId: string
}

export async function GET(req: Request, {params}: {params: Params}) {
  if (req.method !== 'GET') {
    return Response.json({ message: "Method Not Allowed" }, { status: 405 });
  }
  
  const {userId} = params

  // Validate userId
  if (typeof userId !== 'string' || !mongoose.isValidObjectId(userId)) {
    return NextResponse.json({ message: 'Internal ObjectId format' }, { status: 500 })
  }

  try {
    // Connect to MongoDB
    await connectDB()

    // Fetch projects related to the userId
    const boards = await Board
      .find({ user: userId })
      .sort({ createdAt: -1 })

    // Return a success response with the newly created user
    return NextResponse.json({
      message: 'Boards retrieved successfully.',
      data: {
        boards
      }
    }, { 
      status: 201 
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle Zod validation errors
      return NextResponse.json({ 
        message: error.errors.map(e => e.message).join(', '),
      }, { 
        status: 400 
      })
    }

    // Handle other errors
    if (ENV.IS_DEV) console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}