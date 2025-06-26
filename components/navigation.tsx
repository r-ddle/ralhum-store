"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Brands", href: "/brands" },
    { name: "Sports", href: "/sports" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-black text-[#003DA5] dark:text-[#4A90E2]">
              RALHUM
              <span className="text-[#FF3D00] dark:text-[#FF6B47]">SPORTS</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-[#003DA5] dark:hover:text-[#4A90E2] font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Theme Toggle & Contact Button */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button size="sm" className="bg-[#FF3D00] hover:bg-[#FF3D00]/90 text-white font-bold">
              <Phone className="w-4 h-4 mr-2" />
              <a href="/contact">CONTACT</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="dark:text-gray-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-[#003DA5] dark:hover:text-[#4A90E2] hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors duration-200 text-base"
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                >
                  {item.name}
                </a>
              ))}
              <div className="px-4 py-3">
                <Button
                  size="lg"
                  className="w-full bg-[#FF3D00] hover:bg-[#FF3D00]/90 text-white font-bold py-3 text-base"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  <a href="/contact">CONTACT</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
