"use client"

import type React from "react"
import { useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    console.log("Form submitted:", formData)
    setSubmitted(true)
    setFormData({ name: "", email: "", phone: "", message: "" })

    setTimeout(() => {
      setSubmitted(false)
    }, 5000)
  }

  const contactMethods = [
    {
      icon: "📞",
      title: "Call Us",
      value: "+91 700 056 7378",
      link: "tel:+917000567378",
      description: "Mon-Sun, 9 AM - 9 PM",
    },
    {
      icon: "💬",
      title: "WhatsApp",
      value: "Chat with us",
      link: "https://wa.me/917000567378",
      description: "Instant replies",
    },
    {
      icon: "📧",
      title: "Email",
      value: "hello@ambistay.in",
      link: "mailto:hello@ambistay.in",
      description: "We'll respond within 24 hours",
    },
  ]

  const socialLinks = [
    { name: "Facebook", icon: "f", url: "https://facebook.com" },
    { name: "Instagram", icon: "📷", url: "https://instagram.com/ambistay" },
    { name: "Twitter", icon: "𝕏", url: "https://twitter.com" },
  ]

  return (
    <section id="contact" className="py-32 bg-card border-t border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs text-accent font-light tracking-widest uppercase mb-4">Contact</p>
          <h2 className="font-light text-5xl md:text-6xl text-foreground mb-6" style={{ fontFamily: "Georgia, serif" }}>
            Get in Touch
          </h2>
          <p className="text-foreground/60 font-light text-lg">
            Have questions? We'd love to help. Reach out through any of these channels.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, idx) => (
            <a
              key={idx}
              href={method.link}
              className="group p-8 bg-background border border-border/30 rounded-lg hover:border-accent/50 hover:bg-secondary/20 transition-all text-center hover:scale-105"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-center">
                {method.icon}
              </div>
              <h3 className="font-light text-lg text-foreground mb-2 tracking-wide">{method.title}</h3>
              <p className="text-foreground/80 font-light mb-2 group-hover:text-accent transition">{method.value}</p>
              <p className="text-xs text-foreground/50 font-light">{method.description}</p>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-background border border-border/30 rounded-lg p-8 max-w-2xl mx-auto mb-12">
          {submitted ? (
            <div className="text-center py-12 animate-fade-in-up">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-light text-foreground mb-2">Thank You!</h3>
              <p className="text-foreground/60 font-light">
                Your message has been sent successfully. We'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent font-light ${
                    errors.name ? "ring-2 ring-destructive" : ""
                  }`}
                />
                {errors.name && <p className="text-xs text-destructive mt-1 font-light">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent font-light ${
                    errors.email ? "ring-2 ring-destructive" : ""
                  }`}
                />
                {errors.email && <p className="text-xs text-destructive mt-1 font-light">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone (Optional)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent font-light"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent font-light resize-none ${
                    errors.message ? "ring-2 ring-destructive" : ""
                  }`}
                />
                {errors.message && <p className="text-xs text-destructive mt-1 font-light">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-light text-sm tracking-wide uppercase transition-all hover:scale-105"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Social Links & Footer */}
        <div className="text-center pt-8 border-t border-border/30">
          <p className="text-foreground/60 font-light mb-6 tracking-wide text-sm uppercase">
            Follow us on social media
          </p>
          <div className="flex justify-center gap-4 mb-8">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-secondary border border-border/30 rounded-full flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all hover:scale-110"
                aria-label={social.name}
              >
                <span className="text-lg">{social.icon}</span>
              </a>
            ))}
          </div>
          <p className="text-xs text-foreground/40 font-light tracking-wide">© 2025 Ambi Stay. All rights reserved.</p>
        </div>
      </div>
    </section>
  )
}
