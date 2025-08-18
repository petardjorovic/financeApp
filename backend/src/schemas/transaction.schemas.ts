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
    type: z.enum(["income", "expense"]).optional(),
    amount: z
      .union([z.number(), z.string()])
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val > 0, {
        message: "Amount must be a positive number",
      }),
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
      .refine((val) => new Date(val) <= new Date(), {
        message: "Transaction date cannot be in the future",
      }),
    recurringBillId: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid recurring bill ID",
      })
      .optional(),
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
      .refine((val) => new Date(val) <= new Date(), {
        message: "Transaction date cannot be in the future",
      })
      .optional(),
    recurringBillId: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid recurring bill ID",
      })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provide for update",
  })
  .refine(
    (data) =>
      !(
        data.recurringBillId &&
        ("account" in data || "categoryId" in data || "type" in data)
      ),
    {
      message:
        "Account, categoryId and type cannot be manually changed when recurringBillId is set",
    }
  )
  .refine((data) => !("potId" in data), {
    message: "potId cannot be set in add transaction",
  })
  .strict();
