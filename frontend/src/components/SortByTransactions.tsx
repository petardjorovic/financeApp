import DesktopSortBySelect from "./DesktopSortBySelect";
import MobileSortBySelect from "./MobileSortBySelect";

function SortByTransactions() {
  return (
    <>
      <div className="hidden sm:block">
        <DesktopSortBySelect />
      </div>
      <div className="block sm:hidden">
        <MobileSortBySelect />
      </div>
    </>
  );
}

export default SortByTransactions;
