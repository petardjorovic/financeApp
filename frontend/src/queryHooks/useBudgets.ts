import { getBudgets, type Budget } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const BUDGETS = "budgets";

export const useBudgets = () => {
  const {
    data: budgets,
    isLoading,
    ...rest
  } = useQuery<Budget[], Error>({
    queryKey: [BUDGETS],
    queryFn: getBudgets,
  });

  return { budgets, isLoading, ...rest };
};
