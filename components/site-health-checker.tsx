"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, XCircle, ExternalLink } from "lucide-react";

interface HealthCheck {
  name: string;
  status: "pass" | "warn" | "fail";
  message: string;
  critical: boolean;
}

export default function SiteHealthChecker() {
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([]);
  const [isVisible, setIsVisible] = useState(
    process.env.NODE_ENV === "development",
  );

  useEffect(() => {
    if (!isVisible) return;

    const runHealthChecks = () => {
      const checks: HealthCheck[] = [];

      // Check navigation links
      const navLinks = document.querySelectorAll("nav a");
      const brokenNavLinks = Array.from(navLinks).filter((link) => {
        const href = link.getAttribute("href");
        return !href || href === "#" || href === "";
      });

      checks.push({
        name: "Navigation Links",
        status: brokenNavLinks.length === 0 ? "pass" : "fail",
        message:
          brokenNavLinks.length === 0
            ? "All navigation links are functional"
            : `${brokenNavLinks.length} broken navigation links found`,
        critical: true,
      });

      // Check for images without alt text
      const images = document.querySelectorAll("img");
      const imagesWithoutAlt = Array.from(images).filter((img) => !img.alt);

      checks.push({
        name: "Image Accessibility",
        status: imagesWithoutAlt.length === 0 ? "pass" : "warn",
        message:
          imagesWithoutAlt.length === 0
            ? "All images have alt text"
            : `${imagesWithoutAlt.length} images missing alt text`,
        critical: false,
      });

      // Check for proper heading structure
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const h1Count = document.querySelectorAll("h1").length;

      checks.push({
        name: "Heading Structure",
        status: h1Count === 1 ? "pass" : h1Count === 0 ? "fail" : "warn",
        message:
          h1Count === 1
            ? "Proper heading structure (1 H1)"
            : h1Count === 0
              ? "No H1 found on page"
              : `Multiple H1 tags found (${h1Count})`,
        critical: h1Count === 0,
      });

      // Check for forms without labels
      const inputs = document.querySelectorAll("input, textarea, select");
      const inputsWithoutLabels = Array.from(inputs).filter((input) => {
        const id = input.id;
        const ariaLabel = input.getAttribute("aria-label");
        const ariaLabelledBy = input.getAttribute("aria-labelledby");
        const label = id ? document.querySelector(`label[for="${id}"]`) : null;

        return !label && !ariaLabel && !ariaLabelledBy;
      });

      checks.push({
        name: "Form Accessibility",
        status: inputsWithoutLabels.length === 0 ? "pass" : "warn",
        message:
          inputsWithoutLabels.length === 0
            ? "All form fields have labels"
            : `${inputsWithoutLabels.length} form fields missing labels`,
        critical: false,
      });

      // Check for buttons without accessible names
      const buttons = document.querySelectorAll("button");
      const buttonsWithoutNames = Array.from(buttons).filter((button) => {
        const textContent = button.textContent?.trim();
        const ariaLabel = button.getAttribute("aria-label");
        const ariaLabelledBy = button.getAttribute("aria-labelledby");

        return !textContent && !ariaLabel && !ariaLabelledBy;
      });

      checks.push({
        name: "Button Accessibility",
        status: buttonsWithoutNames.length === 0 ? "pass" : "fail",
        message:
          buttonsWithoutNames.length === 0
            ? "All buttons have accessible names"
            : `${buttonsWithoutNames.length} buttons missing accessible names`,
        critical: true,
      });

      // Check page load performance
      const performanceEntry = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming;
      const loadTime = performanceEntry
        ? performanceEntry.loadEventEnd - performanceEntry.fetchStart
        : 0;

      checks.push({
        name: "Page Load Performance",
        status: loadTime < 3000 ? "pass" : loadTime < 5000 ? "warn" : "fail",
        message: `Page loaded in ${Math.round(loadTime)}ms`,
        critical: loadTime > 5000,
      });

      // Check for HTTPS
      const isHTTPS = window.location.protocol === "https:";

      checks.push({
        name: "HTTPS Security",
        status: isHTTPS ? "pass" : "fail",
        message: isHTTPS
          ? "Site is served over HTTPS"
          : "Site is not using HTTPS",
        critical: !isHTTPS && process.env.NODE_ENV === "production",
      });

      // Check for meta description
      const metaDescription = document.querySelector(
        'meta[name="description"]',
      );

      checks.push({
        name: "SEO Meta Description",
        status: metaDescription ? "pass" : "warn",
        message: metaDescription
          ? "Meta description present"
          : "Meta description missing",
        critical: false,
      });

      setHealthChecks(checks);
    };

    // Run checks after a short delay to allow page to fully load
    const timer = setTimeout(runHealthChecks, 2000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!isVisible || healthChecks.length === 0) {
    return null;
  }

  const criticalIssues = healthChecks.filter(
    (check) => check.critical && check.status !== "pass",
  );
  const warnings = healthChecks.filter((check) => check.status === "warn");
  const passing = healthChecks.filter((check) => check.status === "pass");

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <Card className="border-2 border-blue-200 bg-white shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold">
              Site Health Check
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
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">
                {passing.length}
              </div>
              <div className="text-xs text-gray-600">Passing</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">
                {warnings.length}
              </div>
              <div className="text-xs text-gray-600">Warnings</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">
                {criticalIssues.length}
              </div>
              <div className="text-xs text-gray-600">Critical</div>
            </div>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {healthChecks.map((check, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded text-xs"
              >
                {check.status === "pass" && (
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                )}
                {check.status === "warn" && (
                  <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                )}
                {check.status === "fail" && (
                  <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{check.name}</div>
                  <div className="text-gray-600 truncate">{check.message}</div>
                </div>
              </div>
            ))}
          </div>

          {criticalIssues.length > 0 && (
            <div className="p-2 bg-red-50 border border-red-200 rounded">
              <div className="text-xs font-medium text-red-800">
                ⚠️ {criticalIssues.length} critical issue(s) need attention
                before launch
              </div>
            </div>
          )}

          <Button
            size="sm"
            variant="outline"
            onClick={() => window.location.reload()}
            className="w-full text-xs"
          >
            Re-run Checks
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
