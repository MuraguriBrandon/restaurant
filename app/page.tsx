"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function RestaurantLanding() {
  const [isReservationOpen, setIsReservationOpen] = useState(false)
  const [reservationData, setReservationData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  })

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    alert(
      `Reservation request submitted for ${reservationData.name} on ${reservationData.date} at ${reservationData.time} for ${reservationData.guests} guests. We'll contact you shortly to confirm!`,
    )
    setIsReservationOpen(false)
    setReservationData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      specialRequests: "",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight text-amber-900">Eden's Restaurant</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-amber-700 transition-colors">
              Home
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-amber-700 transition-colors">
              About
            </Link>
            <Link href="/menu" className="text-sm font-medium hover:text-amber-700 transition-colors">
              Menu
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-amber-700 transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-amber-700 transition-colors">
              Contact
            </Link>
          </nav>
          <Button
            onClick={() => setIsReservationOpen(true)}
            className="bg-amber-700 hover:bg-amber-800 text-white font-semibold"
          >
            Reserve a Table
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Eden%27s%20restaurant-t99GR4PTT2ynHVJX8zkcLlYjPCAYhp.jpeg"
              alt="Restaurant interior"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="container relative z-10 flex flex-col items-center text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Eden's Restaurant</h1>
            <p className="text-xl md:text-2xl text-white font-light max-w-2xl">Experience Culinary Excellence</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="/menu">
                <Button className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-6">
                  View Our Menu
                </Button>
              </Link>
              <Button
                onClick={() => setIsReservationOpen(true)}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-amber-800 font-semibold px-8 py-6"
              >
                Make a Reservation
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-amber-50">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight text-amber-900">Our Story</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-amber-800">Mission</h3>
                    <p className="text-muted-foreground">
                      "To provide high quality meals and outstanding service in a welcoming environment that makes every
                      guest feel at home."
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-amber-800">Vision</h3>
                    <p className="text-muted-foreground">
                      "To become the leading restaurant in the region and expand throughout the country, known for
                      innovating cuisine across cultures."
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Located at Pacific University in Nairobi, Eden's Restaurant brings together the best of local and
                  international cuisine. Our chefs craft each dish with passion and precision, using only the freshest
                  ingredients to create memorable dining experiences.
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Outerior-Fw7jcgVTDB9aMfPD8IrjhfBWAQjI9a.jpeg"
                  alt="Restaurant outdoor dining area"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Menu Preview Section */}
        <section id="menu-preview" className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-amber-900">Menu Preview</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Get a taste of our carefully crafted menu featuring a fusion of local and international cuisine.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Local Cuisine Preview */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-amber-800 border-b border-amber-200 pb-2">Local Cuisine</h3>
                <div className="space-y-6">
                  {[
                    {
                      name: "Nyama Choma",
                      description: "Traditional Kenyan roasted meat served with kachumbari salad",
                      price: "KSh 950",
                    },
                    {
                      name: "Ugali with Sukuma Wiki",
                      description: "Kenyan staple cornmeal with sautéed collard greens",
                      price: "KSh 650",
                    },
                    {
                      name: "Swahili Fish Curry",
                      description: "Fresh fish cooked in coconut curry with aromatic spices",
                      price: "KSh 1,100",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <span className="font-medium text-amber-800">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* International Cuisine Preview */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-amber-800 border-b border-amber-200 pb-2">
                  International Cuisine
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      name: "Mediterranean Pasta",
                      description: "Fresh pasta with sun-dried tomatoes, olives, and feta cheese",
                      price: "KSh 850",
                    },
                    {
                      name: "Asian Stir Fry",
                      description: "Vegetables and choice of protein in a savory sauce with rice",
                      price: "KSh 900",
                    },
                    {
                      name: "Classic Burger",
                      description: "Juicy beef patty with cheese, lettuce, and special sauce",
                      price: "KSh 750",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <span className="font-medium text-amber-800">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/menu">
                <Button className="bg-amber-700 hover:bg-amber-800 text-white font-semibold">View Full Menu</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-amber-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-amber-900">What Our Guests Say</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our satisfied guests have to say about their dining
                experience at Eden's Restaurant.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Local Professional",
                  quote:
                    "Eden's Restaurant is my go-to place for business lunches. The service is impeccable and the food is consistently excellent.",
                },
                {
                  name: "David Mwangi",
                  role: "University Professor",
                  quote:
                    "The fusion of local and international cuisine is brilliantly executed. I bring all my visiting colleagues here for an authentic yet innovative dining experience.",
                },
                {
                  name: "Emma Chen",
                  role: "Tourist",
                  quote:
                    "During my visit to Nairobi, Eden's Restaurant was recommended to me, and it did not disappoint. The warm ambiance and delicious food made my trip memorable.",
                },
              ].map((testimonial, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col text-center space-y-4">
                      <div>
                        <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight text-amber-900">Visit Us</h2>
                <p className="text-muted-foreground">
                  We'd love to welcome you to Eden's Restaurant. Make a reservation or simply drop by for an
                  unforgettable dining experience.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-amber-700" />
                    <span>Pacific University, Thika Road, Nairobi, Kenya</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-amber-700" />
                    <span>+254 712 345 678</span>
                  </div>
                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-2">Opening Hours</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>Monday - Friday</div>
                      <div>10:00 AM - 10:00 PM</div>
                      <div>Saturday - Sunday</div>
                      <div>11:00 AM - 11:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7234567890123!2d36.833116405256995!3d-1.3236791572231377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTknMjUuMiJTIDM2wrA0OScxMS4yIkU!5e0!3m2!1sen!2ske!4v1234567890123!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-amber-800 text-white">
          <div className="container text-center space-y-6">
            <h2 className="text-3xl font-bold text-white">Ready to Experience Eden's?</h2>
            <p className="max-w-2xl mx-auto text-amber-100">
              Join us for a memorable dining experience with exceptional food and warm hospitality.
            </p>
            <Button
              onClick={() => setIsReservationOpen(true)}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-amber-800 font-semibold"
            >
              Make a Reservation
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-amber-900 text-amber-100 py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Eden's Restaurant</h3>
              <p className="text-sm text-amber-200">
                A culinary haven where local meets international, creating an unforgettable dining experience.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition-colors text-amber-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-white transition-colors text-amber-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="hover:text-white transition-colors text-amber-200">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="hover:text-white transition-colors text-amber-200">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-white transition-colors text-amber-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
              <p className="text-sm mb-4 text-amber-200">
                Subscribe to receive updates on special events and promotions.
              </p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="px-3 py-2 rounded text-black text-sm flex-1" />
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-sm">
            <p className="text-amber-200">&copy; {new Date().getFullYear()} Eden's Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Reservation Modal */}
      {isReservationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-amber-900">Reserve a Table</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsReservationOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleReservationSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={reservationData.name}
                      onChange={(e) => setReservationData({ ...reservationData, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={reservationData.email}
                      onChange={(e) => setReservationData({ ...reservationData, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={reservationData.phone}
                    onChange={(e) => setReservationData({ ...reservationData, phone: e.target.value })}
                    placeholder="+254 712 345 678"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={reservationData.date}
                      onChange={(e) => setReservationData({ ...reservationData, date: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time *</Label>
                    <Select
                      value={reservationData.time}
                      onValueChange={(value) => setReservationData({ ...reservationData, time: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="10:30">10:30 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="11:30">11:30 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="12:30">12:30 PM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="13:30">1:30 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="14:30">2:30 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="15:30">3:30 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                        <SelectItem value="16:30">4:30 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                        <SelectItem value="17:30">5:30 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        <SelectItem value="18:30">6:30 PM</SelectItem>
                        <SelectItem value="19:00">7:00 PM</SelectItem>
                        <SelectItem value="19:30">7:30 PM</SelectItem>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                        <SelectItem value="20:30">8:30 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                        <SelectItem value="21:30">9:30 PM</SelectItem>
                        <SelectItem value="22:00">10:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests">Number of Guests *</Label>
                  <Select
                    value={reservationData.guests}
                    onValueChange={(value) => setReservationData({ ...reservationData, guests: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5">5 Guests</SelectItem>
                      <SelectItem value="6">6 Guests</SelectItem>
                      <SelectItem value="7">7 Guests</SelectItem>
                      <SelectItem value="8">8 Guests</SelectItem>
                      <SelectItem value="8+">8+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="requests">Special Requests</Label>
                  <Textarea
                    id="requests"
                    value={reservationData.specialRequests}
                    onChange={(e) => setReservationData({ ...reservationData, specialRequests: e.target.value })}
                    placeholder="Any dietary restrictions, special occasions, or other requests..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsReservationOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-semibold">
                    Submit Reservation
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
