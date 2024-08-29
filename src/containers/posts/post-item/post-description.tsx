// src/containers/posts/post-item/post-header.tsx

interface PostDescriptionProps {
  description: string
}

const PostDescription: React.FC<PostDescriptionProps> = ({ description }) => (
    <p className="mt-2 text-sm">
      {description}
    </p>
  )

export default PostDescription
