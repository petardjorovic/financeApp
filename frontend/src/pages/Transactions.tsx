import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransactionaTable from "@/components/TransactionaTable";
import SearchInput from "@/components/SearchInput";
import SortByTransactions from "@/components/SortByTransactions";
import CategoryFilter from "@/components/CategoryFilter";
import Pagination from "@/components/Pagination";
import PageHeader from "@/components/PageHeader";
import { useTransactions } from "@/queryHooks/useTransactions";
import { useCategories } from "@/queryHooks/useCategories";
import { useTransFilters } from "@/contexts/TransFilterContext";
import { Loader2 } from "lucide-react";

function Transactions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetFilters } = useTransFilters();
  const { isPending: isCategoriesLoading, isError: categoriesError } =
    useCategories();
  const {
    data,
    isPending: isTransactionsLoading,
    isError: transactionsError,
  } = useTransactions();
  const isLoadingAll = isCategoriesLoading || isTransactionsLoading;
  const isErrorAll = categoriesError || transactionsError;

  useEffect(() => {
    // resetuj samo ako nisi došao iz BudgetItem (See all)
    if (!location?.state?.fromBudget) {
      resetFilters();
    }
  }, [resetFilters, location?.state?.fromBudget]);

  return (
    <main className="px-4 py-6 sm:px-10 sm:py-8 flex flex-1 flex-col gap-8">
      {/* Header */}
      <PageHeader
        label="Transactions"
        buttonLabel="Add Transaction"
        onButtonClick={() => navigate("/transaction/add")}
      />
      {/* Transaction content */}
      {isLoadingAll ? (
        <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : isErrorAll ? (
        <>
          <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 flex-col gap-y-6">
            <p>Failed to load data.</p>
          </div>
        </>
      ) : data?.transactions && data.transactions.length > 0 ? (
        <>
          <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 flex-col gap-y-6">
            {/* Table operations */}
            <div className="h-[45px] w-full flex justify-between">
              <SearchInput />
              <div className="h-full flex items-center gap-6">
                <SortByTransactions />
                <CategoryFilter />
              </div>
            </div>

            {/* Transaction table */}
            {data?.transactions && (
              <TransactionaTable transactions={data.transactions} />
            )}

            {/* Pagination */}
            <Pagination totalPages={data?.pages} />
          </div>
        </>
      ) : (
        <p className="text-center">
          No Transactions to display. Click 'Add Transaction' button to add your
          first one.
        </p>
      )}
    </main>
  );
}

export default Transactions;
