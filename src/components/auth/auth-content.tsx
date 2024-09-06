// src/components/auth/auth-content.tsx

import React from 'react'
import Image from 'next/image'

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
      <h1 className="text-xl font-bold text-center mb-5">
        Sign in
      </h1>
      <div className="
        w-full flex flex-col max-w-xl gap-3 justify-center 
        items-center
      ">
        <ButtonSocial provider="google">
          <Image
            src="/7123025_logo_google_g_icon.svg"
            alt="Google Logo"
            width={40}
            height={40}
            placeholder="empty" // use 'empty' for a blank placeholder
            loading="eager" 
            priority={true}
            className="absolute top-1/2 left-1 transform -translate-y-1/2"
            />
          Sign in with Google
        </ButtonSocial>
        <ButtonSocial provider="github">
          <Image
            src="/1298743_github_git_logo_social_icon.svg"
            alt="Github Logo"
            width={26}
            height={26}
            placeholder="empty" // use 'empty' for a blank placeholder
            loading="eager" 
            priority={true}
            className="absolute top-1/2 left-3 transform -translate-y-1/2"
          />
          Sign in with Github
        </ButtonSocial>
      </div>
    </div>
  )
}

export default AuthContent
