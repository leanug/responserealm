type BoardListHeaderProps = {
  boardCount: number;
}

function BoardListHeader({ 
  boardCount
}: BoardListHeaderProps) {
  const boardText = boardCount === 1 ? 'Board' : 'Boards'

  return (
    <div className="flex flex-row gap-2 items-center mb-3">
      <span className="font-semibold">
        {boardCount} {boardText}
      </span>
    </div>
  )
}

export default BoardListHeader