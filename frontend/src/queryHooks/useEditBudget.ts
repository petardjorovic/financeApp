import queryClient from "@/config/queryClient";
import { editBudget, type EditBudgetProps } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BUDGETS } from "./useBudgets";

export const useEditBudget = (
  setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { mutate: updateBudget, ...rest } = useMutation<
    { message: string },
    Error,
    EditBudgetProps
  >({
    mutationFn: editBudget,
    onSuccess: (data) => {
      setIsOpenEdit(false);
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [BUDGETS] });
    },
    onError: () => {
      toast.error("An error occurred!Please try again later!");
    },
  });

  return { updateBudget, ...rest };
};
