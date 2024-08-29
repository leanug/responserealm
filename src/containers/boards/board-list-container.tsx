// src/containers/boards/board-list-container.tsx
'use client'

import React from 'react'

import BoardItem from './board-item'
import { Board } from '@/types/board'
import useInitializeBoards from '@/hooks/use-initialize-boards'

interface BoardListProps {
  initialBoards: Board[] | null
}

const BoardList: React.FC<BoardListProps> = ({ initialBoards }) => {
  const {boards} = useInitializeBoards(initialBoards)
  
  return (
    <ul className="flex flex-wrap mx-auto gap-1.5 justify-center">
      {boards?.map((item: any) => {
        return (
          <li className="w-full" key={item._id}>
            <BoardItem 
              name={item.name} 
              slug={item.slug} 
            />
          </li>
        )
      })}
    </ul>
  )
}

export default BoardList