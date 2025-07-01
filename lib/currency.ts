// Currency conversion utilities for LKR (Sri Lankan Rupees)

export const EXCHANGE_RATES = {
  USD_TO_LKR: 315, // Fallback rate: 1 USD = 315 LKR
  LKR_TO_USD: 0.00317, // 1 LKR = 0.00317 USD
};

export interface PriceDisplay {
  lkr: number;
  usd: number;
  lkrFormatted: string;
  usdFormatted: string;
  bothFormatted: string;
}

/**
 * Convert USD to LKR using current exchange rate
 */
export function convertUsdToLkr(
  usdAmount: number,
  exchangeRate?: number,
): number {
  const rate = exchangeRate || EXCHANGE_RATES.USD_TO_LKR;
  return Math.round(usdAmount * rate);
}

/**
 * Convert LKR to USD using current exchange rate
 */
export function convertLkrToUsd(
  lkrAmount: number,
  exchangeRate?: number,
): number {
  const rate = exchangeRate || EXCHANGE_RATES.LKR_TO_USD;
  return Math.round(lkrAmount * rate * 100) / 100;
}

/**
 * Format LKR amount with proper currency symbol and formatting
 */
export function formatLKR(amount: number): string {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format USD amount with proper currency symbol and formatting
 */
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Get price display object with both LKR and USD formatting
 */
export function getPriceDisplay(
  usdPrice: number,
  exchangeRate?: number,
): PriceDisplay {
  const lkrPrice = convertUsdToLkr(usdPrice, exchangeRate);

  return {
    lkr: lkrPrice,
    usd: usdPrice,
    lkrFormatted: formatLKR(lkrPrice),
    usdFormatted: formatUSD(usdPrice),
    bothFormatted: `${formatLKR(lkrPrice)} (${formatUSD(usdPrice)})`,
  };
}

/**
 * Fetch current exchange rate from API (with fallback)
 */
export async function getCurrentExchangeRate(): Promise<number> {
  try {
    // You can integrate with a real exchange rate API here
    // For now, using the fallback rate
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD",
    );
    const data = await response.json();

    if (data && data.rates && data.rates.LKR) {
      return Math.round(data.rates.LKR);
    }

    return EXCHANGE_RATES.USD_TO_LKR;
  } catch (error) {
    console.warn("Failed to fetch exchange rate, using fallback:", error);
    return EXCHANGE_RATES.USD_TO_LKR;
  }
}

/**
 * Calculate tax amount (VAT) for Sri Lanka
 */
export function calculateTax(subtotal: number, taxRate: number = 0.15): number {
  return Math.round(subtotal * taxRate);
}

/**
 * Calculate shipping cost based on order value
 */
export function calculateShipping(
  subtotal: number,
  freeShippingThreshold: number = 23625,
): number {
  // Free shipping threshold: LKR 23,625 (equivalent to USD 75)
  return subtotal >= freeShippingThreshold ? 0 : 3150; // LKR 3,150 (equivalent to USD 10)
}

/**
 * Price formatting specifically for product displays
 */
export function formatProductPrice(
  usdPrice: number,
  showBoth: boolean = true,
): string {
  const priceDisplay = getPriceDisplay(usdPrice);

  if (showBoth) {
    return priceDisplay.bothFormatted;
  }

  return priceDisplay.lkrFormatted;
}
