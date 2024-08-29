import { ClockIcon } from '@heroicons/react/24/outline'

interface PostUpdatedAtProps {
  updatedAt: string
}

const PostUpdatedAt: React.FC<PostUpdatedAtProps> = ({ updatedAt }) => {
  return (
    <div className="flex flex-row gap-1.5 items-center text-sm justify-start">
      <span className="bg-base-200 p-2 rounded-lg flex flex-row items-center gap-2">
        <ClockIcon className="w-4 h-4" />
        {new Date(updatedAt).toLocaleDateString()}
      </span> 
    </div>
  )
}

export default PostUpdatedAt
