import { NextResponse } from "next/server"

// This endpoint can be extended to integrate with Airbnb and Google Maps APIs
export async function GET() {
  try {
    // Placeholder for future Airbnb API integration
    // Placeholder for future Google Maps API integration

    const staticReviews = [
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

    return NextResponse.json({
      success: true,
      reviews: staticReviews,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch reviews",
      },
      { status: 500 },
    )
  }
}
