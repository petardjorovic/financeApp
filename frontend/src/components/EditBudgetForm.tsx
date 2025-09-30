import type z from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BudgetThemeField from "./BudgetThemeField";
import BudgetLimitField from "./BudgetLimitField";
import BudgetCategoryField from "./BudgetCategoryField";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "./ui/form";
import { useThemes } from "@/queryHooks/useThemes";
import { useCategories } from "@/queryHooks/useCategories";
import { useEditBudget } from "@/queryHooks/useEditBudget";
import { budgetSchema } from "@/lib/schemas";
import type { Budget } from "@/lib/types";
import { Loader2Icon } from "lucide-react";
import { IoIosCloseCircleOutline } from "react-icons/io";

export type editBudgetFormValues = z.infer<typeof budgetSchema>;

type Props = {
  isOpenEdit: boolean;
  setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  budget: Budget;
  budgets: Budget[] | undefined;
};

function EditBudgetForm({ isOpenEdit, setIsOpenEdit, budget, budgets }: Props) {
  const editBudgetForm = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      categoryId: budget.categoryId._id,
      limit: budget.limit.toFixed(2),
      themeId: budget.themeId._id,
    },
  });
  const { themes } = useThemes();
  const { categories } = useCategories();
  const { updateBudget, isPending: isEditingBudget } =
    useEditBudget(setIsOpenEdit);
  const expenseCategories = categories.filter((cat) => cat.type === "expense");
  const budgetsThemes = budgets?.map((b) => b.themeId._id) ?? [];
  const budgetsCategories = budgets?.map((b) => b.categoryId._id) ?? [];

  const onSubmit = (values: editBudgetFormValues) => {
    if (
      values.categoryId === budget.categoryId._id &&
      values.limit === budget.limit &&
      values.themeId === budget.themeId._id
    ) {
      return;
    }
    updateBudget({
      budgetId: budget._id,
      categoryId:
        budget.categoryId._id !== values.categoryId
          ? values.categoryId
          : undefined,
      limit: budget.limit !== values.limit ? values.limit : undefined,
      themeId:
        budget.themeId._id !== values.themeId ? values.themeId : undefined,
    });
  };

  useEffect(() => {
    if (!isOpenEdit) {
      editBudgetForm.reset({
        categoryId: budget.categoryId._id,
        limit: budget.limit.toFixed(2),
        themeId: budget.themeId._id,
      });
    }
  }, [
    editBudgetForm,
    budget.categoryId._id,
    budget.limit,
    budget.themeId._id,
    isOpenEdit,
  ]);

  return (
    <Dialog
      open={isOpenEdit}
      onOpenChange={(open) => {
        if (!isEditingBudget) setIsOpenEdit(open);
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
                Edit Budget
              </span>
              <IoIosCloseCircleOutline
                className="fill-Grey-500 w-[25px] h-[25px] cursor-pointer"
                onClick={() => setIsOpenEdit(false)}
              />
            </div>
          </DialogTitle>
          <DialogDescription className="text-sm leading-[21px] text-Grey-500 py-0 my-0">
            As your budgets change, feel free to update your spending limits.
          </DialogDescription>
        </DialogHeader>
        <Form {...editBudgetForm}>
          <form
            className="space-y-4"
            onSubmit={editBudgetForm.handleSubmit(onSubmit)}
          >
            {/* Category */}
            <BudgetCategoryField
              budgetsCategories={budgetsCategories}
              expenseCategories={expenseCategories}
              form={editBudgetForm}
            />

            {/* Limit */}
            <BudgetLimitField form={editBudgetForm} />
            {/* Theme */}
            <BudgetThemeField
              budgetsThemes={budgetsThemes}
              form={editBudgetForm}
              themes={themes}
            />

            <Button
              type="submit"
              disabled={isEditingBudget}
              className="w-full mt-5 h-[53px] rounded-[8px] bg-Grey-900 text-White p-4 text-sm font-semibold cursor-pointer"
            >
              {isEditingBudget ? (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Save changes"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditBudgetForm;
