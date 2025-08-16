import mongoose from "mongoose";
import z from "zod";

export const addPotSchema = z.object({
  name: z.string().min(2).max(255),
  target: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Target must be a positive number",
    }),
  themeId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid theme ID",
  }),
});

export const editPotSchema = addPotSchema
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export const potIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid pot ID",
  });

export const depositPotSchema = z
  .union([z.string(), z.number()])
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val) && val > 0 && val <= 1000000000, {
    message: "Amount must be a positive number up to 1,000,000,000",
  });
