import queryClient from "@/config/queryClient";
import { deleteSession } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { SESSIONS } from "./useSessions";

export const useDeleteSession = () => {
  const { mutate: delSession, ...rest } = useMutation<
    { message: string },
    Error,
    { id: string }
  >({
    mutationFn: deleteSession,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [SESSIONS] });
    },
    onError: (err) => {
      toast.error(
        err.message ?? "Something went wrong. Please try again later."
      );
    },
  });

  return { delSession, ...rest };
};
