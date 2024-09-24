'use client'

import { useQuery } from 'react-query';

import { fetchPosts } from '@/server'

export const useFetchPosts = (boardId: string) => {
  return useQuery(
    ['posts', boardId],
    () => fetchPosts(boardId || ''),
    {
      enabled: !!boardId, // Only run query if board._id is defined
    }
  )
}