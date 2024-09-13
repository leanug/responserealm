'use client'

import { useSession } from 'next-auth/react'
import { useQuery } from 'react-query';

import { getBoardsByUserId } from '@/server'

export const useFetchBoards = () => {
  const {data: session} = useSession()
  const userId = session?.user?.id || ''

  return useQuery(
    ['boards', userId],
    () => getBoardsByUserId(userId),
    {
      enabled: !!userId
    }
  )

}