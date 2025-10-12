import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import queryClient from "@/config/queryClient";
import { editPassword } from "@/lib/api";

export const useEditPassword = () => {
  const navigate = useNavigate();

  const { mutate: updatePassword, ...rest } = useMutation<
    { message: string },
    Error,
    { password: string; confirmPassword: string }
  >({
    mutationFn: editPassword,
    onSuccess: () => {
      toast.success("Passsword successfully updated. Please log in again.");
      queryClient.clear();
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error("Something went wrong. Please try again later.");
      console.log(err.message);
    },
  });

  return { updatePassword, ...rest };
};
