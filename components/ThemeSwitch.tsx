"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Loader2, Moon, Sun } from "lucide-react"

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return <Loader2 className="animate-spin w-4 h-4" />

  if (resolvedTheme === "dark") {
    return (
      <div className="hover:bg-muted duration-100 p-1 rounded-full">
        <Sun
          size={20}
          className="cursor-pointer duration-300 text-yellow-400"
          onClick={() => setTheme("light")}
        />
      </div>
    )
  }

  if (resolvedTheme === "light") {
    return (
      <div className="hover:bg-muted-foreground/40 p-1 rounded-full">
        <Moon
          size={20}
          className="cursor-pointer duration-300"
          onClick={() => setTheme("dark")}
        />
      </div>
    )
  }
}
