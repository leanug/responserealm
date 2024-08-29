import { Inter } from "next/font/google"
import LoggedFooter from "@/components/layout/logged-footer"
import { Notification } from "@/components/notification"
import LoginModal from "@/components/ui/modals/login-modal"
import PostModal from "@/components/ui/modals/post-modal"

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
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
  )
}
