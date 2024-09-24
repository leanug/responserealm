'use client'

import { useQuery } from 'react-query'
import { useParams } from 'next/navigation'

import { fetchPost } from '@/server'

export const useFetchPost = () => {
  const params = useParams<{ postSlug: string }>()
  const {postSlug} = params

  return useQuery(
    ['post', postSlug],
    () => fetchPost({slug: postSlug}),
    {
      enabled: !!postSlug
    }

  )
}