import type { Metadata } from "next"
import "../globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] });


import SessionWrapper from "@/containers/session/session-wrapper"

import LoggedFooter from "@/components/layout/logged-footer"
import LoginModal from "@/components/ui/modals/login-modal"
import PostModal from "@/components/ui/modals/post-modal"
import { Notification } from "@/components/notification"
import ThemeWrapper from "@/containers/layout/theme-wrapper";

export const metadata: Metadata = {
  title: "Response Realm",
  description: `
    Gather and prioritize user feedback to enhance your 
    web app with features that matter most to your audience.
  `,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={`${inter.className}`}>
          <ThemeWrapper>
            <div className="h-full bg-base-200">
              <div className="flex flex-col min-h-screen">
                <main className="flex-1 mt-12">
                  {children}
                </main>
                <LoggedFooter />
              </div>
            </div>
            <Notification />
            <LoginModal />
            <PostModal />
          </ThemeWrapper>
        </body>
      </html>
    </SessionWrapper>
  )
}
