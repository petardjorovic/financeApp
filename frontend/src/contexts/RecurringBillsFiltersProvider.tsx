import { useCallback, useState } from "react";
import { RecurringBillsFilterContext } from "./RecurringBillsFilterContext";

function RecurringBillsFiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("Latest");

  const setSearchTerm = (val: string) => setSearch(val);
  const setSortByTerm = (val: string) => setSortBy(val);

  const resetFilters = useCallback(() => {
    setSearch("");

    setSortBy("Latest");
  }, []);

  return (
    <RecurringBillsFilterContext.Provider
      value={{ search, sortBy, setSearchTerm, setSortByTerm, resetFilters }}
    >
      {children}
    </RecurringBillsFilterContext.Provider>
  );
}

export default RecurringBillsFiltersProvider;
