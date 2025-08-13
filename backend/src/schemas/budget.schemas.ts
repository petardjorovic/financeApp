import mongoose from "mongoose";
import z from "zod";

export const addBudgetSchema = z.object({
  categoryId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid category ID",
  }),
  limit: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Limit must be a positive number",
    }),
  themeId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid theme ID",
  }),
});
