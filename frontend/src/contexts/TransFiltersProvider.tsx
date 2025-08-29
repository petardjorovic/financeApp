import { useState } from "react";
import { FilterContext } from "./TransFilterContext";

export const TransFiltersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("Latest");
  const [filter, setFilter] = useState<string>("All Transactions");
  const [page, setPage] = useState<number>(1);

  const setSearchTerm = (val: string) => setSearch(val);
  const setSortByTerm = (val: string) => setSortBy(val);
  const setFilterTerm = (val: string) => setFilter(val);
  const setPageNumber = (val: number) => setPage(val);

  return (
    <FilterContext.Provider
      value={{
        search,
        sortBy,
        filter,
        page,
        setSearchTerm,
        setFilterTerm,
        setPageNumber,
        setSortByTerm,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
