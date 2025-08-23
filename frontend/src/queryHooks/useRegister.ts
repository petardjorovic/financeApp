import { useMutation } from "@tanstack/react-query";
import { register } from "@/lib/api";
import type { registerFormValues } from "@/components/RegisterForm";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type RegisterReturnType = { message: string };

export const useRegister = () => {
  const navigate = useNavigate();
  const {
    mutate: signUp,
    isPending,
    isError,
  } = useMutation<
    RegisterReturnType,
    AxiosError<{ message: string }>,
    registerFormValues
  >({
    mutationFn: register,
    onSuccess: () => {
      toast.success(
        "Registration successful! Please check your email to verify your account."
      );
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "SignUp failed");
    },
  });

  return { signUp, isPending, isError };
};
