import z from "zod";

export const emailSchema = z.email();
const passwordSchema = z.string().min(6).max(255);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: passwordSchema,
    fullName: z.string().min(1).max(255),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verificationCodeSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid Verification code");

export const resetPasswordSchema = z.object({
  verificationCode: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid Verification code"),
  password: passwordSchema,
});

export const sessionIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid Session id");
