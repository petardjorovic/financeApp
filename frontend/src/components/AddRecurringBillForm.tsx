import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recurringBillSchema } from "@/lib/schemas";
import type z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCategories } from "@/queryHooks/useCategories";
import { useAddRecurringBill } from "@/queryHooks/useAddRecurringBill";
import { Loader2Icon } from "lucide-react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import type { RecurringBill } from "@/lib/types";

type Props = {
  isOpenAddBill: boolean;
  setIsOpenAddBill: React.Dispatch<React.SetStateAction<boolean>>;
  recurringBills: RecurringBill[];
};

export type AddRecurringBillFormValues = z.infer<typeof recurringBillSchema>;

function AddRecurringBillForm({
  isOpenAddBill,
  setIsOpenAddBill,
  recurringBills,
}: Props) {
  const { categories } = useCategories();
  const { addNewRecurringBill, isPending: isAddingNewBill } =
    useAddRecurringBill(setIsOpenAddBill);
  const recurringBillsNames = recurringBills.map((bill) =>
    bill.name.toLowerCase()
  );
  const addRecurringBillForm = useForm({
    resolver: zodResolver(
      recurringBillSchema.refine(
        (data) => !recurringBillsNames.includes(data.name.toLowerCase()),
        { message: "Name already used", path: ["name"] }
      )
    ),
    defaultValues: {
      name: "",
      dueDate: "",
      categoryId: "",
    },
  });

  const onSubmit = (values: AddRecurringBillFormValues) => {
    addNewRecurringBill(values);
  };

  useEffect(() => {
    if (!isOpenAddBill) {
      addRecurringBillForm.reset();
    }
  }, [addRecurringBillForm, isOpenAddBill]);

  return (
    <Dialog
      open={isOpenAddBill}
      onOpenChange={(open) => {
        if (!isAddingNewBill) setIsOpenAddBill(open);
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
                Add New Recurring Bill
              </span>
              <IoIosCloseCircleOutline
                className="fill-Grey-500 w-[25px] h-[25px] cursor-pointer"
                onClick={() => setIsOpenAddBill(false)}
              />
            </div>
          </DialogTitle>
          <DialogDescription className="text-sm leading-[21px] text-Grey-500 py-0 my-0">
            Add a new recurring bill and easily keep track of all your monthly
            recurring payments in one place.
          </DialogDescription>
        </DialogHeader>
        <Form {...addRecurringBillForm}>
          <form
            className="space-y-4"
            onSubmit={addRecurringBillForm.handleSubmit(onSubmit)}
          >
            {/* Name */}
            <FormField
              control={addRecurringBillForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="w-full text-xs text-Grey-500 leading-[18px] font-semibold my-0">
                    Name
                  </FormLabel>
                  <FormControl className="w-full">
                    <Input
                      {...field}
                      className="px-5 py-3 h-[45px] border border-Grey-300 cursor-pointer"
                      placeholder="e.g. Telephone bill"
                      required
                      maxLength={50}
                    />
                  </FormControl>
                  <FormMessage className="w-full" />
                </FormItem>
              )}
            />

            {/* DueDate */}
            <FormField
              control={addRecurringBillForm.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="w-full gap-1">
                  <FormLabel className="w-full text-xs text-Grey-500 leading-[18px] font-semibold my-0">
                    Due Date
                  </FormLabel>
                  <FormControl className="w-full">
                    <Input
                      type="number"
                      step="1"
                      placeholder="e.g. 15"
                      max={28}
                      {...field}
                      className="px-5 py-3 h-[45px] border border-Grey-300 cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage className="w-full" />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={addRecurringBillForm.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full gap-1">
                  <FormLabel className="w-full text-xs text-Grey-500 leading-[18px] font-semibold my-0">
                    Budget Category
                  </FormLabel>
                  <FormControl className="my-0">
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      required
                    >
                      <SelectTrigger className="w-full border border-Grey-300 h-[45px]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectGroup className="w-full py-3 px-5">
                          {categories.map((cat) => (
                            <SelectItem
                              value={cat._id}
                              key={cat._id}
                              className="text-sm text-Grey-900 leading-[21px]"
                            >
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="w-full" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isAddingNewBill}
              className="w-full mt-5 h-[53px] rounded-[8px] bg-Grey-900 text-White p-4 text-sm font-semibold cursor-pointer"
            >
              {isAddingNewBill ? (
                <Loader2Icon className=" h-4 w-4 animate-spin" />
              ) : (
                "Add Recurring Bill"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddRecurringBillForm;
