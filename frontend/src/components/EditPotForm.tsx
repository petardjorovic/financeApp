import { potSchema } from "@/lib/schemas";
import type { Pot } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItemTwo,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Input } from "./ui/input";
import { useThemes } from "@/queryHooks/useThemes";
import { FaCircle } from "react-icons/fa";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useEditPot } from "@/queryHooks/useEditPot";
import { Loader2Icon } from "lucide-react";

type Props = {
  isOpenEdit: boolean;
  setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  pot: Pot;
  pots: Pot[] | undefined;
};

type editPotFormValues = z.infer<typeof potSchema>;

function EditPotForm({ isOpenEdit, setIsOpenEdit, pot, pots }: Props) {
  const { themes } = useThemes();
  const { updatePot, isPending: isEditingPot } = useEditPot(setIsOpenEdit);
  const editPotForm = useForm({
    resolver: zodResolver(potSchema),
    defaultValues: {
      name: pot.name,
      target: pot.target.toFixed(2),
      themeId: pot.themeId._id,
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

  const onSubmit = (values: editPotFormValues) => {
    if (
      values.name === pot.name &&
      values.target === pot.target &&
      values.themeId === pot.themeId._id
    )
      return;
    updatePot({
      potId: pot._id,
      name: values.name !== pot.name ? values.name : undefined,
      target: values.target !== pot.target ? values.target : undefined,
      themeId: values.themeId !== pot.themeId._id ? values.themeId : undefined,
    });
  };

  useEffect(() => {
    if (!isOpenEdit) {
      editPotForm.reset({
        name: pot.name,
        target: pot.target.toFixed(2),
        themeId: pot.themeId._id,
      });
    }
  }, [editPotForm, isOpenEdit, pot.name, pot.target, pot.themeId._id]);

  return (
    <Dialog
      open={isOpenEdit}
      onOpenChange={(open) => {
        if (!isEditingPot) setIsOpenEdit(open);
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
                onClick={() => setIsOpenEdit(false)}
              />
            </div>
          </DialogTitle>
          <DialogDescription className="text-sm leading-[21px] text-Grey-500 py-0 my-0">
            If your saving target change, feel free to update your pots.
          </DialogDescription>
        </DialogHeader>
        <Form {...editPotForm}>
          <form
            className="space-y-4"
            onSubmit={editPotForm.handleSubmit(onSubmit)}
          >
            {/* Name */}
            <FormField
              control={editPotForm.control}
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
              control={editPotForm.control}
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
              control={editPotForm.control}
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
              disabled={isEditingPot}
              className="w-full mt-5 h-[53px] rounded-[8px] bg-Grey-900 text-White p-4 text-sm font-semibold cursor-pointer"
            >
              {isEditingPot ? (
                <Loader2Icon className=" h-4 w-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditPotForm;
