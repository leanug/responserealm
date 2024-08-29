'use client'

import { signIn } from 'next-auth/react'

interface ButtonSocialProps {
  children: React.ReactNode
  provider: string
}

const ButtonSocial = ({
  children,
  provider
}: ButtonSocialProps) => {
  const handleClick = async () => {
    await signIn(provider) 
  }

  return (
    <button 
      className="btn btn-outline btn-block" 
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default ButtonSocial