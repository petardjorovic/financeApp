import type z from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BudgetCategoryField from "./BudgetCategoryField";
import BudgetLimitField from "./BudgetLimitField";
import BudgetThemeField from "./BudgetThemeField";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { useThemes } from "@/queryHooks/useThemes";
import { useCategories } from "@/queryHooks/useCategories";
import { useAddBudget } from "@/queryHooks/useAddBudget";
import { budgetSchema } from "@/lib/schemas";
import type { Budget } from "@/lib/types";
import { Loader2Icon } from "lucide-react";
import { IoIosCloseCircleOutline } from "react-icons/io";

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
            <BudgetCategoryField
              budgetsCategories={budgetsCategories}
              expenseCategories={expenseCategories}
              form={addBudgetForm}
            />

            {/* Limit */}
            <BudgetLimitField form={addBudgetForm} />
            {/* Theme */}
            <BudgetThemeField
              budgetsThemes={budgetsThemes}
              form={addBudgetForm}
              themes={themes}
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
