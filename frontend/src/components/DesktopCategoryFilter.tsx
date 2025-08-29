import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useCategories } from "@/queryHooks/useCategories";
import arrowDown from "../assets/images/arrow-down.svg";
import { useTransFilters } from "@/contexts/TransFilterContext";

function DesktopCategoryFilter() {
  const { categories } = useCategories();
  const { filter, setFilterTerm } = useTransFilters();

  return (
    <div className="flex items-center gap-2">
      <p className="text-Grey-500 text-sm leading-[21px]">Category</p>
      <Select
        value={filter}
        onValueChange={setFilterTerm}
        defaultValue="All Transactions"
      >
        <SelectTrigger className="min-w-[177px] [&_svg]:hidden">
          <SelectValue />
          <img src={arrowDown} alt="arrowDown" />
        </SelectTrigger>
        <SelectContent className="mt-3 min-w-[177px] h-[300px] shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-[8px] bg-White border-none overflow-hidden">
          <SelectGroup>
            <SelectItem
              value="All Transactions"
              className="[&_svg]:hidden text-Grey-900 px-5 py-3 border-b border-b-Grey-100 rounded-none data-[state=checked]:font-bold data-[state=checked]:bg-transparent text-sm leading-[21px]"
            >
              All Transactions
            </SelectItem>
            {categories.map((category) => (
              <SelectItem
                key={category._id}
                value={category.name}
                className="[&_svg]:hidden text-Grey-900 px-5 py-3 border-b border-b-Grey-100 last:border-b-0 rounded-none data-[state=checked]:font-bold data-[state=checked]:bg-transparent text-sm leading-[21px]"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default DesktopCategoryFilter;

/*
const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("filter");
  const categoryNames = categories.map((cat) => cat.name);
  const defaultCategory = categoryNames.includes(initialCategory || "")
    ? initialCategory!
    : "All Transactions";

  const [category, setCategory] = useState<string>(defaultCategory);

  const handleChange = (value: string) => {
    setCategory(value);
    searchParams.set("filter", value);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!categories.length) return;

    if (
      !categories.some((cat) => cat.name === initialCategory) &&
      initialCategory !== "All Transactions"
    ) {
      searchParams.set("filter", "All Transactions");
      setSearchParams(searchParams);
    }
  }, [
    initialCategory,
    searchParams,
    setSearchParams,
    categories,
    defaultCategory,
  ]);
  */
