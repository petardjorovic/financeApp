import { getOverViewData } from "@/lib/api";
import type { Overview } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const OVERVIEW = "overview";

export const useOverview = () => {
  const { data: overview, ...rest } = useQuery<Overview, Error>({
    queryKey: [OVERVIEW],
    queryFn: getOverViewData,
  });

  return { overview, ...rest };
};
