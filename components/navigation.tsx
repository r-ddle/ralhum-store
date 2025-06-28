"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Phone, Search, User, Heart } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CartButton } from "@/components/cart/cart-button";
import Link from "next/link";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Brands", href: "/brands" },
    { name: "Sports", href: "/sports" },
    { name: "Store", href: "/products" },
    { name: "About", href: "/about" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-black text-[#003DA5] dark:text-[#4A90E2] hover:opacity-80 transition-opacity"
            >
              RALHUM
              <span className="text-[#FF3D00] dark:text-[#FF6B47]">SPORTS</span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products, brands..."
                className="pl-10 pr-4 w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-[#003DA5] focus:ring-[#003DA5] rounded-full"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-[#003DA5] dark:hover:text-[#4A90E2] font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#003DA5] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Search Button - Tablet */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSearch(!showSearch)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {/* <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs">
                3
              </Badge> */}
            </Button>

            {/* Cart */}
            <CartButton />

            {/* Account */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Button>

            <ThemeToggle />

            <Button
              size="sm"
              className="bg-[#FF3D00] hover:bg-[#FF3D00]/90 text-white font-bold px-4 py-2 rounded-full transition-all hover:scale-105"
              asChild
            >
              <Link href="/contact">
                <Phone className="w-4 h-4 mr-2" />
                CONTACT
              </Link>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Button>

            <CartButton />
            <ThemeToggle />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="dark:text-gray-300 p-2"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showSearch && (
          <div className="lg:hidden px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products, brands..."
                className="pl-10 pr-4 w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-[#003DA5] focus:ring-[#003DA5] rounded-full"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
              <div role="menu" id="mobile-menu">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-[#003DA5] dark:hover:text-[#4A90E2] hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors duration-200 text-base"
                    role="menuitem"
                    tabIndex={0}
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
          </div>
        )}
      </div>
    </nav>
  );
}
