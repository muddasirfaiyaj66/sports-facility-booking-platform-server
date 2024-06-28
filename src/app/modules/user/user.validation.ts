import { z } from "zod";

const createUserValidationSchema = z.object({
  body:z.object({
    name: z.string({message:"Name is required"}),
    email: z.string().email({message:" Invalid email address"}),
    password: z.string().min(6,{message: "Password must be at least 6 characters long"}),
    phone: z.string({message:"Phone number is required"}),
    role: z.enum(['admin', 'user'], {message:"Role must be either 'admin' or 'user'"}),
    address: z.string({message:"Address is required"}),
  })
});

export const UserValidation = {
  createUserValidationSchema,
  };
  
