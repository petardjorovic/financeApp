import { useTransFilters } from "@/contexts/TransFilterContext";
import { Button } from "./ui/button";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { getPages } from "@/utils/getPages";

function Pagination({ totalPages }: { totalPages: number | undefined }) {
  const { page, setPageNumber } = useTransFilters();
  const pagesForShows = getPages(page, totalPages!);

  const handlePrevious = () => {
    if (page > 1) {
      setPageNumber(page - 1);
    }
  };

  const handleNext = () => {
    if (totalPages && page < totalPages) {
      setPageNumber(page + 1);
    }
  };

  return (
    <div className="flex w-full h-[64px] border pt-6 justify-between mt-auto">
      <Button
        onClick={handlePrevious}
        className="group flex items-center gap-x-4 justify-center rounded-[8px] bg-White border border-Beige-500 cursor-pointer text-sm leading-[21px] text-Grey-900 w-[48px] sm:w-[94px] h-10 p-4 hover:bg-Beige-500 hover:text-White transition-colors duration-300"
        disabled={page === 1}
      >
        <FaCaretLeft />
        <span className="hidden sm:inline-block">Prev</span>
      </Button>
      <div className="flex items-center justify-center gap-x-1">
        {pagesForShows.map((p) => (
          <button
            key={p}
            className={`flex items-center justify-center text-sm leading-[21px] p-4 h-10 w-10 rounded-[8px] border border-Grey-500 text-Grey-900 transition-colors duration-300 cursor-pointer ${
              p === page
                ? "bg-Grey-900 text-White"
                : "hover:bg-Grey-500 hover:text-White"
            }`}
            onClick={() => setPageNumber(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <Button
        onClick={handleNext}
        className="flex items-center gap-x-4 justify-center rounded-[8px] bg-White border border-Beige-500 cursor-pointer text-sm leading-[21px] text-Grey-900 w-[48px] sm:w-[94px] h-10 p-4 hover:bg-Beige-500 hover:text-White transition-colors duration-300"
        disabled={page === totalPages}
      >
        <span className="hidden sm:inline-block">Next</span>
        <FaCaretRight className="w-[11px] h-[6px]" />
      </Button>
    </div>
  );
}

export default Pagination;
