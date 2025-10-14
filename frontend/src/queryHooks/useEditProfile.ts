import queryClient from "@/config/queryClient";
import { editProfile } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AUTH } from "./useAuth";

export const useEditProfile = () => {
  const { mutate: updateProfile, ...rest } = useMutation<
    { message: string },
    Error,
    FormData
  >({
    mutationFn: editProfile,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [AUTH] });
    },
    onError: (err) => {
      toast.error(
        err.message || "Something went wrong. Please try again later."
      );
    },
  });

  return { updateProfile, ...rest };
};
