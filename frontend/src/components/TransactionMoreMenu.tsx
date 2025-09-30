import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import DeleteModal from "./DeleteModal";
import { useDeleteTransaction } from "@/queryHooks/useDeleteTranasaction";
import { MoreVertical } from "lucide-react";

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

      {/* DELETE TRANSACTION MODAL */}
      <DeleteModal
        isOpenModal={isOpen}
        setIsOpenModal={setIsOpen}
        label={account}
        id={transactionId}
        isDeleting={isDeleting}
        removeFunc={delTransaction}
      />
    </>
  );
}

export default TransactionMoreMenu;
