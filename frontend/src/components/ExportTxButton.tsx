import { downloadTransactionsCSV } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { BsFiletypeCsv } from "react-icons/bs";

function ExportTxButton() {
  const { mutate, isPending } = useMutation({
    mutationFn: downloadTransactionsCSV,
  });
  return (
    <Button
      onClick={() => mutate()}
      disabled={isPending}
      className="bg-Grey-900 w-[118.5px] sm:w-[154px] text-White rounded-[6px] sm:rounded-[8px] p-2 sm:p-4 text-xs sm:text-sm sm:font-semibold leading-[21px] sm:h-[53px] hover:bg-Grey-500 transition-colors duration-300 cursor-pointer"
    >
      {isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <>
          <BsFiletypeCsv />
          &nbsp;Transactions
        </>
      )}
    </Button>
  );
}

export default ExportTxButton;
