import { useState } from "react";
import AddBudgetForm from "@/components/AddBudgetForm";
import BudgetChart from "@/components/BudgetChart";
import BudgetItem from "@/components/BudgetItem";
import BudgetMoreMenu from "@/components/BudgetMoreMenu";
import { Button } from "@/components/ui/button";
import { useBudgets } from "@/queryHooks/useBudgets";
import { useCategories } from "@/queryHooks/useCategories";
import { useThemes } from "@/queryHooks/useThemes";
import { Loader2 } from "lucide-react";

function Budgets() {
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState<boolean>(false);
  const {
    isPending: isLoadingBudgets,
    budgets,
    isError: budgetsError,
  } = useBudgets();
  const { isPending: isLoadingCategories, isError: categoriesError } =
    useCategories();
  const { isPending: isLoadingThemes, isError: themesError } = useThemes();
  const isLoadingAll =
    isLoadingBudgets || isLoadingCategories || isLoadingThemes;
  const isErrorAll = budgetsError || categoriesError || themesError;

  return (
    <main className="px-4 py-6 sm:px-10 sm:py-8 flex flex-1 flex-col gap-8">
      {/* Header */}
      <div className="w-full h-[56px] flex items-center justify-between">
        <h1 className="text-[32px] leading-[38px] font-bold text-Grey-900">
          Budgets
        </h1>
        <Button
          className="bg-Grey-900 text-White rounded-[8px] p-4 text-xs sm:text-sm font-semibold leading-[21px] h-[53px] hover:bg-Grey-500 transition-colors duration-300 cursor-pointer"
          onClick={() => setIsAddBudgetOpen(true)}
        >
          + Add New Budget
        </Button>
      </div>
      {/* Budgets content */}
      {isLoadingAll ? (
        <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 items-center justify-center">
          <Loader2 className="animate-spin" aria-label="Loading budgets" />
        </div>
      ) : isErrorAll ? (
        <div className="flex flex-col lg:flex-row w-full gap-6">
          <p>Failed to load data.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row w-full gap-6">
          {budgets && <BudgetChart budgets={budgets} />}
          <div className="space-y-6 flex flex-1 flex-col">
            {budgets?.map((budget) => (
              <BudgetItem key={budget._id} budget={budget}>
                <BudgetMoreMenu budget={budget} budgets={budgets} />
              </BudgetItem>
            ))}
          </div>
        </div>
      )}

      <AddBudgetForm
        isAddBudgetOpen={isAddBudgetOpen}
        setIsAddBudgetOpen={setIsAddBudgetOpen}
        budgets={budgets}
      />
    </main>
  );
}

export default Budgets;
