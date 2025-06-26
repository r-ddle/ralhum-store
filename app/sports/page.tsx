"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Target, Award, ArrowRight, Eye, Phone, Star } from "lucide-react"

const sportsCategories = [
  {
    name: "Cricket",
    description: "Complete cricket equipment from professional bats to protective gear",
    longDescription:
      "Cricket is Sri Lanka's most beloved sport, and we provide everything needed from village greens to international stadiums. Our Gray-Nicolls partnership ensures access to world-class equipment used by professional players worldwide.",
    image: "/placeholder.svg?height=400&width=600",
    color: "from-[#003DA5] to-[#1A1A1A]",
    icon: Trophy,
    brands: ["Gray-Nicolls", "Slazenger"],
    equipment: [
      {
        name: "Cricket Bats",
        description: "Professional and recreational bats for all skill levels",
        price: "From LKR 5,000",
      },
      { name: "Protective Gear", description: "Helmets, pads, gloves, and body protection", price: "From LKR 2,500" },
      {
        name: "Cricket Balls",
        description: "Match and practice balls meeting international standards",
        price: "From LKR 800",
      },
      {
        name: "Stumps & Bails",
        description: "Wooden and spring-loaded stumps for all formats",
        price: "From LKR 1,200",
      },
      { name: "Kit Bags", description: "Durable bags for carrying all cricket equipment", price: "From LKR 3,000" },
      { name: "Training Equipment", description: "Cones, markers, and skill development tools", price: "From LKR 500" },
    ],
    levels: ["Professional", "Club", "School", "Recreational"],
    popular: true,
    featured: true,
  },
  {
    name: "Rugby",
    description: "Professional rugby equipment and training gear",
    longDescription:
      "Rugby is growing rapidly in Sri Lanka, and our exclusive Gilbert partnership brings you the same equipment used in Rugby World Cups. From grassroots to professional level, we support the development of rugby across the island.",
    image: "/placeholder.svg?height=400&width=600",
    color: "from-[#FF3D00] to-[#1A1A1A]",
    icon: Award,
    brands: ["Gilbert"],
    equipment: [
      { name: "Rugby Balls", description: "Match and training balls for all levels", price: "From LKR 3,500" },
      {
        name: "Protective Gear",
        description: "Headguards, shoulder pads, and body protection",
        price: "From LKR 4,000",
      },
      {
        name: "Training Equipment",
        description: "Tackle bags, cones, and skill development tools",
        price: "From LKR 1,500",
      },
      { name: "Goal Posts", description: "Portable and permanent goal post systems", price: "From LKR 25,000" },
      { name: "Team Accessories", description: "Kit bags, water bottles, and team equipment", price: "From LKR 2,000" },
      { name: "Referee Equipment", description: "Whistles, cards, and officiating gear", price: "From LKR 800" },
    ],
    levels: ["Professional", "Club", "School", "Youth"],
    popular: true,
    featured: true,
  },
  {
    name: "Basketball",
    description: "Court equipment and professional basketballs",
    longDescription:
      "Basketball continues to grow in popularity across Sri Lanka. Our Molten partnership provides the same balls used in Olympic Games and professional leagues worldwide, ensuring quality and performance at every level.",
    image: "/placeholder.svg?height=400&width=600",
    color: "from-[#FFD700] to-[#1A1A1A]",
    icon: Target,
    brands: ["Molten"],
    equipment: [
      { name: "Basketballs", description: "Indoor and outdoor balls for all skill levels", price: "From LKR 2,500" },
      { name: "Basketball Hoops", description: "Portable and wall-mounted hoop systems", price: "From LKR 15,000" },
      {
        name: "Training Equipment",
        description: "Cones, agility ladders, and skill development tools",
        price: "From LKR 1,000",
      },
      {
        name: "Court Accessories",
        description: "Scoreboards, shot clocks, and court equipment",
        price: "From LKR 5,000",
      },
      {
        name: "Protective Gear",
        description: "Knee pads, ankle supports, and protective equipment",
        price: "From LKR 1,500",
      },
      { name: "Team Equipment", description: "Ball carts, pumps, and team accessories", price: "From LKR 3,000" },
    ],
    levels: ["Professional", "Club", "School", "Recreational"],
    popular: true,
    featured: true,
  },
  {
    name: "Volleyball",
    description: "Professional volleyballs and net systems",
    longDescription:
      "Volleyball is popular in schools and clubs across Sri Lanka. Our Molten volleyballs are used in international competitions, providing consistent performance and durability for players at all levels.",
    image: "/placeholder.svg?height=400&width=600",
    color: "from-[#AEEA00] to-[#1A1A1A]",
    icon: Star,
    brands: ["Molten"],
    equipment: [
      { name: "Volleyballs", description: "Indoor and beach volleyballs for all levels", price: "From LKR 2,000" },
      { name: "Volleyball Nets", description: "Competition and recreational net systems", price: "From LKR 8,000" },
      { name: "Net Posts", description: "Portable and permanent post systems", price: "From LKR 12,000" },
      {
        name: "Training Equipment",
        description: "Serving machines, cones, and training aids",
        price: "From LKR 2,500",
      },
      {
        name: "Protective Gear",
        description: "Knee pads, ankle supports, and safety equipment",
        price: "From LKR 1,200",
      },
      {
        name: "Court Accessories",
        description: "Line markers, scoreboards, and court equipment",
        price: "From LKR 3,500",
      },
    ],
    levels: ["Professional", "Club", "School", "Beach"],
    popular: false,
    featured: true,
  },
  {
    name: "Hockey",
    description: "Field hockey sticks and protective equipment",
    longDescription:
      "Field hockey has a strong tradition in Sri Lankan schools and clubs. Our Grays partnership provides Olympic-standard equipment trusted by international players and coaches worldwide.",
    image: "/placeholder.svg?height=400&width=600",
    color: "from-[#FF3D00] to-[#003DA5]",
    icon: Trophy,
    brands: ["Grays"],
    equipment: [
      { name: "Hockey Sticks", description: "Composite and wooden sticks for all positions", price: "From LKR 4,000" },
      { name: "Hockey Balls", description: "Match and training balls for all surfaces", price: "From LKR 600" },
      {
        name: "Protective Equipment",
        description: "Shin guards, gloves, and goalkeeping gear",
        price: "From LKR 2,000",
      },
      { name: "Goals", description: "Portable and permanent goal systems", price: "From LKR 20,000" },
      {
        name: "Training Equipment",
        description: "Cones, hurdles, and skill development tools",
        price: "From LKR 1,500",
      },
      { name: "Team Accessories", description: "Kit bags, stick bags, and team equipment", price: "From LKR 2,500" },
    ],
    levels: ["Professional", "Club", "School", "Youth"],
    popular: false,
    featured: true,
  },
  {
    name: "Tennis",
    description: "Rackets, balls, and court accessories",
    longDescription:
      "Tennis is enjoyed by players of all ages across Sri Lanka. Our partnerships with Dunlop, Slazenger, and Babolat provide access to equipment used by professional players on the world's biggest courts.",
    image: "/placeholder.svg?height=400&width=600",
    color: "from-[#AEEA00] to-[#FF3D00]",
    icon: Award,
    brands: ["Dunlop", "Slazenger", "Babolat"],
    equipment: [
      {
        name: "Tennis Rackets",
        description: "Professional and recreational rackets for all levels",
        price: "From LKR 8,000",
      },
      { name: "Tennis Balls", description: "Tournament and practice balls", price: "From LKR 1,200" },
      { name: "Court Accessories", description: "Nets, posts, and court equipment", price: "From LKR 15,000" },
      { name: "Training Equipment", description: "Ball machines, cones, and training aids", price: "From LKR 5,000" },
      {
        name: "Stringing Services",
        description: "Professional racket stringing and maintenance",
        price: "From LKR 1,500",
      },
      { name: "Accessories", description: "Grips, dampeners, and maintenance equipment", price: "From LKR 300" },
    ],
    levels: ["Professional", "Club", "School", "Recreational"],
    popular: true,
    featured: false,
  },
  {
    name: "Badminton",
    description: "Rackets, shuttlecocks, and court equipment",
    longDescription:
      "Badminton is one of the most popular recreational sports in Sri Lanka. Our partnerships with Carlton and Babolat provide high-quality equipment for players from beginners to tournament level.",
    image: "/placeholder.svg?height=400&width=600",
    color: "from-[#003DA5] to-[#AEEA00]",
    icon: Star,
    brands: ["Carlton", "Babolat"],
    equipment: [
      { name: "Badminton Rackets", description: "Lightweight rackets for all skill levels", price: "From LKR 3,500" },
      { name: "Shuttlecocks", description: "Feather and synthetic shuttlecocks", price: "From LKR 800" },
      { name: "Court Equipment", description: "Nets, posts, and court accessories", price: "From LKR 8,000" },
      {
        name: "Training Equipment",
        description: "Feeders, cones, and skill development tools",
        price: "From LKR 2,000",
      },
      { name: "Stringing Services", description: "Professional racket stringing", price: "From LKR 1,000" },
      { name: "Accessories", description: "Grips, bags, and maintenance equipment", price: "From LKR 500" },
    ],
    levels: ["Professional", "Club", "School", "Recreational"],
    popular: true,
    featured: false,
  },
  {
    name: "Football",
    description: "Footballs, goals, and training equipment",
    longDescription:
      "Football is growing rapidly in popularity across Sri Lanka. We provide quality equipment for schools, clubs, and recreational players, supporting the development of the beautiful game.",
    image: "/placeholder.svg?height=400&width=600",
    color: "from-[#FFD700] to-[#FF3D00]",
    icon: Trophy,
    brands: ["Molten", "Dunlop"],
    equipment: [
      { name: "Footballs", description: "Match and training balls for all levels", price: "From LKR 1,500" },
      { name: "Goals", description: "Portable and permanent goal systems", price: "From LKR 10,000" },
      { name: "Training Equipment", description: "Cones, hurdles, and agility equipment", price: "From LKR 1,000" },
      { name: "Protective Gear", description: "Shin guards and goalkeeper equipment", price: "From LKR 800" },
      { name: "Team Accessories", description: "Ball bags, pumps, and team equipment", price: "From LKR 2,000" },
      { name: "Referee Equipment", description: "Whistles, cards, and officiating gear", price: "From LKR 600" },
    ],
    levels: ["Professional", "Club", "School", "Youth"],
    popular: false,
    featured: false,
  },
]

export default function SportsPage() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState("All Levels")

  const featuredSports = sportsCategories.filter((sport) => sport.featured)
  const allSports = sportsCategories

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
            <Badge className="bg-[#FFD700] text-[#1A1A1A] px-6 py-2 text-sm font-bold mb-4">SPORTS CATEGORIES</Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              EQUIPMENT FOR
              <span className="block text-[#FF3D00]">EVERY SPORT</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              From cricket to rugby, basketball to badminton, we provide professional-grade equipment for every sport.
              Whether you're a beginner or a professional athlete, we have the right gear to elevate your game.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {featuredSports.map((sport) => (
                <Badge key={sport.name} className="bg-white/10 text-white px-4 py-2 font-bold border border-white/20">
                  {sport.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sports Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#FF3D00] text-white px-6 py-2 text-sm font-bold mb-4">POPULAR SPORTS</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">
              FEATURED
              <span className="block text-[#003DA5]">CATEGORIES</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most popular sports categories, featuring world-class equipment from our exclusive brand partnerships.
            </p>
          </div>

          <div className="space-y-16">
            {featuredSports.map((sport, index) => {
              const IconComponent = sport.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={sport.name}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:grid-flow-col-dense" : ""}`}
                >
                  {/* Sport Image */}
                  <div className={`relative ${!isEven ? "lg:col-start-2" : ""}`}>
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={sport.image || "/placeholder.svg"}
                        alt={sport.name}
                        className="w-full h-80 object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${sport.color} opacity-80`}></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-3 mb-3">
                          <IconComponent className="w-8 h-8 text-white" />
                          {sport.popular && <Badge className="bg-[#FFD700] text-[#1A1A1A] font-bold">POPULAR</Badge>}
                        </div>
                        <h3 className="text-3xl font-black text-white mb-2">{sport.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          {sport.brands.map((brand) => (
                            <Badge key={brand} className="bg-white/20 text-white border-white/30 text-xs">
                              {brand}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sport Content */}
                  <div className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <IconComponent className="w-8 h-8 text-[#003DA5]" />
                      <h3 className="text-3xl md:text-4xl font-black text-[#1A1A1A]">{sport.name}</h3>
                    </div>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">{sport.longDescription}</p>

                    {/* Equipment Categories */}
                    <div className="grid md:grid-cols-2 gap-3 mb-8">
                      {sport.equipment.slice(0, 4).map((equipment) => (
                        <div key={equipment.name} className="border-l-4 border-[#AEEA00] pl-4">
                          <h5 className="font-bold text-gray-800">{equipment.name}</h5>
                          <p className="text-sm text-gray-600">{equipment.description}</p>
                          <p className="text-xs text-[#FF3D00] font-bold">{equipment.price}</p>
                        </div>
                      ))}
                    </div>

                    {/* Skill Levels */}
                    <div className="mb-8">
                      <h4 className="font-bold text-[#003DA5] mb-3">SKILL LEVELS:</h4>
                      <div className="flex flex-wrap gap-2">
                        {sport.levels.map((level) => (
                          <Badge
                            key={level}
                            className="bg-gray-100 text-gray-700 hover:bg-[#003DA5] hover:text-white transition-colors"
                          >
                            {level}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="bg-[#FF3D00] hover:bg-[#FF3D00]/90 text-white font-bold rounded-full">
                        <Eye className="w-4 h-4 mr-2" />
                        VIEW EQUIPMENT
                      </Button>
                      <Button
                        variant="outline"
                        className="border-2 border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white font-bold rounded-full"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        GET QUOTE
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* All Sports Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#AEEA00] text-[#1A1A1A] px-6 py-2 text-sm font-bold mb-4">COMPLETE RANGE</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">
              ALL SPORTS
              <span className="block text-[#FF3D00]">CATEGORIES</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allSports.map((sport) => {
              const IconComponent = sport.icon
              return (
                <Card
                  key={sport.name}
                  className="hover:shadow-xl transition-all duration-300 border-0 overflow-hidden bg-white"
                >
                  <CardContent className="p-0">
                    {/* Sport Image */}
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={sport.image || "/placeholder.svg"}
                        alt={sport.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${sport.color} opacity-80`}></div>

                      {sport.popular && (
                        <Badge className="absolute top-4 left-4 bg-[#FFD700] text-[#1A1A1A] font-bold">POPULAR</Badge>
                      )}

                      {sport.featured && (
                        <Badge className="absolute top-4 right-4 bg-[#AEEA00] text-[#1A1A1A] font-bold">FEATURED</Badge>
                      )}

                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent className="w-6 h-6 text-white" />
                          <div className="flex flex-wrap gap-1">
                            {sport.brands.slice(0, 2).map((brand) => (
                              <Badge key={brand} className="bg-white/20 text-white border-white/30 text-xs">
                                {brand}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <h3 className="text-xl font-black text-white">{sport.name}</h3>
                      </div>
                    </div>

                    {/* Sport Info */}
                    <div className="p-4">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{sport.description}</p>

                      {/* Equipment Count */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-gray-500">{sport.equipment.length} Equipment Types</span>
                        <span className="text-xs text-gray-500">{sport.levels.length} Skill Levels</span>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white font-bold"
                      >
                        EXPLORE {sport.name.toUpperCase()}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Equipment Levels Section */}
      <section className="py-20 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#FFD700] text-[#1A1A1A] px-6 py-2 text-sm font-bold mb-4">FOR EVERY LEVEL</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              FROM BEGINNERS TO
              <span className="block text-[#AEEA00]">PROFESSIONALS</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                level: "Professional",
                description: "Tournament-grade equipment used by international athletes",
                icon: Trophy,
                color: "bg-[#FFD700]",
              },
              {
                level: "Club",
                description: "High-quality equipment for competitive club-level play",
                icon: Award,
                color: "bg-[#FF3D00]",
              },
              {
                level: "School",
                description: "Durable equipment designed for educational institutions",
                icon: Users,
                color: "bg-[#AEEA00]",
              },
              {
                level: "Recreational",
                description: "Quality equipment for casual players and beginners",
                icon: Target,
                color: "bg-[#003DA5]",
              },
            ].map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{category.level}</h3>
                    <p className="text-gray-300 leading-relaxed">{category.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#003DA5] to-[#FF3D00] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">FIND YOUR PERFECT EQUIPMENT</h2>
          <p className="text-xl mb-8 opacity-90">
            Not sure which equipment is right for you? Our expert team is here to help you choose the perfect gear for
            your sport and skill level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#003DA5] hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-full"
            >
              <Phone className="w-5 h-5 mr-2" />
              SPEAK TO AN EXPERT
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#003DA5] px-8 py-4 text-lg font-bold rounded-full bg-transparent"
            >
              VIEW ALL PRODUCTS
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
