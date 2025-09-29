import queryClient from "@/config/queryClient";
import { depositPot, type DepositPotProps } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { POTS } from "./usePots";
import { TRANSACTIONS } from "./useTransactions";

export const useDepositPot = (
  setIsDepositOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { mutate: addPotDeposit, ...rest } = useMutation<
    { message: string },
    Error,
    DepositPotProps
  >({
    mutationFn: depositPot,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [POTS] });
      queryClient.invalidateQueries({ queryKey: [TRANSACTIONS] });
      setIsDepositOpen(false);
    },
    onError: (err) => {
      toast.error(
        err.message ?? "Something went wrong. Please try again later."
      );
    },
  });

  return { addPotDeposit, ...rest };
};
