import { getCategories } from "@/lib/api";
import type { Category } from "@/lib/types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export const CATEGORIES = "categories";

export const useCategories = (opts?: UseQueryOptions<Category[], Error>) => {
  const { data: categories = [], ...rest } = useQuery<Category[], Error>({
    queryKey: [CATEGORIES],
    queryFn: getCategories,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    ...opts,
  });

  return { categories, ...rest };
};
