import { getThemes } from "@/lib/api";
import type { Theme } from "@/lib/types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

const THEMES = "themes";

export const useThemes = (opts?: UseQueryOptions<Theme[], Error>) => {
  const { data: themes = [], ...rest } = useQuery<Theme[], Error>({
    queryKey: [THEMES],
    queryFn: getThemes,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    ...opts,
  });

  return { themes, ...rest };
};
