import { z } from 'zod';

const phoneRegex = /^\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;

export const emailSchema = z.string().email('Invalid email address');

export const phoneSchema = z.string().regex(phoneRegex, 'Invalid phone number format');

export const signupSchema = z.object({
  email: emailSchema,
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().min(1, 'Name is required').default(''),
});

export const sellRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: phoneSchema,
  email: emailSchema,
  firearmType: z.string().min(1, 'Item type is required'),
  condition: z.string().min(1, 'Condition is required'),
  description: z.string().default(''),
  photoUrls: z.array(z.string()).default([]),
});

export const pawnRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: phoneSchema,
  email: emailSchema,
  itemType: z.string().min(1, 'Item type is required'),
  description: z.string().min(1, 'Description is required'),
  photoUrls: z.array(z.string()).default([]),
});

export const itemRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: phoneSchema,
  email: emailSchema.optional(),
  itemType: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  budget: z.string().optional(),
  description: z.string().optional(),
  itemId: z.string().optional(),
  itemName: z.string().optional(),
  message: z.string().optional(),
});

export const inventoryItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  brand: z.string().min(1, 'Brand is required'),
  price: z.number().positive('Price must be positive'),
  department: z.enum(['firearms', 'jewelry', 'electronics', 'tools']),
  category: z.string().min(1, 'Category is required'),
  condition: z.string().min(1, 'Condition is required'),
  description: z.string().default(''),
  imageUrl: z.string().default(''),
  imageUrls: z.array(z.string()).default([]),
  sku: z.string().optional(),
  caliber: z.string().optional(),
  tag: z.enum(['just_in', 'hot', 'rare', 'sold']).nullable(),
  status: z.enum(['available', 'reserved', 'sold']).default('available'),
  inventoryStatus: z.enum(['in_stock', 'available_to_order', 'sourced']).default('in_stock'),
  featured: z.boolean().default(false),
});
