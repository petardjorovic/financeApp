import BudgetChart from "@/components/BudgetChart";
import BudgetItem from "@/components/BudgetItem";
import { Button } from "@/components/ui/button";
import { useBudgets } from "@/queryHooks/useBudgets";
import { Loader2 } from "lucide-react";

function Budgets() {
  const { isLoading, budgets } = useBudgets();
  return (
    <main className="px-4 py-6 sm:px-10 sm:py-8 flex flex-1 flex-col gap-8">
      {/* Header */}
      <div className="w-full h-[56px] flex items-center justify-between">
        <h1 className="text-[32px] leading-[38px] font-bold text-Grey-900">
          Budgets
        </h1>
        <Button className="bg-Grey-900 text-White rounded-[8px] p-4 text-xs sm:text-sm font-semibold leading-[21px] cursor-pointer h-[53px]">
          + Add New Budget
        </Button>
      </div>
      {/* Budgets content */}
      {isLoading ? (
        <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row w-full gap-6">
          <BudgetChart />
          <div className="space-y-6 flex flex-1 flex-col">
            {budgets?.map((budget) => (
              <BudgetItem key={budget._id} budget={budget} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default Budgets;
