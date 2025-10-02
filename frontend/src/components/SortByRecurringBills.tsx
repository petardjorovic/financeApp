import RecurringBillsSortDesktop from "./RecurringBillsSortDesktop";
import RecurringBillsSortMobile from "./RecurringBillsSortMobile";

function SortByRecurringBills() {
  return (
    <>
      <div className="hidden sm:block">
        <RecurringBillsSortDesktop />
      </div>
      <div className="flex items-center sm:hidden">
        <RecurringBillsSortMobile />
      </div>
    </>
  );
}

export default SortByRecurringBills;
