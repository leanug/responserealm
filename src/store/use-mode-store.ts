import { create } from 'zustand'

interface ThemeStoreState {
  theme: 'dark' | 'light'
  setTheme: (value: 'dark' | 'light') => void
}

export const useThemeStore = create<ThemeStoreState>((set) => ({
  theme: 'light', // Default to 'light' theme
  setTheme: (value) => set({ theme: value }) 
}))
