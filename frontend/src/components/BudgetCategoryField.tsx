import type { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import type { Category } from "@/lib/types";

type Props = {
  form: UseFormReturn<
    {
      categoryId: string;
      limit: string | number;
      themeId: string;
    },
    unknown,
    {
      categoryId: string;
      limit: number;
      themeId: string;
    }
  >;
  expenseCategories: Category[];
  budgetsCategories: string[];
};

function BudgetCategoryField({
  form,
  expenseCategories,
  budgetsCategories,
}: Props) {
  const isCategoryInUse = (categoryId: string) => {
    if (budgetsCategories.includes(categoryId)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <FormField
      control={form.control}
      name="categoryId"
      render={({ field }) => (
        <FormItem className="w-full gap-1">
          <FormLabel className="w-full text-xs text-Grey-500 leading-[18px] font-semibold my-0">
            Budget Category
          </FormLabel>
          <FormControl className="my-0">
            <Select onValueChange={field.onChange} value={field.value} required>
              <SelectTrigger className="w-full border border-Grey-300 h-[45px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectGroup className="w-full py-3 px-5">
                  {expenseCategories.map((cat) => (
                    <div
                      key={cat._id}
                      className="flex items-center justify-between not-last:border-b not-last:border-b-Grey-100 not-first:h-[45px] not-last:pb-3 not-first:pt-3"
                    >
                      <SelectItem
                        value={cat._id}
                        key={cat._id}
                        className="text-sm text-Grey-900 leading-[21px]"
                        disabled={isCategoryInUse(cat._id)}
                      >
                        {cat.name}
                      </SelectItem>
                      {isCategoryInUse(cat._id) && (
                        <span className="text-[10px] sm:text-xs text-Grey-500 w-24">
                          Already used
                        </span>
                      )}
                    </div>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className="w-full" />
        </FormItem>
      )}
    />
  );
}

export default BudgetCategoryField;
