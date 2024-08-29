import { useEffect } from 'react'
import { usePostStore } from '@/store/use-post-store'

export const useMonitorStore = () => {
  const posts = usePostStore((state) => state.posts);

  useEffect(() => {
    console.log('Store updated:', posts);
  }, [posts]);

  return {posts}
}