type BoardListHeaderProps = {
  boardCount: number
}

function PostListHeader({ 
  boardCount
}: BoardListHeaderProps) {

  return (
    <div className="breadcrumbs text-sm hidden md:block">
    <ul>
      <li>Posts</li>
      <li>Post name</li>
    </ul>
  </div>
  )
}

export default PostListHeader