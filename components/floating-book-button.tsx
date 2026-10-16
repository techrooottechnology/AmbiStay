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

  return (
    null
  )
}
