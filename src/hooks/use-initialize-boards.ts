// src/hooks/use-initialize-boards.ts
'use client'

import { useEffect, useState } from 'react'

import { useBoardsStore } from '@/store/use-boards-store'
import { Board } from '@/types/board'

const useInitializeBoards = (initialBoards: Board[] | null) => {
  const { boards, setBoards } = useBoardsStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!isInitialized) {
      setBoards(initialBoards || [])
      setIsInitialized(true)
    }
  }, [initialBoards, boards, setBoards, isInitialized])

  return {boards}
}

export default useInitializeBoards
