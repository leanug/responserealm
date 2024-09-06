import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import SessionWrapper from "@/containers/session/session-wrapper"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FeedbackRealm",
  description: `
    Gather and prioritize user feedback to enhance your 
    web app with features that matter most to your audience.
  `,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en" data-theme="light">
        <body className={`${inter.className}`}>
          <Header />
          <main className="flex min-h-screen flex-col items-center justify-between">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </SessionWrapper>
  )
}
