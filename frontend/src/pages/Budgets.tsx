import { useState } from "react";
import AddBudgetForm from "@/components/AddBudgetForm";
import BudgetChart from "@/components/BudgetChart";
import BudgetItem from "@/components/BudgetItem";
import BudgetMoreMenu from "@/components/BudgetMoreMenu";
import { useBudgets } from "@/queryHooks/useBudgets";
import { useCategories } from "@/queryHooks/useCategories";
import { useThemes } from "@/queryHooks/useThemes";
import { Loader2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";

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
      <PageHeader
        label="Budgets"
        buttonLabel="Add Budget"
        onButtonClick={() => setIsAddBudgetOpen(true)}
      />
      {/* Budgets content */}
      {isLoadingAll ? (
        <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 items-center justify-center">
          <Loader2 className="animate-spin" aria-label="Loading budgets" />
        </div>
      ) : isErrorAll ? (
        <div className="flex flex-col lg:flex-row w-full gap-6">
          <p>Failed to load data.</p>
        </div>
      ) : budgets.length > 0 ? (
        <div className="flex flex-col lg:flex-row w-full lg:items-start gap-6">
          <BudgetChart budgets={budgets} />
          <div className="space-y-6 flex flex-1 flex-col">
            {budgets?.map((budget) => (
              <BudgetItem key={budget._id} budget={budget}>
                <BudgetMoreMenu
                  budget={budget}
                  budgets={budgets}
                  key={budget._id}
                />
              </BudgetItem>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center">
          No Budgets to display. Click 'Add Budget' button to add your first
          one.
        </p>
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
