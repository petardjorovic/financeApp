import { Loader2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function TransactionActionButtons({
  disabled,
  submitBtnLabel,
}: {
  disabled: boolean;
  submitBtnLabel: string;
}) {
  const navigate = useNavigate();
  return (
    <div className="flex py-3 gap-x-3 justify-center lg:justify-end">
      <Button
        className="text-White bg-Red rounded-[8px] p-4 text-xs sm:text-sm font-semibold leading-[21px] cursor-pointer h-[45px] hover:bg-Red/70"
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Button
        type="submit"
        disabled={disabled}
        className="bg-Grey-900 text-White rounded-[8px] p-4 text-xs sm:text-sm font-semibold leading-[21px] cursor-pointer h-[45px] w-42 sm:w-50"
      >
        {disabled ? (
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          submitBtnLabel
        )}
      </Button>
    </div>
  );
}

export default TransactionActionButtons;
