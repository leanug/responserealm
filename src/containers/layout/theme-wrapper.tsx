'use client'

import { ReactNode } from 'react'

import { useThemeStore } from "@/store"

function ThemeWrapper({children}: {children: ReactNode}) {
  const {theme} = useThemeStore()

  return (
    <div data-theme={theme}>
      {children}
    </div>
  )
}

export default ThemeWrapper