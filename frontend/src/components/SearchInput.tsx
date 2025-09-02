import { useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";

type SearchInputProps = {
  onSearch: (val: string) => void;
  setPage: (val: number) => void;
};

function SearchInput({ onSearch, setPage }: SearchInputProps) {
  const [search, setSearch] = useState<string>("");
  const inputRefLg = useRef<HTMLInputElement>(null);
  const inputRefSm = useRef<HTMLInputElement>(null);

  function onSearchChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearch(search.trim());
    setPage(1);
    inputRefLg.current?.blur();
    inputRefSm.current?.blur();
  }

  function clearSearch() {
    setSearch("");
    onSearch("");
    setPage(1);
    inputRefLg.current?.blur();
    inputRefSm.current?.blur();
  }

  return (
    <form
      className="relative w-[200px] sm:w-[162px] lg:w-[320px]"
      onSubmit={onSearchChange}
    >
      <Input
        type="text"
        ref={inputRefLg}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search transaction"
        className="pl-5 pr-15 sm:hidden lg:block py-3 rounded-[8px] text-sm leading-[21px] text-black placeholder:text-Beige-500 border-Beige-500 h-full cursor-pointer focus-visible:ring-0 focus-visible:border-black"
      />
      <Input
        type="text"
        ref={inputRefSm}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tran..."
        className="pl-5 pr-15 hidden sm:block lg:hidden py-3 rounded-[8px] text-sm leading-[21px] text-black placeholder:text-Beige-500 border-Beige-500 h-full cursor-pointer focus-visible:ring-0 focus-visible:border-black"
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

export default SearchInput;
