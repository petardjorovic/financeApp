import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItemTwo,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { FaCircle } from "react-icons/fa";
import type { UseFormReturn } from "react-hook-form";
import { useThemes } from "@/queryHooks/useThemes";
import type { Pot } from "@/lib/types";

type Props = {
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
  pots: Pot[] | undefined;
};

function PotThemeField({ form, pots }: Props) {
  const { themes } = useThemes();
  const potsThemes = pots?.map((pot) => pot.themeId._id) ?? [];

  const isThemeInUse = (themeId: string) => {
    if (potsThemes.includes(themeId)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <FormField
      control={form.control}
      name="themeId"
      render={({ field }) => (
        <FormItem className="w-full mb-0 gap-1">
          <FormLabel className="w-full text-xs text-Grey-500 leading-[18px] font-semibold my-0">
            Theme
          </FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value} required>
              <SelectTrigger className="w-full border border-Grey-300 h-[45px]">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectGroup className="py-3 px-5">
                  {themes.map((theme) => (
                    <div
                      key={theme._id}
                      className="flex items-center justify-between w-full not-last:border-b not-last:border-b-Grey-100 not-first:h-[45px] not-last:pb-3 not-first:pt-3"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <SelectItemTwo
                          value={theme._id}
                          key={theme._id}
                          disabled={isThemeInUse(theme._id)}
                          className="text-sm text-Grey-900 leading-[21px]"
                        >
                          <span className="flex items-center gap-3">
                            <FaCircle color={theme.color} className="w-4 h-4" />
                            {theme.name}
                          </span>
                        </SelectItemTwo>
                      </div>
                      {isThemeInUse(theme._id) && (
                        <span className="text-[10px] sm:text-xs text-Grey-500 leading-[18px] w-24">
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

export default PotThemeField;
