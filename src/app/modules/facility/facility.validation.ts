import { z } from 'zod';

export const createFacilitySchema = z.object({
    body:z.object({
        name: z.string({ message: "Name is required" }),
        description: z.string().optional(),
        pricePerHour: z.number().nonnegative({ message: "Price per hour must be a non-negative number" }),
        location: z.string({ message: "Location is required" }),
        isDeleted:z.boolean().optional().default(false)
      })
});

export const updateFacilitySchema = z.object({
    body:z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        pricePerHour: z.number().nonnegative({ message: "Price per hour must be a non-negative number" }).optional(),
        location: z.string().optional(),
        isDeleted:z.boolean().optional().default(false)
      })
});


export const FacilityValidations = {
    createFacilitySchema,
    updateFacilitySchema
}
