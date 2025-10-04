import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { Budget } from "@/lib/types";
import OverviewCardHeader from "./OverviewCardHeader";

function BudgetsOverviewCard({
  budgets,
}: {
  budgets: Omit<Budget, "latestSpending">[] | undefined;
}) {
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
    <div className="px-5 py-6 flex flex-col gap-5 sm:p-8 bg-white rounded-[12px]">
      <OverviewCardHeader label="Budgets" url="/budgets" />
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Chart */}
        <div className="flex items-center justify-center border flex-1">
          <ResponsiveContainer width={247} height={247}>
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
              <Pie
                data={[{ value: 1 }]} // samo jedan segment
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={92}
                fill="rgba(255, 255, 255, 0.3)" // Tailwind Gray-100
                stroke="none"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
          {budgets?.map((b) => (
            <div key={b._id} className="flex items-center gap-4">
              <div
                className="h-[43px] w-1 rounded-[8px]"
                style={{ backgroundColor: `${b.themeId.color}` }}
              ></div>
              <div className="flex flex-col gap-1">
                <span className="text-xs leading-[18px] text-Grey-500">
                  {b.categoryId.name}
                </span>
                <span className="text-Grey-900 text-sm font-semibold leading-[21px]">
                  ${b.limit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BudgetsOverviewCard;
