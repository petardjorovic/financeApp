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
