import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { googleLogin } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type LoginState = {
  redirectUrl?: string;
};

export const useGoogleSignIn = () => {
  const navigate = useNavigate();
  const location = useLocation() as { state: LoginState };
  const redirectUrl = location.state?.redirectUrl || "/";

  const { mutate: signInWithGoogle, ...rest } = useMutation<
    { message: string },
    AxiosError<{ message: string }>,
    { credential: string }
  >({
    mutationFn: googleLogin,
    onSuccess: () => {
      navigate(redirectUrl, { replace: true });
    },
    onError: (err) => {
      const message = err.message || "Login failed";
      toast.error(message);
    },
  });

  return { signInWithGoogle, ...rest };
};
