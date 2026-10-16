"use client"

import { useState } from "react"
import HeroSection from "@/components/hero-section"
import ReviewsAndRatings from "@/components/reviews-and-ratings"
import UnitsShowcase from "@/components/units-showcase"
import WhyAmbiStay from "@/components/why-ambi-stay"
import LocationSection from "@/components/location-section"
import ContactSection from "@/components/contact-section"
import Navigation from "@/components/navigation"
import FloatingBookButton from "@/components/floating-book-button"
import BookingForm from "@/components/booking-form"

export default function Home() {
  const [showBooking, setShowBooking] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection onBookClick={() => setShowBooking(true)} />

      <UnitsShowcase />

      <ReviewsAndRatings />

      <WhyAmbiStay />

      <LocationSection />
      <ContactSection />

      {showBooking && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border/50">
            <button
              onClick={() => setShowBooking(false)}
              className="absolute top-4 right-4 text-foreground/50 hover:text-foreground transition"
            >
              ✕
            </button>
            <BookingForm onClose={() => setShowBooking(false)} />
          </div>
        </div>
      )}

      <FloatingBookButton onClick={() => setShowBooking(true)} />
    </div>
  )
}
