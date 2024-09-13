'use client'

import { useQuery } from 'react-query';

import { getBoardBySlug } from '@/server'
import { useParams } from 'next/navigation';

export const useFetchBoard = () => {
  const params = useParams<{ boardSlug: string }>()
  const {boardSlug} = params

  return useQuery(
    ['board', boardSlug],
    () => getBoardBySlug(boardSlug),
    {
      enabled: !!boardSlug
    }

  )

}