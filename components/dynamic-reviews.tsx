"use client"

import { useEffect, useState } from "react"

interface Review {
  author: string
  rating: number
  text: string
  platform: "google" | "airbnb" | "direct"
  date: string
}

export default function DynamicReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews/fetch")
        const data = await response.json()

        if (data.success) {
          setReviews(data.reviews)
        } else {
          setError("Unable to load reviews")
        }
      } catch (err) {
        console.error("Error fetching reviews:", err)
        setError("Failed to load reviews")
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading reviews...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  return (
    <div>
      {reviews.length > 0 ? (
        <div className="text-sm text-muted-foreground">
          Reviews loaded dynamically from Airbnb and Google Maps sources
        </div>
      ) : (
        <div className="text-center text-muted-foreground">No reviews available</div>
      )}
    </div>
  )
}
