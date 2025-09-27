import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import type { UseFormReturn } from "react-hook-form";

function BudgetLimitField({
  form,
}: {
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
}) {
  return (
    <FormField
      control={form.control}
      name="limit"
      render={({ field }) => (
        <FormItem className="w-full gap-1">
          <FormLabel className="w-full text-xs text-Grey-500 leading-[18px] font-semibold my-0">
            Maximum Spend
          </FormLabel>
          <FormControl className="w-full">
            <div className="relative h-[45px]">
              <span className="text-sm text-Grey-500 leading-[21px] absolute left-5 top-1/2 -translate-y-1/2">
                $
              </span>
              <Input
                type="number"
                step="0.01"
                {...field}
                className="pr-5 pl-10 py-3 h-[45px] border border-Grey-300 cursor-pointer"
              />
            </div>
          </FormControl>
          <FormMessage className="w-full" />
        </FormItem>
      )}
    />
  );
}

export default BudgetLimitField;
