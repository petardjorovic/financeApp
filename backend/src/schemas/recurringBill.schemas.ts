import mongoose from "mongoose";
import z from "zod";

export const addRecurringBillSchema = z.object({
  name: z.string().min(1).max(255),
  dueDate: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 28, {
      message: "Due date must be between 1 and 28",
    }),
  categoryId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid category ID",
  }),
});

export const recurringBillIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid recurring bill ID",
  });
