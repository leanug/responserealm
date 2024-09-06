'use client'

import React from 'react'
import Image from 'next/image'
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function Nav() {
  const { data: session, status } = useSession()

  return (
    <div className="navbar container lg:mx-auto">
      <div className="flex-1">
        <Link href="/">
          <style jsx>{`
            .logo {
              width: auto;
              height: auto;
              max-width: 50%; /* Ensure it scales down if necessary */
              max-height: 50%; /* Ensure it scales down if necessary */
            }
          `}</style>
          <div className='w-32'>
            <Image
              src="/feedbackrealm-logo.svg"
              alt="Logo"
              width={180}
              height={24}
              placeholder="empty" // use 'empty' for a blank placeholder
              loading="eager" 
              priority={true}
              className="logo"
            />
          </div>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal gap-3 px-1">
          {status === 'authenticated' ? (
            <>
              <li>
                <button className="btn btn-ghost" onClick={() => signOut()}>
                  Sign out
                </button>
              </li>
              <li>
                <Link  
                  href={`/dashboard`}
                  className='btn'
                >
                  Dashboard
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link 
                  href="/b/56987723-feedbackrealm"
                  className="btn"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <Link 
                  href="/auth/login"
                  className="btn btn-neutral"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                  </svg>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
