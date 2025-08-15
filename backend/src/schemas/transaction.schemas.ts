import mongoose from "mongoose";
import z from "zod";

export const getTransactionsQuerySchema = z.object({
  page: z
    .string()
    .default("1")
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "Invalid page number",
    }),
  filter: z.string().optional(),
  sort: z
    .enum(["Latest", "Oldest", "A-Z", "Z-A", "Highest", "Lowest"])
    .optional(),
  search: z.string().optional(),
});

export const transactionSchema = z
  .object({
    type: z.enum(["income", "expense"]),
    amount: z
      .union([z.number(), z.string()])
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val > 0, {
        message: "Amount must be a positive number",
      }),
    account: z.string().min(1).max(255),
    categoryId: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid category ID",
      }),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    isRecurring: z.boolean().optional(),
    dueDate: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .optional()
      .refine((val) => val == null || (!isNaN(val) && val >= 1 && val <= 28), {
        message: "Due date must be between 1 and 28",
      }),
  })
  .refine((data) => !(data.isRecurring && !data.dueDate), {
    message: "Due date is required when isRecurring is true",
    path: ["dueDate"],
  })
  .refine((data) => !("potId" in data), {
    message: "potId cannot be set in add transaction",
  })
  .strict();

export const transactionIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid transaction ID",
  });

export const editTransactionSchema = z
  .object({
    type: z.enum(["income", "expense"]).optional(),
    amount: z
      .union([z.number(), z.string()])
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val > 0, {
        message: "Amount must be a positive number",
      })
      .optional(),
    account: z.string().min(1).max(255).optional(),
    categoryId: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid category ID",
      })
      .optional(),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
      .optional(),
    isRecurring: z.boolean().optional(),
    dueDate: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .optional()
      .refine((val) => val == null || (!isNaN(val) && val >= 1 && val <= 28), {
        message: "Due date must be between 1 and 28",
      }),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provide for update",
  })
  .refine(
    (data) =>
      !(
        data.isRecurring === true &&
        (data.dueDate === undefined || data.dueDate === null)
      ),
    {
      message: "Due date is required when isRecurring is true",
      path: ["dueDate"],
    }
  )
  .refine((data) => !("potId" in data), {
    message: "potId cannot be set in add transaction",
  })
  .strict();
