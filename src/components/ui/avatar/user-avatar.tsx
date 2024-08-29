import React from 'react'
import Image from 'next/image'

interface UserAvatarProps {
  imageSrc: string
  userName: string
  createdAt: string
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  imageSrc, userName, createdAt 
}) => {
  // Determine if image should be displayed or placeholder
  const showImage = imageSrc && imageSrc !== ''
  const firstLetter = userName.charAt(0).toUpperCase()

  return (
    <div className="flex items-center justify-start flex-row">
      {showImage ? (
        <Image
          src={imageSrc}
          alt={userName || "User Avatar"}
          width={40}
          height={40}
          placeholder="empty"
          priority={false}
          className='rounded-full mr-2'
        />
      ) : (
        <div className="avatar placeholder mr-1">
          <div className="
            bg-neutral text-neutral-content w-6 h-6 rounded-full 
            flex items-center justify-center
          ">
            <span className="text-md">{firstLetter}</span>
          </div>
        </div>
      )}
      <div>
        <div>
          <span className="text-sm font-semibold">{userName}</span>
        </div>
        <div>
          <span className="text-sm">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default UserAvatar
