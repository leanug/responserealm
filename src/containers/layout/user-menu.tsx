'use client'

import { useParams } from 'next/navigation'
import { useQuery } from 'react-query'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid'
import { Bars4Icon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline'
import { getBoardBySlug } from '@/server'
import { useSession } from 'next-auth/react'
import { LoadingIndicator } from '@/components'

interface UserMenuProps {
  userName: string
  userImage: string
  signOut: () => void
}

const UserMenu: React.FC<UserMenuProps> = ({ userName, userImage, signOut }) => {
  const [isOpen, setIsOpen] = useState(false)
  const {data: session} = useSession()
  const userId: string | null = session?.user?.id || null

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const params = useParams<{ boardSlug: string }>()
  const {boardSlug} = params

  const { data, isLoading } = useQuery('boardData', () => getBoardBySlug(boardSlug), {
    enabled: !!boardSlug, // Ensure the query only runs if boardSlug is available
  })
  const userBoardId = data ? data.user : null

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

  if (isLoading) {
    return <div className="btn btn-disabled"><LoadingIndicator /></div>
  }

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
          {userId === userBoardId && (
            <li>
              <Link href="/dashboard" className="flex items-center space-x-2">
                <ClipboardDocumentCheckIcon className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </li>
          )}
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
