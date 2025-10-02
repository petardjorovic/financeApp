import queryClient from "@/config/queryClient";
import { deleteRecurringBill } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { RECURRING_BILLS } from "./useRecurringBills";

export const useDeleteRecurringBill = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { mutate: delRecurringBill, ...rest } = useMutation<
    { message: string },
    Error,
    { id: string }
  >({
    mutationFn: deleteRecurringBill,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [RECURRING_BILLS] });
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later.");
    },
  });

  return { delRecurringBill, ...rest };
};
