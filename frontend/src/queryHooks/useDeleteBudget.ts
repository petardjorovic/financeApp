import queryClient from "@/config/queryClient";
import { deleteBudget } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BUDGETS } from "./useBudgets";

export const useDeleteBudget = () => {
  const {
    mutate: delBudget,
    isPending: isDeletingBudget,
    ...rest
  } = useMutation<{ message: string }, Error, { budgetId: string }>({
    mutationFn: deleteBudget,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [BUDGETS] });
    },
    onError: (err) => {
      toast.error(err.message ?? "An error occurred, please try again later.");
    },
  });

  return { delBudget, isDeletingBudget, ...rest };
};
