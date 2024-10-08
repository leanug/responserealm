import React from 'react'
import Link from 'next/link'

type BoardItemProps = {
  name: string
  slug: string
}

const BoardItem: React.FC<BoardItemProps> = ({name, slug}) => {
  return (
    <Link 
      className="
        flex flex-row justify-between py-3 px-4 transition-all 
        bg-base-100 border rounded-lg hover:shadow-sm
      " 
      href={`/dashboard/b/${slug}`}
    >
      <h2 className="text-md font-semibold">{name}</h2>
    </Link>
  )
}

export default BoardItem