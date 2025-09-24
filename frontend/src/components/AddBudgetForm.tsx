import type z from "zod";
import { budgetSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useThemes } from "@/queryHooks/useThemes";
import { useCategories } from "@/queryHooks/useCategories";
import type { Budget } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemTwo,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Input } from "./ui/input";
import { FaCircle } from "react-icons/fa";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useAddBudget } from "@/queryHooks/useAddBudget";
import { Loader2Icon } from "lucide-react";

export type addBudgetFormValues = z.infer<typeof budgetSchema>;

type Props = {
  isAddBudgetOpen: boolean;
  setIsAddBudgetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  budgets: Budget[] | undefined;
};

function AddBudgetForm({
  isAddBudgetOpen,
  setIsAddBudgetOpen,
  budgets,
}: Props) {
  const addBudgetForm = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      categoryId: "",
      limit: "",
      themeId: "",
    },
  });
  const { themes } = useThemes();
  const { categories } = useCategories();
  const { addNewBudget, isPending: isAddingBudget } =
    useAddBudget(setIsAddBudgetOpen);
  const expenseCategories = categories.filter((cat) => cat.type === "expense");
  const budgetsThemes = budgets?.map((b) => b.themeId._id) ?? [];
  const budgetsCategories = budgets?.map((b) => b.categoryId._id) ?? [];
  const isCategoryInUse = (categoryId: string) => {
    if (budgetsCategories.includes(categoryId)) {
      return true;
    } else {
      return false;
    }
  };
  const isThemeInUse = (themeId: string) => {
    if (budgetsThemes.includes(themeId)) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = (values: addBudgetFormValues) => {
    addNewBudget(values);
  };

  useEffect(() => {
    if (!isAddBudgetOpen) {
      addBudgetForm.reset();
    }
  }, [addBudgetForm, isAddBudgetOpen]);

  return (
    <Dialog
      open={isAddBudgetOpen}
      onOpenChange={(open) => {
        if (!isAddingBudget) setIsAddBudgetOpen(open);
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
                Add New Budget
              </span>
              <IoIosCloseCircleOutline
                className="fill-Grey-500 w-[25px] h-[25px] cursor-pointer"
                onClick={() => setIsAddBudgetOpen(false)}
              />
            </div>
          </DialogTitle>
          <DialogDescription className="text-sm leading-[21px] text-Grey-500 py-0 my-0">
            Choose a category to set a spending budget. These categories can
            help you monitor spanding.
          </DialogDescription>
        </DialogHeader>
        <Form {...addBudgetForm}>
          <form
            className="space-y-4"
            onSubmit={addBudgetForm.handleSubmit(onSubmit)}
          >
            {/* Category */}
            <FormField
              control={addBudgetForm.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full gap-1">
                  <FormLabel className="w-full text-xs text-Grey-500 leading-[18px] font-semibold my-0">
                    Budget Category
                  </FormLabel>
                  <FormControl className="my-0">
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      required
                    >
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
            {/* Limit */}
            <FormField
              control={addBudgetForm.control}
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
                        placeholder="e.g. 2000"
                        className="pr-5 pl-10 py-3 h-[45px] border border-Grey-300"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="w-full" />
                </FormItem>
              )}
            />
            {/* Theme */}
            <FormField
              control={addBudgetForm.control}
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
              disabled={isAddingBudget}
              className="w-full mt-5 h-[53px] rounded-[8px] bg-Grey-900 text-White p-4 text-sm font-semibold"
            >
              {isAddingBudget ? (
                <Loader2Icon className=" h-4 w-4 animate-spin" />
              ) : (
                "Add budget"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddBudgetForm;
