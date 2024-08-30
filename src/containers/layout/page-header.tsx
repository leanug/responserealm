'use client'

import { ReactNode } from 'react'
import { useSession, signOut } from 'next-auth/react'

import OpenLoginModalBtn from '@/components/ui/buttons/open-login-modal-btn'
import UserMenu from '@/containers/layout/user-menu'
import ThemeToggleButton from '@/containers/ui/theme-toggle-btn'

function PageHeader({children}: {children: ReactNode}) {
  const {data: session, status} = useSession()

  return (
    <div className="
      w-full border items-center mx-auto bg-base-100 
      justify-between py-2 px-2.5 md:px-6 flex flex-row rounded-lg"
    >
      {children}
      <div className="flex flex-row gap-4 items-center justify-end">
        <ThemeToggleButton />
        {
          status === 'authenticated'
          ? (
            <UserMenu
              userImage={session?.user?.image as string} 
              userName={session?.user?.name as string}  
              signOut={signOut} 
            />
          ) : (
            <OpenLoginModalBtn />
          )
        }
      </div>
    </div>
  )
}

export default PageHeader