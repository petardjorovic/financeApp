import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

type Props = {
  recurringBillId: string;
  name: string;
};

function RecurringBillMoreMenu({ recurringBillId, name }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
            className="text-Red"
            onClick={() => setIsOpen(true)}
          >
            Delete Recurring Bill
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* DELETE TRANSACTION MODAL */}
      {/* <DeleteModal
        isOpenModal={isOpen}
        setIsOpenModal={setIsOpen}
        label={name}
        id={recurringBillId}
        isDeleting={isDeleting}
        removeFunc={delTransaction}
      /> */}
    </>
  );
}

export default RecurringBillMoreMenu;
