// src/components/auth/auth-content.tsx

import React from 'react'
import Image from 'next/image'

import { GithubLogo, GoogleLogo } from '@/components'

import ButtonSocial from '@/components/ui/buttons/button-social'

/**
 * Component for displaying the authentication content, 
 * including social login buttons and the login form.
 */
const AuthContent: React.FC = () => {
  return (
    <div>
      <div className="mx-auto mb-6 max-w-40">
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
      <h1 className="text-xl font-bold text-center mb-5">
        Sign in
      </h1>
      <div className="
        w-full flex flex-col max-w-xl gap-5 justify-center 
        items-center
      ">
        <ButtonSocial provider="google">
          <GoogleLogo className="w-5 h-5" />
          Sign in with Google
        </ButtonSocial>
        <ButtonSocial provider="github">
          <GithubLogo className="w-5 h-5" />
          Sign in with Github
        </ButtonSocial>
      </div>
    </div>
  )
}

export default AuthContent
