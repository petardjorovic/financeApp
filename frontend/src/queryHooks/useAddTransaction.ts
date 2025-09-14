import queryClient from "@/config/queryClient";
import { addTransaction, type AddTransactionParams } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { TRANSACTIONS } from "./useTransactions";
import toast from "react-hot-toast";

export const useAddTransaction = () => {
  const {
    mutate: addTx,
    isPending: isAddingTx,
    ...rest
  } = useMutation<{ message: string }, Error, AddTransactionParams>({
    mutationFn: (values: AddTransactionParams) => addTransaction(values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [TRANSACTIONS] });
    },
    onError: (err) => {
      toast.error(err.message || "An error occurred!");
    },
  });

  return { addTx, isAddingTx, ...rest };
};
