import queryClient from "@/config/queryClient";
import { useTransFilters } from "@/contexts/TransFilterContext";
import { getTransactions } from "@/lib/api";
import type { Transaction } from "@/lib/types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export const TRANSACTIONS = "transactions";

type ReturnType = {
  transactions: Transaction[];
  total: number;
  page: number;
  pages: number;
};

export const useTransactions = (opts?: UseQueryOptions<ReturnType, Error>) => {
  const { page, filter, sortBy: sort, search } = useTransFilters();

  const { data, ...rest } = useQuery<ReturnType, Error>({
    queryKey: [TRANSACTIONS, page, filter, sort, search],
    queryFn: () => getTransactions({ page, filter, sort, search }),
    ...opts,
  });

  // PRE-FETCHING
  if (data?.pages && page < data.pages) {
    queryClient.prefetchQuery({
      queryKey: [TRANSACTIONS, page + 1, filter, sort, search],
      queryFn: () => getTransactions({ page: page + 1, filter, sort, search }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: [TRANSACTIONS, page - 1, filter, sort, search],
      queryFn: () => getTransactions({ page: page - 1, filter, sort, search }),
    });
  }

  return { data, ...rest };
};
