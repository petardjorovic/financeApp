import { login } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

type LoginReturnType = {
  message: string;
};

type LoginState = {
  redirectUrl?: string;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation() as { state: LoginState };
  const redirectUrl = location.state?.redirectUrl || "/";

  const {
    mutate: signIn,
    isPending,
    isError,
    error,
  } = useMutation<
    LoginReturnType,
    AxiosError<{ message: string }>,
    { email: string; password: string }
  >({
    mutationFn: login,
    onSuccess: () => {
      navigate(redirectUrl, { replace: true });
    },
    onError: (err) => {
      const message = err.response?.data?.message ?? "Login failed";
      toast.error(message);
    },
  });

  return { signIn, isPending, isError, error };
};
