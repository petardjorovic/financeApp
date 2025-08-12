import z from "zod";

export const addThemeSchema = z.string().min(1).max(255);
