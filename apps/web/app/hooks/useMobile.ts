import { useCallback, useEffect, useState } from "react";
import { getBreakpoint } from "~/utils";

export function useIsMobile() {
  const getIsMobile = useCallback(() => {
    const breakpoint = Number(getBreakpoint("lg")?.split("rem")[0]);
    const maxMobileWidth = isNaN(breakpoint) ? 64 : breakpoint;

    if (typeof window !== "undefined") {
      const windowWidthInRem = Math.floor(window.innerWidth / 16);
      return windowWidthInRem < maxMobileWidth;
    }
    return false;
  }, []);

  const [isMobile, setIsMobile] = useState<boolean>(getIsMobile());

  useEffect(() => {
    const handleResize = () => setIsMobile(getIsMobile());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [getIsMobile]);

  return isMobile;
}
