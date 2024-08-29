import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"

import { useThemeStore } from "@/store/use-mode-store"

export default function ThemeToggleButton() {
  const { theme, setTheme } = useThemeStore()

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <button onClick={toggleTheme}>
      {
        theme === 'light' 
          ? <MoonIcon className="w-5 h-5" /> 
          : <SunIcon className="w-5 h-5" />
      }
    </button>
  )
}
