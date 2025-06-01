"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, Plus, Minus, Trash2, Download, X } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"

// QR Code component
import QRCode from "react-qr-code"

type MenuItem = {
  id: string
  name: string
  description: string
  price: string
  category: string
  spicy?: boolean
  vegetarian?: boolean
  image?: string
  priceValue: number // Numeric value for calculations
}

type CartItem = MenuItem & {
  quantity: number
}

export default function MenuPage() {
  const { toast } = useToast()
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
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [orderNotes, setOrderNotes] = useState("")
  const [menuUrl, setMenuUrl] = useState("")

  // Set the menu URL for QR code once the component mounts
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                   (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
    setMenuUrl(`${baseUrl}/menu`)
  }, [])

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })

    toast({
      title: "Added to order",
      description: `${item.name} has been added to your order.`,
      duration: 2000,
    })
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.priceValue * item.quantity, 0)
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Empty order",
        description: "Please add items to your order before checking out.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would submit the order to a backend
    alert(`Order placed successfully! Total: KSh ${calculateTotal().toLocaleString()}`)
    setCart([])
    setCartOpen(false)
  }

  const downloadQRCode = () => {
    const svg = document.getElementById("menu-qr-code")
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new window.Image()
    img.crossOrigin = "Anonymous"

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")

      const downloadLink = document.createElement("a")
      downloadLink.download = "edens-restaurant-menu-qr.png"
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
  }

  // Menu items with IDs and numeric price values
  const starters: MenuItem[] = [
    {
      id: "starter-1",
      name: "Salt & Pepper Squid",
      description: "Served with pickled cucumber roasted beetroot crème fraîche",
      price: "KSh 850",
      priceValue: 850,
      category: "Starter",
      spicy: false,
      vegetarian: false,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Salt%20and%20Pepper%20squid-DtH2LCIKCiGeOWwgtkaqio8BzIJjTI.jpeg",
    },
    {
      id: "starter-2",
      name: "Thai Salmon and Shrimp",
      description: "Seasoned and grilled salmon, red mashed potatoes sautéed green beans and thai chili sauce",
      price: "KSh 1,200",
      priceValue: 1200,
      category: "Starter",
      spicy: true,
      vegetarian: false,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Thai%20Salmon%20and%20Shrimp-JlenzHf7QXOWoCukFz0JjHdWQispH3.jpeg",
    },
    {
      id: "starter-3",
      name: "Shrimp Cocktail",
      description: "Chilled jumbo prawns served with classic tangy cocktail sauce de lemon",
      price: "KSh 950",
      priceValue: 950,
      category: "Starter",
      spicy: false,
      vegetarian: false,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shrimp%20Cocktail-vk2kRV73Pz9PW1z2TdJxktRq0Ib6Vh.jpeg",
    },
  ]

  const mainCourses: MenuItem[] = [
    {
      id: "main-1",
      name: "Ugali Served with Nyama Choma",
      description: "Maize porridge paired with grilled meat",
      price: "KSh 1,100",
      priceValue: 1100,
      category: "Main Course",
      spicy: false,
      vegetarian: false,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ugali%20Served%20with%20Nyama%20Choma-eZmXfiGOb1zktlRsGDkKRcsoQPcHIZ.jpeg",
    },
    {
      id: "main-2",
      name: "Nyama Choma Served with Ugali & Kachumbari",
      description: "Grilled meat accompanied by maize porridge and a tomato-onion salad",
      price: "KSh 1,200",
      priceValue: 1200,
      category: "Main Course",
      spicy: false,
      vegetarian: false,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nyama%20Choma%20Served%20with%20Ugali%20%26%20Kachumbari-T3O2pnvwjzfazFCGd7E616EHlZrWAX.jpeg",
    },
    {
      id: "main-3",
      name: "Grilled Salmon",
      description: "Salmon fillet grilled with a honey-mustard glaze",
      price: "KSh 1,400",
      priceValue: 1400,
      category: "Main Course",
      spicy: false,
      vegetarian: false,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Grilled%20Salmon-A3kUXbk4pY1HiANlZvkz5nLbRELxRT.jpeg",
    },
    {
      id: "main-4",
      name: "Bulgogi",
      description: "Korean marinated grilled beef with a sweet-savory flavour",
      price: "KSh 1,300",
      priceValue: 1300,
      category: "Main Course",
      spicy: false,
      vegetarian: false,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bulgogi-UugpzZfESjU0SVWd1iYOPNPUlf3VZO.jpeg",
    },
    {
      id: "main-5",
      name: "Oysters on the Half Shell",
      description: "Fresh oysters served with mignonette sauce",
      price: "KSh 1,500",
      priceValue: 1500,
      category: "Main Course",
      spicy: false,
      vegetarian: false,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oysters%20on%20the%20Half%20Shell-Cbzmkv9XdbUIvJKk8Af2Sqfgl21aUP.jpeg",
    },
  ]

  const desserts: MenuItem[] = [
    {
      id: "dessert-1",
      name: "Red Velvet Cake",
      description: "Fluffy cocoa layered cake with sweet cream cheese frosting",
      price: "KSh 450",
      priceValue: 450,
      category: "Dessert",
      spicy: false,
      vegetarian: true,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Red%20velvet%20cake-hh6MZE3pVIdOj2SWVKlSNPVfh7j2Xl.jpeg",
    },
    {
      id: "dessert-2",
      name: "Strawberry Shortcake",
      description: "Layers of fresh strawberries, light vanilla sponge cake and creamy custard",
      price: "KSh 500",
      priceValue: 500,
      category: "Dessert",
      spicy: false,
      vegetarian: true,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Strawberry%20Shortcake-oWnfur6TpLCpiaAWliiXm28KTeaCkX.jpeg",
    },
    {
      id: "dessert-3",
      name: "Ice Cream",
      description: "Choice vanilla, strawberry or chocolate. No-sugar-added ice cream is also available",
      price: "KSh 300",
      priceValue: 300,
      category: "Dessert",
      spicy: false,
      vegetarian: true,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ice%20cream-FQD02AroejyLRa8U8EHdIRjQDs6Vxi.jpeg",
    },
  ]

  const drinks: MenuItem[] = [
    {
      id: "drink-1",
      name: "Fresh Lemonade",
      description: "Freshly squeezed lemon juice with a hint of mint",
      price: "KSh 250",
      priceValue: 250,
      category: "Non-Alcoholic",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fresh%20Lemonade-UNiiTSdklxuqHsOmkJj0W1UpLb3HxA.jpeg",
    },
    {
      id: "drink-2",
      name: "Mojito Mocktail",
      description: "Refreshing mint and lime mocktail",
      price: "KSh 350",
      priceValue: 350,
      category: "Non-Alcoholic",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mojito%20Mocktail-kcMbutje4LD4eYe8uj8X5RLc94Wny3.jpeg",
    },
    {
      id: "drink-3",
      name: "Sparkling Rose",
      description: "Light and bubbly rosé wine",
      price: "KSh 650",
      priceValue: 650,
      category: "Alcoholic",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sparkling%20Rose-LfbKMi2n2CU0kXt07Q3g6Ky5EhVscT.jpeg",
    },
    {
      id: "drink-4",
      name: "Mimosa",
      description: "Classic champagne and orange juice cocktail",
      price: "KSh 550",
      priceValue: 550,
      category: "Alcoholic",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mimosa-iOTj42OjzqhzDZMhofYiojlL7b6uep.jpeg",
    },
    {
      id: "drink-5",
      name: "Two Islands",
      description: "House special cocktail blend",
      price: "KSh 600",
      priceValue: 600,
      category: "Alcoholic",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Two%20Islands-y5hPWTWExn8RYA9KdHsnh9ACq8ddjw.jpeg",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-amber-700 hover:text-amber-800">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <span className="text-xl font-semibold tracking-tight text-amber-900">Eden's Restaurant</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowQRCode(true)}
              className="hidden md:flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Menu QR Code
            </Button>

            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Your Order</SheetTitle>
                </SheetHeader>

                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[50vh]">
                    <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Your order is empty</p>
                    <Button variant="outline" className="mt-4" onClick={() => setCartOpen(false)}>
                      Browse Menu
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-auto py-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-4 border-b">
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Textarea
                        placeholder="Special instructions for your order..."
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        className="mb-4"
                      />

                      <div className="flex justify-between font-medium text-lg mb-4">
                        <span>Total:</span>
                        <span>KSh {calculateTotal().toLocaleString()}</span>
                      </div>

                      <Button
                        className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold"
                        onClick={handleCheckout}
                      >
                        Place Order
                      </Button>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>

            <Button
              onClick={() => setIsReservationOpen(true)}
              className="bg-amber-700 hover:bg-amber-800 text-white font-semibold"
            >
              Reserve a Table
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lasagna-po6wwcipX6qtd2vn2TUUbShPaTr5S2.jpeg"
              alt="Menu background"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="container relative z-10 flex flex-col items-center text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Our Menu</h1>
            <p className="text-lg md:text-xl text-white font-light max-w-2xl">
              Discover our fusion of authentic Kenyan flavors and international cuisine
            </p>
            <div className="flex gap-4 mt-4">
              <Button
                onClick={() => setCartOpen(true)}
                className="bg-amber-700 hover:bg-amber-800 text-white font-semibold"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                View Order
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-amber-800"
                onClick={() => setShowQRCode(true)}
              >
                <Download className="mr-2 h-4 w-4" />
                Menu QR Code
              </Button>
            </div>
          </div>
        </section>

        {/* Menu Content */}
        <section className="py-16">
          <div className="container space-y-16">
            {/* Starters */}
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-amber-900 mb-4">Starters</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Begin your culinary journey with our carefully crafted appetizers
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {starters.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={item.image || "/placeholder.svg?height=400&width=600"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <span className="text-lg font-semibold text-amber-800">{item.price}</span>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{item.category}</Badge>
                        {item.vegetarian && <Badge className="bg-green-100 text-green-800">Vegetarian</Badge>}
                        {item.spicy && <Badge className="bg-red-100 text-red-800">Spicy</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => addToCart(item)}
                        className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add to Order
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Main Courses */}
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-amber-900 mb-4">Main Courses</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Savor our signature dishes featuring local and international flavors
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mainCourses.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={item.image || "/placeholder.svg?height=400&width=600"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <span className="text-lg font-semibold text-amber-800">{item.price}</span>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{item.category}</Badge>
                        {item.vegetarian && <Badge className="bg-green-100 text-green-800">Vegetarian</Badge>}
                        {item.spicy && <Badge className="bg-red-100 text-red-800">Spicy</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => addToCart(item)}
                        className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add to Order
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Desserts */}
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-amber-900 mb-4">Desserts</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  End your meal on a sweet note with our delightful desserts
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {desserts.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={item.image || "/placeholder.svg?height=400&width=600"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <span className="text-lg font-semibold text-amber-800">{item.price}</span>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{item.category}</Badge>
                        {item.vegetarian && <Badge className="bg-green-100 text-green-800">Vegetarian</Badge>}
                        {item.spicy && <Badge className="bg-red-100 text-red-800">Spicy</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => addToCart(item)}
                        className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add to Order
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Drinks */}
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-amber-900 mb-4">Drinks</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Complement your meal with our selection of refreshing beverages
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drinks.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={item.image || "/placeholder.svg?height=400&width=600"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <span className="text-lg font-semibold text-amber-800">{item.price}</span>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{item.category}</Badge>
                        {item.vegetarian && <Badge className="bg-green-100 text-green-800">Vegetarian</Badge>}
                        {item.spicy && <Badge className="bg-red-100 text-red-800">Spicy</Badge>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => addToCart(item)}
                        className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add to Order
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-amber-800 text-white">
          <div className="container text-center space-y-6">
            <h2 className="text-3xl font-bold text-white">Ready to Order?</h2>
            <p className="max-w-2xl mx-auto text-amber-100">
              Add your favorite dishes to your order or reserve a table for a memorable dining experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setCartOpen(true)}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-amber-800 font-semibold"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                View Your Order
              </Button>
              <Button
                onClick={() => setIsReservationOpen(true)}
                className="bg-white text-amber-800 hover:bg-amber-100 font-semibold"
              >
                Reserve a Table
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* QR Code Modal */}
      {showQRCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-amber-900">Menu QR Code</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowQRCode(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg">
              <div className="p-4 bg-white rounded-lg shadow-sm border">
                <QRCode id="menu-qr-code" value={menuUrl} size={200} level="H" />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4 mb-6">
                Scan this QR code to view our menu on your device
              </p>
              <Button onClick={downloadQRCode} className="bg-amber-700 hover:bg-amber-800 text-white">
                <Download className="mr-2 h-4 w-4" />
                Download QR Code
              </Button>
            </div>
          </div>
        </div>
      )}

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
