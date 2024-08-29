import { ReactNode } from 'react'

function ContentWrapper({children}: {children: ReactNode}) {
  return (
    <section className="w-full px-2.5">
      <div className="mx-auto w-full max-w-xl">
        {children}
      </div>
    </section>
  )
}

export default ContentWrapper