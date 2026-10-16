"use client"

import { useState, useCallback } from "react"

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

interface UserBehavior {
  viewed: string[]
  favoriteTypes: Record<string, number>
  favoriteLocations: Record<string, number>
  favoriteFeatures: Record<string, number>
  pricePreference: number[]
}

const allProperties: Property[] = [
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

export default function RecommendationEngine() {
  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    viewed: [],
    favoriteTypes: {},
    favoriteLocations: {},
    favoriteFeatures: {},
    pricePreference: [],
  })

  const [recommendations, setRecommendations] = useState<Property[]>([])
  const [showRecommendations, setShowRecommendations] = useState(false)

  // Track property view
  const trackPropertyView = useCallback((property: Property) => {
    setUserBehavior((prev) => {
      const updated = { ...prev }

      // Track viewed properties
      if (!updated.viewed.includes(property.id)) {
        updated.viewed = [...updated.viewed, property.id]
      }

      // Track property type preference
      updated.favoriteTypes[property.type] = (updated.favoriteTypes[property.type] || 0) + 1

      // Track location preference
      updated.favoriteLocations[property.location] = (updated.favoriteLocations[property.location] || 0) + 1

      // Track feature preferences
      property.features.forEach((feature) => {
        updated.favoriteFeatures[feature] = (updated.favoriteFeatures[feature] || 0) + 1
      })

      // Track price range
      updated.pricePreference = [...updated.pricePreference, property.price]

      return updated
    })
  }, [])

  // Generate intelligent recommendations
  const generateRecommendations = useCallback(() => {
    if (userBehavior.viewed.length === 0) {
      // If no history, show top-rated properties
      setRecommendations(allProperties.sort((a, b) => b.rating - a.rating).slice(0, 3))
      setShowRecommendations(true)
      return
    }

    const scored = allProperties.map((property) => {
      let score = 0

      // Penalize already viewed properties
      if (userBehavior.viewed.includes(property.id)) {
        score -= 100
      }

      // Score based on property type preference
      if (userBehavior.favoriteTypes[property.type]) {
        score += userBehavior.favoriteTypes[property.type] * 20
      }

      // Score based on location preference
      if (userBehavior.favoriteLocations[property.location]) {
        score += userBehavior.favoriteLocations[property.location] * 15
      }

      // Score based on feature matching
      let featureMatches = 0
      property.features.forEach((feature) => {
        if (userBehavior.favoriteFeatures[feature]) {
          featureMatches++
          score += userBehavior.favoriteFeatures[feature] * 10
        }
      })

      // Score based on price similarity
      if (userBehavior.pricePreference.length > 0) {
        const avgPrice = userBehavior.pricePreference.reduce((a, b) => a + b, 0) / userBehavior.pricePreference.length
        const priceDiff = Math.abs(property.price - avgPrice)
        score += Math.max(0, 50 - priceDiff / 1000)
      }

      // Boost high-rated properties
      score += property.rating * 5

      return { property, score }
    })

    const topRecommendations = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.property)

    setRecommendations(topRecommendations)
    setShowRecommendations(true)
  }, [userBehavior])

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs text-accent font-light tracking-widest uppercase mb-4">AI Powered</p>
          <h2 className="font-light text-5xl md:text-6xl text-foreground mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Personalized Recommendations
          </h2>
          <p className="text-foreground/60 font-light text-lg max-w-2xl">
            Our intelligent engine learns from your preferences to suggest properties you'll love.
          </p>
        </div>

        {/* Behavior Stats */}
        {userBehavior.viewed.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-card rounded-lg p-6 border border-border/30">
              <p className="text-xs text-foreground/60 font-light tracking-widest uppercase mb-2">Properties Viewed</p>
              <p className="text-3xl text-accent font-light">{userBehavior.viewed.length}</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border/30">
              <p className="text-xs text-foreground/60 font-light tracking-widest uppercase mb-2">Favorite Type</p>
              <p className="text-lg text-foreground font-light capitalize">
                {Object.entries(userBehavior.favoriteTypes).sort(([, a], [, b]) => b - a)[0]?.[0] || "—"}
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border/30">
              <p className="text-xs text-foreground/60 font-light tracking-widest uppercase mb-2">Favorite Location</p>
              <p className="text-lg text-foreground font-light">
                {Object.entries(userBehavior.favoriteLocations).sort(([, a], [, b]) => b - a)[0]?.[0] || "—"}
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border/30">
              <p className="text-xs text-foreground/60 font-light tracking-widest uppercase mb-2">Avg Price Range</p>
              <p className="text-lg text-foreground font-light">
                {userBehavior.pricePreference.length > 0
                  ? `₹${Math.round(userBehavior.pricePreference.reduce((a, b) => a + b, 0) / userBehavior.pricePreference.length).toLocaleString()}`
                  : "—"}
              </p>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center mb-12">
          <button
            onClick={generateRecommendations}
            className="px-8 py-3 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition font-light text-sm tracking-wide uppercase"
          >
            Get Personalized Recommendations
          </button>
        </div>

        {/* Recommendations Grid */}
        {showRecommendations && (
          <div className="space-y-8 animate-fade-in-up">
            <h3 className="font-light text-2xl text-foreground tracking-wide">Recommended For You</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.map((property) => (
                <div
                  key={property.id}
                  onClick={() => trackPropertyView(property)}
                  className="group cursor-pointer transition-all duration-300"
                >
                  <div className="relative overflow-hidden rounded-lg mb-5 aspect-[4/3]">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-light tracking-wide uppercase">
                        Recommended
                      </span>
                    </div>
                  </div>

                  <h3
                    className="font-light text-xl text-foreground mb-2 group-hover:text-accent transition"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {property.name}
                  </h3>
                  <p className="text-xs text-foreground/60 font-light mb-3">{property.location}</p>
                  <p className="text-lg text-accent font-light">₹{property.price.toLocaleString()}/night</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
