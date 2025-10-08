import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectTriggerIcon,
  SelectValue,
} from "./ui/select";
import { useOverviewIncomeExpense } from "@/queryHooks/useOverviewIncomeExpense";
import { getMonthName } from "@/utils/getMonthName";
import { Loader2 } from "lucide-react";
import chart from "../assets/images/chart.png";
import calendar from "../assets/images/calendar.png";
import arrowDown from "../assets/images/arrow-down.svg";

export type PeriodType = "daily" | "monthly" | "yearly";
export type RangeType = "1m" | "6m" | "all";

function IncomeExpenseChart() {
  const [period, setPeriod] = useState<PeriodType>("monthly");
  const [range, setRange] = useState<RangeType>("6m");
  const { data, isPending, isError } = useOverviewIncomeExpense({
    period,
    range,
  });
  let allData;

  if (period === "daily") {
    allData = data?.map((item) => ({
      ...item,
      label: `${item?.day} ${getMonthName(item?.month)} '${item.year
        .toLocaleString()
        .substring(3, 5)}`,
    }));
  } else if (period === "monthly") {
    allData = data?.map((item) => ({
      ...item,
      label: `${getMonthName(item?.month)} '${item.year
        .toLocaleString()
        .substring(3, 5)}`,
    }));
  } else if (period === "yearly") {
    allData = data?.map((item) => ({
      ...item,
      label: `${item.year}`,
    }));
  }

  const colors = {
    income: { stroke: "#277C78", fill: "#277c7881" },
    expense: { stroke: "#C94736", fill: "#c947367d" },
    text: "#374151",
    background: "#fff",
  };

  useEffect(() => {
    if (period === "monthly" && range === "1m") setRange("6m");
    else if (period === "yearly" && (range === "1m" || range === "6m"))
      setRange("all");
  }, [period, range]);

  return (
    <div className="px-5 py-6 sm:p-8 flex flex-col gap-8 bg-white rounded-[12px] w-full relative">
      <div className="flex items-center justify-between h-6">
        <span className="text-Grey-900 text-[20px] font-bold">
          Income vs Expense
        </span>
        <div className="flex items-center gap-6 md:gap-4">
          {/* Desktop Period */}
          <div className="hidden md:flex items-center gap-2">
            <p className="text-Grey-500 text-sm leading-[21px]">Interval</p>
            <Select
              defaultValue="monthly"
              value={period}
              onValueChange={(value) => setPeriod(value as PeriodType)}
            >
              <SelectTrigger className="[&_svg]:hidden px-4">
                <SelectValue />
                <img src={arrowDown} alt="arrowDown" />
              </SelectTrigger>
              <SelectContent className="min-w-[113px] mt-3 shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-[8px] bg-White border-none overflow-hidden">
                <SelectGroup className="w-full">
                  <SelectItem
                    value="daily"
                    className="[&_svg]:hidden text-Grey-900 px-5 py-3 border-b border-b-Grey-100 last:border-b-0 rounded-none data-[state=checked]:font-bold data-[state=checked]:bg-transparent text-sm leading-[21px]"
                  >
                    Daily
                  </SelectItem>
                  <SelectItem
                    value="monthly"
                    className="[&_svg]:hidden text-Grey-900 px-5 py-3 border-b border-b-Grey-100 last:border-b-0 rounded-none data-[state=checked]:font-bold data-[state=checked]:bg-transparent text-sm leading-[21px]"
                  >
                    Monthly
                  </SelectItem>
                  <SelectItem
                    value="yearly"
                    className="[&_svg]:hidden text-Grey-900 px-5 py-3 border-b border-b-Grey-100 last:border-b-0 rounded-none data-[state=checked]:font-bold data-[state=checked]:bg-transparent text-sm leading-[21px]"
                  >
                    Yearly
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Period */}
          <div className="flex items-center md:hidden">
            <Select
              defaultValue="monthly"
              value={period}
              onValueChange={(value) => setPeriod(value as PeriodType)}
            >
              <SelectTriggerIcon className="[&_svg]:hidden">
                <img src={chart} className="w-4 h-4" />
              </SelectTriggerIcon>
              <SelectContent className="min-w-[113px] mt-3 shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-[8px] bg-White border-none overflow-hidden">
                <SelectGroup className="w-full">
                  <SelectItem
                    value="daily"
                    className="[&_svg]:hidden text-Grey-900 px-5 py-3 border-b border-b-Grey-100 last:border-b-0 rounded-none data-[state=checked]:font-bold data-[state=checked]:bg-transparent text-sm leading-[21px]"
                  >
                    Daily
                  </SelectItem>
                  <SelectItem
                    value="monthly"
                    className="[&_svg]:hidden text-Grey-900 px-5 py-3 border-b border-b-Grey-100 last:border-b-0 rounded-none data-[state=checked]:font-bold data-[state=checked]:bg-transparent text-sm leading-[21px]"
                  >
                    Monthly
                  </SelectItem>
                  <SelectItem
                    value="yearly"
                    className="[&_svg]:hidden text-Grey-900 px-5 py-3 border-b border-b-Grey-100 last:border-b-0 rounded-none data-[state=checked]:font-bold data-[state=checked]:bg-transparent text-sm leading-[21px]"
                  >
                    Yearly
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Desktop range */}
          <div className="hidden md:flex items-center gap-2">
            <p className="text-Grey-500 text-sm leading-[21px]">Timeframe</p>
            <Select
              defaultValue="6m"
              value={range}
              onValueChange={(value) => setRange(value as RangeType)}
            >
              <SelectTrigger className="[&_svg]:hidden min-w-[145px] px-4">
                <SelectValue />
                <img src={arrowDown} alt="arrowDown" />
              </SelectTrigger>
              <SelectContent className="max-w-[145px] mt-3 shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-[8px] bg-White border-none overflow-hidden">
                <SelectGroup className="">
                  <SelectItem
                    value="1m"
                    className={`[&_svg]:hidden text-Grey-900 px-5 py-3 border-b border-b-Grey-100 last:border-b-0 rounded-none data-[state=checked]:font-bold data-[state=checked]:bg-transparent text-sm leading-[21px] ${
                      period === "yearly" || period === "monthly"
                        ? "hidden"
                        : ""
                    }`}
                  >
                    Last 30 days
                  </SelectItem>
                  <SelectItem
                    value="6m"
                    className={`[&_svg]:hidden text-Grey-900 px-5 py-3 border-b border-b-Grey-100 last:border-b-0 rounded-none data-[state=checked]:font-bold data-[state=checked]:bg-transparent text-sm leading-[21px] ${
                      period === "yearly" ? "hidden" : ""
                    }`}
                  >
                    Last 6 months
                  </SelectItem>
                  <SelectItem
                    value="all"
                    className="[&_svg]:hidden text-Grey-900 px-5 py-3 border-b border-b-Grey-100 last:border-b-0 rounded-none data-[state=checked]:font-bold data-[state=checked]:bg-transparent text-sm leading-[21px]"
                  >
                    All time
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Mobile range */}
          <div className="flex items-center md:hidden">
            <Select
              defaultValue="6m"
              value={range}
              onValueChange={(value) => setRange(value as RangeType)}
            >
              <SelectTriggerIcon className="[&_svg]:hidden">
                <img src={calendar} alt="categoryFilter" className="w-4 h-4" />
              </SelectTriggerIcon>
              <SelectContent className="max-w-[145px] mt-3 shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-[8px] bg-White border-none overflow-hidden">
                <SelectGroup className="">
                  <SelectItem
                    value="1m"
                    className={`[&_svg]:hidden text-Grey-900 px-5 py-3 border-b border-b-Grey-100 last:border-b-0 rounded-none data-[state=checked]:font-bold data-[state=checked]:bg-transparent text-sm leading-[21px] ${
                      period === "yearly" || period === "monthly"
                        ? "hidden"
                        : ""
                    }`}
                  >
                    Last 30 days
                  </SelectItem>
                  <SelectItem
                    value="6m"
                    className={`[&_svg]:hidden text-Grey-900 px-5 py-3 border-b border-b-Grey-100 last:border-b-0 rounded-none data-[state=checked]:font-bold data-[state=checked]:bg-transparent text-sm leading-[21px] ${
                      period === "yearly" ? "hidden" : ""
                    }`}
                  >
                    Last 6 months
                  </SelectItem>
                  <SelectItem
                    value="all"
                    className="[&_svg]:hidden text-Grey-900 px-5 py-3 border-b border-b-Grey-100 last:border-b-0 rounded-none data-[state=checked]:font-bold data-[state=checked]:bg-transparent text-sm leading-[21px]"
                  >
                    All time
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {isPending && (
        <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white/90 w-full rounded-[12px] flex flex-1 items-center justify-center min-h-[300px] absolute top-0 left-0 right-0 bottom-0">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {isError ? (
        <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 items-center justify-center min-h-[300px]">
          <p>Failed to load data.</p>
        </div>
      ) : data?.length ? (
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
            <Tooltip contentStyle={{ backgroundColor: colors.background }} />
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
      ) : (
        <p className="py-10 text-sm text-Grey-500 border border-Beige-100 rounded-[12px] text-center">
          No data available for the selected range.
        </p>
      )}
    </div>
  );
}

export default IncomeExpenseChart;
