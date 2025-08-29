import { useTransFilters } from "@/contexts/TransFilterContext";
import { Button } from "./ui/button";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

function Pagination({ totalPages }: { totalPages: number | undefined }) {
  const { page, setPageNumber } = useTransFilters();

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
    <div className="flex w-full h-[64px] border pt-6 justify-between">
      <Button
        onClick={handlePrevious}
        className="group flex items-center gap-x-4 justify-center rounded-[8px] bg-White border border-Beige-500 cursor-pointer text-sm leading-[21px] text-Grey-900 w-[94px] h-10 p-4 hover:bg-Beige-500 hover:text-White transition-colors duration-300"
        disabled={page === 1}
      >
        <FaCaretLeft />
        Prev
      </Button>
      <div></div>
      <Button
        onClick={handleNext}
        className="flex items-center gap-x-4 justify-center rounded-[8px] bg-White border border-Beige-500 cursor-pointer text-sm leading-[21px] text-Grey-900 w-[94px] h-10 p-4 hover:bg-Beige-500 hover:text-White transition-colors duration-300"
        disabled={page === totalPages}
      >
        Next
        <FaCaretRight className="w-[11px] h-[6px]" />
      </Button>
    </div>
  );
}

export default Pagination;
