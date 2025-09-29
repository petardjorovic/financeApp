import { getCurrentBalance } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const CURRENT_BALANCE = "currentBalance";

export const useCurrentBalance = () => {
  const { data, ...rest } = useQuery<{ currentBalance: number }, Error>({
    queryKey: [CURRENT_BALANCE],
    queryFn: getCurrentBalance,
  });

  return { currentBalance: data?.currentBalance, ...rest };
};
