import { createContext, useContext } from "react";

type FilterCtxProps = {
  search: string;
  setSearchTerm: (val: string) => void;
  sortBy: string;
  setSortByTerm: (val: string) => void;
  filter: string;
  setFilterTerm: (val: string) => void;
  page: number;
  setPageNumber: (val: number) => void;
  resetFilters: () => void;
};

export const FilterContext = createContext<FilterCtxProps | undefined>(
  undefined
);

export const useTransFilters = () => {
  const ctx = useContext(FilterContext);
  if (!ctx)
    throw new Error("useTransFilter must be used within TransFiltersProvider");
  return ctx;
};
