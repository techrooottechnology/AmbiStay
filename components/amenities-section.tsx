"use client"

import { useState } from "react"

export default function AmenitiesSection() {
  const [expandedAmenity, setExpandedAmenity] = useState<number | null>(null)

  const amenities = [
    {
      icon: "🏊",
      name: "Swimming Pool",
      desc: "Refreshing outdoor pool",
      details: "Olympic-sized heated pool with lounging area, perfect for relaxation and recreation.",
    },
    {
      icon: "🛏️",
      name: "AC Bedrooms",
      desc: "Comfortable & spacious",
      details: "Luxuriously appointed bedrooms with premium bedding, climate control, and modern amenities.",
    },
    {
      icon: "🍳",
      name: "Full Kitchen",
      desc: "Modern cooking facilities",
      details: "Fully equipped kitchen with stainless steel appliances, cookware, and dining essentials.",
    },
    {
      icon: "🅿️",
      name: "Indoor Parking",
      desc: "Secure parking space",
      details: "Covered parking with 24/7 security surveillance and ample space for multiple vehicles.",
    },
    {
      icon: "📶",
      name: "High-Speed WiFi",
      desc: "Stay connected",
      details: "Fiber-optic internet with speeds up to 100 Mbps throughout the property.",
    },
    {
      icon: "🔋",
      name: "Power Backup",
      desc: "24/7 electricity",
      details: "Diesel generator backup ensuring uninterrupted power supply at all times.",
    },
    {
      icon: "🐕",
      name: "Pet Friendly",
      desc: "Bring your pets",
      details: "Welcome your furry friends with dedicated pet areas and amenities.",
    },
    {
      icon: "🔥",
      name: "BBQ Area",
      desc: "Outdoor grilling",
      details: "Spacious outdoor BBQ zone with seating, perfect for gatherings and celebrations.",
    },
  ]

  const events = [
    { title: "Birthdays", emoji: "🎂", description: "Celebrate special moments" },
    { title: "Weddings", emoji: "💍", description: "Dream wedding venue" },
    { title: "Get-togethers", emoji: "👥", description: "Family & friends reunions" },
    { title: "Kitty Parties", emoji: "🎉", description: "Fun group celebrations" },
    { title: "Corporate Events", emoji: "💼", description: "Team building & meetings" },
    { title: "Long Stays", emoji: "🏡", description: "Extended vacations" },
  ]

  return (
    <section id="amenities" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-light text-5xl md:text-6xl text-foreground mb-6">Amenities & Events</h2>
          <p className="text-lg text-muted-foreground font-light">Everything you need for a perfect stay</p>
        </div>

        {/* Amenities Section */}
        <div className="mb-24">
          <h3 className="text-2xl font-light text-foreground mb-12 text-center">Our Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {amenities.map((amenity, idx) => (
              <div
                key={idx}
                onClick={() => setExpandedAmenity(expandedAmenity === idx ? null : idx)}
                className="bg-background border border-border p-8 text-center hover:border-primary transition-all cursor-pointer space-y-3"
              >
                <div className="text-4xl">{amenity.icon}</div>
                <h4 className="font-light text-foreground">{amenity.name}</h4>
                <p className="text-sm text-muted-foreground font-light">{amenity.desc}</p>
                {expandedAmenity === idx && (
                  <p className="text-xs text-foreground mt-3 pt-3 border-t border-border font-light">
                    {amenity.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Events Section */}
        <div>
          <h3 className="text-2xl font-light text-foreground mb-12 text-center">Perfect For</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="bg-primary text-primary-foreground p-8 text-center hover:bg-primary/90 transition-all space-y-3"
              >
                <div className="text-4xl">{event.emoji}</div>
                <p className="font-light text-lg">{event.title}</p>
                <p className="text-sm text-primary-foreground/80 font-light">{event.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-24 bg-secondary/20 p-12 text-center space-y-6">
          <h3 className="text-3xl font-light text-foreground">Ready to Experience Luxury?</h3>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto">
            Book your perfect getaway today and enjoy all our premium amenities
          </p>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-sm font-light transition-all hover:scale-105">
            Book Now
          </button>
        </div>
      </div>
    </section>
  )
}
