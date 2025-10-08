import z from "zod";

export const getOverviewIncomeExpenseDataSchema = z.object({
  period: z.enum(["daily", "monthly", "yearly"]),
  range: z.enum(["1m", "6m", "all"]),
});
