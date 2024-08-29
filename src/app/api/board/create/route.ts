//app/api/board/create/route.ts

import { NextResponse } from "next/server"

import {auth} from '@/auth'
import Board from "@/models/board"
import { connectDB } from '@/server/mongodb'
import { ENV } from "@/utils/constants"
import BoardFormSchema from "@/validators/board"
import { sanitizeString } from "@/utils/sanitize-string"

interface SafeData {
  user: {
    _id: string;
  };
  name: string;
}

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return Response.json(
      { success: false, message: "Method Not Allowed" }, 
      { status: 405 }
    )
  }

  // Get session user ID
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
    
    const safeData: SafeData = {
      user: {
        _id: session?.user?.id || '',  // Provide a fallback value
      },
      name: sanitizeString(data?.name || ''),  // Provide a fallback value
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
    });
  } catch (error) {
    return NextResponse.json(
      ENV.IS_DEV 
        ? { success: false, error } 
        : { success: false, message: 'Internal server error' }, 
      { status: 500 }
    )
  }
}