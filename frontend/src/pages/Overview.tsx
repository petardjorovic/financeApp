import OverviewSummary from "@/components/OverviewSummary";
import { useOverview } from "@/queryHooks/useOverview";
import { Loader2 } from "lucide-react";
import PotsOverviewCard from "@/components/PotsOverviewCard";
import TransactionsOverviewCard from "@/components/TransactionsOverviewCard";
import BudgetsOverviewCard from "@/components/BudgetsOverviewCard";
import RecurringBillsOverviewCard from "@/components/RecurringBillsOverviewCard";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getMonthName } from "@/utils/getMonthName";

function Overview() {
  const {
    overview,
    isPending: isOverviewLoading,
    isError: isOverviewError,
  } = useOverview();

  const allData = overview?.chartData.map((item) => ({
    ...item,
    label: `${getMonthName(item.month)} ${item.year}`,
  }));

  const colors = {
    income: { stroke: "#277C78", fill: "#277c7881" },
    expense: { stroke: "#C94736", fill: "#c947367d" },
    text: "#374151",
    background: "#fff",
  };

  return (
    <main className="px-4 py-6 sm:px-10 sm:py-8 flex flex-1 flex-col gap-8">
      {/* Header */}
      <div className="w-full h-[56px] flex items-center justify-between">
        <h1 className="text-[26px] leading-[31px] sm:text-[32px] sm:leading-[38px] font-bold text-Grey-900">
          Overview
        </h1>
      </div>
      {isOverviewLoading ? (
        <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : isOverviewError ? (
        <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 flex-col gap-y-6">
          <p>Failed to load data.</p>
        </div>
      ) : (
        <>
          {/* Summary */}
          <OverviewSummary totalBalance={overview?.totalBalance} />

          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* Left side */}
            <div className="flex flex-col gap-4 sm:gap-6 lg:w-[57.4%]">
              {/* Pots */}
              <PotsOverviewCard pots={overview?.pots} />
              {/* Transactions */}
              <TransactionsOverviewCard transactions={overview?.transactions} />
            </div>

            {/* Right side */}
            <div className="flex flex-col gap-4 sm:gap-6 lg:w-[40.3%]">
              {/* Budgets */}
              <BudgetsOverviewCard budgets={overview?.budgets} />
              {/* RecurringBills */}
              <RecurringBillsOverviewCard
                recurringBills={overview?.recurringBills}
              />
            </div>
          </div>
          <div className="px-5 py-6 sm:p-8 bg-white rounded-[12px]">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={allData}>
                <CartesianGrid strokeDasharray="4" />
                <XAxis
                  dataKey={"label"}
                  tick={{ fill: colors.text }}
                  tickLine={{ stroke: colors.text }}
                />
                <YAxis
                  unit="$"
                  tick={{ fill: colors.text }}
                  tickLine={{ stroke: colors.text }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: colors.background }}
                />
                <Area
                  dataKey={"income"}
                  stroke={colors.income.stroke}
                  fill={colors.income.fill}
                  type="monotone"
                  strokeWidth={2}
                  name="Income"
                  unit={"$"}
                />
                <Area
                  dataKey={"expense"}
                  stroke={colors.expense.stroke}
                  fill={colors.expense.fill}
                  type="monotone"
                  strokeWidth={2}
                  name="Expanse"
                  unit={"$"}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </main>
  );
}

export default Overview;
