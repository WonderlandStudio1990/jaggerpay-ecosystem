import { z } from 'zod';

const addressSchema = z.object({
  country: z.string().min(2, 'Country code must be at least 2 characters'),
  city: z.string().min(1, 'City is required'),
  postal_code: z.string().min(1, 'Postal code is required'),
  line1: z.string().min(1, 'Address line 1 is required'),
  line2: z.string().optional(),
  state: z.string().optional(),
});

export const EntityCreateSchema = z.object({
  type: z.enum(['organization', 'individual'], {
    required_error: 'Entity type is required',
    invalid_type_error: 'Entity type must be either organization or individual',
  }),
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  address: addressSchema,
  tax_id: z.string().optional(),
});

export type EntityCreateInput = z.infer<typeof EntityCreateSchema>;