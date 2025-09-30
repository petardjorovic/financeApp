import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { Form } from "./ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import PotNameField from "./PotNameField";
import PotTargetField from "./PotTargetField";
import PotThemeField from "./PotThemeField";
import { useEditPot } from "@/queryHooks/useEditPot";
import { potSchema } from "@/lib/schemas";
import type { Pot } from "@/lib/types";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Loader2Icon } from "lucide-react";

type Props = {
  isOpenEdit: boolean;
  setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  pot: Pot;
  pots: Pot[] | undefined;
};

type editPotFormValues = z.infer<typeof potSchema>;

function EditPotForm({ isOpenEdit, setIsOpenEdit, pot, pots }: Props) {
  const { updatePot, isPending: isEditingPot } = useEditPot(setIsOpenEdit);
  const editPotForm = useForm({
    resolver: zodResolver(potSchema),
    defaultValues: {
      name: pot.name,
      target: pot.target.toFixed(2),
      themeId: pot.themeId._id,
    },
  });

  const onSubmit = (values: editPotFormValues) => {
    if (
      values.name === pot.name &&
      values.target === pot.target &&
      values.themeId === pot.themeId._id
    )
      return;
    updatePot({
      potId: pot._id,
      name: values.name !== pot.name ? values.name : undefined,
      target: values.target !== pot.target ? values.target : undefined,
      themeId: values.themeId !== pot.themeId._id ? values.themeId : undefined,
    });
  };

  // reset form when close edit pot modal
  useEffect(() => {
    if (!isOpenEdit) {
      editPotForm.reset();
    }
  }, [editPotForm, isOpenEdit]);

  return (
    <Dialog
      open={isOpenEdit}
      onOpenChange={(open) => {
        if (!isEditingPot) setIsOpenEdit(open);
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="h-auto px-5 py-6 sm:max-w-[560px] sm:px-8 sm:py-8 rounded-[12px] flex flex-col gap-5"
      >
        <DialogHeader className="flex flex-col gap-5">
          <DialogTitle className="text-Grey-900 py-0 my-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[20px] leading-[24px] sm:text-[32px] sm:leading-[38px] tracking-[0px] font-bold">
                Add New Pot
              </span>
              <IoIosCloseCircleOutline
                className="fill-Grey-500 w-[25px] h-[25px] cursor-pointer"
                onClick={() => setIsOpenEdit(false)}
              />
            </div>
          </DialogTitle>
          <DialogDescription className="text-sm leading-[21px] text-Grey-500 py-0 my-0">
            If your saving target change, feel free to update your pots.
          </DialogDescription>
        </DialogHeader>
        <Form {...editPotForm}>
          <form
            className="space-y-4"
            onSubmit={editPotForm.handleSubmit(onSubmit)}
          >
            {/* Name */}
            <PotNameField form={editPotForm} />

            {/* Target */}
            <PotTargetField form={editPotForm} />

            {/* Theme */}
            <PotThemeField form={editPotForm} pots={pots} />

            <Button
              type="submit"
              disabled={isEditingPot}
              className="w-full mt-5 h-[53px] rounded-[8px] bg-Grey-900 text-White p-4 text-sm font-semibold cursor-pointer"
            >
              {isEditingPot ? (
                <Loader2Icon className=" h-4 w-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditPotForm;
