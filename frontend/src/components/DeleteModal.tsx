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
import { Loader2Icon } from "lucide-react";
import { IoIosCloseCircleOutline } from "react-icons/io";

type Props = {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleting: boolean;
  label: string;
  id: string;
  removeFunc: ({ id }: { id: string }) => void;
};

function DeleteModal({
  isOpenModal,
  setIsOpenModal,
  isDeleting,
  label,
  id,
  removeFunc,
}: Props) {
  return (
    <AlertDialog
      open={isOpenModal}
      onOpenChange={(open) => {
        if (!isDeleting) setIsOpenModal(open);
      }}
    >
      <AlertDialogContent className="h-auto px-5 py-6 w-[560px] sm:h-[278px] sm:px-8 sm:py-8 rounded-[12px]">
        <AlertDialogHeader className="">
          <AlertDialogTitle>
            <div className="flex items-center justify-between gap-1">
              <span className="text-[18px] leading-[22px] sm:text-[28px] sm:leading-[32px] tracking-[0px] font-bold">
                Delete "{label}"?
              </span>
              <IoIosCloseCircleOutline
                className="fill-Grey-500 w-[25px] h-[25px] cursor-pointer"
                onClick={() => setIsOpenModal(false)}
              />
            </div>
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm leading-[18px] tracking-[0px] text-Grey-500">
            Are you sure you want to delete this pot? This action cannot be
            reversed, and all the data inside it will be removed forever.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="">
          <AlertDialogCancel className="text-sm leading-[21px] tracking-[0px] text-Grey-500 hover:bg-White hover:text-Grey-500 border-none p-[0px] shadow-none cursor-pointer">
            No, Go Back
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-Red w-full h-[53] rounded-[8px] p-4 cursor-pointer hover:bg-Red text-sm leading-[21px] tracking-[0px] font-semibold"
            onClick={() => removeFunc({ id })}
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
  );
}

export default DeleteModal;
