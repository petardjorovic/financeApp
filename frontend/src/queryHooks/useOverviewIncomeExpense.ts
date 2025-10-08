import type { PeriodType, RangeType } from "@/components/IncomeExpenseChart";
import { getIncomeExpenseData } from "@/lib/api";
import type { OverviewIncomeExpenseChart } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const OVERVIEW_INCOME_EXPENSE_DATA = "overviewIncomeExpenseData";

export const useOverviewIncomeExpense = ({
  period,
  range,
}: {
  period: PeriodType;
  range: RangeType;
}) => {
  const isFetch = !(
    (period === "monthly" && range === "1m") ||
    (period === "yearly" && (range === "1m" || range === "6m"))
  );

  const { data, ...rest } = useQuery<OverviewIncomeExpenseChart[], Error>({
    queryKey: [OVERVIEW_INCOME_EXPENSE_DATA, period, range],
    queryFn: () => getIncomeExpenseData({ period, range }),
    enabled: isFetch,
  });

  return { data, ...rest };
};
