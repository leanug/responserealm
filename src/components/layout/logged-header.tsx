'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

import UserMenu from '@/containers/layout/user-menu'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/solid'
import { useModalStore } from '@/store/use-modal-store'

export default function LoggedHeader() {
  const { data: session, status } = useSession()

  const pathname = usePathname()
  const isVisitorPath = pathname.includes('/b/')

  const {setOpenModal} = useModalStore()
  
  return (
    <div className="navbar px-2.5 md:px-4 flex justify-end">
      <ul className="menu menu-horizontal px-1 gap-2.5">
        {status === 'authenticated' ? (
          <>
            {!isVisitorPath && (
              <li className="mr-2">
                <Link 
                  className="btn btn-ghost" 
                  href="/b/12465513-responserealm"
                >
                  <ChatBubbleLeftIcon className="w-5 h-5" />
                  Feedback
                </Link>
              </li>
            )}
              <li>
                <UserMenu 
                  userImage={session.user?.image as string} 
                  userName={session.user?.name as string}  
                  signOut={signOut} 
                />
              </li>
            </>
          
        ) : (
          <>
            <li className="mr-2">
                <Link 
                  className="btn btn-ghost" 
                  href="/b/12465513-responserealm"
                >
                  <ChatBubbleLeftIcon className="w-5 h-5" />
                  Feedback
                </Link>
            </li>
            <li>
              <button 
                className="btn btn-neutral"
                onClick={() => setOpenModal('login-modal')}
              >
                Login
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}
