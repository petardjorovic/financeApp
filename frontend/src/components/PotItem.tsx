function PotItem() {
  return (
    <div className="px-5 py-6 sm:px-6 flex flex-col items-center gap-8 rounded-[12px] bg-White">
      {/* Title */}
      <div>
        <div className="h-6 flex items-center gap-4">
          <div className="w-4 h-4 aspect-square bg-Green rounded-full"></div>
          <span className="text-Grey-900 text-[20px] leading-[24px] font-bold">
            Savings
          </span>
        </div>
      </div>
      {/* Pot Bar */}
      <div></div>
      {/* Buttons */}
      <div></div>
    </div>
  );
}

export default PotItem;
