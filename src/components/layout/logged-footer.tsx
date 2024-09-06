'use client'

import { BoltIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'

export default function LoggedFooter() {
  return (
    <footer className="footer p-5 mt-10 w-full text-start">
      <div className="flex flex-row gap-1 max-w-5xl mx-auto">
        <BoltIcon className="w-5 h-5 fill-orange-300" />
        <span>
          Powered by 
          <Link className="ml-1 link" href="/">
            FeedbackRealm
          </Link>
        </span>
      </div>
    </footer>
  )
}
