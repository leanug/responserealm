'use client'

function PostHeader({children}: {children: React.ReactNode}) {
  return (
    <header className="
      flex flex-row items-center border-b py-2 px-2.5 md:px-6
      justify-between w-full"
    >
      {children}
    </header>
  )
}

export default PostHeader