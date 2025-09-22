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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import type { Budget } from "@/lib/api";
import { useDeleteBudget } from "@/queryHooks/useDeleteBudget";
import { useForm } from "react-hook-form";
import z from "zod";
import { editBudgetSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export type editBudgetFormValues = z.infer<typeof editBudgetSchema>;

function BudgetMoreMenu({ budget }: { budget: Budget }) {
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const { delBudget, isDeletingBudget } = useDeleteBudget();
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const editBudgetForm = useForm({
    resolver: zodResolver(editBudgetSchema),
  });

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

      <AlertDialog open={isOpenDelete} onOpenChange={setIsOpenDelete}>
        <AlertDialogContent className="h-auto px-5 py-6 w-[560px] sm:h-[278px] sm:px-8 sm:py-8 rounded-[12px]">
          <AlertDialogHeader className="">
            <AlertDialogTitle>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[18px] leading-[22px] sm:text-[28px] sm:leading-[32px] tracking-[0px] font-bold">
                  Delete "{budget.categoryId.name}"?
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
              Yes, Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isOpenEdit} onOpenChange={setIsOpenEdit}>
        <DialogContent className="sm:max-w-[425px]">
          <form>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Username</Label>
                <Input
                  id="username-1"
                  name="username"
                  defaultValue="@peduarte"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BudgetMoreMenu;
