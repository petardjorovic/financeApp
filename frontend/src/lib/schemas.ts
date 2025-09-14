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

export const addTransactionSchema = z
  .object({
    isRecurring: z.boolean().default(false),
    type: z.enum(["income", "expense"]).optional(),
    account: z
      .string()
      .min(2, { message: "Recipient / Sender must be at least 2 characters" })
      .max(255, {
        message: "Recipient / Sender cannot be longer than 255 characters",
      })
      .optional(),
    amount: z
      .union([z.number(), z.string()])
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val > 0, {
        message: "Amount must be a positive number",
      }),
    categoryId: z
      .string()
      .min(1, { message: "You must choose some category" })
      .optional(),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
      .refine((val) => new Date(val).getTime() <= Date.now(), {
        message: "Transaction date cannot be in the future",
      }),
    recurringBillId: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isRecurring) return !!data.recurringBillId;
      return true;
    },
    { message: "Please select a recurring bill", path: ["recurringBillId"] }
  )
  .refine(
    (data) => {
      if (!data.isRecurring) return !!data.type;
      return true;
    },
    { message: "Please select type of transaction", path: ["type"] }
  )
  .refine(
    (data) => {
      if (!data.isRecurring) return !!data.account;
      return true;
    },
    { message: "Please enter Recipient / Sender", path: ["account"] }
  )
  .refine(
    (data) => {
      if (!data.isRecurring) return !!data.categoryId;
      return true;
    },
    { message: "Please select category", path: ["categoryId"] }
  );
