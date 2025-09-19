import { useWatch, type useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/queryHooks/useCategories";
import { Loader2 } from "lucide-react";

type EditFormValues = {
  type: "income" | "expense";
  account: string;
  amount: string | number;
  categoryId: string;
  date: string;
  isRecurring: "true" | "false";
  recurringBillId?: string | undefined;
};

function TransactionCategorySelect({
  form,
}: {
  form: ReturnType<typeof useForm<EditFormValues>>;
}) {
  const { control } = form;
  const { categories, isLoading } = useCategories();
  const incomeCategories = categories.filter((cat) => cat.type === "income");
  const expenseCategories = categories.filter((cat) => cat.type === "expense");
  const selectedType = useWatch({
    control,
    name: "type",
  });
  const filteredCategories =
    selectedType === "income" ? incomeCategories : expenseCategories;

  return (
    <FormField
      control={control}
      name="categoryId"
      render={({ field }) => (
        <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
          <FormLabel className="w-60 sm:w-80 lg:w-40">Category</FormLabel>
          <FormControl>
            {!isLoading ? (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                required
              >
                <SelectTrigger className="w-60 sm:w-80 lg:w-70 border border-Grey-300">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {filteredCategories.map((cat) => (
                      <SelectItem value={cat._id} key={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <Loader2 className="animate-spin" />
            )}
          </FormControl>
          <FormMessage className="lg:py-3 w-60 sm:w-80 lg:w-70" />
        </FormItem>
      )}
    />
  );
}

export default TransactionCategorySelect;
