"use client";

import { Button } from "@/components/ui/button";
import { useThemeContext } from "@/context/ThemeContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";
import { motion } from "framer-motion";

function Theme() {
  const { theme, setTheme } = useThemeContext();
  const isMobile = useMediaQuery();
  const isLightTheme = theme === "light" || theme === null;

  return (
    <Button
      onClick={() => setTheme(isLightTheme ? "dark" : "light")}
      variant={"ghost"}
      size={"icon"}
      asChild
    >
      <motion.button
        key={theme}
        initial={{ scale: [1.5, 1], opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: [1.5, 1], opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Image
          src={
            isLightTheme ? "/assets/icons/moon.svg" : "/assets/icons/sun.svg"
          }
          alt="Light Mode"
          width={isMobile ? 20 : 30}
          height={isMobile ? 20 : 30}
        />
      </motion.button>
    </Button>
  );
}

export default Theme;
