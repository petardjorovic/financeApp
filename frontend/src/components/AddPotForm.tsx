import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { potSchema } from "@/lib/schemas";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import type { Pot } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItemTwo,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FaCircle } from "react-icons/fa";
import { useThemes } from "@/queryHooks/useThemes";
import { useEffect } from "react";
import { useAddPot } from "@/queryHooks/useAddPot";
import { Loader2Icon } from "lucide-react";

type Props = {
  isAddPotOpen: boolean;
  setIsAddPotOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pots: Pot[] | undefined;
};

type AddPotFormValues = z.infer<typeof potSchema>;

function AddPotForm({ isAddPotOpen, setIsAddPotOpen, pots }: Props) {
  const { themes } = useThemes();
  const { addNewPot, isPending: isAddingPot } = useAddPot(setIsAddPotOpen);
  const addPotForm = useForm({
    resolver: zodResolver(potSchema),
    defaultValues: {
      name: "",
      target: "",
      themeId: "",
    },
  });
  const potsThemes = pots?.map((pot) => pot.themeId._id) ?? [];

  const isThemeInUse = (themeId: string) => {
    if (potsThemes.includes(themeId)) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = (values: AddPotFormValues) => {
    addNewPot(values);
  };

  useEffect(() => {
    if (!isAddPotOpen) {
      addPotForm.reset();
    }
  }, [addPotForm, isAddPotOpen]);

  return (
    <Dialog
      open={isAddPotOpen}
      onOpenChange={(open) => {
        if (!isAddingPot) setIsAddPotOpen(open);
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="h-auto px-5 py-6 sm:max-w-[560px] sm:px-8 sm:py-8 rounded-[12px] flex flex-col gap-5"
      >
        <DialogHeader className="flex flex-col gap-5">
          <DialogTitle className="text-Grey-900 py-0 my-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[20px] leading-[24px] sm:text-[32px] sm:leading-[38px] tracking-[0px] font-bold">
                Add New Pot
              </span>
              <IoIosCloseCircleOutline
                className="fill-Grey-500 w-[25px] h-[25px]"
                onClick={() => setIsAddPotOpen(false)}
              />
            </div>
          </DialogTitle>
          <DialogDescription className="text-sm leading-[21px] text-Grey-500 py-0 my-0">
            Create a pot to set savings target. These can help keep you on track
            as you save for special purchases.
          </DialogDescription>
        </DialogHeader>
        <Form {...addPotForm}>
          <form
            className="space-y-4"
            onSubmit={addPotForm.handleSubmit(onSubmit)}
          >
            {/* Name */}
            <FormField
              control={addPotForm.control}
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

            {/* Target */}
            <FormField
              control={addPotForm.control}
              name="target"
              render={({ field }) => (
                <FormItem className="w-full gap-1">
                  <FormLabel className="w-full text-xs text-Grey-500 leading-[18px] font-semibold my-0">
                    Target
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
                        placeholder="e.g. 2000"
                        required
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="w-full" />
                </FormItem>
              )}
            />

            {/* Theme */}
            <FormField
              control={addPotForm.control}
              name="themeId"
              render={({ field }) => (
                <FormItem className="w-full mb-0 gap-1">
                  <FormLabel className="w-full text-xs text-Grey-500 leading-[18px] font-semibold my-0">
                    Theme
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      required
                    >
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
                                    <FaCircle
                                      color={theme.color}
                                      className="w-4 h-4"
                                    />
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

            <Button
              type="submit"
              disabled={isAddingPot}
              className="w-full mt-5 h-[53px] rounded-[8px] bg-Grey-900 text-White p-4 text-sm font-semibold cursor-pointer"
            >
              {isAddingPot ? (
                <Loader2Icon className=" h-4 w-4 animate-spin" />
              ) : (
                "Add Pot"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddPotForm;
