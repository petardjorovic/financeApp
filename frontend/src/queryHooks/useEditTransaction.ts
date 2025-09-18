import queryClient from "@/config/queryClient";
import { editTransaction, type EditTransactionParams } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TRANSACTIONS } from "./useTransactions";

export const useEditTransaction = () => {
  const {
    mutate: updateTx,
    isPending: isUpdatingTx,
    ...rest
  } = useMutation<{ message: string }, Error, EditTransactionParams>({
    mutationFn: editTransaction,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [TRANSACTIONS] });
    },
    onError: () => {
      toast.error("An error occurred!Please try again later!");
    },
  });

  return { updateTx, isUpdatingTx, ...rest };
};
