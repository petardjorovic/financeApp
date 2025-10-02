import { useQuery } from "@tanstack/react-query";
import { getRecurringBills } from "@/lib/api";
import type { RecurringBill } from "@/lib/types";
import { useRecurringBillsFilters } from "@/contexts/RecurringBillsFilterContext";

export const RECURRING_BILLS = "recurringBills";

export const useRecurringBills = () => {
  const { search, sortBy } = useRecurringBillsFilters();
  const { data: recurringBills = [], ...rest } = useQuery<
    RecurringBill[],
    Error
  >({
    queryKey: [RECURRING_BILLS, sortBy, search],
    queryFn: () => getRecurringBills({ search, sortBy }),
  });

  return { recurringBills, ...rest };
};
