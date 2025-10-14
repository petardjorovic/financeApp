import z from "zod";

export const editPasswordSchema = z
  .object({
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const editProfileSchema = z.object({
  fullName: z.string().min(1).max(255).optional(),
});
