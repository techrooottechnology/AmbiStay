"use client"

import { useState } from "react"
import { Mail, Phone, MessageCircle, X } from "lucide-react"

export default function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const contactOptions = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      color: "bg-green-500 hover:bg-green-600",
      onClick: () => {
        const phoneNumber = "917000567378"
        const message = "Hello! I'd like to know more about Ambi Stay properties."
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, "_blank")
      },
    },
    {
      icon: Phone,
      label: "Call",
      color: "bg-blue-500 hover:bg-blue-600",
      onClick: () => {
        window.location.href = "tel:+917000567378"
      },
    },
    {
      icon: Mail,
      label: "Email",
      color: "bg-red-500 hover:bg-red-600",
      onClick: () => {
        window.location.href = "mailto:hello@ambistay.com"
      },
    },
  ]

  return (
    <>
      {/* Floating Contact Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Contact Options */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 flex flex-col gap-2 mb-2">
            {contactOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <button
                  key={index}
                  onClick={() => {
                    option.onClick()
                    setIsOpen(false)
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-full text-white ${option.color} transition shadow-lg animate-in slide-in-from-bottom-2`}
                  title={option.label}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              )
            })}
          </div>
        )}

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full text-white transition shadow-lg flex items-center justify-center ${
            isOpen ? "bg-primary rotate-45" : "bg-primary hover:bg-primary/90"
          }`}
          title="Contact Us"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>
    </>
  )
}
