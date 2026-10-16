"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="nav-sticky fixed top-0 left-0 right-0 bg-white/98 backdrop-blur-lg z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <span
              className="font-light text-xl tracking-widest text-foreground"
              style={{ fontFamily: "Georgia, serif", letterSpacing: "0.15em" }}
            >
              AMBI STAY
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="#discover"
              className="text-xs font-medium text-gray-600 hover:text-primary transition tracking-widest uppercase"
            >
              Discover
            </Link>
            <Link
              href="#properties"
              className="text-xs font-medium text-gray-600 hover:text-primary transition tracking-widest uppercase"
            >
              Properties
            </Link>
            <Link
              href="#about"
              className="text-xs font-medium text-gray-600 hover:text-primary transition tracking-widest uppercase"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-xs font-medium text-gray-600 hover:text-primary transition tracking-widest uppercase"
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-200">
            <Link
              href="#discover"
              className="block text-xs text-foreground/70 hover:text-primary py-3 font-light tracking-wider uppercase"
            >
              Discover
            </Link>
            <Link
              href="#properties"
              className="block text-xs text-foreground/70 hover:text-primary py-3 font-light tracking-wider uppercase"
            >
              Properties
            </Link>
            <Link
              href="#about"
              className="block text-xs text-foreground/70 hover:text-primary py-3 font-light tracking-wider uppercase"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="block text-xs text-foreground/70 hover:text-primary py-3 font-light tracking-wider uppercase"
            >
              Contact
            </Link>
            <button className="w-full px-6 py-2.5 rounded-full bg-primary text-white hover:bg-primary/90 transition font-light text-xs tracking-wide uppercase mt-4 shadow-md">
              Book Now
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
