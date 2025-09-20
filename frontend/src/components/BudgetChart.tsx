import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useBudgets } from "@/queryHooks/useBudgets";
import BudgetSummary from "./BudgetSummary";

function BudgetChart() {
  const { budgets } = useBudgets();
  const data = budgets?.map((b) => ({
    name: b.categoryId.name,
    value: b.limit,
    color: b.themeId.color,
  }));
  const totalSpent =
    budgets?.reduce((total, curr) => total + curr.spent, 0) ?? 0;
  const totalLimit =
    budgets?.reduce((total, curr) => total + curr.limit, 0) ?? 0;

  return (
    <div className="bg-White rounded-[12px] px-5 py-6 md:px-8 md:py-8 flex items-center flex-col md:flex-row lg:flex-col md:justify-center h-[583px] md:h-[344px] lg:h-[599px] gap-8 lg:w-[428px]">
      {/* chart */}
      <div className="flex items-center justify-center">
        <ResponsiveContainer width={250} height={250}>
          <PieChart>
            <Pie
              data={data}
              nameKey={"name"}
              dataKey="value"
              innerRadius={75}
              outerRadius={120}
              cx="50%"
              cy="50%"
              paddingAngle={0}
            >
              {data?.map((entry) => {
                return (
                  <Cell
                    key={entry.value}
                    fill={entry.color}
                    stroke={entry.color}
                  />
                );
              })}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <>
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy - 10}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="fill-Grey-900 font-bold text-[32px] leading-[38px]"
                        >
                          ${totalSpent}
                        </text>
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy + 20}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="fill-Grey-500 text-xs leading-[18px]"
                        >
                          of ${totalLimit.toFixed(2)}
                        </text>
                      </>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* summary */}
      <BudgetSummary budgets={budgets} />
    </div>
  );
}

export default BudgetChart;
