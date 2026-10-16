"use client"

export default function LocationSection() {
  const nearbyPlaces = [
    { name: "New Market", distance: "8 km", icon: "🛍️", description: "Shopping & dining" },
    { name: "Kerwa Dam", distance: "12 km", icon: "🏞️", description: "Scenic views" },
    { name: "Van Vihar National Park", distance: "15 km", icon: "🦁", description: "Wildlife sanctuary" },
    { name: "Sanchi Stupa", distance: "45 km", icon: "🏛️", description: "UNESCO heritage site" },
  ]

  const transportInfo = [
    { mode: "By Car", time: "30 mins", detail: "From Bhopal city center" },
    { mode: "By Taxi", time: "24/7", detail: "Available on demand" },
    { mode: "Airport", time: "15 km", detail: "Raja Bhoj Airport" },
    { mode: "Train", time: "20 km", detail: "Bhopal Junction" },
  ]

  return (
    <section id="location" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs text-accent font-light tracking-widest uppercase mb-4">Location</p>
          <h2 className="font-light text-5xl md:text-6xl text-foreground mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Location & Accessibility
          </h2>
          <p className="text-foreground/60 font-light text-lg">
            Perfectly positioned in Bhopal with easy access to attractions and amenities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Nearby Places */}
            <div>
              <h3 className="text-lg font-light text-foreground mb-6 tracking-wide uppercase">Nearby Attractions</h3>
              <div className="space-y-3">
                {nearbyPlaces.map((place, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 bg-card border border-border/30 rounded-lg hover:border-accent/50 hover:bg-secondary/20 transition-all group cursor-pointer"
                  >
                    <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                      {place.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-light text-foreground group-hover:text-accent transition">{place.name}</p>
                      <p className="text-xs text-foreground/50 font-light mt-1">{place.distance} away</p>
                      <p className="text-xs text-foreground/60 font-light mt-1">{place.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transportation Info */}
            <div>
              <h3 className="text-lg font-light text-foreground mb-6 tracking-wide uppercase">How to Reach</h3>
              <div className="grid grid-cols-2 gap-3">
                {transportInfo.map((info, idx) => (
                  <div
                    key={idx}
                    className="bg-secondary border border-border/30 p-4 rounded-lg hover:border-accent/50 transition-all group cursor-pointer"
                  >
                    <p className="text-lg text-accent font-light group-hover:scale-110 transition-transform origin-left">
                      {info.time}
                    </p>
                    <p className="text-xs font-light text-foreground mt-1 tracking-wide">{info.mode}</p>
                    <p className="text-xs text-foreground/50 font-light mt-2">{info.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-gradient-to-br from-secondary to-background rounded-lg overflow-hidden h-96 md:h-full md:min-h-[500px] border border-border/30 hover:border-accent/30 transition-all">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.5555555555556!2d77.4!3d23.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEyJzAwLjAiTiA3N8KwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Ambi Stay Location Map"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
