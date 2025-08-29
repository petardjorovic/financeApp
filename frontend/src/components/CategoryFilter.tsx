import DesktopCategoryFilter from "./DesktopCategoryFilter";
import MobileCategoryFilter from "./MobileCategoryFilter";

function CategoryFilter() {
  return (
    <>
      <div className="hidden sm:block">
        <DesktopCategoryFilter />
      </div>
      <div className="block sm:hidden">
        <MobileCategoryFilter />
      </div>
    </>
  );
}

export default CategoryFilter;
