import { useBudgets } from "@/queryHooks/useBudgets";

function BudgetChart() {
  const { budgets } = useBudgets();
  return (
    <div className="bg-White rounded-[12px] px-5 py-6 md:px-8 md:py-8 flex flex-col md:flex-row lg:flex-col gap-8">
      {/* chart */}
      <div></div>
      {/* summary */}
      <div className="min-w-[296px]">
        <h2 className="text-Grey-900 text-[20px] leading-[24px] font-bold mb-6">
          Spending Summary
        </h2>
        <div>
          {budgets?.map((budget) => (
            <div
              key={budget._id}
              className="flex items-center justify-center pb-4 not-first:pt-4 border-b border-b-Grey-100 last:border-b-white last:pb-0"
            >
              <div className="flex flex-1 gap-4 items-center justify-start">
                <div
                  className={`w-1 h-[21px] rounded-[8px] bg-${budget.themeId.name}`}
                ></div>
                <span className="text-Grey-500 text-sm leading-[21px]">
                  {budget.categoryId.name}
                </span>
              </div>
              <div className="w-auto flex gap-2 items-center">
                <span className="text-base font-semibold text-Grey-900 leading-[24px]">
                  ${budget.spent.toFixed(2)}
                </span>
                <span className="text-Grey-500 text-xs leading-[18px]">
                  of ${budget.limit.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BudgetChart;
