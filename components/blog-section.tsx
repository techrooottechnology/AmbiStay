"use client"

import { useState } from "react"

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const posts = [
    {
      title: "Top 5 Things to Do in Bhopal",
      excerpt:
        "Discover the best attractions and experiences in and around Bhopal. From historical monuments to natural wonders.",
      date: "Oct 15, 2024",
      image: "https://ambistay.in/wp-content/uploads/2022/07/open-1.jpg",
      category: "guide",
      readTime: "5 min read",
    },
    {
      title: "Planning the Perfect Getaway",
      excerpt:
        "Tips and tricks for organizing an unforgettable farmhouse experience. Learn how to make the most of your stay.",
      date: "Oct 10, 2024",
      image: "https://ambistay.in/wp-content/uploads/2022/07/DSC_1449.jpeg",
      category: "tips",
      readTime: "4 min read",
    },
    {
      title: "Celebrate Special Moments",
      excerpt:
        "Why Ambi Stay is the ideal venue for your celebrations. Perfect for birthdays, anniversaries, and more.",
      date: "Oct 5, 2024",
      image: "https://ambistay.in/wp-content/uploads/2022/07/DSC_1453-1536x1022.jpg",
      category: "events",
      readTime: "3 min read",
    },
    {
      title: "Hidden Gems Around Bhopal",
      excerpt: "Explore lesser-known attractions and local favorites that make Bhopal truly special.",
      date: "Sep 28, 2024",
      image: "/bhopal-local-attractions.jpg",
      category: "guide",
      readTime: "6 min read",
    },
    {
      title: "Wellness Retreat at Ambi Stay",
      excerpt: "Rejuvenate your mind and body with our wellness packages and peaceful surroundings.",
      date: "Sep 20, 2024",
      image: "/wellness-retreat-spa.jpg",
      category: "tips",
      readTime: "5 min read",
    },
    {
      title: "Family Fun Activities",
      excerpt: "Create unforgettable memories with your family at our farmhouse with activities for all ages.",
      date: "Sep 15, 2024",
      image: "/family-activities-farmhouse.jpg",
      category: "events",
      readTime: "4 min read",
    },
  ]

  const localGuide = [
    {
      icon: "🍽️",
      title: "Local Cuisine",
      description: "Try authentic Bhopali dishes at nearby restaurants. Don't miss the famous Poha and Jalebi!",
    },
    {
      icon: "🛍️",
      title: "Shopping",
      description: "Visit New Market for traditional handicrafts, textiles, and souvenirs from local artisans.",
    },
    {
      icon: "🏛️",
      title: "Heritage Sites",
      description: "Explore UNESCO World Heritage sites like Sanchi Stupa and Bhimbetka Rock Shelters.",
    },
    {
      icon: "🌳",
      title: "Nature Trails",
      description: "Enjoy scenic walks at Van Vihar National Park and Kerwa Dam for wildlife spotting.",
    },
    {
      icon: "🎨",
      title: "Art & Culture",
      description: "Visit museums and galleries showcasing Bhopal's rich artistic heritage and history.",
    },
    {
      icon: "🏃",
      title: "Adventure Sports",
      description: "Try water sports at Kerwa Dam or trekking in nearby hills for adventure enthusiasts.",
    },
  ]

  const categories = [
    { id: "all", label: "All Posts" },
    { id: "guide", label: "Local Guide" },
    { id: "tips", label: "Tips & Tricks" },
    { id: "events", label: "Events" },
  ]

  const filteredPosts = selectedCategory === "all" ? posts : posts.filter((post) => post.category === selectedCategory)

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Travel Stories & Tips</h2>
          <p className="text-lg text-muted-foreground mb-8">Inspiration and guides for your next adventure</p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {filteredPosts.map((post, idx) => (
            <article
              key={idx}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  {post.readTime}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{post.category}</p>
                  <p className="text-xs text-muted-foreground">{post.date}</p>
                </div>
                <h3 className="font-bold text-lg text-foreground mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                <a
                  href="#"
                  className="text-primary font-semibold hover:text-primary/80 transition inline-flex items-center gap-2"
                >
                  Read More <span>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Local Guide Section */}
        <div className="bg-secondary/30 rounded-lg p-12">
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">Local Guide</h3>
            <p className="text-muted-foreground">Discover the best of Bhopal and surrounding areas</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {localGuide.map((item, idx) => (
              <div key={idx} className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="font-bold text-lg text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
