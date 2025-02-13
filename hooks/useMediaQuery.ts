import { useEffect, useState } from "react";

export function useMediaQuery(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the screen width is below the breakpoint
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Initial check on mount
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [breakpoint]);

  return isMobile;
}
