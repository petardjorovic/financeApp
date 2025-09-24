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
import { Loader2Icon, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDeleteBudget } from "@/queryHooks/useDeleteBudget";
import EditBudgetForm from "./EditBudgetForm";
import type { Budget } from "@/lib/types";

type BudgetMoreMenuProps = {
  budget: Budget;
  budgets: Budget[] | undefined;
};

function BudgetMoreMenu({ budget, budgets }: BudgetMoreMenuProps) {
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const { delBudget, isDeletingBudget } = useDeleteBudget(setIsOpenDelete);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal className="w-4 h-4 cursor-pointer" color="#b3b3b3" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsOpenEdit(true)}>
            Edit Budget
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-Red"
            onClick={() => setIsOpenDelete(true)}
          >
            Delete Budget
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isOpenDelete}
        onOpenChange={(open) => {
          if (!isDeletingBudget) setIsOpenDelete(open);
        }}
      >
        <AlertDialogContent className="h-auto px-5 py-6 w-[560px] sm:h-[278px] sm:px-8 sm:py-8 rounded-[12px]">
          <AlertDialogHeader className="">
            <AlertDialogTitle>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[18px] leading-[22px] sm:text-[28px] sm:leading-[32px] tracking-[0px] font-bold">
                  Delete "{budget?.categoryId.name}"?
                </span>
                <IoIosCloseCircleOutline
                  className="fill-Grey-500 w-[25px] h-[25px] cursor-pointer"
                  onClick={() => setIsOpenDelete(false)}
                />
              </div>
            </AlertDialogTitle>

            <AlertDialogDescription className="text-sm leading-[18px] tracking-[0px] text-Grey-500">
              Are you sure you want to delete this budget? This action cannot be
              reversed, and all the data inside it will be removed forever.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="">
            <AlertDialogCancel className="text-sm leading-[21px] tracking-[0px] text-Grey-500 hover:bg-White hover:text-Grey-500 border-none p-[0px] shadow-none cursor-pointer">
              No, Go Back
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-Red w-full h-[53] rounded-[8px] p-4 cursor-pointer hover:bg-Red text-sm leading-[21px] tracking-[0px] font-semibold"
              onClick={() => delBudget({ budgetId: budget._id })}
              disabled={isDeletingBudget}
            >
              {isDeletingBudget ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : (
                "Yes, Confirm Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditBudgetForm
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        budget={budget}
        budgets={budgets}
      />
    </>
  );
}

export default BudgetMoreMenu;
