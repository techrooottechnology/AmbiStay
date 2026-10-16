"use client"

import type React from "react"

import { useState } from "react"

interface BookingFormProps {
  onClose: () => void
}

const ROOM_TYPES = [
  { id: "deluxe", name: "Deluxe Room", price: 8000, capacity: 2 },
  { id: "suite", name: "Luxury Suite", price: 12000, capacity: 4 },
  { id: "villa", name: "Private Villa", price: 18000, capacity: 6 },
]

export default function BookingForm({ onClose }: BookingFormProps) {
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: 2,
    roomType: "deluxe",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.checkIn) newErrors.checkIn = "Check-in date is required"
      if (!formData.checkOut) newErrors.checkOut = "Check-out date is required"
      if (formData.checkIn && formData.checkOut && formData.checkIn >= formData.checkOut) {
        newErrors.checkOut = "Check-out date must be after check-in date"
      }
    }

    if (step === 2) {
      if (!formData.name) newErrors.name = "Name is required"
      if (!formData.email) newErrors.email = "Email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"
      if (!formData.phone) newErrors.phone = "Phone number is required"
      else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) newErrors.phone = "Phone must be 10 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep()) return

    if (step < 3) {
      setStep(step + 1)
    } else {
      console.log("Booking submitted:", formData)
      alert("Thank you for your booking inquiry! We will contact you soon.")
      onClose()
    }
  }

  const selectedRoom = ROOM_TYPES.find((r) => r.id === formData.roomType)
  const nights =
    formData.checkIn && formData.checkOut
      ? Math.ceil(
          (new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24),
        )
      : 0
  const totalPrice = selectedRoom ? selectedRoom.price * nights : 0

  return (
    <div className="p-8 max-w-2xl">
      <h2 className="text-3xl font-serif font-bold text-foreground mb-2">Book Your Stay</h2>
      <p className="text-muted-foreground mb-8">Experience luxury at Ambi Stay</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Dates, Guests, and Room Selection */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Check-in Date</label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.checkIn ? "border-destructive" : "border-border"
                  }`}
                />
                {errors.checkIn && <p className="text-sm text-destructive mt-1">{errors.checkIn}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Check-out Date</label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.checkOut ? "border-destructive" : "border-border"
                  }`}
                />
                {errors.checkOut && <p className="text-sm text-destructive mt-1">{errors.checkOut}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Number of Guests</label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Select Room Type</label>
              <div className="space-y-2">
                {ROOM_TYPES.map((room) => (
                  <label
                    key={room.id}
                    className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary/30 transition"
                  >
                    <input
                      type="radio"
                      name="roomType"
                      value={room.id}
                      checked={formData.roomType === room.id}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <div className="ml-3 flex-1">
                      <p className="font-medium text-foreground">{room.name}</p>
                      <p className="text-sm text-muted-foreground">Up to {room.capacity} guests</p>
                    </div>
                    <p className="font-semibold text-primary">₹{room.price}/night</p>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Personal Information */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in-up">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.name ? "border-destructive" : "border-border"
                }`}
              />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? "border-destructive" : "border-border"
                }`}
              />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="10-digit number"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.phone ? "border-destructive" : "border-border"
                }`}
              />
              {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
            </div>
          </div>
        )}

        {/* Step 3: Special Requests and Summary */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in-up">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Special Requests (Optional)</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell us about any special requests or preferences..."
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="bg-secondary/30 p-4 rounded-lg space-y-3">
              <p className="font-semibold text-foreground">Booking Summary</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guest Name:</span>
                  <span className="text-foreground font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room Type:</span>
                  <span className="text-foreground font-medium">{selectedRoom?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in:</span>
                  <span className="text-foreground font-medium">{formData.checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out:</span>
                  <span className="text-foreground font-medium">{formData.checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Number of Nights:</span>
                  <span className="text-foreground font-medium">{nights}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guests:</span>
                  <span className="text-foreground font-medium">{formData.guests}</span>
                </div>
                <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
                  <span>Total Price:</span>
                  <span className="text-primary">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex-1 px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            {step === 3 ? "Complete Booking" : "Next"}
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-2 justify-center pt-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-2 w-8 rounded-full transition-all ${s <= step ? "bg-primary" : "bg-border"}`} />
          ))}
        </div>
      </form>
    </div>
  )
}
