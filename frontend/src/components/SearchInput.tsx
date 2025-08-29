import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

function SearchInput() {
  const [search, setSearch] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  function onSearchChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newParams = new URLSearchParams(searchParams);
    if (search.trim()) {
      newParams.set("search", search.trim());
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  }

  return (
    <form
      className="relative w-[200px] sm:w-[162px] lg:w-[320px]"
      onSubmit={onSearchChange}
    >
      <Input
        type="text"
        value={search}
        placeholder="Search transaction"
        onChange={(e) => setSearch(e.target.value)}
        className="pl-5 pr-13 sm:hidden lg:block py-3 rounded-[8px] text-sm leading-[21px] text-black placeholder:text-Beige-500 border-Beige-500 h-full cursor-pointer focus-visible:ring-0 focus-visible:border-black"
      />
      <Input
        type="text"
        value={search}
        placeholder="Search tran..."
        onChange={(e) => setSearch(e.target.value)}
        className="pl-5 pr-13 hidden sm:block lg:hidden py-3 rounded-[8px] text-sm leading-[21px] text-black placeholder:text-Beige-500 border-Beige-500 h-full cursor-pointer focus-visible:ring-0 focus-visible:border-black"
      />
      <button type="submit">
        <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-Grey-900 w-4 h-4 cursor-pointer" />
      </button>
    </form>
  );
}

export default SearchInput;
