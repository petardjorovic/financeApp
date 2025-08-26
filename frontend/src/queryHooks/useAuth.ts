import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getUser, type User } from "@/lib/api";

const AUTH = "auth";

export const useAuth = (opts?: UseQueryOptions<User, Error, User>) => {
  const query = useQuery<User, Error, User>({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
    ...opts,
  });

  return { user: query.data, ...query };
};
