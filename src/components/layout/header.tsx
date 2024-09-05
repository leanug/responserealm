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
              src="/Logo.png"
              alt="Logo"
              width={256}
              height={73}
              placeholder="empty" // use 'empty' for a blank placeholder
              loading="eager" 
              priority={true}
              className="logo"
            />
          </div>
          
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
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
                  className='bg-transparent focus:bg-transparent hover:bg-transparent'
                >
                  <Image
                    src={session.user?.image as string}
                    alt={session.user?.name || "User Avatar"}
                    width={'36'}
                    height={'36'}
                    placeholder="empty" // use 'empty' for a blank placeholder
                    loading="eager" 
                    priority={true}
                    className='rounded-full'
                  />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link 
                  href="/auth/login"
                  className="btn btn-neutral"
                >
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
