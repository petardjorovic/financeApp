import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import EditPotForm from "./EditPotForm";
import DeleteModal from "./DeleteModal";
import { useDeletePot } from "@/queryHooks/useDeletePot";
import type { Pot } from "@/lib/types";
import { MoreHorizontal } from "lucide-react";

type Props = {
  pot: Pot;
  pots: Pot[] | undefined;
};

function PotMoreMenu({ pot, pots }: Props) {
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const { removePot, isPending: isDeletingPot } = useDeletePot(setIsOpenDelete);

  return (
    <>
      {/* MORE MENU */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal className="w-4 h-4 cursor-pointer" color="#b3b3b3" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsOpenEdit(true)}>
            Edit Pot
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-Red"
            onClick={() => setIsOpenDelete(true)}
          >
            Delete Pot
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* DELETE POT MODAL */}
      <DeleteModal
        isOpenModal={isOpenDelete}
        setIsOpenModal={setIsOpenDelete}
        id={pot._id}
        label={pot.name}
        isDeleting={isDeletingPot}
        removeFunc={removePot}
      />

      {/* EDIT POT MODAL */}
      <EditPotForm
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        pot={pot}
        pots={pots}
      />
    </>
  );
}

export default PotMoreMenu;
