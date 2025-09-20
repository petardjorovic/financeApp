import { useEffect, useState } from "react";
// import logoLarge from "../assets/images/logo-larges.svg";
import minimizeIcon from "../assets/images/icon-minimize-menu.svg";
import maximizeIcon from "../assets/images/icon-maximize-menu.png";
import NavigationMenu from "./NavigationMenu";
// import miniLogo from "../assets/images/miniLogo.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useIsScreenLg } from "@/hooks/useIsScreenLg";
import pdfLogo from "../assets/images/pdf logo.svg";
import pdfinanceLogo from "../assets/images/pdfinance logo.svg";

function MainNavigation() {
  const [collapse, setCollapse] = useState<boolean>(false);

  const isScreenLg = useIsScreenLg(1280);

  useEffect(() => {
    if (!isScreenLg) {
      setCollapse(false);
    } else {
      setCollapse(true);
    }
  }, [isScreenLg]);

  return (
    <div
      className={`hidden md:flex flex-col bg-Grey-900 transition-all duration-300 h-screen rounded-r-[16px] gap-y-6`}
      style={{ width: collapse ? "88px" : "300px" }}
    >
      <div
        className={`w-full h-[101px] ${
          !collapse ? "px-8 justify-start" : "justify-center"
        } py-10 flex items-center`}
      >
        {collapse ? (
          <img
            // src={miniLogo}
            src={pdfLogo}
            alt="mini-logo"
            className=""
          />
        ) : (
          <img src={pdfinanceLogo} alt="logo" className="" />
        )}
      </div>
      <NavigationMenu collapse={collapse} />
      <div className="w-full h-[56px] px-8 py-4 flex justify-start items-center">
        <div
          className="flex justify-start items-center gap-x-4 cursor-pointer transition-all duration-300"
          onClick={() => setCollapse((prev) => !prev)}
        >
          <img
            src={collapse ? maximizeIcon : minimizeIcon}
            alt="manMax-menu-icon"
          />
          <AnimatePresence>
            {!collapse && (
              <motion.p
                className="text-base font-bold text-Grey-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.1 }}
              >
                Minimize Menu
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default MainNavigation;
