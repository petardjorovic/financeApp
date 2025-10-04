import OverviewCardHeader from "./OverviewCardHeader";

function RecurringBillsOverviewCard() {
  return (
    <div className="px-5 py-6 flex flex-col gap-5 sm:gap-8 sm:p-8 bg-white rounded-[12px]">
      <OverviewCardHeader label="Recurring Bills" url="/recurringBills" />
    </div>
  );
}

export default RecurringBillsOverviewCard;
