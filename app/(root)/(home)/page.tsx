"use client";
import { useThemeContext } from "@/context/ThemeContext";
import { UserButton } from "@clerk/nextjs";

function HomagPage() {
  const { toggleTheme } = useThemeContext();
  return (
    <div>
      <UserButton afterSwitchSessionUrl="/" />
      <button onClick={toggleTheme} className="text-red-600">
        change theme
      </button>
    </div>
  );
}

export default HomagPage;
