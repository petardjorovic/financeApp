import queryClient from "@/config/queryClient";
import { addBudget, type AddBudgetProps } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BUDGETS } from "./useBudgets";

export const useAddBudget = (
  setIsAddBudgetOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { mutate: addNewBudget, ...rest } = useMutation<
    { message: string },
    Error,
    AddBudgetProps
  >({
    mutationFn: addBudget,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [BUDGETS] });
      setIsAddBudgetOpen(false);
    },
    onError: () => {
      toast.error("Something went wrong. Please try agina later.");
    },
  });

  return { addNewBudget, ...rest };
};
