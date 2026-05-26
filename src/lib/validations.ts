import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required").max(128),
});

export const feedbackSchema = z.object({
  branchId: z.string().min(1, "Branch is required"),
  orderType: z.enum(["DINE_IN", "TAKEOUT", "DELIVERY", "EVENT_CATERING"]),
  foodRating: z.coerce.number().int().min(1).max(5),
  serviceRating: z.coerce.number().int().min(1).max(5),
  cleanlinessRating: z.coerce.number().int().min(1).max(5),
  overallRating: z.coerce.number().int().min(1).max(5),
  orderDetails: z.string().max(500).optional().nullable(),
  comments: z.string().max(1000).optional().nullable(),
  wouldRecommend: z.coerce.boolean(),
  customerName: z.string().max(100).optional().nullable(),
  customerPhone: z.string().max(20).optional().nullable(),
  customerEmail: z.string().email().max(255).optional().nullable().or(z.literal("")),
});

export const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  description: z.string().min(1, "Description is required").max(1000),
  price: z.coerce.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required").max(50),
  sizes: z.string().max(200).optional().nullable(),
  imageUrl: z.string().url("Invalid image URL").max(500),
  isAvailable: z.coerce.boolean().optional().default(true),
  sortOrder: z.coerce.number().int().min(0).optional().default(0),
});

export const menuItemUpdateSchema = menuItemSchema.partial();

export const storeSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  address: z.string().min(1, "Address is required").max(500),
  phone: z.string().min(1, "Phone is required").max(50),
  hours: z.string().min(1, "Hours are required").max(200),
  mapEmbedUrl: z.string().url("Invalid map embed URL").max(1000),
  mapLink: z.string().url("Invalid map link").max(500),
  city: z.string().max(100).optional().default("Cebu City"),
  region: z.string().max(100).optional().default("Central Visayas"),
  isActive: z.coerce.boolean().optional().default(true),
  sortOrder: z.coerce.number().int().min(0).optional().default(0),
});

export const storeUpdateSchema = storeSchema.partial();
