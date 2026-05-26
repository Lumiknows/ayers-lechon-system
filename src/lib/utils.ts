import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function getCategoryLabel(categoryId: string): string {
  const categories: Record<string, string> = {
    KINUTSON: "Kinutchillo (Half Lechon)",
    BONELESS_BELLY: "Boneless Belly Lechon",
    LECHON_REGULAR: "Lechon Regular (Whole)",
    WHOLE_LECHON: "Whole Lechon",
    LECHON_BELLY: "Lechon Belly",
    VALUE_MEALS: "Value Meals",
    PARTY_TRAYS: "Party Trays",
    ADDONS: "Add-ons",
    DRINKS: "Drinks",
  };
  return categories[categoryId] ?? categoryId;
}

export function getOrderTypeLabel(orderType: string): string {
  const types: Record<string, string> = {
    DINE_IN: "Dine-in",
    TAKEOUT: "Takeout",
    DELIVERY: "Delivery",
    EVENT_CATERING: "Event / Catering",
  };
  return types[orderType] ?? orderType;
}
