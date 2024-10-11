'use client'

import { useQuery } from 'react-query'
import { useParams } from 'next/navigation'

import { fetchPost } from '@/server'

export const useFetchPost = () => {
  const params = useParams<{ postId: string }>()
  const {postId} = params

  return useQuery(
    ['post', postId],
    () => fetchPost({id: postId}),
    {
      enabled: !!postId
    }

  )
}