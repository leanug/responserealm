import { NextResponse } from "next/server"

import BoardFormSchema from "@/validators/board"
import Board from "@/models/board"
import { auth } from '@/auth'
import { connectDB } from '@/server/mongodb'
import { ENV } from "@/utils/constants"
import { sanitizeString } from "@/utils/sanitize-string"
import { generateSlug } from "@/utils"

type SafeData = {
  user: {
    _id: string
  };
  name: string
  slug: string
}

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return Response.json(
      { success: false, message: "Method Not Allowed" }, 
      { status: 405 }
    )
  }
  
  const session = await auth()
  // If there's no session, return a 401 Unauthorized response
  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' }, 
      { status: 401 }
  )}

  try {
    // Connect to MongoDB
    await connectDB()

    const data = await request.json()

    // Validate the data against the schema
    const validationResult = BoardFormSchema.safeParse(data) // data: {name}

    // Check if validation passed
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, message: validationResult.error.errors[0].message }, 
        { status: 400 }
      )
    }

    const name = sanitizeString(data?.name || '')
    const slug = generateSlug(name)

    // Check if the slug already exists in the database
    const existingBoard = await Board.findOne({ slug })
    
    if (existingBoard) {
      // Return an error if the slug is already in use
      return NextResponse.json({ 
        success: false,
        message: 'A Board with this name already exists', 
        code: '11000'
      }, { 
        status: 400 
      });
    }

    const safeData: SafeData = {
      user: {
        _id: session?.user?.id || '', 
      },
      name,
      slug
    };

    // Create a new user in the database
    const newBoard = await Board.create(safeData)
    // Return a success response with the newly created board
    return NextResponse.json({ 
      success: true,
      message: 'Board created', 
      board: newBoard
    }, { 
      status: 201 
    })
  } catch (error) {
    return NextResponse.json(
      ENV.IS_DEV 
        ? { success: false, error } 
        : { success: false, message: 'Internal server error' }, 
      { status: 500 }
    )
  }
}