import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    // user: z.string().optional(),
    facility: z.string(),
    isBooked: z
      .enum(['confirmed', 'unconfirmed', 'canceled'])
      .optional()
      .default('unconfirmed'),
  }),
});

export const BookingValidation = {
  createBookingValidationSchema,
};
