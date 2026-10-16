"use client"

import { useState } from "react"

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const categories = ["all", "villas", "suites", "penthouses"]

  const galleryItems = [
    {
      url: "https://ambistay.in/wp-content/uploads/2022/07/DSC_1450-1536x1022.jpg",
      title: "Crown Jewel Penthouse",
      category: "penthouses",
      featured: true,
      type: "Penthouse",
    },
    {
      url: "https://ambistay.in/wp-content/uploads/2022/07/open.jpg",
      title: "Garden Terrace",
      category: "villas",
      featured: false,
      type: "Villa",
    },
    {
      url: "https://ambistay.in/wp-content/uploads/2022/07/rooms-e1658400733216-1536x925.jpg",
      title: "Luxury Suite Interior",
      category: "suites",
      featured: true,
      type: "Suite",
    },
    {
      url: "https://ambistay.in/wp-content/uploads/2022/07/DSC_1451-1536x1022.jpg",
      title: "Swimming Pool Area",
      category: "villas",
      featured: false,
      type: "Villa",
    },
    {
      url: "https://ambistay.in/wp-content/uploads/2022/07/open-1.jpg",
      title: "Outdoor Living Space",
      category: "penthouses",
      featured: false,
      type: "Penthouse",
    },
    {
      url: "https://ambistay.in/wp-content/uploads/2022/07/DSC_1449.jpeg",
      title: "Fine Dining Area",
      category: "suites",
      featured: false,
      type: "Suite",
    },
  ]

  const filteredItems =
    selectedCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  return (
    <section id="gallery" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs text-accent font-light tracking-widest uppercase mb-4">Gallery</p>
          <h2 className="font-light text-5xl md:text-6xl text-foreground mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Discover Our Residences
          </h2>
          <p className="text-foreground/60 font-light text-lg">
            Explore the finest details of our luxury properties through stunning photography.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 md:gap-4 mb-12 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-light tracking-widest uppercase transition whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-foreground/70 hover:text-foreground"
              }`}
            >
              {category === "all" ? "All Properties" : category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(item.url)}
              className={`relative overflow-hidden rounded-lg cursor-pointer group ${item.featured ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <div
                className={`relative bg-muted aspect-square md:aspect-auto ${item.featured ? "md:h-full min-h-96" : ""}`}
              >
                <img
                  src={item.url || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
              </div>

              {/* Property Info Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-light tracking-wide uppercase">
                    {item.type}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-light text-lg mb-1 tracking-wide">{item.title}</h3>
                  <p className="text-white/60 font-light text-xs tracking-widest uppercase">Click to view</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full">
              <img src={selectedImage || "/placeholder.svg"} alt="Full view" className="w-full rounded-lg" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition backdrop-blur-sm"
              >
                <span className="text-2xl">✕</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
