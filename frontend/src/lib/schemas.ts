import z from "zod";

export const emailSchema = z.email();

export const loginFormSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(255, {
      message: "Password length cannot be more than 255 characters.",
    }),
});

export const registerFormSchema = z
  .object({
    fullName: z.string().min(2).max(255),
    email: emailSchema,
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .max(255, {
        message: "Password length cannot be more than 255 characters.",
      }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .max(255, {
        message: "Password length cannot be more than 255 characters.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(255, {
      message: "Password length cannot be more than 255 characters.",
    }),
});

const baseTransactionSchema = z.object({
  type: z.enum(["income", "expense"]).default("expense"),
  account: z
    .string()
    .min(2, { message: "Recipient / Sender must be at least 2 characters" })
    .max(255, {
      message: "Recipient / Sender cannot be longer than 255 characters",
    }),
  amount: z
    .union([z.number(), z.string()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Amount must be a positive number",
    }),
  categoryId: z.string().min(1, { message: "You must choose some category" }),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .refine((val) => new Date(val).getTime() <= Date.now(), {
      message: "Transaction date cannot be in the future",
    }),
});

export const addRegularTransactionSchema = baseTransactionSchema.extend({
  isRecurring: z.literal(false),
});

export const addRecurringTransactionSchema = baseTransactionSchema.extend({
  isRecurring: z.literal(true),
  recurringBillId: z
    .string()
    .min(1, { message: "Please select a recurring bill" }),
});
