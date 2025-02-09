"use client";

import { Button } from "@/components/ui/button";
import { useThemeContext } from "@/context/ThemeContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import Image from "next/image";

function Theme() {
  const { theme, setTheme } = useThemeContext();
  const isMobile = useIsMobile();
  const isLightTheme = theme === "light" || theme === null;
  return (
    <Button
      onClick={() => setTheme(isLightTheme ? "dark" : "light")}
      variant={"ghost"}
      size={"icon"}
    >
      <Image
        src={isLightTheme ? "/assets/icons/moon.svg" : "/assets/icons/sun.svg"}
        alt="theme"
        width={isMobile ? 20 : 30}
        height={isMobile ? 20 : 30}
      />
    </Button>
  );
}

export default Theme;
