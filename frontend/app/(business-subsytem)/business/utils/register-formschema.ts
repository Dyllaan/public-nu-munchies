import { z } from "zod";

// this is definition of the form schema via zod library for validation
export const registerFormSchema = z.object({
  businessName: z
    .string()
    .min(3, {
      message: "Business name must be at least 3 characters long",
    })
    .max(255),
  businessDescription: z.string().min(3).max(255),
  businessAddress: z.string().min(3).max(255),
  businessPhoneNumber: z.string().optional(),
  businessEmail: z.string().optional(),
  businessCity: z.string().min(3).max(255),
  businessPostcode: z.string().min(3).max(255),
});
