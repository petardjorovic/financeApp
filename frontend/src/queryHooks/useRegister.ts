import { useMutation } from "@tanstack/react-query";
import { register } from "@/lib/api";
import type { registerFormValues } from "@/components/RegisterForm";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

type RegisterReturnType = { message: string };

export const useRegister = () => {
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
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.message || "SignUp failed");
    },
  });

  return { signUp, isPending, isError };
};
