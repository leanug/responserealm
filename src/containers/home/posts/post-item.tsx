'use client'

import { 
  ClockIcon, 
  ChatBubbleLeftIcon, 
  HeartIcon 
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useState } from 'react'

interface FeedbackPostProps {
  title: string;
  status: string;
  description: string;
  timestamp: string;
  likes: number;
  commentCount: number;
  isLiked: boolean
}

const FeedbackPost: React.FC<FeedbackPostProps> = ({
  title,
  status,
  description,
  timestamp,
  likes: postLikes,
  commentCount,
  isLiked: isLikedPost
}) => {
  const [likes, setLikes] = useState(postLikes)
  const [isLiked, setIsLiked] = useState(isLikedPost)

  const handleClick = () => {
    setLikes(prevLikes => isLiked ? prevLikes - 1 : prevLikes + 1)
    setIsLiked(prev => !prev)
  }

  return (
    <div className="p-2.5 md:p-6 border-b">
      <div className="flex flex-row gap-10 justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        {status && (
          <div className="flex flex-row gap-1.5 items-center uppercase text-sm">
            <span className="flex flex-row items-center gap-0.5 text-green-400">
              <span className="loading loading-dots loading-sm"></span>
              <span>{status}</span>
            </span>
          </div>
        )}
      </div>
      <p className="mt-2 text-sm">{description}</p>
      <div className="flex flex-row gap-6 justify-between items-center mt-3">
        <div className="flex flex-row gap-2 w-1/2 justify-start items-center">
          <div className="flex flex-row gap-1.5 items-center text-sm justify-start">
            <span className="bg-base-200 p-2 rounded-lg flex flex-row items-center gap-2">
              <ClockIcon className="w-4 h-4" />
              {timestamp}
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-end w-1/2 items-center gap-2">
          <button className="btn hover:cursor-default">
            <ChatBubbleLeftIcon className="w-5 h-5" />
            {commentCount}
          </button>
          <button onClick={handleClick} className="btn">
            {
              isLiked 
                ? <HeartIconSolid className="w-5 h-5" />
                : <HeartIcon className="w-5 h-5" />
            }
            {likes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPost
