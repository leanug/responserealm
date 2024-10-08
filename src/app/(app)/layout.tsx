import type { Metadata } from "next"
import "../globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

import SessionWrapper from "@/containers/session/session-wrapper"
import LoggedFooter from "@/components/layout/logged-footer"
import LoginModal from "@/components/ui/modals/login-modal"
import PostModal from "@/components/ui/modals/post-modal"
import ThemeWrapper from "@/containers/layout/theme-wrapper"
import QueryClientProviderWrapper from '@/components/providers/query-client-provider-wrapper'
import { siteConfig } from "@/config/site"
import { Notification } from "@/components/notification"

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
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
          <QueryClientProviderWrapper>
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
          </QueryClientProviderWrapper>
        </body>
      </html>
    </SessionWrapper>
  )
}
