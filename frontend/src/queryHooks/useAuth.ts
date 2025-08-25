import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getUser, type User } from "@/lib/api";

const AUTH = "auth";

export const useAuth = () => {
  const { data, isLoading } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
  });

  return { user: data?.user, isLoading };
};
