import mongoose from "mongoose";
import z from "zod";

export const addPotSchema = z.object({
  name: z.string().min(1).max(255),
  target: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Target must be a number" }),
  themeId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid theme ID",
  }),
});

export const potIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid pot ID",
  });

export const depositPotSchema = z
  .union([z.string(), z.number()])
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val) && val > 0, {
    message: "Amount must be a positive number",
  });
