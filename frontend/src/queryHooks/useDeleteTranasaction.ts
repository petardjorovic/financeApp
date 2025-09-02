import queryClient from "@/config/queryClient";
import { deleteTransaction } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TRANSACTIONS } from "./useTransactions";

export const useDeleteTransaction = () => {
  const {
    mutate: delTransaction,
    isPending: isDeleting,
    ...rest
  } = useMutation<{ message: string }, Error, { transactionId: string }>({
    mutationFn: (transactionId) => deleteTransaction(transactionId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [TRANSACTIONS] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { delTransaction, isDeleting, ...rest };
};
