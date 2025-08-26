import { useState } from "react";
import SearchInput from "./SearchInput";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function TransactionsContent() {
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("Latest");
  const [category, setCategory] = useState<string>("All Transactions");

  return (
    <>
      <div className="h-[45px] w-full flex justify-between">
        <SearchInput setSearch={setSearch} search={search} />
        <div className="h-full flex items-center gap-6">
          <div className="flex items-center gap-2">
            <p className="text-Grey-500 text-sm leading-[21px]">Sort By</p>
            <Select
              value={sortBy}
              onValueChange={setSortBy}
              defaultValue="Latest"
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="min-w-[113px]">
                <SelectGroup>
                  <SelectItem value="Latest" className="text-Grey-900">
                    Latest
                  </SelectItem>
                  <SelectItem value="Oldest">Oldest</SelectItem>
                  <SelectItem value="A-Z">A to Z</SelectItem>
                  <SelectItem value="Z-A">Z to A</SelectItem>
                  <SelectItem value="Highest">Highest</SelectItem>
                  <SelectItem value="Lowest">Lowest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-Grey-500 text-sm leading-[21px]">Category</p>
            <Select
              value={category}
              onValueChange={setCategory}
              defaultValue="All Transactions"
            >
              <SelectTrigger className="min-w-[177px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="All Transactions">
                    All Transactions
                  </SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Bills">Bills</SelectItem>
                  <SelectItem value="Groceries">Groceries</SelectItem>
                  <SelectItem value="Dining Out">Dining Out</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Personal Care">Personal Care</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div></div>
      <div></div>
    </>
  );
}

export default TransactionsContent;
