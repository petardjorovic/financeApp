import { getRawRecurringBills } from "@/lib/api";
import type { RawRecurringBill } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const RAW_RECURRING_BILLS = "rawRecurringBills";

export const useRawRecurringBills = (isRecurring: string) => {
  const {
    data: recurringBills,
    isLoading: isRecuringLoading,
    ...rest
  } = useQuery<RawRecurringBill[], Error>({
    queryKey: [RAW_RECURRING_BILLS, isRecurring],
    queryFn: getRawRecurringBills,
    enabled: isRecurring === "true",
  });

  return { recurringBills, isRecuringLoading, ...rest };
};
