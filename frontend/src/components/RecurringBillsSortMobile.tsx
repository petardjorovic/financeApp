import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTriggerIcon,
} from "./ui/select";
import sortByIcon from "../assets/images/sortBy.svg";
import { useRecurringBillsFilters } from "@/contexts/RecurringBillsFilterContext";

const sortOptions = ["Latest", "Oldest", "A-Z", "Z-A", "Highest", "Lowest"];

function RecurringBillsSortMobile() {
  const { sortBy, setSortByTerm } = useRecurringBillsFilters();

  return (
    <>
      <Select
        value={sortBy}
        onValueChange={setSortByTerm}
        defaultValue="Latest"
      >
        <SelectTriggerIcon className="[&_svg]:hidden">
          <img src={sortByIcon} />
        </SelectTriggerIcon>
        <SelectContent
          className="min-w-[113px] mt-7 h-[300px] shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-[8px] bg-White border-none overflow-hidden"
          align="end"
        >
          <SelectGroup>
            <SelectLabel className="text-Grey-500 text-sm leading-[21px] px-5 py-3 border-b border-b-Grey-100">
              Sort by
            </SelectLabel>
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

export default RecurringBillsSortMobile;
