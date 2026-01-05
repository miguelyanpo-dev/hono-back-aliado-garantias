import { z } from 'zod';

export const CreateWarrantySchema = z.object({
  customer_id: z.string(),
  customer_name: z.string(),
  customer_identification: z.number(),
  customer_email: z.string().email().nullable(),
  customer_cellphone: z.string().nullable(),

  seller_id: z.string(),
  seller_name: z.string(),

  status: z.string(),
  is_active: z.boolean(),
});
