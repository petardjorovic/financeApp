import z from "zod";

export const sessionIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid Session id");
