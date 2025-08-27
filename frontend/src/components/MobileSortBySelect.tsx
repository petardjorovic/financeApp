import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTriggerIcon,
} from "./ui/select";
import sortByIcon from "../assets/images/sortBy.svg";

const sortOptions = ["Latest", "Oldest", "A-Z", "Z-A", "Highest", "Lowest"];

function MobileSortBySelect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSort = searchParams.get("sort");

  const defaultSort = sortOptions.includes(initialSort || "")
    ? initialSort!
    : "Latest";

  const [sortBy, setSortBy] = useState<string>(defaultSort);

  const handleChange = (value: string) => {
    setSortBy(value);
    searchParams.set("sort", value);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!sortOptions.includes(initialSort || "")) {
      searchParams.set("sort", "Latest");
      setSearchParams(searchParams);
    }
  }, [initialSort, searchParams, setSearchParams]);

  return (
    <>
      <Select value={sortBy} onValueChange={handleChange} defaultValue="Latest">
        <SelectTriggerIcon className="[&_svg]:hidden md:hidden">
          <img src={sortByIcon} />
        </SelectTriggerIcon>
        <SelectContent className="min-w-[113px] mt-3 shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-[8px] bg-White border-none overflow-hidden">
          <SelectGroup>
            {sortOptions.map((option) => (
              <SelectItem
                key={option}
                value={option}
                className="[&_svg]:hidden text-Grey-900 px-5 py-3 border-b border-b-Grey-100 last:border-b-0 rounded-none data-[state=checked]:font-bold data-[state=checked]:bg-transparent text-sm leading-[21px]"
              >
                {option === "A-Z"
                  ? "A to Z"
                  : option === "Z-A"
                  ? "Z to A"
                  : option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default MobileSortBySelect;
