import { getRawRecurringBills } from "@/lib/api";
import type { RecurringBill } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useRawRecurringBills = (isRecurring: string) => {
  const {
    data: recurringBills,
    isLoading: isRecuringLoading,
    ...rest
  } = useQuery<RecurringBill[], Error>({
    queryKey: ["rawRecurringBills", isRecurring],
    queryFn: getRawRecurringBills,
    enabled: isRecurring === "true",
  });

  return { recurringBills, isRecuringLoading, ...rest };
};
