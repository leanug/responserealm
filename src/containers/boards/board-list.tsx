'use client'

import BoardItem from './board-item'
import { Board } from '@/types/board'

type BoardListProps = {
  boards: Board[] | null
}

const BoardList = ({ boards }: BoardListProps) => (
  <ul className="flex flex-wrap mx-auto gap-1.5 justify-center">
    {boards?.map((item: any) => {
      return (
        <li className="w-full" key={item._id}>
          <BoardItem 
            name={item.name} 
            slug={item.slug} 
            boardId={item._id}
          />
        </li>
      )
    })}
  </ul>
)

export default BoardList