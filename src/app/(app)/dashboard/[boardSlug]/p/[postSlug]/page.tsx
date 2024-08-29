// src/pages/posts/[postSlug]/page.tsx
import { redirect } from "next/navigation"

import { auth } from "@/auth"
import PostPageDashboard from '@/components/pages/post-page-dashboard'

const Page = async () => {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <PostPageDashboard />
  )
  
}
export default Page
