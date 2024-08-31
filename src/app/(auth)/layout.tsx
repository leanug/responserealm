import type { Metadata } from "next"
import "../globals.css"
import { Inter } from "next/font/google"

import LoginModal from "@/components/ui/modals/login-modal"
import PostModal from "@/components/ui/modals/post-modal"
import SessionWrapper from "@/containers/session/session-wrapper"
import LoggedFooter from "@/components/layout/logged-footer"
import { Notification } from "@/components/notification"

export const metadata: Metadata = {
  title: "Login - Response Realm",
  description: `
    Gather and prioritize user feedback to enhance your 
    web app with features that matter most to your audience.
  `,
}

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={`${inter.className} bg-base-300`}>
          <div className="h-full">
            <div className="flex flex-col min-h-screen">
              <main className="flex-1 mt-12">
                {children}
              </main>
              <LoggedFooter />
              <Notification />
            </div>
          </div>
          <LoginModal />
          <PostModal />
        </body>
      </html>
    </SessionWrapper>
  )
}
