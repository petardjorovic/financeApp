import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { useAddPot } from "@/queryHooks/useAddPot";
import PotNameField from "./PotNameField";
import PotTargetField from "./PotTargetField";
import PotThemeField from "./PotThemeField";
import { potSchema } from "@/lib/schemas";
import type { Pot } from "@/lib/types";
import { Loader2Icon } from "lucide-react";
import { IoIosCloseCircleOutline } from "react-icons/io";

type Props = {
  isAddPotOpen: boolean;
  setIsAddPotOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pots: Pot[] | undefined;
};

type AddPotFormValues = z.infer<typeof potSchema>;

function AddPotForm({ isAddPotOpen, setIsAddPotOpen, pots }: Props) {
  const { addNewPot, isPending: isAddingPot } = useAddPot(setIsAddPotOpen);
  const addPotForm = useForm({
    resolver: zodResolver(potSchema),
    defaultValues: {
      name: "",
      target: "",
      themeId: "",
    },
  });

  const onSubmit = (values: AddPotFormValues) => {
    addNewPot(values);
  };

  useEffect(() => {
    if (!isAddPotOpen) {
      addPotForm.reset();
    }
  }, [addPotForm, isAddPotOpen]);

  return (
    <Dialog
      open={isAddPotOpen}
      onOpenChange={(open) => {
        if (!isAddingPot) setIsAddPotOpen(open);
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
                onClick={() => setIsAddPotOpen(false)}
              />
            </div>
          </DialogTitle>
          <DialogDescription className="text-sm leading-[21px] text-Grey-500 py-0 my-0">
            Create a pot to set savings target. These can help keep you on track
            as you save for special purchases.
          </DialogDescription>
        </DialogHeader>
        <Form {...addPotForm}>
          <form
            className="space-y-4"
            onSubmit={addPotForm.handleSubmit(onSubmit)}
          >
            {/* Name */}
            <PotNameField form={addPotForm} />

            {/* Target */}
            <PotTargetField form={addPotForm} />

            {/* Theme */}
            <PotThemeField form={addPotForm} pots={pots} />

            <Button
              type="submit"
              disabled={isAddingPot}
              className="w-full mt-5 h-[53px] rounded-[8px] bg-Grey-900 text-White p-4 text-sm font-semibold cursor-pointer"
            >
              {isAddingPot ? (
                <Loader2Icon className=" h-4 w-4 animate-spin" />
              ) : (
                "Add Pot"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddPotForm;
