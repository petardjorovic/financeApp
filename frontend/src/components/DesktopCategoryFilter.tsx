import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import arrowDown from "../assets/images/arrow-down.svg";

function DesktopCategoryFilter() {
  const [category, setCategory] = useState<string>("All Transactions");

  return (
    <div className="flex items-center gap-2">
      <p className="text-Grey-500 text-sm leading-[21px]">Category</p>
      <Select
        value={category}
        onValueChange={setCategory}
        defaultValue="All Transactions"
      >
        <SelectTrigger className="min-w-[177px] [&_svg]:hidden">
          <SelectValue />
          <img src={arrowDown} alt="arrowDown" />
        </SelectTrigger>
        <SelectContent className="mt-2">
          <SelectGroup>
            <SelectItem value="All Transactions">All Transactions</SelectItem>
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
  );
}

export default DesktopCategoryFilter;
