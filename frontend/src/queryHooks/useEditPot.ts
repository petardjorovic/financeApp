import queryClient from "@/config/queryClient";
import { editPot, type EditPotProps } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { POTS } from "./usePots";

export const useEditPot = (
  setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { mutate: updatePot, ...rest } = useMutation<
    { message: string },
    Error,
    EditPotProps
  >({
    mutationFn: editPot,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [POTS] });
      setIsOpenEdit(false);
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later.");
    },
  });

  return { updatePot, ...rest };
};
