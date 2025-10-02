import { Button } from "./ui/button";

type Props = {
  label: string;
  buttonLabel: string;
  onButtonClick: () => void;
};

function PageHeader({ label, buttonLabel, onButtonClick }: Props) {
  return (
    <div className="w-full h-[56px] flex items-center justify-between">
      <h1 className="text-[26px] leading-[31px] sm:text-[32px] sm:leading-[38px] font-bold text-Grey-900">
        {label}
      </h1>
      <Button
        className="bg-Grey-900 w-[118.5px] sm:w-[154px] text-White rounded-[6px] sm:rounded-[8px] p-2 sm:p-4 text-xs sm:text-sm sm:font-semibold leading-[21px] sm:h-[53px] hover:bg-Grey-500 transition-colors duration-300 cursor-pointer"
        onClick={onButtonClick}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}

export default PageHeader;
