'use client'

import { useQuery } from 'react-query';

import { getPostBySlug } from '@/server'
import { useParams } from 'next/navigation';

export const useFetchPost = () => {
  const params = useParams<{ postSlug: string }>()
  const {postSlug} = params

  return useQuery(
    ['post', postSlug],
    () => getPostBySlug(postSlug),
    {
      enabled: !!postSlug
    }

  )
}