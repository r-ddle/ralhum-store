"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, AlertCircle, Rocket } from "lucide-react";

interface ChecklistItem {
  id: string;
  category: string;
  task: string;
  description: string;
  critical: boolean;
  completed: boolean;
  automated?: boolean;
}

const launchChecklist: ChecklistItem[] = [
  // Critical Customer Journey
  {
    id: "buy-now-flow",
    category: "Customer Journey",
    task: "Buy Now Button Flow",
    description: "Verify Buy Now buttons redirect to checkout properly",
    critical: true,
    completed: true,
  },
  {
    id: "cart-functionality",
    category: "Customer Journey",
    task: "Cart Functionality",
    description: "Test complete add to cart → checkout → WhatsApp flow",
    critical: true,
    completed: true,
  },
  {
    id: "whatsapp-integration",
    category: "Customer Journey",
    task: "WhatsApp Integration",
    description: "Verify order messages format correctly and open WhatsApp",
    critical: true,
    completed: true,
  },

  // Navigation & Routing
  {
    id: "news-navigation",
    category: "Navigation",
    task: "News Page Access",
    description: "Ensure all news pages are accessible and links work",
    critical: true,
    completed: true,
  },
  {
    id: "product-navigation",
    category: "Navigation",
    task: "Product Navigation",
    description: "Test product browsing and individual product pages",
    critical: true,
    completed: true,
  },
  {
    id: "mobile-navigation",
    category: "Navigation",
    task: "Mobile Navigation",
    description: "Verify mobile menu and navigation functionality",
    critical: true,
    completed: false,
  },

  // Content & SEO
  {
    id: "meta-descriptions",
    category: "SEO",
    task: "Meta Descriptions",
    description: "All pages have proper meta titles and descriptions",
    critical: false,
    completed: true,
  },
  {
    id: "image-alt-text",
    category: "SEO",
    task: "Image Alt Text",
    description: "All images have descriptive alt text for accessibility",
    critical: false,
    completed: false,
  },
  {
    id: "contact-information",
    category: "Content",
    task: "Contact Information",
    description: "Verify all contact details are accurate and up-to-date",
    critical: true,
    completed: false,
  },

  // Performance & Technical
  {
    id: "page-load-speed",
    category: "Performance",
    task: "Page Load Speed",
    description: "All pages load under 3 seconds",
    critical: true,
    completed: false,
    automated: true,
  },
  {
    id: "mobile-responsiveness",
    category: "Performance",
    task: "Mobile Responsiveness",
    description: "Site works properly on all device sizes",
    critical: true,
    completed: true,
  },
  {
    id: "error-handling",
    category: "Technical",
    task: "Error Page Handling",
    description: "Custom 404 and error pages are implemented",
    critical: false,
    completed: true,
  },

  // Business Readiness
  {
    id: "pricing-accuracy",
    category: "Business",
    task: "Pricing Accuracy",
    description: "All product prices are accurate in LKR",
    critical: true,
    completed: true,
  },
  {
    id: "inventory-status",
    category: "Business",
    task: "Inventory Status",
    description: "Stock levels and availability are accurate",
    critical: true,
    completed: false,
  },
  {
    id: "payment-process",
    category: "Business",
    task: "Payment Process",
    description: "WhatsApp order process tested with real scenarios",
    critical: true,
    completed: false,
  },
];

export default function LaunchChecklist() {
  const [checklist, setChecklist] = useState(launchChecklist);
  const [isVisible, setIsVisible] = useState(
    process.env.NODE_ENV === "development",
  );

  const toggleItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const categories = Array.from(
    new Set(checklist.map((item) => item.category)),
  );
  const completedItems = checklist.filter((item) => item.completed).length;
  const totalItems = checklist.length;
  const criticalItems = checklist.filter((item) => item.critical);
  const completedCritical = criticalItems.filter(
    (item) => item.completed,
  ).length;
  const readyToLaunch = completedCritical === criticalItems.length;

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50 w-96 max-h-[80vh] overflow-hidden">
      <Card className="border-2 border-green-200 bg-white shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Launch Readiness
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span className="font-bold">
                {completedItems}/{totalItems}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedItems / totalItems) * 100}%` }}
              />
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant={readyToLaunch ? "default" : "destructive"}
                className={readyToLaunch ? "bg-green-600" : ""}
              >
                {readyToLaunch
                  ? "✅ Launch Ready"
                  : `⚠️ ${criticalItems.length - completedCritical} Critical Issues`}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 max-h-96 overflow-y-auto">
          {categories.map((category) => {
            const categoryItems = checklist.filter(
              (item) => item.category === category,
            );
            const categoryCompleted = categoryItems.filter(
              (item) => item.completed,
            ).length;

            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-gray-900">
                    {category}
                  </h4>
                  <span className="text-xs text-gray-600">
                    {categoryCompleted}/{categoryItems.length}
                  </span>
                </div>

                <div className="space-y-1">
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-start gap-2 p-2 rounded text-xs cursor-pointer hover:bg-gray-50 ${
                        item.completed
                          ? "bg-green-50"
                          : item.critical
                            ? "bg-red-50"
                            : "bg-gray-50"
                      }`}
                      onClick={() => !item.automated && toggleItem(item.id)}
                    >
                      {item.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            item.critical ? "text-red-500" : "text-gray-400"
                          }`}
                        />
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span
                            className={`font-medium ${item.completed ? "line-through text-gray-500" : ""}`}
                          >
                            {item.task}
                          </span>
                          {item.critical && !item.completed && (
                            <AlertCircle className="w-3 h-3 text-red-500" />
                          )}
                          {item.automated && (
                            <Badge variant="outline" className="text-xs px-1">
                              Auto
                            </Badge>
                          )}
                        </div>
                        <div className="text-gray-600 text-xs leading-tight">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {readyToLaunch ? (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
              <div className="text-green-800 font-bold text-sm mb-1">
                🚀 Ready for Launch!
              </div>
              <div className="text-green-700 text-xs">
                All critical items completed. Site is ready for production
                deployment.
              </div>
            </div>
          ) : (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
              <div className="text-yellow-800 font-bold text-sm mb-1">
                ⚠️ Pre-Launch Issues
              </div>
              <div className="text-yellow-700 text-xs">
                {criticalItems.length - completedCritical} critical issue(s)
                need resolution before launch.
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
