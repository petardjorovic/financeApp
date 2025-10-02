import { useRecurringBillsFilters } from "@/contexts/RecurringBillsFilterContext";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Search, X } from "lucide-react";

function RecurringBillsSearchInput() {
  const [search, setSearch] = useState<string>("");
  const inputRefLg = useRef<HTMLInputElement>(null);
  const inputRefSm = useRef<HTMLInputElement>(null);
  const { setSearchTerm, search: value } = useRecurringBillsFilters();

  function onSearchChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchTerm(search.trim());
    inputRefLg.current?.blur();
    inputRefSm.current?.blur();
  }

  function clearSearch() {
    setSearch("");
    setSearchTerm("");
    inputRefLg.current?.blur();
    inputRefSm.current?.blur();
  }

  useEffect(() => {
    setSearch(value);
  }, [value]);

  return (
    <form className="relative max-w-[320px]" onSubmit={onSearchChange}>
      <Input
        type="text"
        ref={inputRefLg}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search bills"
        className="pl-5 pr-15 py-3 rounded-[8px] text-sm leading-[21px] text-black placeholder:text-Beige-500 border-Beige-500 h-full cursor-pointer focus-visible:ring-0 focus-visible:border-black"
      />
      <button type="submit">
        <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-Grey-900 w-4 h-4 cursor-pointer" />
      </button>

      {search && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer ml-1"
        >
          <X className="w-4 h-4" color="#c94736" />
        </button>
      )}
    </form>
  );
}

export default RecurringBillsSearchInput;
