import queryClient from "@/config/queryClient";
import { addRecurringBill, type AddRecurringBillProps } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { RECURRING_BILLS } from "./useRecurringBills";
import { RAW_RECURRING_BILLS } from "./useRawRecurringBills";

export const useAddRecurringBill = (
  setIsOpenAddBill: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { mutate: addNewRecurringBill, ...rest } = useMutation<
    { message: string },
    Error,
    AddRecurringBillProps
  >({
    mutationFn: addRecurringBill,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [RECURRING_BILLS] });
      queryClient.invalidateQueries({ queryKey: [RAW_RECURRING_BILLS] });
      setIsOpenAddBill(false);
    },
    onError: (err) => {
      toast.error(
        err.message ?? "Something went wrong. Please try again later."
      );
    },
  });

  return { addNewRecurringBill, ...rest };
};
