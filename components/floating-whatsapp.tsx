"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Show tooltip after 3 seconds
      setTimeout(() => setShowTooltip(true), 3000)
      // Hide tooltip after 8 seconds
      setTimeout(() => setShowTooltip(false), 8000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleWhatsAppClick = () => {
    const message = `Hello Ralhum Sports! 

I'm interested in learning more about your sports equipment. Please contact me at your earliest convenience.

Thank you!`

    const whatsappUrl = `https://wa.me/94772350712?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-3 max-w-xs mb-2 animate-bounce">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-800">Need Help?</p>
              <p className="text-xs text-gray-600">Chat with us on WhatsApp!</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowTooltip(false)} className="p-1 h-auto">
              <X className="w-3 h-3" />
            </Button>
          </div>
          <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
        </div>
      )}

      {/* WhatsApp Button */}
      <Button
        onClick={handleWhatsAppClick}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#25D366]/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </Button>
    </div>
  )
}
