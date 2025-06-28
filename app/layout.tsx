import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import AccessibilityEnhancements from "@/components/accessibility-enhancements"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ralhum Sports - Sri Lanka's #1 Sports Equipment Distributor",
  description:
    "Exclusive distributor of Gray-Nicolls, Gilbert, Grays & Molten. 25+ years of athletic excellence in Sri Lanka."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light" storageKey="ralhum-ui-theme">
          <AccessibilityEnhancements />
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </ThemeProvider>
      </body>
    </html>
  )
}
