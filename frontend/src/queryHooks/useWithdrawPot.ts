import queryClient from "@/config/queryClient";
import { withdrawPot, type WithdrawPotProps } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { POTS } from "./usePots";
import { TRANSACTIONS } from "./useTransactions";

export const useWithdrawPot = (
  setIsWithdrawOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { mutate: potWithdraw, ...rest } = useMutation<
    { message: string },
    Error,
    WithdrawPotProps
  >({
    mutationFn: withdrawPot,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [POTS] });
      queryClient.invalidateQueries({ queryKey: [TRANSACTIONS] });
      setIsWithdrawOpen(false);
    },
    onError: (err) => {
      toast.error(
        err.message ?? "Something went wrong. Please try again later."
      );
    },
  });

  return { potWithdraw, ...rest };
};
