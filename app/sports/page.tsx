"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Award,
  Star,
  Target,
  Users,
  Globe,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const sportsExpertise = [
  {
    sport: "Cricket",
    icon: Trophy,
    description: "25+ years as Gray-Nicolls official distributor in Sri Lanka",
    brands: ["Gray-Nicolls"],
    achievements: [
      "Supplied equipment to 50+ international matches",
      "Official supplier to Sri Lankan cricket academies",
      "Trusted by professional cricket clubs nationwide",
    ],
    products: ["Cricket Bats", "Protective Gear", "Training Equipment"],
    image: "/placeholder.svg?height=300&width=400&text=Cricket",
    color: "from-[#003DA5] to-[#1A1A1A]",
  },
  {
    sport: "Rugby",
    icon: Award,
    description:
      "Exclusive Gilbert partnership bringing World Cup quality to Sri Lanka",
    brands: ["Gilbert"],
    achievements: [
      "Official Rugby World Cup supplier partnership",
      "Equipment for national rugby development programs",
      "Supporting grassroots rugby across the island",
    ],
    products: ["Rugby Balls", "Training Equipment", "Protective Gear"],
    image: "/placeholder.svg?height=300&width=400&text=Rugby",
    color: "from-[#FF3D00] to-[#1A1A1A]",
  },
  {
    sport: "Basketball & Volleyball",
    icon: Target,
    description:
      "Molten partnership delivering FIBA and FIVB approved equipment",
    brands: ["Molten"],
    achievements: [
      "FIBA approved basketballs for tournaments",
      "FIVB certified volleyballs for competitions",
      "Supporting school and university programs",
    ],
    products: ["Basketballs", "Volleyballs", "Court Equipment"],
    image: "/placeholder.svg?height=300&width=400&text=Basketball",
    color: "from-[#FFD700] to-[#1A1A1A]",
  },
  {
    sport: "Hockey",
    icon: Star,
    description: "Grays hockey expertise trusted by Olympic-level athletes",
    brands: ["Grays"],
    achievements: [
      "Equipment used by Olympic athletes",
      "Official supplier to hockey federations",
      "Supporting elite training programs",
    ],
    products: ["Hockey Sticks", "Protective Equipment", "Training Gear"],
    image: "/placeholder.svg?height=300&width=400&text=Hockey",
    color: "from-[#AEEA00] to-[#1A1A1A]",
  },
];

const companyStats = [
  { label: "Years of Experience", value: "25+", icon: Trophy },
  { label: "Sports Covered", value: "8+", icon: Target },
  { label: "Professional Athletes Served", value: "1000+", icon: Users },
  { label: "International Brands", value: "6+", icon: Globe },
];

const testimonials = [
  {
    quote:
      "Ralhum Sports has been our trusted partner for cricket equipment. Their Gray-Nicolls bats are used by our national team players.",
    author: "Sri Lankan Cricket Board",
    title: "Equipment Coordinator",
    sport: "Cricket",
  },
  {
    quote:
      "The quality of Gilbert rugby balls from Ralhum Sports is exceptional. They're the same standard used in international competitions.",
    author: "Rugby Coach",
    title: "National Rugby Academy",
    sport: "Rugby",
  },
  {
    quote:
      "Molten basketballs from Ralhum Sports have elevated the quality of our tournaments. The consistency and feel are remarkable.",
    author: "Basketball Association",
    title: "Tournament Director",
    sport: "Basketball",
  },
];

export default function SportsPage() {
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
            <Badge className="bg-[#FFD700] text-[#1A1A1A] px-6 py-2 text-sm font-bold mb-4">
              SPORTS EXPERTISE
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              25 YEARS OF
              <span className="block text-[#FF3D00]">SPORTS EXCELLENCE</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Ralhum Sports has been Sri Lanka's premier distributor of
              world-class sports equipment since 1998. We bring international
              quality and expertise to every sport we serve.
            </p>

            {/* Company Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {companyStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-[#FFD700]" />
                  <div className="text-3xl font-black">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sports Expertise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#FF3D00] text-white px-6 py-2 text-sm font-bold mb-4">
              OUR EXPERTISE
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">
              SPORT-SPECIFIC
              <span className="block text-[#003DA5]">KNOWLEDGE</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deep expertise in each sport we serve, backed by decades of
              experience and partnerships with world-leading brands.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {sportsExpertise.map((sport, index) => {
              const IconComponent = sport.icon;
              return (
                <Card
                  key={sport.sport}
                  className="overflow-hidden border-0 shadow-xl group hover:shadow-2xl transition-all duration-500"
                >
                  <CardContent className="p-0">
                    <div
                      className={`bg-gradient-to-br ${sport.color} p-6 text-white relative overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                          <IconComponent className="w-10 h-10" />
                          <div>
                            <h3 className="text-2xl font-black">
                              {sport.sport}
                            </h3>
                            <div className="flex gap-2">
                              {sport.brands.map((brand) => (
                                <Badge
                                  key={brand}
                                  className="bg-white/20 text-white border-white/30"
                                >
                                  {brand}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-lg opacity-90">
                          {sport.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-3">
                          Key Achievements:
                        </h4>
                        <div className="space-y-2">
                          {sport.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-[#AEEA00] mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">
                                {achievement}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-3">
                          Product Categories:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {sport.products.map((product) => (
                            <Badge
                              key={product}
                              variant="outline"
                              className="text-xs"
                            >
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-2 border-[#003DA5] text-[#003DA5] hover:bg-[#003DA5] hover:text-white font-bold"
                        asChild
                      >
                        <Link
                          href={`/products?categories=${sport.sport.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          Browse {sport.sport} Equipment
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#AEEA00] text-[#1A1A1A] px-6 py-2 text-sm font-bold mb-4">
              TESTIMONIALS
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-6">
              TRUSTED BY
              <span className="block text-[#FF3D00]">PROFESSIONALS</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from the athletes, coaches, and organizations who trust
              Ralhum Sports for their equipment needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex text-[#FFD700] mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 leading-relaxed mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                  <div className="border-t pt-4">
                    <div className="font-bold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.title}
                    </div>
                    <Badge className="mt-2 bg-[#003DA5] text-white text-xs">
                      {testimonial.sport}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Ralhum Sports */}
      <section className="py-20 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#FFD700] text-[#1A1A1A] px-6 py-2 text-sm font-bold mb-4">
              WHY CHOOSE US
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              THE RALHUM
              <span className="block text-[#AEEA00]">DIFFERENCE</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Trophy,
                title: "Authentic Products",
                description:
                  "Official distributor partnerships ensure 100% authentic equipment from world-leading brands.",
              },
              {
                icon: Star,
                title: "Expert Knowledge",
                description:
                  "25 years of sport-specific expertise to help you choose the right equipment for your needs.",
              },
              {
                icon: Users,
                title: "Professional Support",
                description:
                  "Dedicated customer service team with deep understanding of each sport we serve.",
              },
              {
                icon: Globe,
                title: "International Standards",
                description:
                  "Equipment that meets the same standards used in international competitions and tournaments.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-[#FFD700]" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#003DA5] to-[#FF3D00] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            READY TO ELEVATE YOUR GAME?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Discover the equipment trusted by professionals and used in
            international competitions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#003DA5] hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-full"
              asChild
            >
              <Link href="/products">
                Browse All Equipment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#003DA5] px-8 py-4 text-lg font-bold rounded-full bg-transparent"
              asChild
            >
              <Link href="/contact">Get Expert Advice</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
