import z from "zod";

export const addThemeSchema = z.object({
  name: z.string().min(1).max(255),
  color: z.string().min(1).max(255),
});
