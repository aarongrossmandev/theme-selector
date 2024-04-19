"use client";

import { cn } from "@/lib/utils";
import { Moon, Paintbrush, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

type ThemeType = {
  light: { name: string; color: string }[];
  dark: { name: string; color: string }[];
};

const themes: ThemeType = {
  light: [
    { name: "zinc", color: "bg-zinc-100" },
    { name: "orange", color: "bg-orange-500" },
    { name: "red", color: "bg-red-500" },
    { name: "blue", color: "bg-blue-500" },
    { name: "green", color: "bg-green-500" },
  ],
  dark: [
    { name: "zinc", color: "bg-zinc-950" },
    { name: "orange", color: "bg-orange-500" },
    { name: "red", color: "bg-red-500" },
    { name: "blue", color: "bg-blue-500" },
    { name: "green", color: "bg-green-500" },
  ],
};

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mode") || "light";
    }
    return "";
  });
  const { theme, setTheme } = useTheme();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const handleModeChange = (newMode: "light" | "dark") => {
    const selectedTheme = theme?.split("-")[1];
    const newTheme = `${newMode}-${selectedTheme}`;
    setMode(newMode);
    setTheme(newTheme);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (!mounted) return null;

  return (
    <div className="relative">
      <button onClick={() => setDropdown(!dropdown)}>
        <Paintbrush className="text-accent w-7 h-7" />
      </button>

      {dropdown && (
        <div
          ref={dropdownRef}
          className={cn(
            "absolute transition-all z-[60] top-auto right- w-[350px] bg-secondary border border-accent p-3 rounded-md overflow-hidden"
          )}
        >
          <div className="flex flex-col space-y-3">
            <div className="w-full font-semibold">Customize Theme</div>
            <div className="text-sm font-semibold mt-4">Mode</div>
            <div className="grid grid-cols-3 w-full gap-3">
              <button
                className={cn(
                  "flex items-center gap-x-2 py-1 px-3 rounded-md text-sm border border-muted hover:bg-background transition",
                  mode === "light" && "border-2 border-border"
                )}
                onClick={() => handleModeChange("light")}
              >
                <Sun className="w-5 h-5 shrink-0" />
                Light
              </button>
              <button
                className={cn(
                  "flex items-center gap-x-2 py-1 px-3 rounded-md text-sm border border-muted hover:bg-background transition",
                  mode === "dark" && "border-2 border-border"
                )}
                onClick={() => handleModeChange("dark")}
              >
                <Moon className="w-5 h-5 shrink-0" />
                Dark
              </button>
            </div>
            <div className="text-sm font-semibold mt-4">Colors</div>
            <div className="grid grid-cols-3 w-full gap-3">
              {themes[mode as keyof ThemeType]?.map((themeOption) => (
                <button
                  key={themeOption.name}
                  onClick={() => setTheme(mode + "-" + themeOption.name)}
                  className={cn(
                    "flex items-center gap-x-2 border border-muted py-1 px-2 rounded-md text-sm text-foreground hover:bg-background transition ease-in",

                    theme === mode + "-" + themeOption.name &&
                      "border-2 border-border"
                  )}
                >
                  <div
                    className={`w-4 h-4 rounded-full border shrink-0 ${themeOption.color}`}
                  />
                  {themeOption.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
