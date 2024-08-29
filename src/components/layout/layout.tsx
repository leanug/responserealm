'use client'

import LoggedFooter from "@/components/layout/logged-footer"
import LoginModal from "@/components/ui/modals/login-modal"
import PostModal from "@/components/ui/modals/post-modal"
import { useThemeStore } from "@/store"
import { Notification } from "@/components/notification"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({
  children,
}: LayoutProps) {
  const {theme} = useThemeStore()

  return (
    <>
     
      </>
  )
}
