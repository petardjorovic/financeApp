import { getPots } from "@/lib/api";
import type { Pot } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const POTS = "pots";

export const usePots = () => {
  const { data: pots, ...rest } = useQuery<Pot[], Error>({
    queryKey: [POTS],
    queryFn: getPots,
  });

  return { pots, ...rest };
};
