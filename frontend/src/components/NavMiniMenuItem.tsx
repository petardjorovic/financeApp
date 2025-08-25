import { NavLink, useLocation } from "react-router-dom";

type NavMiniMenuItemProps = {
  to: string;
  icon: string;
  label: string;
  activeIcon: string;
};

function NavMiniMenuItem({
  activeIcon,
  icon,
  label,
  to,
}: NavMiniMenuItemProps) {
  const location = useLocation();
  const active = location.pathname === to ? true : false;

  return (
    <NavLink
      to={to}
      className={`flex flex-col justify-center items-center h-full w-full sm:w-[104px] gap-y-1 rounded-t-[8px] border-b-5 ${
        active ? "border-b-Green bg-Grey-300" : "border-b-Grey-900"
      }`}
    >
      <img src={active ? activeIcon : icon} alt={label} />
      <p
        className={`text-xs font-semibold hidden sm:block ${
          active ? "text-Grey-900" : "text-Grey-300"
        }`}
      >
        {label}
      </p>
    </NavLink>
  );
}

export default NavMiniMenuItem;
