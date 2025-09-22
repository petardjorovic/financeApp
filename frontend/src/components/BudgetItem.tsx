import { useNavigate } from "react-router-dom";
import type { Budget } from "@/lib/api";
import { formatDate } from "@/utils/formatDate";
import { useTransFilters } from "@/contexts/TransFilterContext";
import BudgetMoreMenu from "./BudgetMoreMenu";
import { GoTriangleRight } from "react-icons/go";
import expense from "../assets/images/expense.png";

function BudgetItem({ budget }: { budget: Budget }) {
  const navigate = useNavigate();
  const { setFilterTerm } = useTransFilters();
  const progresValue = ((budget.spent / budget.limit) * 100).toFixed(0);

  const goToTransactions = () => {
    setFilterTerm(budget.categoryId.name);
    navigate("/transactions", { state: { fromBudget: true } });
  };

  return (
    <div className="flex flex-col items-center gap-y-5 rounded-[12px] px-5 py-6 md:px-8 md:py-8 bg-White">
      {/* TITLE */}
      <div className="w-full h-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: `${budget.themeId.color}` }}
          ></div>
          <span className="text-[20px] leading-[24px] font-semibold text-Grey-900">
            {budget.categoryId.name}
          </span>
        </div>
        <BudgetMoreMenu budget={budget} />
      </div>
      {/* AMOUNT BAR */}
      <div className="flex flex-col gap-y-4 w-full">
        <p className="text-Grey-500 text-sm leading-[21px]">
          Maximum of ${budget.limit}
        </p>
        <div className="rounded-[4px] w-full p-1 bg-Beige-100 h-8 flex items-center justify-center">
          <div className="w-full overflow-hidden rounded-[4px]">
            <div
              className={`h-6 rounded-[4px] transition-[width] duration-500 ease-in-out`}
              style={{
                backgroundColor: `${budget.themeId.color}`,
                width: `${progresValue}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="h-[43px] gap-x-4 w-full flex items-center">
          <div className="flex flex-1 gap-4 h-full items-center">
            <div
              className="w-1 h-full rounded-[8px]"
              style={{ backgroundColor: `${budget.themeId.color}` }}
            ></div>
            <div className="space-y-1 h-full w-full">
              <p className="text-Grey-500 text-[12px] leading-[18px]">Spent</p>
              <p className="text-[14px] text-Grey-900 font-semibold leading-[21px]">
                ${budget.spent}.00
              </p>
            </div>
          </div>
          <div className="flex flex-1 gap-4 h-full items-center">
            <div className="w-1 h-full rounded-[8px] bg-Beige-100"></div>
            <div className="space-y-1 h-full w-full">
              <p className="text-Grey-500 text-[12px] leading-[18px]">
                Remaining
              </p>
              <p className="text-[14px] text-Grey-900 font-semibold leading-[21px]">
                $
                {budget.limit - budget.spent < 0
                  ? 0
                  : budget.limit - budget.spent + ".00"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* LATEST SPANDING */}
      <div className="w-full p-4 md:p-5 flex flex-col gap-5 rounded-[12px] bg-Beige-100">
        {/* Title */}
        <div className="flex items-center justify-between h-6">
          <span className="text-base leading-[24px] font-semibold text-Grey-900">
            Latest Spending
          </span>
          <span
            className="flex items-center gap-x-3 text-Grey-500 text-sm leading-[21px] cursor-pointer"
            onClick={() => goToTransactions()}
          >
            See All <GoTriangleRight className="w-4 h-4" />
          </span>
        </div>
        {/* Transactions */}
        <div className="w-full">
          {budget.latestSpending.map((t) => (
            <div
              key={t._id}
              className="flex items-center justify-between w-full h-[64px] first:h-[52px] last:h-[52px] not-first:pt-3 not-last:pb-3 not-last:border-b border-b-Grey-[#696868]"
            >
              <div className="flex items-center gap-4">
                <img
                  src={expense}
                  alt="expense"
                  className="w-8 h-8 rounded-full bg-Red object-cover hidden md:block"
                />
                <span className="text-sm leading-[21px] text-Grey-900 font-semibold">
                  {t.account}
                </span>
              </div>
              <div className="h-full flex flex-col gap-y-1">
                <span className="text-xs text-Grey-900 leading-[18px] font-semibold text-right">
                  -${t.amount}.00
                </span>
                <span className="text-xs text-Grey-500 leading-[18px] text-right">
                  {formatDate(t.date)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BudgetItem;
