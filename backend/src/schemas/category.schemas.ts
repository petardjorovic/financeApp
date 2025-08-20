import z from "zod";

export const addCategorySchema = z.object({
  name: z.string().min(1).max(255),
  type: z.enum(["income", "expense"]),
});

export const getCategoriesByTypeSchema = z.object({
  type: z.enum(["income", "expense"]).optional(),
});
