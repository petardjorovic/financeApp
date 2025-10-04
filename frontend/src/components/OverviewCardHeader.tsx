import { FaCaretRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function OverviewCardHeader({ label, url }: { label: string; url: string }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between h-6">
      <span className="text-Grey-900 text-[20px] font-bold">{label}</span>
      <span
        onClick={() => navigate(url)}
        className="flex items-center gap-3 text-Grey-500 text-sm hover:text-Grey-900 cursor-pointer transition-colors duration-300"
      >
        See Detail <FaCaretRight className="w-3 h-3" />
      </span>
    </div>
  );
}

export default OverviewCardHeader;
