import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Loader2Icon, MoreVertical } from "lucide-react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDeleteTransaction } from "@/queryHooks/useDeleteTranasaction";

function TransactionMoreMenu({
  transactionId,
  account,
}: {
  transactionId: string;
  account: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { delTransaction, isDeleting } = useDeleteTransaction(setIsOpen);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreVertical
            size={18}
            className="text-Grey-900 cursor-pointer hover:text-Grey-500"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => navigate(`/transaction/${transactionId}/edit`)}
          >
            Edit Transaction
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-Red"
            onClick={() => setIsOpen(true)}
          >
            Delete Transaction
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!isDeleting) setIsOpen(open);
        }}
      >
        <AlertDialogContent className="h-auto px-5 py-6 w-[560px] sm:h-[278px] sm:px-8 sm:py-8 rounded-[12px]">
          <AlertDialogHeader className="">
            <AlertDialogTitle>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[18px] leading-[22px] sm:text-[28px] sm:leading-[32px] tracking-[0px] font-bold">
                  Delete "{account}"?
                </span>
                <IoIosCloseCircleOutline
                  className="fill-Grey-500 w-[25px] h-[25px]"
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </AlertDialogTitle>

            <AlertDialogDescription className="text-sm leading-[18px] tracking-[0px] text-Grey-500">
              Are you sure that you want to delete this transaction? This action
              cannot be reversed, and all the data inside will be removed
              forever.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="">
            <AlertDialogCancel className="text-sm leading-[21px] tracking-[0px] text-Grey-500 hover:bg-White hover:text-Grey-500 border-none p-[0px] shadow-none cursor-pointer">
              No, Go Back
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-Red w-full h-[53] rounded-[8px] p-4 cursor-pointer hover:bg-Red text-sm leading-[21px] tracking-[0px] font-semibold"
              onClick={() => delTransaction({ transactionId })}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : (
                "Yes, Confirm Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default TransactionMoreMenu;
