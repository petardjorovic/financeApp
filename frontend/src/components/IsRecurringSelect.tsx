import type { useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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

type EditFormValues = {
  type: "income" | "expense";
  account: string;
  amount: string | number;
  categoryId: string;
  date: string;
  isRecurring: "true" | "false";
  recurringBillId?: string | undefined;
};

function IsRecurringSelect({
  form,
}: {
  form: ReturnType<typeof useForm<EditFormValues>>;
}) {
  const { control } = form;
  return (
    <FormField
      name="isRecurring"
      control={control}
      render={({ field }) => (
        <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
          <FormLabel className="w-60 sm:w-80 lg:w-40">
            Is recurring transaction
          </FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              value={field.value ?? ""}
              required
            >
              <SelectTrigger className="w-60 sm:w-80 lg:w-70 border border-Grey-300">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Is recurring</SelectLabel>
                  <SelectItem value={"true"}>Yes</SelectItem>
                  <SelectItem value={"false"}>No</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default IsRecurringSelect;
