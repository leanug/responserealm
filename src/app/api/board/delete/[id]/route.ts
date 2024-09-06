import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

import Board from '@/models/board' // Adjust the import path according to your setup
import { connectDB } from '@/server/mongodb'
import { ENV } from '@/utils/constants'

interface Params {
  id: string
}

export async function DELETE(req: Request, {params}: {params: Params}) {
  if (req.method !== 'DELETE') {
    return NextResponse.json(
      { message: 'Method Not Allowed' },
      { status: 405 }
    )
  }

  const { id } = params

  // Validate board ID
  if (typeof id !== 'string' || !mongoose.isValidObjectId(id)) {
    return NextResponse.json({ message: 'Invalid board ID.' }, { status: 400 })
  }

  try {
    // Connect to MongoDB
    await connectDB()

    // Delete the board from the database
    const result = await Board.findByIdAndDelete(id)

    if (!result) {
      return NextResponse.json({ message: 'Board not found.' }, { status: 404 })
    }

    // Return a success response
    return NextResponse.json({
      message: 'Board deleted successfully',
    }, {
      status: 200
    })

  } catch (error) {
    if (ENV.IS_DEV) console.error(error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
