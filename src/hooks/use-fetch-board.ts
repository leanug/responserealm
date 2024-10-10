'use client'

import { useQuery } from 'react-query'
import { useParams } from 'next/navigation'

import { fetchBoard } from '@/server'

export const useFetchBoard = () => {
  const params = useParams<{ boardSlug: string }>()
  const {boardSlug} = params

  return useQuery(
    ['board', boardSlug],
    () => fetchBoard(boardSlug),
    {
      enabled: !!boardSlug
    }
  )
}