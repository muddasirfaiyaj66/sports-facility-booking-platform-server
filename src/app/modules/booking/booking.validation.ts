import { z } from 'zod';

export const createBookingSchema = z.object({
    body:z.object({
        date: z.string({ message: 'Date is required' }),
        startTime: z.string({message:'StartTime is required'}),
        endTime: z.string({message:'EndTime is required'}),
        payableAmount: z.number().optional(),
        isBooked: z.enum(['canceled', 'confirmed']),
      })
});

export const updateBookingSchema = z.object({
    body:z.object({
        date: z.string({ message: 'Date is required' }).optional(),
        startTime: z.string({message:'StartTime is required'}).optional(),
        endTime: z.string({message:'EndTime is required'}).optional(),
        payableAmount: z.number().optional(),
        isBooked: z.enum(['canceled', 'confirmed']).optional(),
      })
});


export const FacilityValidations = {
    createBookingSchema,
    updateBookingSchema
}
