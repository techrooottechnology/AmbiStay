"use client"

import { useState, useEffect } from "react"

interface FloatingBookButtonProps {
  onClick: () => void
}

export default function FloatingBookButton({ onClick }: FloatingBookButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  if (!isVisible) return null

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 right-6 z-30 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-xl transition hover:scale-105 hover:bg-primary/90"
      aria-label="Open booking form"
    >
      Book your stay
    </button>
  )
}
