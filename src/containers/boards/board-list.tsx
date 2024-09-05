// src/containers/boards/board-list.tsx
'use client'

import React, { useEffect } from 'react'

import BoardItem from './board-item'
import { useBoardsStore } from '@/store'
import { Board } from '@/types/board'

interface BoardListProps {
  initialBoards: Board[] | null
}

const BoardList: React.FC<BoardListProps> = ({ initialBoards }) => {
  const { boards, setBoards } = useBoardsStore()

  useEffect(() => {
    if (initialBoards && boards && boards.length === 0) {
      setBoards(initialBoards)
    }
  }, [initialBoards, boards, setBoards])
  
  return (
    <>
      {boards?.map((item: Board) => {
        return (
          <li className="w-full" key={item._id}>
            <BoardItem 
              name={item.name} 
              slug={item?.slug || ''} 
            />
          </li>
        )
      })}
    </>
  )
}

export default BoardList