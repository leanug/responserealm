'use client'

import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="
      footer
      items-center p-4 mt-6 container mx-auto" 
    >
      <nav className="grid-flow-col gap-4">
        <p>
          💻 Developed by <a className="btn btn-link p-0" href="https://www.leandroubilla.com">leanug</a>
        </p>
      </nav>
      <aside className="grid-flow-col items-center md:justify-self-end">
        📃 <Link className="btn btn-link p-0" href="/privacy-policy">Privacy Policy</Link>
        ✉️ <Link className="btn btn-link p-0" href="/contact">Contact</Link>
      </aside>
    </footer>
  )
}
