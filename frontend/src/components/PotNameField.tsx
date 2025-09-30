import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

function PotNameField({
  form,
}: {
  form: UseFormReturn<
    {
      name: string;
      target: string | number;
      themeId: string;
    },
    unknown,
    {
      name: string;
      target: number;
      themeId: string;
    }
  >;
}) {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="w-full text-xs text-Grey-500 leading-[18px] font-semibold my-0">
            Pot Name
          </FormLabel>
          <FormControl className="w-full">
            <Input
              {...field}
              className="px-5 py-3 h-[45px] border border-Grey-300 cursor-pointer"
              placeholder="e.g. Rainy Days"
              required
              maxLength={30}
            />
          </FormControl>
          <FormDescription className="text-xs text-Grey-500 text-right">
            {30 - field.value.length > 0 ? 30 - field.value.length : 0}{" "}
            characters left
          </FormDescription>
          <FormMessage className="w-full" />
        </FormItem>
      )}
    />
  );
}

export default PotNameField;
