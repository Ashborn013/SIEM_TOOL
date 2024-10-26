'use client'

import React from 'react'
import { useTheme } from "next-themes"
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme('light')}
        aria-label="Switch to light theme"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme('dark')}
        aria-label="Switch to dark theme"
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </div>
  )
}