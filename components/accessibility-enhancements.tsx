"use client"

import { useEffect } from "react"

export default function AccessibilityEnhancements() {
  useEffect(() => {
    // Skip to main content functionality
    const skipLink = document.createElement("a")
    skipLink.href = "#main-content"
    skipLink.textContent = "Skip to main content"
    skipLink.className =
      "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#003DA5] text-white px-4 py-2 rounded z-50"
    document.body.insertBefore(skipLink, document.body.firstChild)

    // Add main content ID if not exists
    const main = document.querySelector("main")
    if (main && !main.id) {
      main.id = "main-content"
    }

    // Improve focus management
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key closes mobile menu
      if (e.key === "Escape") {
        const closeButtons = document.querySelectorAll('[aria-label*="Close"]')
        closeButtons.forEach((button) => {
          if (button instanceof HTMLElement) {
            button.click()
          }
        })
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    // Announce page changes for screen readers
    const announcePageChange = () => {
      const announcement = document.createElement("div")
      announcement.setAttribute("aria-live", "polite")
      announcement.setAttribute("aria-atomic", "true")
      announcement.className = "sr-only"
      announcement.textContent = `Page loaded: ${document.title}`
      document.body.appendChild(announcement)

      setTimeout(() => {
        document.body.removeChild(announcement)
      }, 1000)
    }

    announcePageChange()

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return null
}
