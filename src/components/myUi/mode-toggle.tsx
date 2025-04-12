"use client";

import * as React from "react";
import { MoonStar, Sun, PcCaseIcon, LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Hint from "./Hint";
import { cn } from "@/lib/utils";
type themeType = {
  icon: LucideIcon;
  text: string;
};

const themes: themeType[] = [
  { text: "light", icon: Sun },
  { text: "system", icon: PcCaseIcon },
  { text: "dark", icon: MoonStar },
];

export function ModeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Render nothing until the component is mounted

  return (
    <div className={cn("flex  border h-8 rounded-full", className)}>
      {themes.map((mtheme, index) => (
        <Hint key={index} label={mtheme.text}>
          <mtheme.icon
            onClick={() => setTheme(mtheme.text)}
            className={
              theme === mtheme.text
                ? " transition-opacity duration-1000 border rounded-full w-8 p-1 h-full"
                : " hover:opacity-100 p-1 h-full w-8 opacity-50  transition-transform"
            }
          />
        </Hint>
      ))}
    </div>
  );
}
