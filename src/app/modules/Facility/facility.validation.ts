import { z } from 'zod';

const facilityValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number'),
    location: z.string().optional(),
    isDeleted: z.boolean().default(false),
  }),
});

const updatefacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number')
      .optional(),
    location: z.string().optional(),
    isDeleted: z.boolean().default(false),
  }),
});
export const FacilityValidation = {
  facilityValidationSchema,
  updatefacilityValidationSchema,
};
