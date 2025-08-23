import { sendPasswordResetEmail } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type ReturnType = {
  message: string;
};

export const useSendPassordResetEmail = () => {
  const {
    mutate: sendPasswordReset,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMutation<ReturnType, Error, { email: string }>({
    mutationFn: sendPasswordResetEmail,
  });

  return { sendPasswordReset, isPending, isError, isSuccess, error };
};
