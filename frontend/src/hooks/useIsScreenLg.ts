import { useEffect, useState } from "react";

export const useIsScreenLg = (breakpoint = 1280) => {
  const getIsScreenLg = () =>
    typeof window !== "undefined" &&
    window.matchMedia(`(max-width: ${breakpoint}px)`).matches;

  const [isScreenLg, setIsScreenLg] = useState(getIsScreenLg);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsScreenLg(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    setIsScreenLg(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return isScreenLg;
};
