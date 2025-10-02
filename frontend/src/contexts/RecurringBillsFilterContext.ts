import { createContext, useContext } from "react";

type FilterCtxProps = {
  search: string;
  setSearchTerm: (val: string) => void;
  sortBy: string;
  setSortByTerm: (val: string) => void;
  resetFilters: () => void;
};

export const RecurringBillsFilterContext = createContext<
  FilterCtxProps | undefined
>(undefined);

export const useRecurringBillsFilters = () => {
  const ctx = useContext(RecurringBillsFilterContext);
  if (!ctx)
    throw new Error(
      "useRecurringBillsFilters must be used within RecurringBillsFiltersProvider"
    );
  return ctx;
};
