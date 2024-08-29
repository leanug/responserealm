'use client'

// src/components/ui/user-menu.tsx
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid'
import { Bars4Icon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline'

interface UserMenuProps {
  userName: string
  userImage: string
  signOut: () => void
}

const UserMenu: React.FC<UserMenuProps> = ({ userName, userImage, signOut }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="
      relative inline-block text-left p-0 hover:bg-transparent 
      active:bg-transparent focus:bg-transparent
    ">
      <button 
        className="mb-1 btn"
        onClick={handleToggle}
      >
        <Bars4Icon className="w-5 h-5" />
      </button>
      {isOpen && (
        <ul 
          className="
            menu dropdown-content bg-base-100 rounded-lg 
            z-[1] p-2 shadow-lg w-64  absolute right-0"
          onClick={(e) => e.stopPropagation()}
        >
          <li >
            <div className="flex flex-grow flex-row gap-2.5 items-center">
              <Image
                src={userImage as string}
                alt={userName || "User Avatar"}
                width={'28'}
                height={'28'}
                placeholder="empty" // use 'empty' for a blank placeholder
                loading="eager" 
                priority={true}
                className='rounded-full'
              />
              {userName || 'Anonymous'}
            </div>
            
          </li>
          <li className="border border-t-1 border-indigo-500"></li>
          <li>
            <Link href="/dashboard">
              <ClipboardDocumentCheckIcon className="w-5 h-5" />
              Dashboard
            </Link>
          </li>
          <li className="border border-t-1 border-indigo-500"></li>
          <li>
            <button onClick={signOut}>
              <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default UserMenu
