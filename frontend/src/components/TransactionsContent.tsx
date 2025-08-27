import SearchInput from "./SearchInput";
import DesktopSortBySelect from "./DesktopSortBySelect";
import DesktopCategoryFilter from "./DesktopCategoryFilter";
import MobileSortBySelect from "./MobileSortBySelect";
import MobileCategoryFilter from "./MobileCategoryFilter";

function TransactionsContent() {
  return (
    <>
      <div className="h-[45px] w-full flex justify-between">
        <SearchInput />
        <div className="h-full flex items-center gap-6">
          <div className="hidden md:block">
            <DesktopSortBySelect />
          </div>
          <div className="block md:hidden">
            <MobileSortBySelect />
          </div>
          <div className="hidden md:block">
            <DesktopCategoryFilter />
          </div>
          <div className="block md:hidden">
            <MobileCategoryFilter />
          </div>
        </div>
      </div>
      <div></div>
      <div></div>
    </>
  );
}

export default TransactionsContent;
