import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getUser } from "@/lib/api";
import type { User } from "@/lib/types";

export const AUTH = "auth";

export const useAuth = (
  opts?: Omit<UseQueryOptions<User, Error, User>, "queryKey" | "queryFn">,
) => {
  const query = useQuery<User, Error, User>({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
    ...opts,
  });

  return { user: query.data, ...query };
};
