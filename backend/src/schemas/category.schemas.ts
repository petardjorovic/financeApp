import z from "zod";

export const addCategorySchema = z.string().min(1).max(255);
