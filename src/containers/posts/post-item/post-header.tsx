// src/containers/posts/post-item/post-header.tsx
import React from 'react'

interface PostHeaderProps {
  name: string
}

const PostHeader: React.FC<PostHeaderProps> = ({ name }) => (
  <h2 className="text-lg font-semibold">
    {name}
  </h2>
)


export default PostHeader
