import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import EditBudgetForm from "./EditBudgetForm";
import DeleteModal from "./DeleteModal";
import { useDeleteBudget } from "@/queryHooks/useDeleteBudget";
import type { Budget } from "@/lib/types";
import { MoreHorizontal } from "lucide-react";

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
      {/* MORE MENU */}
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

      {/* DELETE BUDGET MODAL */}
      <DeleteModal
        isOpenModal={isOpenDelete}
        setIsOpenModal={setIsOpenDelete}
        label={budget.categoryId.name}
        id={budget._id}
        isDeleting={isDeletingBudget}
        removeFunc={delBudget}
      />

      {/* EFIT BUDGET MODAL */}
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
