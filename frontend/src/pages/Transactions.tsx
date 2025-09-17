import TransactionaTable from "@/components/TransactionaTable";
import SearchInput from "@/components/SearchInput";
import SortByTransactions from "@/components/SortByTransactions";
import CategoryFilter from "@/components/CategoryFilter";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/queryHooks/useTransactions";
import { useCategories } from "@/queryHooks/useCategories";
import { useTransFilters } from "@/contexts/TransFilterContext";
import { Loader2 } from "lucide-react";
import transactionIcon from "../assets/images/icon-nav-transactions-white.svg";
import { useNavigate } from "react-router-dom";

function Transactions() {
  const navigate = useNavigate();
  const { setSearchTerm, setPageNumber } = useTransFilters();
  const { isLoading } = useCategories();
  const { data, isLoading: isTransationsLoading } = useTransactions();

  return (
    <main className="px-4 py-6 sm:px-10 sm:py-8 flex flex-1 flex-col gap-8">
      {/* Header */}
      <div className="w-full h-[56px] flex items-center justify-between">
        <h1 className="text-[32px] leading-[38px] font-bold text-Grey-900">
          Transactions
        </h1>
        <Button
          className="bg-Grey-900 text-White rounded-[8px] p-4 text-xs sm:text-sm font-semibold leading-[21px] cursor-pointer h-[53px]"
          onClick={() => navigate("/transaction/add")}
        >
          +{" "}
          <img src={transactionIcon} alt="transactions" className="sm:hidden" />{" "}
          <span className="hidden sm:inline-block">Add Transaction</span>
        </Button>
      </div>
      {/* Transaction content */}
      {isLoading || isTransationsLoading ? (
        <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 flex-col gap-y-6">
          {/* Table operations */}
          <div className="h-[45px] w-full flex justify-between">
            <SearchInput onSearch={setSearchTerm} setPage={setPageNumber} />
            <div className="h-full flex items-center gap-6">
              <SortByTransactions />
              <CategoryFilter />
            </div>
          </div>

          {/* Transaction table */}
          {data?.transactions.length ? (
            <TransactionaTable transactions={data.transactions} />
          ) : (
            <p className="text-center">There are no transactions</p>
          )}

          {/* Pagination */}
          <Pagination totalPages={data?.pages} />
        </div>
      )}
    </main>
  );
}

export default Transactions;
