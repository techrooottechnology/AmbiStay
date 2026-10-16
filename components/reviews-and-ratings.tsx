"use client"

import type React from "react"

import { Star, MessageCircle, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

interface Review {
  author: string
  rating: number
  text: string
  platform: "google" | "airbnb" | "direct"
  date: string
}

interface RatingPlatform {
  name: string
  rating: number
  count: number
  icon: React.ReactNode
}

const reviews: Review[] = [
  {
    author: "Priya Sharma",
    rating: 5,
    text: "Amazing property with excellent hospitality. The farm setup is serene and perfect for a weekend getaway. Highly recommended!",
    platform: "google",
    date: "2 weeks ago",
  },
  {
    author: "Rahul Patel",
    rating: 5,
    text: "Outstanding experience! Beautiful rooms, friendly staff, and the location near Kerwa Dam is breathtaking. Will definitely visit again.",
    platform: "airbnb",
    date: "1 month ago",
  },
  {
    author: "Anjali Verma",
    rating: 5,
    text: "Perfect for family trips. Clean, comfortable, and the pricing is very affordable. Great value for money!",
    platform: "google",
    date: "3 weeks ago",
  },
  {
    author: "Vikram Singh",
    rating: 5,
    text: "Loved the peaceful ambiance and the warm hospitality. The property exceeded our expectations. Highly recommended for couples and groups.",
    platform: "airbnb",
    date: "1 week ago",
  },
  {
    author: "Neha Gupta",
    rating: 5,
    text: "Exceptional property with excellent amenities. The hosts are very responsive and helpful. Best budget stay in Bhopal!",
    platform: "google",
    date: "10 days ago",
  },
  {
    author: "Arun Kumar",
    rating: 5,
    text: "Fantastic experience from start to finish. The property is well-maintained and offers great comfort at affordable rates.",
    platform: "direct",
    date: "2 weeks ago",
  },
]

const platformRatings: RatingPlatform[] = [
  {
    name: "Google Reviews",
    rating: 4.8,
    count: 127,
    icon: (
      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
        G
      </div>
    ),
  },
  {
    name: "Airbnb",
    rating: 4.9,
    count: 94,
    icon: (
      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
        A
      </div>
    ),
  },
  {
    name: "Direct Bookings",
    rating: 4.9,
    count: 56,
    icon: (
      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
        <MessageCircle className="w-4 h-4 text-primary" />
      </div>
    ),
  },
]

const propertyAdvantages = [
  {
    title: "Affordable Luxury",
    description: "Experience premium comfort at budget-friendly rates starting from ₹3,000/night",
  },
  {
    title: "Prime Locations",
    description: "Strategically located near Kerwa Dam, Suraj Nagar, and key Bhopal attractions",
  },
  {
    title: "Perfect for Groups",
    description: "Spacious accommodations for 2-4 people with dedicated amenities for families and friends",
  },
  {
    title: "Exceptional Hospitality",
    description: "24/7 guest support with responsive hosts ensuring memorable stays",
  },
  {
    title: "Flexible Booking",
    description: "Easy cancellation policy and customizable packages for different group sizes",
  },
  {
    title: "Verified Safety",
    description: "Secure properties with essential amenities and strict hygiene standards",
  },
]

export default function ReviewsAndRatings() {
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setDisplayedReviews(reviews.slice(0, 3))
  }, [])

  const rotateReviews = () => {
    const nextIndex = (currentIndex + 3) % reviews.length
    setCurrentIndex(nextIndex)
    setDisplayedReviews(
      reviews.slice(nextIndex, nextIndex + 3).length < 3
        ? [...reviews.slice(nextIndex), ...reviews.slice(0, 3 - (reviews.length - nextIndex))]
        : reviews.slice(nextIndex, nextIndex + 3),
    )
  }

  const averageRating = (platformRatings.reduce((sum, p) => sum + p.rating, 0) / platformRatings.length).toFixed(1)

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-background via-card/30 to-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header with Overall Rating */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-2 text-foreground">
                Trusted by Guests Worldwide
              </h2>
              <p className="text-muted-foreground text-lg">Real reviews from real guests who chose Ambi Stay</p>
            </div>

            {/* Overall Rating Badge */}
            <div className="flex items-center gap-4 bg-card border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-4xl font-light text-primary mb-1">{averageRating}</div>
                <div className="flex gap-1 justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Average Rating</p>
              </div>
              <div className="w-px h-12 bg-border/50"></div>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">{277} Total Reviews</p>
                <p className="text-xs">Across all platforms</p>
              </div>
            </div>
          </div>

          {/* Platform Ratings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platformRatings.map((platform) => (
              <div
                key={platform.name}
                className="bg-card/50 border border-border/30 rounded-xl p-6 backdrop-blur-sm hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {platform.icon}
                    <div>
                      <p className="font-medium text-foreground text-sm">{platform.name}</p>
                      <p className="text-xs text-muted-foreground">{platform.count} reviews</p>
                    </div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-primary/50" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-light text-primary">{platform.rating}</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < Math.round(platform.rating) ? "fill-primary text-primary" : "text-border"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-light tracking-tight text-foreground">Latest Guest Reviews</h3>
            <button
              onClick={rotateReviews}
              className="px-4 py-2 text-sm font-medium text-foreground border border-border/50 rounded-full hover:bg-card/50 transition-colors"
            >
              See More
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedReviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-card/40 border border-border/30 rounded-xl p-6 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:bg-card/60"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-medium text-foreground">{review.author}</p>
                    <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm text-muted-foreground/90 leading-relaxed mb-4 italic">"{review.text}"</p>

                {/* Platform Badge */}
                <div className="inline-block">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      review.platform === "google"
                        ? "bg-blue-500/10 text-blue-400"
                        : review.platform === "airbnb"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-primary/10 text-primary"
                    }`}
                  >
                    {review.platform === "google"
                      ? "Google"
                      : review.platform === "airbnb"
                        ? "Airbnb"
                        : "Direct Booking"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Property Advantages */}
        <div className="bg-card/30 border border-border/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <h3 className="text-2xl font-light tracking-tight text-foreground mb-2">Why Choose Us?</h3>
          <p className="text-muted-foreground mb-10">
            Discover what makes Ambi Stay the perfect choice for your next getaway
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyAdvantages.map((advantage, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">{advantage.title}</h4>
                  <p className="text-sm text-muted-foreground">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
