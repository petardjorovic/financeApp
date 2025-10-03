import AddRecurringBillForm from "@/components/AddRecurringBillForm";
import PageHeader from "@/components/PageHeader";
import RecurringBillsSearchInput from "@/components/RecurringBillsSearchInput";
import RecurringBillsSummary from "@/components/RecurringBillsSummary";
import RecurringBillsTable from "@/components/RecurringBillsTable";
import SortByRecurringBills from "@/components/SortByRecurringBills";
import TotalRecurringBills from "@/components/TotalRecurringBills";
import { useRecurringBillsFilters } from "@/contexts/RecurringBillsFilterContext";
import { useRecurringBills } from "@/queryHooks/useRecurringBills";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

function RecurringBills() {
  const [isOpenAddBill, setIsOpenAddBill] = useState<boolean>(false);
  const { resetFilters } = useRecurringBillsFilters();
  const {
    recurringBills,
    isPending: isRecurringBillsLoading,
    isError: isRecurringBillsError,
  } = useRecurringBills();

  // resetuj filtere prilikom mount-a
  useEffect(() => {
    resetFilters();
  }, [resetFilters]);

  return (
    <main className="px-4 py-6 sm:px-10 sm:py-8 flex flex-1 flex-col gap-8">
      {/* Header */}
      <PageHeader
        label="Recurring Bills"
        buttonLabel="Add Recurring Bill"
        onButtonClick={() => setIsOpenAddBill(true)}
      />
      {/* RecurringBills content */}
      {isRecurringBillsLoading ? (
        <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : isRecurringBillsError ? (
        <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 flex-col gap-y-6">
          <p>Failed to load data.</p>
        </div>
      ) : recurringBills.length > 0 ? (
        <div className="flex flex-col lg:flex-row w-full gap-6">
          {/* Left side */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-6 w-full lg:w-[337px]">
            <TotalRecurringBills recurringBills={recurringBills} />
            <RecurringBillsSummary recurringBills={recurringBills} />
          </div>
          {/* Right side */}
          <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white rounded-[12px] flex flex-col gap-6 flex-1">
            {/* Table operations */}
            <div className="h-[45px] w-full flex gap-6 justify-between">
              <RecurringBillsSearchInput />
              <SortByRecurringBills />
            </div>

            {/* RecurringBills table */}
            <RecurringBillsTable recurringBills={recurringBills} />
          </div>
        </div>
      ) : (
        <p className="text-center">
          No Recurring Bills to display. Click 'Add Add Recurring Bill' button
          to add your first one.
        </p>
      )}

      <AddRecurringBillForm
        isOpenAddBill={isOpenAddBill}
        setIsOpenAddBill={setIsOpenAddBill}
      />
    </main>
  );
}

export default RecurringBills;
