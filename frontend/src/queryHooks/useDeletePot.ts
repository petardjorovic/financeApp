import queryClient from "@/config/queryClient";
import { deletePot } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { POTS } from "./usePots";

export const useDeletePot = (
  setIsOpenDelete: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { mutate: removePot, ...rest } = useMutation<
    { message: string },
    Error,
    { potId: string }
  >({
    mutationFn: deletePot,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [POTS] });
      setIsOpenDelete(false);
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later.");
    },
  });

  return { removePot, ...rest };
};
