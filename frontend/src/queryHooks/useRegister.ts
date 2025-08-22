import { useMutation } from "@tanstack/react-query";
import { register, type User } from "@/lib/api";
import type { registerFormValues } from "@/components/RegisterForm";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();
  const {
    mutate: signUp,
    isPending,
    isError,
  } = useMutation<User, AxiosError<{ message: string }>, registerFormValues>({
    mutationFn: register,
    onSuccess: () => {
      toast.success("You have register. Please check your email.");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "SignUp failed");
    },
  });

  return { signUp, isPending, isError };
};
