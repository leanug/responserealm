'use client'

import { useSession } from 'next-auth/react'
import { useQuery } from 'react-query';

import { getBoardsByUserId } from '@/server'

export const useFetchBoards = () => {
  const {data: session} = useSession()
  const userId = session?.user?.id || ''

  return useQuery(
    ['boards', userId], // The query key, including userId as a dependency
    () => getBoardsByUserId(userId) // The fetch function that takes userId as an argument
  )

}