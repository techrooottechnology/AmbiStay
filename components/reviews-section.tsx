"use client"

import { useState, useEffect } from "react"

interface Review {
  name: string
  rating: number
  text: string
  image: string
  date: string
}

export default function ReviewsSection() {
  const [currentReview, setCurrentReview] = useState(0)

  const reviews: Review[] = [
    {
      name: "Priya Sharma",
      rating: 5,
      text: "Absolutely magical! The farmhouse exceeded all our expectations. Perfect for our anniversary celebration. The staff was incredibly attentive and the ambiance was perfect.",
      image: "https://ambistay.in/wp-content/uploads/2022/07/open.jpg",
      date: "October 2024",
    },
    {
      name: "Rajesh Patel",
      rating: 5,
      text: "Best getaway we could ask for! The pool, the gardens, the rooms - everything is top-notch. We will definitely be coming back with our family.",
      image: "https://ambistay.in/wp-content/uploads/2022/07/rooms-e1658400733216-1536x925.jpg",
      date: "September 2024",
    },
    {
      name: "Anjali Verma",
      rating: 5,
      text: "Hosted our kitty party here and it was unforgettable! The space is perfect for gatherings, and the hospitality is unmatched. Highly recommended!",
      image: "https://ambistay.in/wp-content/uploads/2022/07/DSC_1451-1536x1022.jpg",
      date: "August 2024",
    },
    {
      name: "Vikram Singh",
      rating: 5,
      text: "The attention to detail is remarkable. From the welcome drinks to the personalized service, everything was perfect. A true luxury experience at an affordable price.",
      image: "/luxury-resort-guest.jpg",
      date: "July 2024",
    },
    {
      name: "Neha Gupta",
      rating: 5,
      text: "Brought my family for a weekend and we had the time of our lives. The kids loved the pool and gardens. The food was delicious and the rooms were spotless.",
      image: "/family-vacation-resort.jpg",
      date: "June 2024",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [reviews.length])

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <section id="reviews" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-light text-5xl md:text-6xl text-foreground mb-6">Guest Stories</h2>
          <p className="text-lg text-muted-foreground font-light mb-8">Hear from our delighted guests</p>
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-2xl ${i < Math.round(averageRating) ? "text-accent" : "text-border"}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-lg font-light text-foreground">{averageRating}</span>
            <span className="text-muted-foreground font-light">({reviews.length} verified reviews)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative h-96 bg-muted overflow-hidden">
            <img
              src={reviews[currentReview].image || "/placeholder.svg"}
              alt={reviews[currentReview].name}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>

          <div className="space-y-8">
            <div className="flex gap-1">
              {[...Array(reviews[currentReview].rating)].map((_, i) => (
                <span key={i} className="text-accent text-2xl">
                  ★
                </span>
              ))}
            </div>
            <p className="text-lg text-foreground leading-relaxed font-light">"{reviews[currentReview].text}"</p>
            <div>
              <p className="font-light text-foreground">{reviews[currentReview].name}</p>
              <p className="text-sm text-muted-foreground font-light">Verified Guest • {reviews[currentReview].date}</p>
            </div>

            <div className="flex gap-2 pt-4">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentReview(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentReview ? "bg-primary w-8" : "bg-border w-1.5"
                  }`}
                  aria-label={`View review ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-background border border-border p-8 space-y-4">
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-accent text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed font-light line-clamp-3">{review.text}</p>
              <div className="border-t border-border pt-4">
                <p className="font-light text-foreground text-sm">{review.name}</p>
                <p className="text-xs text-muted-foreground font-light">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
