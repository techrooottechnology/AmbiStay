"use client"

import { useState, useEffect } from "react"

interface HeroSectionProps {
  onBookClick: () => void
}

export default function HeroSection({ onBookClick }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const propertyImages = [
    {
      src: "/images/kerwa-farm.avif",
      alt: "Kerwa Farm - Luxury Farmhouse",
      title: "Kerwa Farm",
    },
    {
      src: "/images/1.png",
      alt: "Suraj Nagar Farm - Expansive Property",
      title: "Suraj Nagar Farm",
    },
    {
      src: "/images/Happy_stay_1.webp",
      alt: "Happy Stay 1 - Comfortable Residence",
      title: "Happy Stay 1",
    },
    {
      src: "/images/Happy_stay_2.jpg",
      alt: "Happy Stay 2 - Modern Accommodation",
      title: "Happy Stay 2",
    },
  ]

  const handleBookDirect = () => {
    const phoneNumber = "919893738999"
    const message =
      "Hello! I'm interested in booking a property at Ambi Stay. Could you help me with availability and pricing?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div
      className="relative w-full h-screen bg-white overflow-hidden pt-20"
      style={{
        backgroundImage: "url('/images/kerwa-farm.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Video Background - Replaced with static image */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover hidden">
        <source src="#" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/40" />

      {/* Content */}
      <div
        className={`relative h-full flex items-center justify-between px-8 md:px-16 lg:px-24 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        {/* Left side content */}
        <div className="max-w-2xl">
          <p className="text-xs md:text-sm text-primary font-light tracking-widest uppercase mb-6">
            Stays • Farmhouses • Residences
          </p>

          <h1
            className="font-light text-6xl md:text-7xl lg:text-8xl text-white mb-8 tracking-tight leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Ambi Stay
          </h1>

          <p className="text-sm md:text-base text-white/80 mb-12 font-light leading-relaxed tracking-wide uppercase">
            Where Nature Meets Comfort
          </p>

          <p className="text-base md:text-lg text-white/70 mb-4 font-light leading-relaxed max-w-xl">
            Discover our idyllic farmhouse sanctuaries nestled in nature's lap—where open skies, fresh air, and peaceful
            countryside moments create cherished memories with loved ones.
          </p>
          <p className="text-base md:text-lg text-white/70 mb-12 font-light leading-relaxed max-w-xl">
            Or unwind in our modern 2 BHK residences with private terraces and all the comforts of home—perfectly suited
            for those seeking relaxation, convenience, and flexibility in their stays.
          </p>

          <div className="flex gap-4 flex-wrap">
            
            
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-6 items-center">
          <div className="grid grid-cols-2 gap-4">
            {propertyImages.map((property, index) => (
              <div key={index} className="w-32 h-32 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-8 md:left-16 lg:left-24">
        
        <svg className="w-4 h-4 text-white/50 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}
