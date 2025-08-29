import { Button } from "@/components/ui/button";
import transactionIcon from "../assets/images/icon-nav-transactions-white.svg";
import SearchInput from "@/components/SearchInput";
import { useCategories } from "@/queryHooks/useCategories";
import { Loader2 } from "lucide-react";
import SortByTransactions from "@/components/SortByTransactions";
import CategoryFilter from "@/components/CategoryFilter";

function Transactions() {
  const { isLoading } = useCategories();

  return (
    <main className="px-4 py-6 sm:px-10 sm:py-8 flex flex-1 flex-col gap-8">
      {/* Header */}
      <div className="w-full h-[56px] flex items-center justify-between">
        <h1 className="text-[32px] leading-[38px] font-bold text-Grey-900">
          Transactions
        </h1>
        <Button className="bg-Grey-900 text-White rounded-[8px] p-4 text-xs sm:text-sm font-semibold leading-[21px] cursor-pointer h-[53px]">
          +{" "}
          <img src={transactionIcon} alt="transactions" className="sm:hidden" />{" "}
          <span className="hidden sm:inline-block">Add Transaction</span>
        </Button>
      </div>
      {/* TRANSACTIONS CONTENT */}
      <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Loader2 />
          </div>
        ) : (
          <>
            {/* Table operations */}
            <div className="h-[45px] w-full flex justify-between">
              <SearchInput />
              <div className="h-full flex items-center gap-6">
                <SortByTransactions />
                <CategoryFilter />
              </div>
            </div>
            {/* Transaction table */}
            <div></div>
            {/* Pagination */}
            <div></div>
          </>
        )}
      </div>
    </main>
  );
}

export default Transactions;
