import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

type NavMenuItemProps = {
  collapse: boolean;
  to: string;
  icon: string;
  label: string;
  activeIcon: string;
};

function NavMenuItem({
  collapse,
  icon,
  label,
  to,
  activeIcon,
}: NavMenuItemProps) {
  const location = useLocation();
  const active = location.pathname === to ? true : false;

  return (
    <NavLink
      to={to}
      className={`${
        collapse ? "w-[80px]" : "w-[276px]"
      } h-[56px] flex justify-start items-center px-8 py-4 rounded-r-[16px] border-l-5 gap-x-4 ${
        active ? "bg-Beige-100 border-l-Green" : "border-l-Grey-900"
      }`}
    >
      <img
        src={active ? activeIcon : icon}
        alt="iconMenu"
        className="min-w-[18px] min-h-[18px] w-[18px] h-[18px]"
      />
      <AnimatePresence>
        {!collapse && (
          <motion.p
            className={`text-base font-bold ${
              active ? "text-Grey-900" : "text-Grey-300"
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.1 }}
          >
            {label}
          </motion.p>
        )}
      </AnimatePresence>
    </NavLink>
  );
}

export default NavMenuItem;
