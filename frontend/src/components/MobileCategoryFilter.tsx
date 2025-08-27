import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTriggerIcon,
} from "./ui/select";
import categoryFilter from "../assets/images/categoryFilter.svg";

function MobileCategoryFilter() {
  const [category, setCategory] = useState<string>("All Transactions");

  return (
    <Select
      value={category}
      onValueChange={setCategory}
      defaultValue="All Transactions"
    >
      <SelectTriggerIcon className="[&_svg]:hidden">
        <img src={categoryFilter} alt="categoryFilter" />
      </SelectTriggerIcon>
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
  );
}

export default MobileCategoryFilter;
