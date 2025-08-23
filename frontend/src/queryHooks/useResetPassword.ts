import { resetPassword, type ResetPasswordParams } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type ReturnType = { message: string };

export const useResetPassword = () => {
  const {
    mutate: resetUserPassword,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation<ReturnType, Error, ResetPasswordParams>({
    mutationFn: resetPassword,
  });

  return { resetUserPassword, isPending, isError, error, isSuccess };
};
