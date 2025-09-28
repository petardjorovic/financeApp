import queryClient from "@/config/queryClient";
import { addPot, type AddPotProps } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { POTS } from "./usePots";

export const useAddPot = (
  setIsAddPotOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { mutate: addNewPot, ...rest } = useMutation<
    { message: string },
    Error,
    AddPotProps
  >({
    mutationFn: addPot,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [POTS] });
      setIsAddPotOpen(false);
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later.");
    },
  });

  return { addNewPot, ...rest };
};
