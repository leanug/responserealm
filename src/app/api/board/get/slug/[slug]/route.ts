import { NextResponse } from "next/server"

import { connectDB } from '@/server/mongodb'
import { isValidSlug } from '@/utils/is-valid-slug'

import Board from "@/models/board"
import { ENV } from "@/utils/constants"

type Params = {
  slug: string
}

export async function GET(req: Request, {params}: {params: Params}) {
  if (req.method !== 'GET') {
    return Response.json({ message: "Method Not Allowed" }, { status: 405 });
  }
  
  const {slug} = params
  
  // Validate userId
  if (typeof slug !== 'string' || !isValidSlug(slug)) {
    return NextResponse.json({ message: 'Something went wrong. Please try again later.' }, { status: 500 })
  }
  
  try {
    // Connect to MongoDB
    await connectDB()
    
    const board = await Board.find({ slug })
    
    return NextResponse.json({ 
      message: 'Board retrieved successfully.', 
      data: {board: board[0]}
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