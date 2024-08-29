import { CheckBadgeIcon, XCircleIcon } from '@heroicons/react/24/solid'

interface PostStatusProps {
  status: string
}

const PostStatus: React.FC<PostStatusProps> = ({ status }) => {
  return (
    <div className="flex flex-row gap-1.5 items-center uppercase text-sm">
      {status === 'Canceled' && (
        <span className="flex flex-row items-center gap-0.5 text-red-400">
          <XCircleIcon className="w-4 h-4" />
          <span>Canceled</span>
        </span>
      )}
      {status === 'Underway' && (
        <span className="flex flex-row items-center gap-0.5 text-green-400">
          <span className="loading loading-dots loading-sm"></span>
          <span>Underway</span>
        </span>
      )}
      {status === 'Fulfilled' && (
        <span className="flex flex-row items-center gap-0.5 text-blue-400">
          <CheckBadgeIcon className="w-4 h-4" />
          <span>Fulfilled</span>
        </span>
      )}
    </div>
  )
}

export default PostStatus
