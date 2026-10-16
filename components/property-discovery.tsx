"use client"

import { useState, useMemo } from "react"

interface Property {
  id: string
  name: string
  image: string
  type: "villa" | "suite" | "penthouse"
  price: number
  bedrooms: number
  bathrooms: number
  location: string
  features: string[]
  rating: number
}

interface UserPreferences {
  priceRange: [number, number]
  propertyType: string[]
  bedrooms: number
  location: string
}

export default function PropertyDiscovery() {
  const properties: Property[] = [
    {
      id: "1",
      name: "Crown Jewel Penthouse",
      image: "https://ambistay.in/wp-content/uploads/2022/07/DSC_1450-1536x1022.jpg",
      type: "penthouse",
      price: 25000,
      bedrooms: 4,
      bathrooms: 3,
      location: "Central Bhopal",
      features: ["Spa", "Pool", "Garden", "Smart Home"],
      rating: 4.8,
    },
    {
      id: "2",
      name: "Lumière Duplex",
      image: "https://ambistay.in/wp-content/uploads/2022/07/rooms-e1658400733216-1536x925.jpg",
      type: "villa",
      price: 18000,
      bedrooms: 3,
      bathrooms: 2,
      location: "Garden District",
      features: ["Terrace", "Gym", "Kitchen", "Parking"],
      rating: 4.7,
    },
    {
      id: "3",
      name: "Luxury Suite Plus",
      image: "https://ambistay.in/wp-content/uploads/2022/07/DSC_1451-1536x1022.jpg",
      type: "suite",
      price: 12000,
      bedrooms: 2,
      bathrooms: 2,
      location: "Downtown",
      features: ["Sauna", "Lounge", "Bar", "Concierge"],
      rating: 4.6,
    },
    {
      id: "4",
      name: "Serene Villa Escape",
      image: "https://ambistay.in/wp-content/uploads/2022/07/open.jpg",
      type: "villa",
      price: 15000,
      bedrooms: 3,
      bathrooms: 2,
      location: "Suburbs",
      features: ["Garden", "Pool", "Library", "Yoga Space"],
      rating: 4.9,
    },
    {
      id: "5",
      name: "Modern Penthouse View",
      image: "https://ambistay.in/wp-content/uploads/2022/07/open-1.jpg",
      type: "penthouse",
      price: 28000,
      bedrooms: 4,
      bathrooms: 3,
      location: "Central Bhopal",
      features: ["Cinema", "Wine Cellar", "Observatory", "Chef Kitchen"],
      rating: 4.9,
    },
    {
      id: "6",
      name: "Cozy Downtown Suite",
      image: "https://ambistay.in/wp-content/uploads/2022/07/DSC_1449.jpeg",
      type: "suite",
      price: 10000,
      bedrooms: 1,
      bathrooms: 1,
      location: "Downtown",
      features: ["Kitchenette", "Workspace", "Bathroom", "Living Area"],
      rating: 4.5,
    },
  ]

  const [preferences, setPreferences] = useState<UserPreferences>({
    priceRange: [8000, 30000],
    propertyType: [],
    bedrooms: 0,
    location: "",
  })

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  const recommendedProperties = useMemo(() => {
    let filtered = [...properties]

    // Filter by price range
    filtered = filtered.filter((p) => p.price >= preferences.priceRange[0] && p.price <= preferences.priceRange[1])

    // Filter by property type if selected
    if (preferences.propertyType.length > 0) {
      filtered = filtered.filter((p) => preferences.propertyType.includes(p.type))
    }

    // Filter by bedrooms if specified
    if (preferences.bedrooms > 0) {
      filtered = filtered.filter((p) => p.bedrooms >= preferences.bedrooms)
    }

    // Filter by location if specified
    if (preferences.location) {
      filtered = filtered.filter((p) => p.location.toLowerCase().includes(preferences.location.toLowerCase()))
    }

    // Sort by rating and match
    return filtered.sort((a, b) => b.rating - a.rating)
  }, [preferences])

  const handlePropertyTypeToggle = (type: string) => {
    setPreferences((prev) => ({
      ...prev,
      propertyType: prev.propertyType.includes(type)
        ? prev.propertyType.filter((t) => t !== type)
        : [...prev.propertyType, type],
    }))
  }

  return (
    <section id="discover" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs text-accent font-light tracking-widest uppercase mb-4">Discover Properties</p>
          <h2 className="font-light text-5xl md:text-6xl text-foreground mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Find Your Perfect Residence
          </h2>
          <p className="text-foreground/60 font-light text-lg max-w-2xl">
            Use intelligent filters to discover properties tailored to your preferences and lifestyle.
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-card rounded-lg p-8 mb-16 border border-border/30">
          <h3 className="font-light text-xl text-foreground mb-6 tracking-wide">Smart Filters</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Price Range Filter */}
            <div>
              <label className="block text-xs text-foreground/70 font-light tracking-widest uppercase mb-3">
                Price Range
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="8000"
                  max="30000"
                  value={preferences.priceRange[1]}
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], Number(e.target.value)],
                    }))
                  }
                  className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-xs text-foreground/60 font-light">
                  ₹{preferences.priceRange[0].toLocaleString()} - ₹{preferences.priceRange[1].toLocaleString()}
                </div>
              </div>
            </div>

            {/* Property Type Filter */}
            <div>
              <label className="block text-xs text-foreground/70 font-light tracking-widest uppercase mb-3">
                Property Type
              </label>
              <div className="space-y-2">
                {["villa", "suite", "penthouse"].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.propertyType.includes(type)}
                      onChange={() => handlePropertyTypeToggle(type)}
                      className="w-4 h-4 rounded border-border"
                    />
                    <span className="text-xs text-foreground/70 font-light capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Bedrooms Filter */}
            <div>
              <label className="block text-xs text-foreground/70 font-light tracking-widest uppercase mb-3">
                Min Bedrooms
              </label>
              <select
                value={preferences.bedrooms}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    bedrooms: Number(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-xs text-foreground/70 focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value={0}>Any</option>
                <option value={1}>1+</option>
                <option value={2}>2+</option>
                <option value={3}>3+</option>
                <option value={4}>4+</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-xs text-foreground/70 font-light tracking-widest uppercase mb-3">
                Location
              </label>
              <input
                type="text"
                placeholder="Search location..."
                value={preferences.location}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-xs text-foreground/70 placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 pt-6 border-t border-border/30">
            <p className="text-xs text-foreground/60 font-light tracking-wide">
              {recommendedProperties.length} properties match your preferences
            </p>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedProperties.map((property) => (
            <div
              key={property.id}
              onClick={() => setSelectedProperty(property)}
              className="group cursor-pointer transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-lg mb-5 aspect-[4/3]">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                {/* Property Type Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-light tracking-wide uppercase">
                    {property.type}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1">
                  <span className="text-xs text-white font-light">★ {property.rating}</span>
                </div>
              </div>

              {/* Property Info */}
              <div className="space-y-3">
                <h3
                  className="font-light text-xl text-foreground group-hover:text-accent transition"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {property.name}
                </h3>

                <p className="text-xs text-foreground/60 font-light tracking-wide">{property.location}</p>

                <div className="flex items-center justify-between gap-4 text-xs text-foreground/70 font-light">
                  <span>{property.bedrooms} Bed</span>
                  <span>•</span>
                  <span>{property.bathrooms} Bath</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {property.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className="px-2 py-1 bg-secondary text-xs text-foreground/70 font-light rounded">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-border/30 flex items-center justify-between">
                  <span className="text-lg text-accent font-light">₹{property.price.toLocaleString()}</span>
                  <span className="text-xs text-foreground/50 font-light">/night</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {recommendedProperties.length === 0 && (
          <div className="text-center py-16">
            <p className="text-foreground/60 font-light text-lg">
              No properties match your current filters. Try adjusting your preferences.
            </p>
          </div>
        )}

        {/* Property Detail Modal */}
        {selectedProperty && (
          <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProperty(null)}
          >
            <div
              className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProperty.image || "/placeholder.svg"}
                  alt={selectedProperty.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition"
                >
                  ✕
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <h2 className="font-light text-3xl text-foreground mb-2" style={{ fontFamily: "Georgia, serif" }}>
                    {selectedProperty.name}
                  </h2>
                  <p className="text-sm text-foreground/60 font-light">{selectedProperty.location}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-xs text-foreground/60 font-light mb-1">Bedrooms</p>
                    <p className="text-2xl text-foreground font-light">{selectedProperty.bedrooms}</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-xs text-foreground/60 font-light mb-1">Bathrooms</p>
                    <p className="text-2xl text-foreground font-light">{selectedProperty.bathrooms}</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-xs text-foreground/60 font-light mb-1">Rating</p>
                    <p className="text-2xl text-accent font-light">★{selectedProperty.rating}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-foreground font-semibold mb-3 tracking-wide uppercase">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProperty.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        <span className="text-sm text-foreground/70 font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-border/30 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-foreground/60 font-light mb-1">Price per night</p>
                    <p className="text-3xl text-accent font-light">₹{selectedProperty.price.toLocaleString()}</p>
                  </div>
                  <button className="px-8 py-3 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition font-light text-sm tracking-wide uppercase">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
