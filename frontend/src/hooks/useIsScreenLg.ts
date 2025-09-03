import { useCallback, useEffect, useState } from "react";

export const useIsScreenLg = (breakpoint = 1280) => {
  const getIsScreenLg = useCallback(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint,
    [breakpoint]
  );

  const [isScreenLg, setIsScreenLg] = useState(getIsScreenLg);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsScreenLg(getIsScreenLg);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [getIsScreenLg]);

  return isScreenLg;
};
