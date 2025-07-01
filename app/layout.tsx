import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ralhum Sports",
  description: "Sports equipment store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light" storageKey="ralhum-ui-theme">
          <CartProvider>
            <PerformanceOptimizer />
            <AccessibilityEnhancements />
            <Navigation />
            <main id="main-content" role="main">
              {children}
            </main>
            <Footer />
            <FloatingWhatsApp />
            <CartSidebar />
            <Toaster position="top-right" richColors />
            <SiteHealthChecker />
            <LaunchChecklist />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
