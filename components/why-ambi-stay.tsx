"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"

interface Stat {
  value: number
  label: string
  suffix: string
}

export default function WhyAmbiStay() {
  const [stats, setStats] = useState<Stat[]>([{ value: 0, label: "Guest Rating", suffix: "/5" }])

  useEffect(() => {
    const targets = [4.8]
    const intervals = targets.map((target, idx) => {
      let current = 0
      return setInterval(() => {
        current += target / 30
        if (current >= target) {
          current = target
          clearInterval(intervals[idx])
        }
        setStats((prev) => {
          const newStats = [...prev]
          newStats[idx].value = current
          return newStats
        })
      }, 50)
    })

    return () => intervals.forEach(clearInterval)
  }, [])

  return (
    <section id="why" className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Why Us?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover what makes our farmhouse the perfect destination for your next escape
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition">
            <Star className="w-5 h-5 text-primary fill-primary" />
            <span className="text-foreground font-medium">Airbnb Super Host Last 5 Years</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition">
            <Star className="w-5 h-5 text-primary fill-primary" />
            <span className="text-foreground font-medium">Top Airbnb in Bhopal</span>
          </div>
        </div>

        <div className="grid md:grid-cols-1 gap-8 mb-16 max-w-sm mx-auto">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-8 h-8 text-primary fill-primary" />
                <div className="text-5xl font-bold text-primary">
                  {stat.value.toFixed(stat.value > 10 ? 0 : 1)}
                  {stat.suffix}
                </div>
              </div>
              <p className="text-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="font-serif text-3xl font-bold text-foreground">Your Private Sanctuary</h3>
            <ul className="space-y-4">
              {[
                "Exclusive farmhouse with complete privacy",
                "Lush green surroundings and peaceful ambiance",
                "Perfect for intimate gatherings and celebrations",
                "Pet-friendly environment for your furry friends",
                "Modern amenities with rustic charm",
                "Personalized service and attention to detail",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden">
            <img
              src="https://ambistay.in/wp-content/uploads/2022/07/DSC_1450-1536x1022.jpg"
              alt="Ambi Stay Farmhouse"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
