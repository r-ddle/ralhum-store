"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, Award, Trophy, Target, ArrowRight, Eye } from "lucide-react"

const brands = [
  {
    name: "Gray-Nicolls",
    category: "Cricket",
    heritage: "Since 1855",
    description: "World's finest cricket equipment",
    image: "/placeholder.svg?height=200&width=300",
    color: "from-[#003DA5] to-[#1A1A1A]",
    icon: Trophy,
    products: ["Cricket Bats", "Protective Gear", "Gloves", "Pads"],
    featured: true,
  },
  {
    name: "Gilbert",
    category: "Rugby",
    heritage: "Since 1823",
    description: "Official Rugby World Cup supplier",
    image: "/placeholder.svg?height=200&width=300",
    color: "from-[#FF3D00] to-[#1A1A1A]",
    icon: Award,
    products: ["Rugby Balls", "Training Equipment", "Protective Gear", "Accessories"],
    featured: true,
  },
  {
    name: "Molten",
    category: "Basketball & Volleyball",
    heritage: "Innovation Leader",
    description: "Official tournament supplier worldwide",
    image: "/placeholder.svg?height=200&width=300",
    color: "from-[#FFD700] to-[#1A1A1A]",
    icon: Target,
    products: ["Basketballs", "Volleyballs", "Training Equipment", "Court Accessories"],
    featured: true,
  },
  {
    name: "Grays",
    category: "Hockey",
    heritage: "Field Sports Excellence",
    description: "Trusted by Olympic athletes",
    image: "/placeholder.svg?height=200&width=300",
    color: "from-[#AEEA00] to-[#1A1A1A]",
    icon: Star,
    products: ["Hockey Sticks", "Protective Equipment", "Balls", "Training Gear"],
    featured: true,
  },
  {
    name: "Dunlop",
    category: "Tennis & Squash",
    heritage: "Global Recognition",
    description: "Premium racquet sports equipment",
    image: "/placeholder.svg?height=200&width=300",
    color: "from-[#FF3D00] to-[#003DA5]",
    icon: Trophy,
    products: ["Tennis Rackets", "Squash Rackets", "Balls", "Accessories"],
    featured: false,
  },
  {
    name: "Slazenger",
    category: "Multi-Sport",
    heritage: "Wimbledon Heritage",
    description: "Official Wimbledon ball supplier",
    image: "/placeholder.svg?height=200&width=300",
    color: "from-[#AEEA00] to-[#FF3D00]",
    icon: Award,
    products: ["Tennis Equipment", "Cricket Gear", "Training Equipment", "Accessories"],
    featured: false,
  },
  {
    name: "Babolat",
    category: "Tennis & Badminton",
    heritage: "Racquet Innovation",
    description: "Professional racquet sports leader",
    image: "/placeholder.svg?height=200&width=300",
    color: "from-[#003DA5] to-[#AEEA00]",
    icon: Star,
    products: ["Tennis Rackets", "Badminton Rackets", "Strings", "Accessories"],
    featured: false,
  },
  {
    name: "Carlton",
    category: "Badminton",
    heritage: "Shuttlecock Specialists",
    description: "Premium badminton equipment",
    image: "/placeholder.svg?height=200&width=300",
    color: "from-[#FFD700] to-[#FF3D00]",
    icon: Target,
    products: ["Badminton Rackets", "Shuttlecocks", "Court Equipment", "Training Gear"],
    featured: false,
  },
]

const categories = [
  "All Categories",
  "Cricket",
  "Rugby",
  "Basketball & Volleyball",
  "Hockey",
  "Tennis & Squash",
  "Badminton",
  "Multi-Sport",
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBrands = brands.filter((brand) => {
    const matchesCategory = selectedCategory === "All Categories" || brand.category === selectedCategory
    const matchesSearch =
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredBrands = brands.filter((brand) => brand.featured)

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#003DA5] to-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#FFD700] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#AEEA00] rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <Badge className="bg-[#FFD700] text-[#1A1A1A] px-6 py-2 text-sm font-bold mb-4">PRODUCT SHOWCASE</Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              PREMIUM
              <span className="block text-[#FF3D00]">SPORTS BRANDS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover our extensive collection of world-renowned sports equipment from the most trusted brands in the
              industry. From professional athletes to weekend warriors, we have everything you need.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search brands or sports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder-gray-300 rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#FF3D00] text-white px-6 py-2 text-sm font-bold mb-4">FEATURED PARTNERSHIPS</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">
              EXCLUSIVE
              <span className="block text-[#003DA5]">BRAND PARTNERS</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our flagship partnerships with world-leading sports brands, bringing you authentic, professional-grade
              equipment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBrands.map((brand, index) => {
              const IconComponent = brand.icon
              return (
                <Card
                  key={brand.name}
                  className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden"
                >
                  <CardContent className="p-0">
                    {/* Brand Header */}
                    <div className={`bg-gradient-to-br ${brand.color} p-6 text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                      <div className="relative z-10">
                        <IconComponent className="w-8 h-8 mb-4" />
                        <h3 className="text-2xl font-black mb-2">{brand.name}</h3>
                        <p className="text-sm opacity-90">{brand.heritage}</p>
                      </div>
                    </div>

                    {/* Brand Content */}
                    <div className="p-6">
                      <Badge className="bg-[#FFD700] text-[#1A1A1A] mb-3 font-bold">{brand.category}</Badge>
                      <p className="text-gray-600 mb-4 leading-relaxed">{brand.description}</p>

                      {/* Product Categories */}
                      <div className="space-y-2 mb-6">
                        {brand.products.slice(0, 3).map((product) => (
                          <div key={product} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#AEEA00] rounded-full"></div>
                            <span className="text-sm text-gray-700 font-medium">{product}</span>
                          </div>
                        ))}
                        {brand.products.length > 3 && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#AEEA00] rounded-full"></div>
                            <span className="text-sm text-gray-500">+{brand.products.length - 3} more</span>
                          </div>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-2 border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white font-bold transition-all duration-300"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        VIEW PRODUCTS
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Category Filter & All Brands */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-[#AEEA00] text-[#1A1A1A] px-6 py-2 text-sm font-bold mb-4">ALL BRANDS</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">
              COMPLETE
              <span className="block text-[#FF3D00]">PRODUCT RANGE</span>
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-2 font-bold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#003DA5] text-white hover:bg-[#003DA5]/90"
                    : "border-2 border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* All Brands Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBrands.map((brand, index) => {
              const IconComponent = brand.icon
              return (
                <Card
                  key={brand.name}
                  className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden bg-white"
                >
                  <CardContent className="p-0">
                    {/* Brand Image */}
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={brand.image || "/placeholder.svg"}
                        alt={brand.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${brand.color} opacity-80`}></div>

                      {brand.featured && (
                        <Badge className="absolute top-4 left-4 bg-[#FFD700] text-[#1A1A1A] font-bold">FEATURED</Badge>
                      )}

                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent className="w-6 h-6 text-white" />
                          <span className="text-white text-sm font-bold">{brand.heritage}</span>
                        </div>
                        <h3 className="text-2xl font-black text-white">{brand.name}</h3>
                      </div>
                    </div>

                    {/* Brand Info */}
                    <div className="p-4">
                      <Badge className="bg-gray-100 text-gray-700 mb-2 text-xs">{brand.category}</Badge>
                      <p className="text-gray-600 text-sm mb-4">{brand.description}</p>

                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white font-bold"
                      >
                        VIEW DETAILS
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredBrands.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No brands found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSelectedCategory("All Categories")
                  setSearchTerm("")
                }}
                className="mt-4 bg-[#003DA5] hover:bg-[#003DA5]/90 text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Product Categories Overview */}
      <section className="py-20 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#FFD700] text-[#1A1A1A] px-6 py-2 text-sm font-bold mb-4">PRODUCT CATEGORIES</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              EQUIPMENT FOR
              <span className="block text-[#AEEA00]">EVERY SPORT</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { sport: "Cricket", items: "Bats, Balls, Protective Gear, Accessories", color: "bg-[#003DA5]" },
              { sport: "Rugby", items: "Balls, Training Equipment, Protective Gear", color: "bg-[#FF3D00]" },
              { sport: "Basketball", items: "Basketballs, Hoops, Training Equipment", color: "bg-[#FFD700]" },
              { sport: "Volleyball", items: "Volleyballs, Nets, Court Equipment", color: "bg-[#AEEA00]" },
              { sport: "Hockey", items: "Sticks, Balls, Protective Equipment", color: "bg-[#FF3D00]" },
              { sport: "Tennis", items: "Rackets, Balls, Court Accessories", color: "bg-[#003DA5]" },
            ].map((category, index) => (
              <Card
                key={category.sport}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.sport}</h3>
                  <p className="text-gray-300 text-sm">{category.items}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#003DA5] to-[#FF3D00] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">READY TO ORDER?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact our team for bulk orders, custom requirements, or product consultations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#003DA5] hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-full"
            >
              GET QUOTE NOW
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#003DA5] px-8 py-4 text-lg font-bold rounded-full bg-transparent"
            >
              CONTACT SALES TEAM
            </Button>
          </div>

          {/* E-commerce Teaser */}
          <div className="mt-12 bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-2">🚀 E-COMMERCE PLATFORM COMING SOON!</h3>
            <p className="text-sm opacity-90">
              Shop online for all your favorite sports equipment. Be the first to know when we launch!
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
